/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000', // Ubah port jika Anda menggunakan port lain
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'rumahjualdesign-production.up.railway.app',
                port: '',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig