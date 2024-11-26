const PROXY_CONFIG = [
    {
        context: ['/'],
        target: 'http://0.0.0.0:8080',
        secure: false,
        logLevel: 'debug',
        changeOrigin: true,
        pathRewrite: {'^/': ''}
    }
];

module.exports = PROXY_CONFIG;
