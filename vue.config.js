module.exports = {
    devServer: {
      proxy: {
        '/':{
          "target":'http://ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com:8080',
          "pathRewrite":{'^/':''},
          "changeOrigin":true,
          "secure":false
        }
      }
    }
  }
