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
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api/java": "/"
        }
      },
      "/api/python": {
        target: "http://192.168.1.28:5000",
        changeOrigin: true,
        pathRewrite: {
          '^/api/python': '/'
        }
      },
    }
  },
})

