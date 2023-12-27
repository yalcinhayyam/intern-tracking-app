/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {},
    async headers() {
        return [
            {

                source: '/api/graphql',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
                ]
            }

        ]
    }
}

module.exports = nextConfig
