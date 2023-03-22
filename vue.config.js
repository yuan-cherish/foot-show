const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '',
  transpileDependencies: true,
  // heatmap: 'heatmap',
  lintOnSave:false,
  devServer: {
    // disableHostCheck: true,//开启反向代理
    port: 8082,
    proxy:{
      "/api/go/": {
        target: "http://127.0.0.1:8081",
        changeOrigin: true,
        pathRewrite: {
          '^/api/go/': '/',
        },
        ws: false,
        secure: false
      },
      "/api/csv": {
        // target: "http://10.89.25.154:8080",
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api/csv": "/",
        },
        ws: false,
        secure: false
      },
    }
  },
})

