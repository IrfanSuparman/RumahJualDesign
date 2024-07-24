import { User } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { Access,CollectionConfig } from "payload/types";

// BeforeChangeHook untuk menambahkan user ke data sebelum perubahan
const addUser: BeforeChangeHook = ({req, data}) => {
    const user = req.user as User | null
    return {...data, user: user?.id}
}
// Access function untuk menentukan akses membaca berdasarkan produk yang dimiliki atau dibeli oleh user
const yourOwnAndPurchased: Access = async ({req}) => {
    const user = req.user as User | null

    if (user?.role === "admin") return true
    if (!user) return false
    // Mengambil produk yang dimiliki oleh user
    const { docs: products } = await req.payload.find({
        collection: "products",
        depth: 0,
        where: {
            user: {
                equals: user.id,
            },
        },
    })
   // Mengambil ID file produk yang dimiliki user
    const ownProductFileIds = products.map((prod) => prod.product_files).flat()
    // Mengambil semua pesanan yang dilakukan oleh user
    const { docs: orders } = await req.payload.find({
        collection: "orders",
        depth: 2,
        where: {
            user: {
                equals: user.id,
            },
        },
    })
    // Mengambil ID file produk yang dibeli oleh user
    const purchasedProductFileIds = orders.map((order) => {
        return order.products.map((product) => {
            if (typeof product === "string") return req.payload.logger.error (
                'Search depth not sufficient to find purchased file IDs'
            )

            return typeof product.product_files === "string" ? product.product_files : product.product_files.id
        })
    }).filter(Boolean).flat()
// Mengembalikan kondisi untuk memfilter akses berdasarkan ID file produk yang dimiliki atau dibeli oleh user
    return {
        id: {
            in:[...ownProductFileIds, ...purchasedProductFileIds],
        },
    }
}

export const ProductFiles: CollectionConfig = {
    slug: "product_files",
    admin: {
        hidden: ({user}) => user.role !== "admin",
    },
    hooks: {
        beforeChange: [addUser]
    },
    access: {
        read: yourOwnAndPurchased,
        update: ({req}) => req.user.role === "admin",
        delete: ({req}) => req.user.role === "admin",
    },
    upload: {
        staticURL: "/product_files",
        staticDir: "product_files",
        mimeTypes: ["image/*", "font/*", "application/postscript"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            admin: {
                condition: () => false
            },
            hasMany: false,
            required: true,
        },
    ],
}