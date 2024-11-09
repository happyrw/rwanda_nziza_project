/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["images.pexels.com", "utfs.io", "lh3.googleusercontent.com"]
    },
    async headers() {
        return [
            {
                source: "/",
                headers: [
                    {
                        key: "Cross-Origin-Opener-Policy",
                        value: "same-origin" // or "same-origin-allow-popups" if you want to allow popups
                    },
                    {
                        key: "Cross-Origin-Embedder-Policy",
                        value: "require-corp" // or "unsafe-none" if you want to disable COEP
                    }
                ],
            },
        ];
    },
};

export default nextConfig;

