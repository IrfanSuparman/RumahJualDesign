import { appRouter } from "@/trpc"
import {fetchRequestHandler} from "@trpc/server/adapters/fetch"


// Definisikan handler untuk menangani permintaan HTTP dengan TRPC
const handler = (req: Request) => {
    fetchRequestHandler({
        endpoint: '/api/trpc',
        req,
        router: appRouter,
        // @ts-expect-error 
        createContext: () => ({}),
    })
}


// Export handler sebagai fungsi untuk metode GET dan POST
export { handler as GET, handler as POST }