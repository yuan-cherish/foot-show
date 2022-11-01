const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '',
  transpileDependencies: true,
  // heatmap: 'heatmap',
  lintOnSave:false,
  devServer: {
    port: 8081,
    proxy:{
      "/api/java":{
        target: "http://127.0.0.1:8082",
        changeOrigin: true,
        pathRewrite: {
          "^/api/java": "/",
        },
        ws: false,
      },
      "/api/python": {
        target: "http://192.168.1.28:5000",
        changeOrigin: true,
        pathRewrite: {
          '^/api/python': '/',
        },
        ws: false,
      },
      "/api/csv": {
        // target: "http://10.89.25.154:8080",
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api/csv": "/",
        },
        ws: false,
      },
    }
  },
})

