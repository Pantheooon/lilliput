module.exports={
    devServer: {
        port: 9000,
        proxy: {
            '/api': {
                target: 'http://localhost:30002',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
}