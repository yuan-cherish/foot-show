const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  lintOnSave: false,
  transpileDependencies: true,
  // heatmap: 'heatmap',
  lintOnSave:false,
  devServer: {
    // disableHostCheck: true,//开启反向代理
    port: 8083,
    proxy:{
      "/api/go/": {
        target: "http://47.102.222.164:8081",
        // target: "http://127.0.0.1:8081",
        changeOrigin: true,
        pathRewrite: {
          '^/api/go/': '/',
        },
        ws: false,
        secure: false
      },
      "/api/csv/": {
        target: "http://47.102.222.164:8080",
        // target: "http://127.0.0.1:8082",
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

