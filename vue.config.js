const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    port:8888,
    https:false,
    open:true,
    host:'localhost',
    proxy: {
      //设置dev-apis代理访问
      //'/dev-apis'
        [process.env.VUE_APP_BASE_API]:{
        target:process.env.VUE_APP_SERVICE_URL,
        changeOrigin:true,
        pathRewrite:{
          //'^/dev-apis':''
          ['^'+process.env.VUE_APP_BASE_API]:''
        }
      }

    }
  },
  lintOnSave:false,
  productionSourceMap:false
})
