// module.exports = {
//     devServer: {
//         proxy: 'http://ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com:8080'
//     }
// }

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

// module.exports = {
// devServer: {
//     proxy: { 
//         '/api': { // api 로 시작하는 소스 는 traget으로 잡아준다. > 사용할때 url 이 api 가 있어야 한다.
//             target:'http://ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com:8080', // www.xxx.com
//             changeOrigin: true
//         }
//     }
// }
// }