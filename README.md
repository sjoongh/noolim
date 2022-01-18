# Noolim Project

**그 동안 익혔던 언어를 기반으로 MSA기반으로 구성해보고 싶어 node.js와 spring서버 두 서버로 AWS를 활용한 서버 배포까지 구현하였다. MSA와 비슷하게 배포하는것에 초점을 맞추었기 때문에 RDS 또한 공용으로 사용했다.
spring서버는 OAuth2로그인과 JWT토큰을 관리하고 있으며 node.js서버는 로그인 기능을 제외한 나머지 모든 데이터를 관리하도록 설계하였다.**
**프로젝트의 결과물 사이트는 다음과 같다.**
**http://www.noolim.kro.kr/**

- Nodejs(https://github.com/sjoongh/noolim/tree/node)  
- Spring Boot(https://github.com/sjoongh/noolim/tree/spring)
- Vue.js

------------------------------------------------------------------------------------------------------------------------------------------------
## 도메인 연결

1. 내 [도메인.한국](http://도메인.한국) 에서 무료 도메인 구매
2. IP연결 : 퍼블릭 ipv4로 AWS 서버와 연결
    1. 웹 포워딩에서 [www.noolim.kro.kr](http://www.noolim.kro.kr) —> 퍼블릭 DNS서버:포트번호
3. AWS 서버까지 도메인 서버로 바꾸려면 페이를 지불해야함

---

## HTTPS 설정

### https의 로드밸런서 & acm인증서 & route 53 & target group을 활용

1. SSL/TLS인증서는 ACM이나 NGINX를 통해 또는 외부 사이트를 활용해 인증서를 발급받을 수 있다.
2. ACM(AWS Certificate Manager)을 통해 인증서를 발급받는 방법을 선택했음
3. *.도메인주소 를 통해 www의 요청을 받을 수 있고 *.을 제외하고 도메인주소 만으로도 연결될 수 있게 두가지를 설정
4. 설정 한 뒤 Route 53에서 레코드 생성까지 완료해야 Route 53와의 연결까지 끝 —> Route 53에서 인스턴스의 퍼블릭IP를 넣은 A-IPv4 레코드 생성 —> 이 DNS설정이 1~3일 정도 걸림
5. Load Balancer 페이지로 접속 http,https 설정 클릭 target group에서 만든 그룹으로 http:80접속과 https:443 접속을 허용해준다 —> ipv4와 ipv6의 접속을 허용해주기위해
6. acm에서 발급받은 인증서를 Default SSL certificate에 입력해준다 
7. 로드밸런서 생성 후 https로 도메인사이트에 접속해 확인

------------------------------------------------------------------------------------------------------------------------------------------------

**package.json**

```
{
  "name": "noolim-vue",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "private": true,
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "unit": "cross-env BABEL_ENV=test karma start test/unit/karma.conf.js --single-run",
    "e2e": "node test/e2e/runner.js",
    "test": "npm run unit && npm run e2e",
    "lint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
    "build": "node build/build.js"
  },
  "dependencies": {
    "axios": "^0.23.0",
    "bootstrap": "^5.1.3",
    "bootstrap-vue": "^2.21.2",
    "dotenv": "^10.0.0",
    "hooper": "^0.3.4",
    "vue": "^2.6.14",
    "vue-infinite-loading": "^2.4.5",
    "vue-router": "^3.5.2",
    "vuex": "^3.6.2",
    "vuex-persistedstate": "^4.0.0"
  },
  "devDependencies": {
    "autoprefixer": "^7.1.2",
    "babel-core": "^6.22.1",
    "babel-eslint": "^8.2.1",
    "babel-helper-vue-jsx-merge-props": "^2.0.3",
    "babel-loader": "^7.1.1",
    "babel-plugin-dynamic-import-node": "^1.2.0",
    "babel-plugin-istanbul": "^4.1.1",
    "babel-plugin-syntax-jsx": "^6.18.0",
    "babel-plugin-transform-runtime": "^6.22.0",
    "babel-plugin-transform-vue-jsx": "^3.5.0",
    "babel-preset-env": "^1.3.2",
    "babel-preset-stage-2": "^6.22.0",
    "babel-register": "^6.22.0",
    "chai": "^4.1.2",
    "chalk": "^2.0.1",
    "chromedriver": "^2.27.2",
    "copy-webpack-plugin": "^4.0.1",
    "cross-env": "^5.0.1",
    "cross-spawn": "^5.0.1",
    "css-loader": "^0.28.0",
    "eslint": "^4.15.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-node": "^5.2.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^3.0.1",
    "eslint-plugin-vue": "^4.0.0",
    "extract-text-webpack-plugin": "^3.0.0",
    "file-loader": "^1.1.4",
    "friendly-errors-webpack-plugin": "^1.6.1",
    "html-webpack-plugin": "^2.30.1",
    "inject-loader": "^3.0.0",
    "karma": "^1.4.1",
    "karma-coverage": "^1.1.1",
    "karma-mocha": "^1.3.0",
    "karma-phantomjs-launcher": "^1.0.2",
    "karma-phantomjs-shim": "^1.4.0",
    "karma-sinon-chai": "^1.3.1",
    "karma-sourcemap-loader": "^0.3.7",
    "karma-spec-reporter": "0.0.31",
    "karma-webpack": "^2.0.2",
    "mocha": "^3.2.0",
    "nightwatch": "^0.9.12",
    "node-notifier": "^5.1.2",
    "optimize-css-assets-webpack-plugin": "^3.2.0",
    "ora": "^1.2.0",
    "phantomjs-prebuilt": "^2.1.14",
    "portfinder": "^1.0.13",
    "postcss-import": "^11.0.0",
    "postcss-loader": "^2.0.8",
    "postcss-url": "^7.2.1",
    "pug": "^3.0.2",
    "rimraf": "^2.6.0",
    "sass-loader": "^7.3.1",
    "selenium-server": "^3.0.1",
    "semver": "^5.3.0",
    "shelljs": "^0.7.6",
    "sinon": "^4.0.0",
    "sinon-chai": "^2.8.0",
    "uglifyjs-webpack-plugin": "^1.1.1",
    "url-loader": "^0.5.8",
    "vue-loader": "^13.3.0",
    "vue-style-loader": "^3.0.1",
    "vue-svg-loader": "^0.16.0",
    "vue-template-compiler": "^2.5.2",
    "vue-naver-maps": "^0.14.3",
    "webpack": "^3.6.0",
    "webpack-bundle-analyzer": "^2.9.0",
    "webpack-dev-server": "^2.9.1",
    "webpack-merge": "^4.1.0"
  },
  "engines": {
    "node": ">= 6.0.0",
    "npm": ">= 3.0.0"
  },
  "browserslist": [
    "> 1%",
    "last 2 versions",
    "not ie <= 8"
  ]
}
```

### vue.config.js
- springboot서버와 연결하기 위한 confing.js파일
```
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
```

### index.html
- 어플리케이션의 뼈대가 되는 html

```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <meta name="google-signin-client_id" content="Noolim">
    <link rel="icon" href="/static/favicon.ico" />
    <link rel="shortcut icon" href="/static/favicon.ico" />
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.js"></script>
    <title>NOOLIM</title>
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script src="https://apis.google.com/js/platform.js"></script>
  </body>

</html>
```

----------------------------------------------------------------------
## dist 디렉터리
- 배포버전의 vue 어플리케이션 파일들이 모여있는 디렉터리, npm run build 명령어 실행시 실행된다.
----------------------------------------------------------------------

## build 디렉터리
- webpack 빌드 관련설정이 모여있다.

### build.js

- 빌드를 도와주는 js파일
- 'use strict'이란?
- 암묵적인 느슨한 모드(sloppy mode)를 해제하고 명시적인 엄격 모드(strict mode)를 사용하는 방법
- 1. js오류는 아니지만 오류가 발생할 가능성이 존재하는 어떠한 일을 변경하여 제거한다.
- 2. js엔진의 최적화 처리를 어렵게 만드는 오류를 수정, 비 strict모드의 동일 코드보다 빠르게 수행
- 3. 미래의 ECMAScript로 정의 될 예정 구문을 금지한다. -> 발생가능한 에러를 예방한다.


```
'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, 
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
  })
})
```

### check-versions.js

- version 설정 체크
- 
```
'use strict'
const chalk = require('chalk')
const semver = require('semver')
const packageConfig = require('../package.json')
const shell = require('shelljs')

function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
```

----------------------------------------------------------------------

## config 디렉터리
- 프로젝트에서 사용되는 설정이 모여있는 디렉터리

### dev.env.js
- npm start시 적용되는 설정
- env파일로서 vue.js와 node.js의 포트 설정

```
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FRONTEND_PORT: 8082,
  // BACKEND_DOMAIN: 'ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com',
  BACKEND_PORT: 8080,
  
})
```

### prod.env.js
- npm run build로 배포 버전에 적용되는 설정

```
'use strict'
module.exports = {
  NODE_ENV: '"production"'
}
```

### index.js

- vue 서버 실행시 호스팅 관련 설정

```
'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Dev Server settings
    // vue 서버가 어느곳에서 호스팅될지 결정
    host: 'ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com', // process.env.HOST를 사용해도 무관
    port: 8082,
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, 

    // 빌드시 eslint 사용
    useEslint: true,
    // eslint에러를 브라우저에서 확인할 것인지 여부
    showEslintErrorsInOverlay: false,

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // 디버깅시 문제가 발생하면 vue-files안의 devtools에서 감지
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',


    productionSourceMap: true,
    devtool: '#source-map',

    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // npm build시 관련 report생성
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
```

---------------------------------------------------------------------------------------------------------------

## src 디렉터리

### App.vue

- 가장 최상위 

```
<template>
  <div id="app">
    <Navbar />
    <router-view :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Footer from "@/components/Footer";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import Popular2 from "@/components/Popular2";
import Detail1 from "@/components/Detail1";
import Detail2 from "@/components/Detail2";
import Detail3 from "@/components/Detail3";
import LocationDetail from "@/components/LocationDetail";
import Search from "@/components/Search";
import Mypage from "@/components/Mypage";
export default {
  name: "App",
  components: {
    Navbar,
    Main,
    Login,
    Register,
    Home,
    Footer,
    Popular2,
    Detail1,
    Detail2,
    Detail3,
    LocationDetail,
    Search,
    Mypage
  }
};
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
```

### main.js

- 가장 먼저 실행되는 js 파일, vue 인스턴스를 생성

```
import Vue from "vue";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import App from "./App";
import router from "./router";
import store from "./store";
import naver from "vue-naver-maps";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
// 모든 요청에 적용될 기본 구성(Config Defaults)값을 지정
// 글로벌 axios 기본(defaults) 설정
// vue.js의 서버에서 모든 axios요청이 요구되므로 고정 URL로 설정
// 즉 매번 axios 요청시마다 URL을 (헤더를)고정적으로 설정한다.
axios.defaults.baseURL =
  "http://ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com:8080";

// NAVER 지도 API 설정
require("dotenv").config();
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(naver, {
  clientID: process.env.NAVER_MAP_ID, // client
  key: process.env.NAVER_MAP_KEY,
  useGovAPI: false, // 공공클라우드 API
  subModules: "" // 서브 모듈
});

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
```

### store2.js
- 인피니트 핸들러설정 vuex

```
import Vue from "vue";
import Vuex from "vuex";
import { findHashName, selectHashName } from "./service";

Vue.use(Vuex);

// 인피니트 핸들러를 위한 vuex
export const store = new Vuex.Store({
  state: {
    hash_name: "",
    ret2: {},
    limit: 0
  },
  mutations: {
    hash(state, ret2) {
      state.ret = ret2;
    }
  },
  getters: {
    justtest(state) {
      return state.ret2;
    }
  },
  // 새 함수click 이벤트
  actions: {
    async test2({ commit }, state) {
      const result = await findHashName(state.hash_name);
      if (result == true) {
        commit("test2");
      }
    }
  }
});
```

### utils.js
- OAuth2 관련 redirect URL 설정
- 구글,네이버,페이스북,카카오 이미지 설정
- click event로 어떤 로그인버튼이 클릭되었는지 감지

```
const BACKEND_PORT =
  process.env.BACKEND_PORT === null ? "" : `:${process.env.BACKEND_PORT}`;
const BACKEND_URL = `http://ec2-13-125-140-17.ap-northeast-2.compute.amazonaws.com:8080`;
const FRONTEND_PORT =
  process.env.FRONTEND_PORT === null ? "" : `:${process.env.FRONTEND_PORT}`;
const REDIRECT_URI = `http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:8082/oauth/redirect`;

export default {
  getSocialLoginUrl(socialType) {
    return `${BACKEND_URL}/oauth2/authorization/${socialType}?redirect_uri=${REDIRECT_URI}`;
  },
  getSocialImage(socialType) {
    switch (socialType) {
      case "google":
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAArlBMVEVHcEw/hfbvgxs6ic4yqlQ/gvJAhvhhepCmcULsQjPsQjPqQjPsQjQzqVPrQjPxeSAyq1QyqlQxp1PnQTL8vwAzqVTrQjMyqlQ5qVE/hPU/hPYyqlQ+g/X9wAA/h/TtQjP7vADqQTP9wAA/hPU/hff7uQXzhxk3l5zAth4+g/P8wAA5k7LeuhPnQTM+gvEyp1P5uwAxplM/hPUyp1H3rAjtaCSIsDI6i8w0n3RXq0M974clAAAALXRSTlMAjQ8P7TDhAwjwcUbYSKE0gNAdHr1rup0x8Lm1SomBgmBf6c2gpff892Rt4qhtntK7AAACRUlEQVRYw+1XaXeiMBRFgg1r2GQTq7XaTjszGiitM/P//9gQljSWABFPv3nVox+89928Je8gSTfc8M1QfdsgsH11Als2dGSaGoFpIt2QL6P7eqgdWGjh1r8gum4eugi3oi6ML9EpkC2UOm74GqYxnk51ox36YdrX8TVdHfV/HV/anvE1M0QIhaYmyoc+mz8TGb4MJSj7BtLE4quIiY5sVYKNsGqEInzJ0JjjnneNvBHgy08flL+FX04H4Sgf2o/vz218OGH+4H2WZbUCmjK/UF6UAtn7h0i/cWE/Zo3CZsoBJPiQNXhmDEAw5wD0pqDCgqkgXN9xsOZZVJ9agXtWdnbs4m3PFVi0Aj9HBZa8KslU4GFM4LgE3yFw0RHAlUnk5qCnjLO3TwxXQaKN9BIzAqvZJ3atArcPYNPK2Qk7kB1jCrBsBV7510GVxZd/OXZj7h9WScNP5v3jTPgYR9wk7VsDO9A7jqeC8LESwAEDx1nPtMq/TznOq3dXAc5pCpNV30RbCq4MYKJwbhOudsN9WPdSVAnUp4hixoQX/DqOG5Ck2K3jk1cpYXmgXCyqZzkuzn+0AnswcCtZSpUDAuLCTaMoSl2l/F0Uf/9U/Lv54G5ylAJ3QfTyWiF5Hb4wS4UunSgQD+UxkjUYuVtBR6Gg36XCKL/0ECiV57YlmqrUpXGAyP1upZj2Q+2++mDsWoIbywtcGhRTI4rjiW8ZL0gVNollRZ34sn0FLKdsgBpu6ljehHUHvdgiiD110rJsbqTbU8sNAvgPj0mre8ZWN6oAAAAASUVORK5CYII=";
      case "facebook":
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAALVBMVEU7WZg7WZg8W5o8W5g9X447WZj///8yVJb19vhqhLPN1ONTc6qIoMSxvtaVpsgQygVPAAAABXRSTlP9/NtjCH+oUcUAAAEDSURBVEjHY3BWFMQDhEwYjAJC8QBRZQbVULwgiEEUv4JABlb8CgIGTkE5EJTiVhAevfPkzNm7cSoI37Oioy2jo2srLgVxbWkgkLEdh4LoZQQURKWl4VUQfo2Agso2Agpq0wgo2EFAQfgxsGzXqlVrsYcDxI25W4FhHYpHwdJS3JG1DKTgeCh+BRnTh7ICUFKEKCjHGlDVZ4AAFJkZd4CMk1gUwGIaDHJLMRREoyjIKyVgQg4hEzoJmdAdit+EjFZCvlhKwARsCqo7gAAsCWJcxxLUM4EAHNQvgYyt2OOiFB4XpcM2yY0qGNwKRPErCMSsmlEVMDEY4VegzIDRPIAogDcPALqkycM0E6OAAAAAAElFTkSuQmCC";
      case "naver":
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAKlBMVEVHcEwQqgAOpQANpAAOpAAeyAD///8bxAARqwBp21Xk+eA80CJW1kCw7KZApJ5fAAAABXRSTlMA7LNCXU5PuLYAAADxSURBVEjH7dYxDoJAEAXQKbyBBfYW1noCL7HZEPtNMGwBCUFLK70AFB5BsbTB3oIDUHgaBxESlN3facOvJvHnTbWMRIvJwZjdlGjkxJYES5pHkTBGxmOaCVtkSI61IALa2wubofD7wurGuXanTuF44lyqqaim7LMgU8VZJzzdq8n7El4Fdeapv1ALSiNBJUDgHUDQSFAJEHgHELQAgkqAoDIk6BQIqrQIum0ZBK80FmrBL4Dgu0gQJRBEjgQXCc0Oo9DsMAsuEt47zILMkbA1FNoHJx+9Tw8/3uEr9/8CPIv2wypCPs223/k0w+OO/h48AfrSASA123dQAAAAAElFTkSuQmCC";
      case "kakao":
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAV1BMVEVHcEz95AD74wD74gD85QD64QD74QD74QD74QD74wD74gD74wD74gD74QA8Hh44Gh7y2AFGKRx8YBRfQhjgxgSegw6tkwyOchFTNhprThbGrAjTuQa5nwoG7ISxAAAADXRSTlMABzOdD97t9x1zuzo+dvp0aAAAAvJJREFUWMOtl4myqjAMQBEBL3pp0339/+98bQFFKNyiLzMyzmhOs5EmVZWkqft7exsK5dbe+7qpXnKpr12xdiIMt+5aX2b9pm+HD6Ttm1m/+0Q/GDESLh/qB+n66EXdfqofglkHB67DF3Jtqrr7BtDVVf/MH5x5zE701X34Su7VhyGczWirgwqEl+wnotrVdVJRw7RmhirpdhlZAHCrGCHoKYQwZTkcAOBNXZqF8lOMzCG2FnDJEEY5wUzyPwFgKToQauEYAFKjQ9ESjgAgCPpDiIB9QIH+hvAGkAX60Ys9gGOoSJjLA4CiQqGQBXiNCwHaZwHJAE2TmJBNQ1NI2OiYSdXJxizTHMCxaICfXj9JKAcVdDS3JBah5QYjyh1ZRaFapYB6ywduPSUyvJDhPAZcR4ADE/Rh/BeRGYDC04snBhk0jPM2hnUCGAf0qY+Q2gKA4rlQBokRVqAo92QBkC99/MrDDgBrD4Y4zl6AGKY5TwWAcLrGMoTxBQihnSslBxjeXRCDVcqDXQCEBG4mQCYGg0ALALOTXSwCME5Z0HawejeIg5wcTAAKTiilLAgDEL6ZEESDDR+TjReluC6k9LqK4IFA4VwKlkF03gZWLCSAWJeRlCllNVe6YsiohCOKEiqCUE1jWZL0RIGfA9g5SWT6zF9J7PBjl09PvHyfl/1AHfUTvOxJOw1lTtKZdvDe0iw73ZBWXdnrAn17dC94dlJ/czNZgw4aGybU/XU3crXbGkNBC15wve/cjjhUmN27nd9vK4m3Z2NkhIWyAQMUfqqNEnq18A6yU1IGwNkUMCWlUEJIbx3fnZIyADcNJB6G4wFrc7XNI0Kqd8ULhrysBanxMQ+FA+N2Tgwt8Pj41ZzYboYkUn58nFQ3s7IThcfDOCv3p7atVcnFaf3RZX8ppHSP7zeW6rfds2+1YGRsbB97W1uZQ+PW9vHeGCLY/J/NNXjxez1tRHf9vSzW7+YRtvfuVihd2N4fy+09IZqfE9I8T/8HxHrZ6Vi0v8gAAAAASUVORK5CYII=";
    }
  },
  clickOutside(exceptionId = "#") {
    return {
      bind: function(el, binding, vnode) {
        el.clickOutsideEvent = function(e) {
          if (
            !(el === e.target || el.contains(e.target)) &&
            e.target.id !== exceptionId
          ) {
            vnode.context[binding.expression](e);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind: function(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      }
    };
  }
};
```

-------------------------------------------------------------------------------------------------------------

## src/api 디렉터리

### account.js
- 로그인 성공 여부 판단
- 성공시 getuser

```
import req from './req-wrapper'

// URL 경로 설정
const ACCOUNT_URI = {
  LOGIN: '/auth/login',
  USER: '/users'
}

export default {
  // login success or fail 여부
  login (body, success, fail) {
    req.post(ACCOUNT_URI.LOGIN, body, success, fail)
  },
  // if login succes? user data 가져옴
  getUser (success) {
    req.get(ACCOUNT_URI.USER, success)
  },
  // 회원가입 기능 미구현
  signup () {
  }
}
```

### req-wrapper.js
- 요청 관련 설정
- TODO-LIST : 추후에 설명 추가하기

```
import axios from "axios";
import store from "../store";
import handler from "./res-handler";

const URI_PREPENDER = "/api/v1";
const wrap = url => `${URI_PREPENDER}${url}`;
const appendAuth = config => {
  const token = store.getters.token;
  if (token) {
    if (!config) config = { headers: {} };
    if (!config.headers) config.headers = {};
    config.headers.Authorization = `Bearer ${store.getters.token}`;
  }
  return config;
};

export default {
  get(url, success, fail = err => err.response.data.message, config) {
    axios
      .get(wrap(url), appendAuth(config))
      .then(handler.handle(success))
      .catch(fail);
  },
  post(url, body, success, fail = err => err.response.data.message, config) {
    axios
      .post(wrap(url), body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail);
  },
  put(url, body, success, fail = err => err.response.data.message, config) {
    axios
      .put(wrap(url), body, appendAuth(config))
      .then(handler.handle(success))
      .catch(fail);
  },
  upload(url, body, progress, success, fail) {
    var formData = new FormData();
    if (body.constructor === Object) {
      for (let key in body) {
        formData.append(key, body[key]);
      }
    } else if (body.constructor === Array) {
      body.forEach(b => formData.append(b[0], b[1]));
    } else {
      console.error("unkown type");
    }
    axios
      .post(wrap(url), formData, {
        headers: {
          "Content-Type": "multipart/formdata; charset=utf-8",
          Accept: "*/*"
        },
        onUploadProgress: e => {
          progress(e.loaded);
        }
      })
      .then(handler.handle(success))
      .catch(fail);
  },
  delete(url, success, fail = err => err.response.data.message, config) {
    axios
      .delete(wrap(url), appendAuth(config))
      .then(handler.handle(success))
      .catch(fail);
  }
};
```

### res-handler.js
- 서버로부터 응답 성공 유무 확인과 res.data.body로 데이터 받음

```
export default {
  handle(
    success,
    fail = message => {
      console.log(message);
    }
  ) {
    return res => {
      switch (res.data.header.code) {
        case 200: {
          success(res.data.body);
          break;
        }
        default:
          fail(res.data.header.message);
      }
    };
  }
};
```

--------------------------------------------------------------------------------------------------------------

## src/assets
- Noolim 로고
- search.svg
- 검색창 이미지

--------------------------------------------------------------------------------------------------------------

## TODO : src/data 생략가능?

--------------------------------------------------------------------------------------------------------------
## src/router 디렉터리

### index.js
- router 설정

**hash mode**
vue.js는 기본적으로 hash mode이다. Hash mode는 모든 URL을 HASH(#) 형태로 서비스한다. 앵커anchor를 사용하는 방식으로,
link tag(<'a href="#hash">등)의 href 속성에 hash(#)를 사용합니다. 클릭 시 문서에서 #뒤에 붙은 id를 가진 요소로 이동합니다. 즉 동일한 URL에서 HASH만 변경될 경우 서버에 요청하는 것이 아닌 처음 받아온 페이지에서(SPA 이므로) 가져온다. 앵커로 웹 페이지 내부에서 이동했으므로

**history 모드란???**
history 모드를 사용할 때, 처음 경로 부터 쭉~ 사용한다면 문제없이 정상적으로 동작. 하지만 중간 경로로 직접 접속하면 404 오류가 발생. http://서버주소/user/1와 같은 URL로 바로 접속하면 404 오류가 발생. (hash 모드를 사용하면 이런 오류가 없긴 합니다.) 이런 문제를 해결하려면 서버에서 어떠한 경로로 접근하더라도 index.html 페이지를 제공해야 한다.
-> 즉 매번 페이지가 렌더링 될때마다 서버로부터 데이터를 받아온다

```
import Vue from "vue";
import Router from "vue-router";
import Board from "@/components/Board";
import ContentDetatil from "@/components/ContentDetail";
import Create from "@/components/Create";
import Login from "@/components/Login";
import Register from "@/components/Register";
import Home from "@/components/Home";
import Detail3 from "@/components/Detail3";
import LocationDetail from "@/components/LocationDetail";
import Mypage from "@/components/Mypage";
import OauthRedirect from "@/components/oauth/Redirect";
import IndexPage from "@/components/Index";
import Logout from "@/components/Logout";
import store from "../store/index";

Vue.use(Router);

// vuex 토큰 없을시 라우터 접근 금지
const requireAuth = () => (to, from, next) => {
  if (store.state.account.token != null) {
    return next();
  }
  next("/login");
};

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
  mode: "history",
  component: IndexPage,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/register",
      name: "Register",
      component: Register
    },
    {
      path: "/board/free",
      name: "Board",
      component: Board,
      beforeEnter: requireAuth()
    },
    {
      path: "/detail3",
      name: "Detail3",
      component: Detail3
    },
    {
      path: "/board/free/detail/:contentNo",
      name: "ContentDetail",
      component: ContentDetatil,
      beforeEnter: requireAuth()
    },
    {
      path: "/board/free/create/:contentNo?",
      name: "Create",
      component: Create,
      beforeEnter: requireAuth()
    },
    {
      path: "/detail3/locationdetail", // /:locaNo
      name: "LocationDetail",
      component: LocationDetail
    },
    {
      path: "/mypage",
      name: "Mypage",
      component: Mypage,
      beforeEnter: requireAuth()
    },
    {
      path: "/oauth/redirect",
      name: "OauthRedirect",
      component: OauthRedirect
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    }
  ]
});

```

--------------------------------------------------------------------------------------------------------------
## src/service 디렉터리

### index.js
- node.js로부터 axios를 통해 db데이터 받아옴

--------------------------------------------------------------------------------------------------------------

## src/store/modules 디렉터리

### Home.vue
- main, popular2, location 컴포넌트의 부모 컴포넌트
```
<template>
  <div class="home">
    <Main />
    <Popular2 />
    <Location />
  </div>
</template>

<script>
// @ is an alias to /src
import Main from "@/components/Main";
import Popular2 from "@/components/Popular2";
import Location from "@/components/Location";

export default {
  name: "Home",
  components: {
    Main,
    Popular2,
    Location
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
</style>

```

### Main
```
<template>
  <div class="rela-block top-section grad-back" id="topSection">
    <div class="abs-cent-text top-text">
      <h1 class="big-text">NOOLIM</h1>
      <p class="top-small-text ">인생의 즐거움을 모두 누리자</p>
      <Search />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Search from "@/components/Search";
export default {
  name: "Main",
  components: {
    Search
  },
  data() {
    return {
      search: ""
    };
  },
  methods: {},
  computed: {
    //! 검색어에 입력하면 타이틀(내용) 걸러줌 (우리꺼에 맞게 수정하기)
    filteredBlogs: function() {
      return this.blogs.filter(blog => {
        return blog.title.match(this.search);
      });
    },
    ...mapGetters(["token", "user"]),
    isLoggedIn() {
      return this.token != null;
    },
    isAdmin() {
      return this.user && this.user.roleType === "ADMIN";
    },
    username() {
      if (!this.user) return "";
      return this.user.username;
    },
    roleType() {
      if (!this.user) return "";
      return this.user.roleType;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
/** 메인 이미지 설정*/
.rela-block {
  display: block;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
}
/** 메인 이미지 소스*/
.top-section {
  height: 100vh;
  background: url("https://images.unsplash.com/photo-1568743295327-cfc48ccc456d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")
    no-repeat center;
  background-size: cover;
}
/** 메인 이미지 효과*/
.grad-back::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(transparent, rgba(0, 0, 0, 0.3));
}
/** 메인 텍스트 설정 */
.top-text {
  color: #fff;
  top: 58%;
  line-height: 28px;
}
.top-small-text {
  font-size: 17px;
  line-height: 24px;
  letter-spacing: 2px;
  font-weight: 400;
  margin-bottom: 30px;
}
.big-text {
  font-family: "Nanum Gothic", sans-serif;
  text-transform: uppercase;
  font-size: 58px;
  font-weight: bold;
  line-height: 72px;
  letter-spacing: 20px;
  margin-bottom: 10px;
}
.abs-cent-text {
  position: absolute;
  width: 90%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.section-search input {
  padding: 5px !important;
  font-size: 18px !important;
  width: 50% !important;
  border: #f4f4f4 3px solid !important;
}
.container h3 {
  font-family: "Nanum Gothic", sans-serif;
  font-size: 25px;
  padding: 20px;
}
</style>

```

### Popular2
- 랜덤 게시물구현 -> 인기검색 게시물에서 수정됨
```
<template>
  <hooper :infiniteScroll="true" :settings="hooperSettings">
    <slide v-for="(slide, i) in slides" :key="i">
      <div id="hero-slides">
        <div id="slides">
          <div
            class="slide"
            v-bind:style="{ 'background-image': 'url(' + slide.picture1 + ')' }"
          >
            <div class="number">{{ i + 1 }}</div>
            <div class="body">
              <div class="location">{{ slide.context1 }}</div>
              <div class="headline">{{ slide.title }}<br /></div>
              <div class="link" @click="gogo(slide.loca_no, slide.title)">
                클릭시 이동합니다
              </div>
            </div>
          </div>
        </div>
      </div>
    </slide>

    <hooper-navigation slot="hooper-addons"></hooper-navigation>
    <hooper-pagination slot="hooper-addons"></hooper-pagination>
  </hooper>
</template>

<script>
import {
  Hooper,
  Slide,
  Navigation as HooperNavigation,
  Pagination as HooperPagination
} from "hooper";
import "hooper/dist/hooper.css";
import { getRandom } from "../service";

export default {
  async created() {
    const ret = await getRandom();
    this.slides = ret.data;
  },
  components: {
    Hooper,
    Slide,
    HooperNavigation,
    HooperPagination
  },

  data() {
    return {
      slides: [],
      hooperSettings: {
        itemsToShow: 5,
        centerMode: true,
        mouseDrag: false,
        wheelControl: false,
        transition: 500 // 슬라이딩 전환 시간 기본:300
      },
      likes: [
        {
          count1: 13296,
          count2: 9287,
          count3: 8837,
          count4: 6452,
          count5: 5543,
          text: "",
          done: false
        }
      ],
      random: [
        {
          loca_no: "",
          title: "",
          picture1: "",
          context1: ""
        }
      ]
    };
  },

  methods: {
    gogo(loca_no, title) {
      this.$router.push({
        name: "LocationDetail",
        query: {
          loca_no: loca_no,
          title: title
        }
      });
    },
    toggle: function(like) {
      like.done = !like.done;
      count = count + 1;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
/* @import '.css/hooper.css'; */
.hooper-next,
.hooper-prev {
  background-color: blue;
}
.hooper {
  height: 630px;
}
/* 
.hooper{
  height: 700px
} */
/* .icons{
  display: inline-block;
  margin-top: 10px;
  margin-left: 280px;
} */
#hero-slides {
  padding-top: 30px;
  height: 100%;
  /* background: #25303c; */
  /* background : #ffffff; */
  background: linear-gradient(0deg, #7bc4c4 100%, #7bc4c4 100%);
  background-color: #7bc4c4;

  overflow: hidden;
}
#hero-slides #header {
  height: 12vh;
  line-height: 12vh;
  padding: 0 3vw;
  position: relative;
}
#hero-slides #header #logo {
  font-size: 2.5vh;
  font-style: italic;
}
#hero-slides #header #logo:before {
  content: "The";
  text-transform: uppercase;
  font-weight: 100;
  margin-right: 0.4em;
}
#hero-slides #header #logo:after {
  content: "Wall";
  text-transform: uppercase;
  font-weight: 800;
}
#hero-slides #header #menu {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  cursor: pointer;
  padding: 0 3vw;
}
#hero-slides #header #menu:before {
  font-size: 1.75vh;
  content: "Play Demo";
  margin-right: 0.5em;
  text-transform: uppercase;
}
#hero-slides #header #menu #hamburger {
  display: inline-block;
}
#hero-slides #header #menu #hamburger .slice {
  background: white;
  height: 0.2vh;
  width: 1vw;
}
#hero-slides #header #menu #hamburger .slice:not(:last-child) {
  margin-bottom: 0.5vh;
}
#hero-slides #slides-cont {
  position: relative;
  --button-height: 6vh;
  --button-spacing: 0.2vh;
}
#hero-slides #slides-cont .button {
  width: 5vw;
  height: var(--button-height);

  background: #0d96f2;
  position: absolute;
  right: 5.375vw;
  top: 38vh;
  z-index: 100;
  cursor: pointer;
}
#hero-slides #slides-cont .button:before,
#hero-slides #slides-cont .button:after {
  line-height: var(--button-height);
  position: absolute;
  margin-left: -0.25vw;
  pointer-events: none;
  transform: scale(0.75, 1.5);
  transition: 125ms ease-in-out;
}
#hero-slides #slides-cont .button:before {
  left: 50%;
}
#hero-slides #slides-cont .button:after {
  opacity: 0;
}
#hero-slides #slides-cont .button:hover:before,
#hero-slides #slides-cont .button:hover:after {
  transition: 250ms ease-in-out;
}
#hero-slides #slides-cont .button:hover:before {
  opacity: 0;
}
#hero-slides #slides-cont .button:hover:after {
  left: 50% !important;
  opacity: 1;
}
#hero-slides #slides-cont #next {
  margin-top: calc(-1 * (var(--button-height) + var(--button-spacing)));
}
#hero-slides #slides-cont #next:before,
#hero-slides #slides-cont #next:after {
  content: ">";
}
#hero-slides #slides-cont #next:after {
  left: 30%;
}
#hero-slides #slides-cont #next:hover:before {
  left: 70%;
}
#hero-slides #slides-cont #prev {
  margin-top: var(--button-spacing);
  opacity: calc(var(--page) + 0.5);
  transition: 500ms opacity;
}
#hero-slides #slides-cont #prev:before,
#hero-slides #slides-cont #prev:after {
  content: "<";
}
#hero-slides #slides-cont #prev:after {
  left: 70%;
}
#hero-slides #slides-cont #prev:hover:before {
  left: 30%;
}
#hero-slides #slides {
  /* --slides-height: 700px; */
  width: auto;
  height: 700px;
  padding: -1px 10vw;

  font-size: 0;
  white-space: nowrap;
  position: absolute;
  transform: translate3D(calc(var(--page) * -80vw), 0, 0);
  transition: 1500ms transform cubic-bezier(0.7, 0, 0.3, 1);
}
#hero-slides #slides .slide {
  display: inline-block;
  vertical-align: baseline;
  font-size: 1.5vw;
  width: 24em;
  height: 700px;
  margin: 0 1.333em;
  background: #101419;

  color: white;
  background-size: cover;
  background-position: center;
  white-space: normal;
  word-break: break-word;
  position: relative;
}
#hero-slides #slides .slide:before {
  content: "";
  display: block;
  background: linear-gradient(
    180deg,
    rgba(86, 97, 108, 0) 0%,
    rgba(33, 52, 69, 1) 80%
  );
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
#hero-slides #slides .slide .number {
  position: absolute;
  top: 2em;
  left: 2em;
  filter: drop-shadow(0 2px 1px rgba(0, 0, 0, 0.5));
}
#hero-slides #slides .slide .number,
#hero-slides #slides .slide .number:before,
#hero-slides #slides .slide .number:after {
  vertical-align: middle;
}
#hero-slides #slides .slide .number:before,
#hero-slides #slides .slide .number:after {
  display: inline-block;
  content: "";
  height: 0.133em;
  margin-top: -0.2em;
  background: white;
}
#hero-slides #slides .slide .number:before {
  width: 0;
  margin-left: 0;
}
#hero-slides #slides .slide .number:after {
  width: 3em;
  margin-left: 1em;
}
#hero-slides #slides .slide .body {
  position: absolute;
  bottom: 2em;
  left: 2em;
  right: 2em;
}
#hero-slides #slides .slide .location,
#hero-slides #slides .slide .headline {
  position: relative;
  bottom: 0;
  cursor: default;
}
#hero-slides #slides .slide:before,
#hero-slides #slides .slide .number:before,
#hero-slides #slides .slide .number:after,
#hero-slides #slides .slide .location,
#hero-slides #slides .slide .headline,
#hero-slides #slides .slide .link {
  transition: 375ms cubic-bezier(0.7, 0, 0.3, 1);
}
#hero-slides #slides .slide .location {
  font-size: 12px;
  font-weight: 500;
  margin-bottom: 1.5em;
  transition-delay: 60ms;
}
#hero-slides #slides .slide .headline {
  font-size: 2.667em;
  font-weight: 900;
  transition-delay: 50ms;
}
#hero-slides #slides .slide .link {
  display: inline-block;
  background: #ffffff;
  padding: 0.5em 1.25em;
  color: rgb(0, 0, 0);
  font-size: 1.34em;
  opacity: 0;
  /* position: absolute; */
  bottom: -2em;
  pointer-events: none;
  transition-delay: 25ms;
  cursor: pointer;
}
#hero-slides #slides .slide.hover:before,
#hero-slides #slides .slide:hover:before {
  opacity: 1;
}
#hero-slides #slides .slide.hover:before,
#hero-slides #slides .slide.hover .number:before,
#hero-slides #slides .slide.hover .number:after,
#hero-slides #slides .slide.hover .location,
#hero-slides #slides .slide.hover .headline,
#hero-slides #slides .slide.hover .link,
#hero-slides #slides .slide:hover:before,
#hero-slides #slides .slide:hover .number:before,
#hero-slides #slides .slide:hover .number:after,
#hero-slides #slides .slide:hover .location,
#hero-slides #slides .slide:hover .headline,
#hero-slides #slides .slide:hover .link {
  transition: 500ms cubic-bezier(0.7, 0, 0.3, 1);
}
#hero-slides #slides .slide.hover .number:before,
#hero-slides #slides .slide:hover .number:before {
  width: 3em;
  margin-right: 1em;
}
#hero-slides #slides .slide.hover .number:after,
#hero-slides #slides .slide:hover .number:after {
  width: 0;
  margin-right: 0;
}
#hero-slides #slides .slide.hover .location,
#hero-slides #slides .slide:hover .location {
  transition-delay: 0;
  bottom: 4em;
}
#hero-slides #slides .slide.hover .headline,
#hero-slides #slides .slide:hover .headline {
  transition-delay: 100ms;
  bottom: 1.5em;
}
#hero-slides #slides .slide.hover .link,
#hero-slides #slides .slide:hover .link {
  bottom: 0;
  opacity: 1;
  transition-delay: 250ms;
  pointer-events: auto;
}
#hero-slides #footer {
  height: 12vh;
  font-size: 1vh;
}
#hero-slides #footer #dribbble {
  border-radius: 2vh;
  position: absolute;
  bottom: 4vh;
  right: 4vh;
  transition: 300ms cubic-bezier(0.7, 0, 0.3, 1);
  padding-left: 1.5vh;
}
#hero-slides #footer #dribbble:before,
#hero-slides #footer #dribbble:after {
  vertical-align: middle;
  transition: inherit;
}
#hero-slides #footer #dribbble:before {
  display: inline;
  content: "View original Dribbble";
  font-size: 2vh;
  opacity: 0;
  transform: translate3D(-200px, 0, 0);
}
#hero-slides #footer #dribbble:after {
  content: "";
  display: inline-block;
  width: 4vh;
  height: 4vh;
  margin-left: 1vh;
  background-image: url("https://alca.tv/static/u/82fde61b-28ef-4f17-976e-8f1abb5a1165.png");
  background-size: contain;
  background-position: center;
}
#hero-slides #footer #dribbble.hover,
#hero-slides #footer #dribbble:hover {
  background: #e94e89;
}
#hero-slides #footer #dribbble.hover:before,
#hero-slides #footer #dribbble:hover:before {
  opacity: 1;
  transform: translate3D(0, 0, 0);
  transition-delay: 50ms;
}
#hero-slides #footer #dribbble.hover:after,
#hero-slides #footer #dribbble:hover:after {
  filter: saturate(0%) contrast(200%) brightness(200%) invert(100%);
}
@media (min-width: 100px) and (max-width: 1000px) {
  #hero-slides #slides .slide {
    font-size: 0.7vw;
    height: 565px;
  }
}
@media (max-width: 1800px) {
  .body {
    --slides-per-page: 3;
  }
  #hero-slides #slides .slide {
    font-size: 0.75vw;
    height: 565px;
  }
  /* #hero-slides { */
  /* background: linear-gradient(0deg, #7bc4c4 0%, #7bc4c4 0%); */
  /* background: #7bc4c4; */
  /* } */
}
@media (min-width: 1801px) {
  /* #hero-slides {
    background: linear-gradient(0deg, #7bc4c4 0%, #7bc4c4 0%);
  } */
  .body {
    --slide-per-age: 4;
  }
  #hero-slides #slides .slide {
    font-size: 0.55vw;
    width: 34em;
    height: 60em;
  }
  .hooper {
    height: 700px;
  }
  .container-heart {
    left: 131%;
    top: 4%;
    font-size: 13px;
    margin-left: 10px;
  }
}
/* 좋아요 css */
.container-heart {
  position: relative;
  left: 122%;
  top: 4%;
  display: flex;
  /* justify-content:center;
  align-items:center; */
  transform: translate(-50%, -50%);
}
h2 {
  font-weight: bold;
  margin-bottom: 15px;
}
input[type="checkbox"] {
  display: none;
}
label {
  cursor: pointer;
  /* background: #000; */
}
del {
  text-decoration: none;
  transition: 0.3s;
}
</style>

```

### Location.vue
- svg를 활용한 서울시 지도, 구 별로 이동 가능
```
<template>
  <div class="all-svg">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1400 1400"
      width="800px"
      height="700px"
      id="Korea-svg"
    >
      <g
        @click="changePage2"
        id="도봉구"
        class="1"
        @mouseover="도봉구 = true"
        @mouseleave="도봉구 = false"
      >
        <title>도봉구</title>

        <desc>
          <!-- /경로/파일명.확장자-->
          <image></image>
        </desc>

        <path
          d="
      M964.064,164.667
      c-1.447,9.018-0.285,18.105-2.002,27.506c-2.068,11.332-9.018,22.101-11.502,33.507c-0.867,3.979-0.977,9.201-1.5,14.003
      c-0.508,4.656-1.969,10.129-1.5,14.003c0.779,6.456,5.756,14.04,8.502,21.005c2.287,5.805,7.385,15.948,8.002,21.505
      c0.539,4.856-0.953,11.628-1.502,17.504c-0.547,5.879-1.484,11.904-2,17.504c-1.135,12.346-0.799,25.368-3,36.008
      c-1.582,7.641-5.57,14.402-7.002,21.505c-1.725,8.558-1.271,18.438-3,27.506c-6.813,0.022-13.387,0.283-19.506,1
      c-14.793-19.111-31.705-39.509-48.51-58.013c-4.902-5.398-11.217-16.078-17.504-18.504c-7.016-2.707-17.623,0.042-22.006-7.001
      c-4.459-4.876-9.127-9.544-14.002-14.003c-0.148-1.02-1.354-0.98-1.502-2c-3.959-4.376-8.127-8.544-12.502-12.503
      c-2.484-9.723,2.434-16.186,3.5-24.005c1.156-1.678,0.176-5.493,0.5-8.001c0-4.168,0-8.335,0-12.503
      c-1.914-13.504,2.932-25.383,2.502-37.009c-0.459-12.384-5.236-23.798-6.002-36.508c11.756-1.325,7.563-21.182,9.002-35.508
      c0.838-8.333,5.449-13.907,6.502-19.504c9.998-4.506,22.598-6.408,38.008-5.501c2.178-0.323,5.654,0.652,7.002-0.5
      c3.451,0.612,7.951-0.803,10.502,0c9.178,2.887,3.551,20.857,10.002,25.005c4.402,2.831,14.043,1.217,20.506,1.5
      c7.441,0.328,14.299,0.634,21.004,1C944.035,158.024,948.826,166.568,964.064,164.667z"
        />
      </g>

      <g
        @click="changePage2"
        id="동대문구"
        @mouseover="동대문구 = true"
        @mouseleave="동대문구 = false"
      >
        <title>동대문구</title>
        <desc>
          <image xlink:href="/02.jpg"></image>
        </desc>
        <path
          d="
      M943.059,562.258
 c17.314-12.86,45.85-14.498,69.016-21.505c4.727,50.787,10.273,100.752,15.504,151.034c-6.555,14.951-12.34,30.67-19.004,45.511
 c-22.848-9.494-47.135-17.548-71.518-25.506c-1.996-7.838-4.219-15.451-7-22.505c-1.004-1.498-4.105-0.896-6.502-1
 c-0.693-1.14-3.48-0.187-5.002-0.5c-4.93,0.306-9.943-0.296-15.002-0.5c-5.111-0.206-11.324-1.679-15.004-0.5
 c-4.971,1.592-4.482,8.52-9.002,11.003c-1.5,0-3.002,0-4.502,0c-0.693-1.141-3.48-0.187-5-0.5
 c-6.898-0.604-9.074-5.929-13.504-9.002c0-2,0-4.001,0-6.001c1.15-1.184,0.18-4.488,0.5-6.501c0-3.334,0-6.668,0-10.002
 c-1.777-8.816,6.691-12.109,9.502-18.004c3.188-6.685,2.475-12.889,5.502-20.004c13.135-9.705,25.787-19.891,43.01-25.506
 c5.984-9.353,9.824-20.849,17.004-29.006C935.932,569.802,939.6,566.134,943.059,562.258z
"
        />
      </g>

      <g
        @click="changePage2"
        id="동작구"
        @mouseover="동작구 = true"
        @mouseleave="동작구 = false"
      >
        <title>동작구</title>
        <desc>
          <image xlink:href="/03.jpg" alt=""></image>
        </desc>
        <path
          d="
      M549.469,914.338
 c12.88,1.814,26.066,2.353,40.509,1.5c5.67-0.331,12.667,0.665,17.504-0.5c1.864,0.031,3.163-0.504,4.501-1
 c6.505,6.898,12.973,14.271,19.505,22.006c6.095,7.215,12.891,16.18,21.505,20.504c7.69,3.861,17.505,3.021,28.006,5.502
 c1.606,6.563,2.639,13.698,5.001,19.504c6.734,1.602,15.933,0.738,23.005,2c4.186,7.818,7.715,16.29,11.502,24.506
 c-4.217,11.309-7.695,25.375-9.502,41.01c-2.027,17.546-1.936,31.865,2,45.01c-7.719,3.617-13.839,8.832-27.005,7.002
 c-3,0-6.001,0-9.002,0c-4.278-3.027-8.12-6.408-12.502-10.002c-3.631-2.978-9.757-6.318-12.003-10.503
 c-3.533-6.582-4.023-16.151-6.001-24.005c-2.02-8.021-4.385-15.643-6.501-23.506c-12.507-4.498-23.557-10.451-37.009-14.004
 c-7.835,0-15.67,0-23.505,0c-4.837,0.332-10.999-0.662-15.003,0.501c-6.668,0-13.336,0-20.004,0
 c-5.503,0.331-12.333-0.664-17.004,0.5c-4.723,4.112-5.059,12.612-8.502,18.004c-8.232,6.149-19.541,2.86-29.507,6.001
 c-9.423,2.971-16.667,13.793-26.506,13.504c1.216-7.453,2.1-15.238,3.5-22.506c4.8-3.152,7.619-8.869,13.503-11.502
 c8.821-3.948,20.193-3.832,30.507-7.002c2.514-8.961,8.113-16.396,10.002-25.506c1.771-8.537-0.226-17.053,1.5-26.506
 c0.636-3.48,3.329-7.236,5.001-11.002C533.56,938.992,541.504,925.207,549.469,914.338z
"
        />
      </g>

      <g
        @click="changePage2"
        id="은평구"
        @mouseover="은평구 = true"
        @mouseleave="은평구 = false"
      >
        <title>은평구</title>
        <desc>
          <image xlink:href="/04.jpg" alt=""></image>
        </desc>
        <path
          d="
      M575.476,330.705
 c7.587,0.952,9.29-2.505,13.003-6.501c7.224-7.775,13.519-17.169,18.004-25.505c14.693,12.132,30.782,26.277,46.01,39.509
 c3.894,3.383,13.752,9.375,15.003,13.503c0.862,2.844-0.673,6.792,0,9.002c0,4.834,0,9.669,0,14.503
 c0.324,2.343-0.654,5.989,0.5,7.501c1.953,14.456-6.109,18.896-9.502,28.007c0.628,0.205,1.022,0.645,1,1.5
 c-5.143,9.597-10.142,17.47-17.004,25.006c-3.037,3.335-7.588,6.393-9.002,10.002c-2.79,7.125-1.877,15.108-4.501,24.006
 c-1.152,1.348-0.178,4.823-0.5,7.001c0,3.667,0,7.335,0,11.002c0,3.334,0,6.668,0,10.002c-1.152,1.348-0.178,4.824-0.5,7.001
 c0,3.667,0,7.335,0,11.002c0,4.167,0,8.335,0,12.503c-9.909-2.624-14.437,0.35-20.505,4.001c-2.967,1.785-6.638,3.607-8.502,5.501
 c-6.809,6.919-9.348,18.968-12.003,28.006c-9.573,3.93-19.012,7.994-29.506,11.003c-2.983,8.353-6.446,16.227-11.502,22.505
 c-1.074,0.927-3.664,0.338-5.501,0.5c-3.173,0.328-7.661-0.659-10.002,0.5c-4.668,0-9.335,0-14.003,0
 c-5.337,0.332-12-0.664-16.504,0.5c-3.186-0.352-4.295,1.374-5.501,3c-2.043,1.625-3.877,3.458-5.501,5.501
 c-1.876,1.458-3.543,3.125-5.001,5.001c0,0.167,0,0.333,0,0.5c-2.043,1.624-3.876,3.458-5.501,5.501
 c-1.874,6.295-2.348,13.989-3.501,21.005c-7.333-4.537-13.729-10.497-21.005-16.004c-7.046-5.333-15.879-9.708-21.505-16.003
 c-3.167-3.544-4.184-8.449-8.001-11.502c-9.872,0.035-11.732-7.939-16.003-13.503c10.749,5.088,25.466,6.208,41.509,6.001
 c5.736-6.742,14.377-14.342,20.005-22.505c5.505-7.985,9.425-16.801,8.002-31.007c0-3.167,0-6.334,0-9.502
 c0-7.168,0-14.336,0-21.505c-0.331-5.17,0.664-11.666-0.5-16.003c0-10.335,0-20.671,0-31.007c2.321-3.633,8.118-5.423,9.502-9.502
 c1.134-3.341,0.625-8.999,1-13.503c2.579-30.969,5.016-65.498,8.002-94.521c11.516,0.432,24.255,0.549,34.508,1
 c3.694,0.163,8,1.385,11.503,0c7.246-2.866,6.368-17.586,19.004-13.503c0.693,1.141,3.481,0.187,5.001,0.5
 C569.141,330.705,572.308,330.705,575.476,330.705z
"
        />
      </g>

      <g
        @click="changePage2"
        id="강북구"
        @mouseover="강북구 = true"
        @mouseleave="강북구 = false"
      >
        <title>강북구</title>
        <desc>
          <image xlink:href="/05.jpeg" alt=""></image>
        </desc>
        <path
          d="
      M809.029,188.173
      c0.912,12.448,6.383,24.226,6.5,36.508c0.084,8.802-3.998,17.245-3,27.006c-1.156,1.678-0.176,5.492-0.5,8.001
      c0,4.167,0,8.335,0,12.503c1.809,14.38-6.305,20.132-3.5,34.008c1.307,1.693,2.83,3.171,4,5.001
      c4.125,4.543,8.461,8.877,13.002,13.003c4.461,4.876,9.127,9.544,14.004,14.003c4.174,4.995,14.822,3.516,22.006,5.501
      c29.617,32.396,58.822,65.205,81.518,104.524c-9.205,15.968-17.861,32.483-26.506,49.011c-4.91,2.591-8.998,6.004-14.004,8.502
      c-3.006,0.327-7.326-0.659-9.502,0.5c-3,0-6,0-9.002,0c-3.5,0-7.002,0-10.502,0c-2.178,0.323-5.652-0.652-7.002,0.5
      c-3,0-6,0-9.002,0c-3.5,0-7.002,0-10.502,0c-2.5,0-5.002,0-7.502,0c-3.18-1.987-7.064-3.271-9.502-6.001
      c-4.273-15.565-7.566-32.108-12.002-47.511c-12.75-10.672-26.533-20.346-39.51-30.507c-4.32-3.382-8.381-8.007-13.004-10.502
      c-6.852-3.699-15.078-4.146-22.504-8.002c-3.998-4.838-7.506-10.165-11.502-15.003c1.264-2.903,3.693-4.642,4.5-8.002
      c1.158-2.01,0.174-6.161,0.5-9.002c-0.324-2.509,0.656-6.324-0.5-8.002c0-5.168,0-10.336,0-15.504c0-5.001,0-10.002,0-15.003
      c-0.324-2.344,0.654-5.989-0.5-7.502c0-5.168,0-10.336,0-15.503c0-5.001,0-10.002,0-15.003c0-2.334,0-4.668,0-7.002
      c6.334-11.432,14.252-23.222,21.004-34.508c2.314-3.867,5.734-8.378,7.002-12.002c4.479-12.813,3.801-26.4,8.502-40.509
      C784.264,197.082,796.582,192.563,809.029,188.173z
"
        />
      </g>

      <g
        @click="changePage2"
        id="강동구"
        @mouseover="강동구 = true"
        @mouseleave="강동구 = false"
      >
        <title>강동구</title>
        <desc>
          <image xlink:href="/06.jpeg" alt=""></image>
        </desc>
        <path
          d="
      M1169.111,741.299
 c5.732-6.754,13.379-10.111,22.004-15.504c8.936-5.586,14.174-12.908,26.506-13.003c10.67-0.333,22.672,0.667,32.508-0.5
 c18.525-4.354,29.406-16.417,44.01-25.006c8.764-5.154,19.996-8.898,28.506-14.003c0,1.667,0,3.334,0,5.001
 c0.326,2.509-0.654,6.323,0.502,8.002c-0.258,11.092,11.025,10.646,17.004,15.504c1.512,1.154,5.158,0.176,7.5,0.5
 c1.086,7.083,1.484,14.853,4.502,20.005c-1.932,10.422-10.932,19.746-9.502,32.007c0.439,3.773,5.059,8.253,6,13.503
 c1.15,6.411-0.707,13.824,0.502,19.504c0.762,3.582,4.42,6.434,5,9.503c-2.693,4.808-5.02,9.982-8.002,14.503
 c-14.064,3.812-27.102,8.573-43.51,14.004c-6.725,2.226-13.926,4.617-21.504,7.001c-6.23,1.96-18.705,4.1-21.506,7.502
 c-2.205,2.679-1.711,10.053-2,16.003c-0.27,5.521-0.115,11.744-0.5,16.004c-0.494,5.479-4.258,10.002-7.002,14.504
 c-7.244,11.887-13.189,21.056-20.504,33.008c-5.291-1.752-9.098-0.548-13.504-2.501c-4.646-2.06-6.66-7.547-11.002-9.003
 c-5.998-2.009-12.977-0.372-21.006-2c-4.625-8.117-5.539-17.827-10.502-25.006c-4.063-5.875-11.83-7.93-15.504-14.003
 c5.16-14.568,16.49-35.228,7.002-51.011c-3.82-0.68-7.887-1.115-12.502-1.001c-3.299-2.87-5.486-6.851-8.502-10.003
 c4.039-21.131,4.615-45.729,18.504-57.012C1164.984,745.842,1167.152,743.675,1169.111,741.299z
"
        />
      </g>

      <g
        @click="changePage2"
        id="강서구"
        @mouseover="강서구 = true"
        @mouseleave="강서구 = false"
      >
        <title>강서구</title>
        <desc>
          <image xlink:href="/07.jpg" alt=""></image>
        </desc>
        <path
          d="
      M134.875,530.751
 c14.186,7.902,28.88,17.473,41.509,27.006c4.251,3.209,9.459,6.075,13.003,9.502c4.232,4.093,7.689,10.18,11.502,15.004
 c3.918,4.956,7.421,10.604,11.503,15.003c6.56,7.07,15.108,12.175,21.505,19.005c8.05,8.595,12.902,20.3,21.505,29.006
 c6.374,6.451,17.3,10.128,26.006,15.003c3.432,1.921,6.93,4.513,10.502,6.501c3.87,2.155,8.53,3.593,11.502,6.001
 c3.497,2.833,6.386,8.233,10.002,12.503c3.64,4.297,8.201,8.06,10.502,12.002c3.5,5.994,4.969,13.018,8.502,18.504
 c5.596,8.689,15.438,15.27,23.005,22.005c8.075,7.188,16.7,13.607,24.506,21.005c2.256,5.079,2.541,12.129,3.001,19.004
 c0,0.334,0,0.667,0,1c-6.002,0-12.003,0-18.004,0c-5.92-1.747-10.951-4.385-18.504-4.5c-3.843,4.658-6.47,10.533-10.002,15.503
 c-0.172,10.497-1.497,19.842-1.5,30.507c-5.514,8.156-10.331,17.01-15.003,26.006c-8.665,1.709-16.358,9.035-25.006,9.502
 c-3.351,0.182-9.662-1.734-13.503-2.5c-10.699-2.131-20.229-4.968-25.006-12.003c-1.979-2.915-3.274-7.977-5.001-12.003
 c-3.733-8.706-7.112-16.434-10.502-24.506c-1.854-4.414-2.894-9.518-5.001-12.502c-1.992-2.822-7.871-7.548-10.502-8.002
 c-6.062-1.047-14.354,2.875-20.005,2c-3.302,5.2-6.064,10.939-9.002,16.504c-8.57-0.594-16.527-0.893-25.005-1.5
 c-6.744-0.483-19.111-2.885-25.506-1.5c-5.025,1.087-10.524,10.202-14.003,14.003c-4.763,5.202-9.093,9.708-14.003,14.003
 c-2.676-5.246-5.24-10.084-7.502-16.004c-1.854-4.855-3.532-13.175-7.001-16.504c-2.526-2.423-9.272-3.868-13.503-5.501
 c-14.528-5.605-28.749-11.121-42.009-16.503c-0.499-13.672-5.639-22.701-10.002-32.508c4.057-5.3,11.855-4.416,15.504-10.002
 c1.666-2.551,1.634-7.865,2.5-12.004c2.518-12.024,6.03-25.201,9.002-35.508c5.497-2.554,11.032-4.787,17.504-7.501
 c4.729-1.983,13.795-4.065,16.503-8.502c3.111-5.097,2.565-13.703,3.5-21.004c0.943-7.357,1.846-14.689,2.501-22.005
 c3.839-3.569,7.796-7.497,13.003-12.002c6.48-5.608,15.725-9.435,13.003-23.005c1.155-1.678,0.175-5.493,0.5-8.002
 c1.876-13.255-8.925-25.063-6.001-37.508C126.606,538.5,132.789,536.269,134.875,530.751z
"
        />
      </g>

      <g
        @click="changePage2"
        id="금천구"
        @mouseover="금천구 = true"
        @mouseleave="금천구 = false"
      >
        <title>금천구</title>
        <desc>
          <image xlink:href="/08.jpg" alt=""></image>
        </desc>
        <path
          d="
      M409.438,1062.872
 c10.055-0.948,14.109-7.896,22.005-11.003c8.709,3.959,17.785,18.691,29.007,11.503c1.936,4.731,4.911,8.425,7.001,13.003
 c4.371,1.964,8.918,3.752,13.003,6.002c-0.113,3.721-0.805,6.863-0.5,11.002c-0.828,0.7-0.828,4.801,0,5.502
 c1.265,19.843,4.213,42.334,6.502,61.514c0.842,7.057,0.685,15.172,2.5,20.504c1.959,5.756,8.856,10.419,10.502,16.004
 c4.774,1.228,8.83,3.173,13.503,4.501c1.205,6.297,3.346,11.657,5.001,17.505c-0.607,2.56-3.158,3.176-4.501,5
 c-16.374,3.465-20.527,19.148-25.006,34.508c-8.089,0.664-14.721,8.753-23.005,10.003c-9.996,1.508-19.743-2.559-31.507-1.501
 c-6.953-26.869-16.129-59.129-24.006-88.02c-2.003-7.346-3.826-24.808-9.002-28.506c-3.041-2.174-9.421-1.811-13.503-2.001
 c-2.895-34.114-17.084-56.934-26.506-84.52c2.5,0,5.001,0,7.501,0c3.009,0.833,9.495,0.833,12.503,0c2.834,0,5.668,0,8.502,0
 c1.849-0.319,4.982,0.647,6.002-0.5c2.667,0,5.334,0,8.001,0C405.284,1063.053,408.418,1064.02,409.438,1062.872z
"
        />
      </g>

      <g
        @click="changePage2"
        id="구로구"
        @mouseover="구로구 = true"
        @mouseleave="구로구 = false"
      >
        <title>구로구</title>
        <desc>
          <image xlink:href="/09.jpg" alt=""></image>
        </desc>
        <path
          d="
      M428.942,1040.367c0.317,1.684-0.644,4.645,0.5,5.501
 c0,1,0,2.001,0,3.001c-7.014,3.32-11.124,9.547-20.504,10.502c-1.849,0.319-4.982-0.647-6.001,0.5c-2.667,0-5.334,0-8.002,0
 c-1.848,0.319-4.982-0.647-6.001,0.5c-2.834,0-5.668,0-8.502,0c-3.834,0-7.668,0-11.502,0c-3.07-0.264-7.24,0.572-9.502-0.5
 c-2.025-8.383,1.501-17.846-2-24.506c-1.383-2.629-7.673-5.575-10.002-7.001c-3.662-2.241-8.242-5.894-11.502-6.001
 c-2.817-0.094-7.527,2.728-10.002,4c-2.836,1.459-7.151,3.227-9.502,5.002c-2.417,1.824-7.969,9.016-9.002,12.002
 c-2.259,6.529,0.466,16.63-5.001,19.005c-2.709,2.292-5.21,4.792-7.502,7.501c-3.542,3.126-6.877,6.46-10.002,10.003
 c-1.09,1.744-2.248,3.421-4.001,4.501c-2.709,2.291-5.21,4.792-7.502,7.502c-3.542,3.125-6.877,6.459-10.002,10.002
 c-2.603,2.77-4.024,6.548-7.502,7.502c-6.091,1.67-16.19,0.877-22.005,0c-5.793-0.873-10.356-4.833-15.504-5.002
 c-10.37-0.339-19.73,5.449-29.006,6.002c-5.163,0.307-9.707-1.09-15.503-1.5c5.927-12.122,11.899-26.067,18.004-39.01
 c2.118-4.488,5.993-9.389,6.001-13.502c0.012-5.465-5.336-12.942-8.502-20.006c-2.061-4.598-8.586-15.993-8.502-20.004
 c0.044-2.09,2.84-6.572,4.501-10.002c8.828-18.236,18.595-35.627,21.505-57.014c-0.289-3.212-3.403-3.599-4.501-6.001
 c7.568,0.767,14.526,2.144,21.505,3.501c2.272,5.395,3.418,11.918,7.001,16.004c0.54,0.827,4.462,0.827,5.001,0
 c3.5,0,7.001,0,10.502,0c4.004-0.33,9.33,0.662,12.503-0.5c5.631-2.188,10.712-8.438,16.504-13.504
 c2.238-1.957,5.196-3.902,8.001-6.501c4.358-4.038,6.289-8.403,13.503-7.002c0.855,1.145,3.817,0.184,5.501,0.501
 c4.167,0,8.335,0,12.503,0c2.144,7.523,5.065,14.271,7.001,22.004c4.975,1.3,9.393,5.851,15.503,6.502
 c7.731,0.824,16.25-1.998,25.506-1c1.52-0.314,4.308,0.641,5.001-0.5c3.791-2.215,6.551-9.283,9.002-14.504
 c2.473-5.266,3.817-10.847,7.002-14.503c4.698,2.081,8.631,5.198,13.503,8.001c3.752,2.16,11.111,4.273,13.503,8.002
 c1.4,2.185,2.071,7.009,3.001,10.503c2.963,11.132,5.162,22.878,6.501,35.509c3.465,4.703,9.131,7.205,7.501,17.003
 c0.317,1.685-0.644,4.646,0.5,5.501c0,2.834,0,5.668,0,8.502c0.317,1.684-0.644,4.646,0.5,5.502
 C428.942,1035.032,428.942,1037.699,428.942,1040.367z
"
        />
      </g>

      <g
        @click="changePage2"
        id="관악구"
        @mouseover="관악구 = true"
        @mouseleave="관악구 = false"
      >
        <title>관악구</title>
        <desc>
          <image xlink:href="/02.jpg" alt=""></image>
        </desc>
        <path
          d="
      M694.002,1210.906
 c-4.465,4.478-9.49,9.332-15.003,14.503c-4.905,4.601-9.783,10.629-15.504,14.503c-5.579,3.778-12.692,6.807-20.004,11.003
 c-6.592,3.783-13.672,10.269-20.004,11.503c-4.604,0.896-10.121,0.33-15.004,0.5c-4.958,0.172-10.222,0.289-15.503,0.5
 c-8.362,0.334-23.305,2.309-31.007,1c-6.05-1.028-10.412-7.248-16.503-9.502c-4.21-6.324-3.53-20.211-8.502-25.006
 c-4.548-4.387-12.656-2.06-19.505-5.002c8.225-5.589-0.902-17.209-2-25.506c-3.932-2.236-8.583-3.752-13.503-5
 c-1.827-5.164-8.366-9.896-10.002-15.504c-1.574-5.393-1.633-13.365-2.5-20.505c-0.814-6.708-1.677-13.724-2.5-20.505
 c-2.561-21.088-3.9-39.887-4.001-58.013c-4.064-2.271-8.587-4.082-13.003-6.001c-2.081-4.088-4.802-7.535-6.501-12.004
 c11.121-1.375,18.907-12.017,27.506-14.502c11.104-3.211,22.65,0.189,31.007-7.002c2.241-5.428,4.121-11.217,6.502-16.504
 c6.001,0,12.002,0,18.004,0c4.67-0.331,10.665,0.663,14.503-0.5c6.668,0,13.337,0,20.005,0c8.168,0,16.337,0,24.506,0
 c10.86,4.143,21.86,8.146,32.007,13.002c4.08,15.592,8.194,31.148,12.003,47.012c8.873,7.131,17.411,14.596,26.506,21.504
 c2.674,1.161,7.497,0.172,11.003,0.501c1.848-0.319,4.981,0.647,6.001-0.501c9.897,1.395,14.094-5.574,20.004-6.501
 c-1.588,13.631,1.807,20.663,6.002,29.007c7.521,14.96,15.389,32.314,24.006,43.51c-3.738,0.93-8.176,1.16-11.502,2.5
 C718.799,1185.691,706.297,1198.194,694.002,1210.906z
"
        />
      </g>

      <g
        @click="changePage2"
        id="광진구"
        @mouseover="광진구 = true"
        @mouseleave="광진구 = false"
      >
        <title>광진구</title>
        <desc>
          <image xlink:href="/04.jpg" alt=""></image>
        </desc>
        <path
          d="
      M968.564,871.328
 c2.316-14.521,7.197-26.477,7.502-43.01c8.822-11.86,18.256-21.808,24.006-37.008c5.83-15.418,6.246-33.637,11.002-51.012
 c2.184-7.975,6.811-15.682,10.002-23.506c3.381-8.283,5.756-16.752,10.002-23.505c13.057-2.375,26.496,0.72,38.01-2.501
 c10.371-2.901,19.273-13.59,34.508-10.502c3.646-0.813,1.371,4.297,2,6.501c-1.842,8.604-12.258,15.216-13.002,24.006
 c-0.449,5.296,4.145,11.839,5.5,17.504c2.047,8.548-0.248,18.539,5.502,24.005c2.166,0,4.334,0,6.502,0
 c1.678,1.156,5.492,0.176,8.002,0.5c2.834,0,5.668,0,8.502,0c-2.664,6.541-4.318,12.607-5.502,20.005
 c-1.111,6.94-1.309,15.409-3.5,22.505c-2.055,6.65-7.506,15.23-11.504,23.006c-3.957,7.696-9.898,14.141-14.502,20.004
 c-4.736,6.031-10.125,12.135-15.504,19.005c-4.619,5.896-10.355,16.442-15.504,19.005c-6.918,3.441-16.094,3.563-25.006,4
 c-2.334,0-4.668,0-7.002,0c-3.334,0-6.668,0-10.002,0c-1.52,0.314-4.309-0.641-5.002,0.5
 C995.094,881.143,980.262,877.802,968.564,871.328z
"
        />
      </g>

      <g
        id="강남구"
        @click="changePage2"
        @mouseover="강남구 = true"
        @mouseleave="강남구 = false"
      >
        <title>강남구</title>
        <desc>
          <image xlink:href="/09.jpg" alt=""></image>
        </desc>
        <path
          d="
      M809.529,885.332
 c3.344-3.51,7.164-6.168,11.002-9.502c3.58-3.111,6.844-7.933,11.002-9.503c3.145-1.187,8.471-1.302,12.504-2.001
 c10.121-1.754,17.617-2.169,29.006-1.5c15.992,0.939,26.063,3.173,37.008,8.002c26.447,11.669,47.611,32.773,78.518,36.008
 c1.088,2.58,0.227,7.111,0.502,10.503c0,3.334,0,6.668,0,10.003c0.32,2.012-0.65,5.317,0.5,6.501c0,2.834,0,5.668,0,8.502
 c0,3.334,0,6.668,0,10.002c0.318,1.849-0.648,4.981,0.5,6.001c-1.123,9.712,2.514,13.063,5.5,19.005
 c1.992,3.962,3.227,8.579,5.002,11.003c2.117,2.891,7.289,6.038,11.002,9.002c3.914,3.123,7.424,6.66,11.504,9.002
 c4.016,2.305,9.201,4.087,14.002,6.501c4.635,2.33,9.215,5.753,13.504,7.002c12.207,3.557,27.744,3.449,39.508,7.001
 c2.563,3.273,5.932,5.738,8.502,9.002c1.391,4.277,2.246,9.092,4.002,13.004c9.594,7.076,20.686,12.655,30.006,20.004
 c0.875,6.341,2.055,12.245,3.002,18.004c0.984,6.002,1.041,12.711,3,18.004c1.092,2.949,4.381,6.836,6.502,10.003
 c9.504,14.194,19.082,27.798,25.006,44.511c-5.541,1.964-14.252-0.62-20.006,2c-4.949,2.254-6.008,10.943-10.002,16.004
 c-2.055,2.604-7.475,6.924-11.002,8.002c-5.742,1.754-12.551,0.227-18.004,1.5c-4.266,0.995-7.09,4.738-11.002,5.501
 c-4.352,0.849-9.047-0.96-15.004-0.5c-4.955-4.302-7.02-10.321-12.504-15.003c-4.303-3.674-10.471-5.346-14.502-9.002
 c-2.607-2.365-9.137-11.533-10.504-15.504c0-2.668,0-5.335,0-8.002c-0.313-1.52,0.641-4.308-0.5-5.002
 c0.389-4.389-0.732-7.268-0.5-11.502c-4.393-2.852-7.592-7.5-13.002-9.502c-14.945-5.529-33.725,0.521-46.012,6.001
 c-4.537,7.298-8.525,15.146-14.002,21.505c-16.326,0.345-28.281,5.061-40.51,9.502c-12.758-17.582-15.137-45.543-21.004-70.016
 c-4.961-5.376-10.129-10.544-15.504-15.504c-6.775-3.227-14.982-5.021-20.006-10.002c-2.291-2.709-4.791-5.21-7.5-7.502
 c-0.178-0.656-0.881-0.786-1.002-1.5c-2.125-2.543-4.457-4.877-7-7.002c-7.23-7.581-6.807-23.209-8.002-38.508
 c-0.609-7.787,0.043-16.854-2.002-23.006c-2.199-6.624-12.922-11.019-15.502-18.004c-2.012-5.447-1.949-13.102-3.002-19.504
 c-1.125-6.854-1.74-14.938-3.5-20.506c-2.148-6.789-6.955-12.942-10.002-19.004C815.576,898.467,812.641,891.889,809.529,885.332z
"
        />
      </g>

      <g
        @click="changePage2"
        id="종로구"
        @mouseover="종로구 = true"
        @mouseleave="종로구 = false"
      >
        <title>종로구</title>
        <desc>
          <image xlink:href="/06.jpeg" alt=""></image>
        </desc>
        <path
          d="
      M720.008,682.285
 c-13.643,8.694-29.509,15.167-47.511,19.505c-6.417-5.753-13.255-11.084-19.004-17.504c-1.625-2.043-3.458-3.876-5.501-5.501
 c-4.496-4.668-9.113-12.79-9.002-20.004c0.059-3.846,2.49-9.455,4.001-14.504c3.006-10.049,6.144-18.898,9.002-28.506
 c1.488-5.001,3.81-10.584,4.001-15.003c0.284-6.57-2.044-13.576-3.501-19.504c-1.444-5.877-3.262-11.502-5.001-18.004
 c-5.435-2.734-11.846-4.491-16.504-8.002c0-0.667,0-1.333,0-2c1.153-1.348,0.177-4.823,0.5-7.001c0-3.667,0-7.335,0-11.002
 c0-3.334,0-6.668,0-10.002c1.152-1.348,0.177-4.824,0.5-7.001c0-3.668,0-7.335,0-11.003c0-3.334,0-6.668,0-10.002
 c1.152-1.348,0.177-4.824,0.5-7.002c0-3.667,0-7.335,0-11.002c0.908-12.657,0.718-22.671,4.501-31.007
 c3.217-7.087,11.845-11.738,16.504-18.504c3.345-4.858,4.499-9.644,8.002-14.503c12.175-1.161,22.316-4.356,34.508-5.501
 c4.252,4.75,9.984,8.02,15.503,11.502c6.941,16.762,8.516,34.323,13.504,52.012c5.047,17.906,16.736,33.542,17.004,55.512
 c-2.867,5.802-5.285,12.053-8.002,18.004c-5.268,1.902-10.518,3.819-15.504,6.001c-0.797,6.729-2.854,14.783-2,21.505
 c9.846,8.849,27.449,6.847,42.51,11.002c7.674,2.118,13.383,6.375,20.004,8.002c11.162,22.178,19.406,47.276,35.008,65.015
 c13.176,0.995,26.723,1.617,39.51,3c0,1.167,0,2.334,0,3.501c-1.16,2.341-0.172,6.829-0.5,10.002c0,4.334,0,8.668,0,13.003
 c-4.334,0-8.67,0-13.004,0c-1.848,0.319-4.982-0.648-6.002,0.5c-3.166,0-6.334,0-9.502,0c-1.848,0.319-4.98-0.647-6,0.5
 c-3.002,0-6.002,0-9.002,0c-2.014,0.321-5.318-0.65-6.502,0.5c-12.729,0.941-23.139,4.201-35.508,5.501c-8.336,0-16.672,0-25.006,0
 c-4.959-3.876-8.289-9.382-14.004-12.503C726.826,681.454,721.691,681.454,720.008,682.285z
"
        />
      </g>

      <g
        @click="changePage2"
        id="중구"
        @mouseover="중구 = true"
        @mouseleave="중구 = false"
      >
        <title>중구</title>
        <desc>
          <image xlink:href="/03.jpg" alt=""></image>
        </desc>
        <path
          d="
      M852.039,722.795
 c-3.846,7.49-7.141,15.533-13.504,20.504c-2.877,2.459-5.543,5.126-8.002,8.002c-0.404,0.096-0.498,0.502-1,0.5
 c-2.299,2.201-5.035,3.969-6.502,7.002c-4.045,11.457-9.639,21.369-14.502,32.008c-7.918-3.086-13.068-8.938-21.506-11.503
 c-1.02-1.147-4.152-0.181-6.002-0.501c-3,0-6,0-9.002,0c-1.02-1.146-4.152-0.18-6-0.5c-17.834,2.664-19.93-10.41-29.508-16.003
 c-2.342-1.159-6.83-0.173-10.002-0.501c-2.344,0.324-5.988-0.653-7.502,0.501c-3.334,0-6.668,0-10.002,0
 c-2.676,0.325-6.659-0.657-8.502,0.5c-13.527,1.144-27.306,2.034-40.51,3.501c-3.02-13.316-7.289-25.385-12.002-37.009
 c9.184-7.319,19.5-13.507,25.005-24.505c12.842-3.283,24.639-6.314,35.509-12.003c6.629-3.47,9.121-8.251,19.504-7.001
 c3.959,4.376,8.127,8.544,12.504,12.503c24.184,3.167,42.299-4.035,63.514-5.501c1.848-0.319,4.982,0.648,6.002-0.5c3,0,6,0,9.002,0
 c2.012-0.321,5.318,0.65,6.5-0.5c3.002,0,6.002,0,9.004,0c2.012-0.32,5.316,0.65,6.5-0.5c3.002,0,6.002,0,9.002,0
 c0.834,0,1.668,0,2.502,0c0,2.834,0,5.668,0,8.502c0,3.001,0,6.002,0,9.002c-1.148,1.02-0.182,4.154-0.5,6.002
 C852.039,717.46,852.039,720.127,852.039,722.795z
"
        />
      </g>

      <g
        @click="changePage2"
        id="중랑구"
        @mouseover="중랑구 = true"
        @mouseleave="중랑구 = false"
      >
        <title>중랑구</title>
        <desc>
          <image xlink:href="/04.jpg" alt=""></image>
        </desc>
        <path
          d="
      M1120.1,474.238
 c4.662,7.841,18.324,6.681,27.006,10.502c-2.287,12.067,11.305,15.833,13.004,24.506c1.773,9.058-4.662,14.91-5.502,24.005
 c-4.322,4.18-9.531,7.472-13.004,12.502c0,0.334,0,0.667,0,1c-0.832,3.84-0.832,11.164,0,15.003c0.725,3.943,3.436,5.9,4.502,9.502
 c0,3.334,0,6.668,0,10.002c-10.604,7.43-3.115,20.208-6.502,32.507c-1.73,6.284-15.746,14.712-19.004,20.505
 c-1.561,2.773-1.363,6.369-2.5,8.502c-3.455,6.476-15.533,10.445-16.504,17.504c-0.502,3.64,2.662,6.176,4,9.002
 c0,2.334,0,4.668,0,7.002c-0.727,0.273-2.584-0.585-2.5,0.5c-16.391-2.901-23.908,8.259-36.008,11.002
 c-11.813,2.678-22.666-0.268-36.51,2.5c-4.686-62.996-16.182-119.183-15.502-187.543c11.811-5.232,23.043-11.489,35.008-17.504
 c6.033-3.034,10.494-5.943,19.504-5.501c1.684-0.317,4.645,0.645,5.502-0.5c2.666,0,5.334,0,8.002,0
 c1.684-0.317,4.645,0.644,5.5-0.5c2.668,0,5.334,0,8.002,0c1.684-0.317,4.645,0.644,5.502-0.5
 C1110.217,479.025,1114.6,476.073,1120.1,474.238z
"
        />
      </g>

      <g
        @click="changePage2"
        id="마포구"
        @mouseover="마포구 = true"
        @mouseleave="마포구 = false"
      >
        <title>마포구</title>
        <desc>
          <image xlink:href="/07.jpg" alt=""></image>
        </desc>
        <path
          d="
      M402.936,583.763
 c6.628,6.041,6.576,18.764,20.004,18.004c5.968,13.406,17.593,19.237,29.007,28.007c7.357,5.653,15.368,10.769,22.005,16.504
 c12.672,10.951,22.254,25.911,33.508,36.008c5.59,5.017,12.528,8.948,18.004,14.503c2.292,2.709,4.792,5.21,7.502,7.501
 c0.501-0.001,0.595,0.405,1,0.501c2.458,2.875,5.126,5.543,8.002,8.001c2.292,2.71,4.792,5.21,7.501,7.502
 c0.501-0.001,0.595,0.405,1,0.5c2.292,2.71,4.792,5.21,7.501,7.502c2.202,2.3,3.968,5.034,7.001,6.501
 c13.151,1.679,33.148,3.431,48.011,5.002c5.674,0.6,11.949,2.383,16.003,1.5c6.439-1.402,9.308-9.631,16.004-10.502
 c1.58,5.924,4.993,11.412,7.001,17.504c1.616,4.899,5.107,15.426,5.001,20.004c-0.106,4.607-4.983,19.26-6.502,23.006
 c-5.032,12.414-13.34,21.697-21.005,31.007c-10.313,12.528-22.811,24.427-34.008,34.007c-2.909-2.459-5.033-5.625-8.001-8.001
 c-3.006-2.405-6-4.657-9.002-7.002c-5.841-4.562-11.654-9.769-18.004-13.503c-19.939-11.727-41.419-19.489-63.014-27.506
 c-10.111-3.754-20.545-9.33-31.007-14.504c-10.133-5.011-21.63-9.223-30.507-15.003c-6.704-4.366-13.309-11.702-20.004-17.505
 c-17.035-14.76-33.581-28.587-50.011-43.51c-3.288-2.985-7.931-6.23-10.002-9.001c-3.899-5.214-4.916-12.548-8.002-18.004
 c-2.809-4.965-7.841-10.148-12.002-15.003c-6.841-7.979-12.272-16.188-21.505-20.505c0-0.167,0-0.333,0-0.5
 c8.283-2.733,16.484-15.161,25.005-17.004c9.141-1.977,18.662,0.807,29.507-1c3.474-3.274,7.478-7.106,11.502-11.503
 c3.063-3.346,9.383-8.809,10.502-12.503c0.708-2.338-0.158-4.918,0.5-7.001C393.398,591.544,399.557,589.176,402.936,583.763z
"
        />
      </g>

      <g
        @click="changePage2"
        id="노원구"
        @mouseover="노원구 = true"
        @mouseleave="노원구 = false"
      >
        <title>노원구</title>
        <desc>
          <image xlink:href="/08.jpg" alt=""></image>
        </desc>
        <path
          d="
      M1083.592,305.699
 c-0.51,4.537-3.662,5.613-4.502,10.002c-0.775,4.05,0.262,18.509,1.5,23.005c0.885,3.208,6.793,14.643,9.002,16.004
 c5.967,3.672,16.053,1.403,23.506,3c8.109,1.738,14.93,5.567,22.006,7.501c2.74,11.227,0.236,20.766,3,30.507
 c2.139,7.545,9.795,12.583,7.002,24.006c-3.18,4.49-5.305,10.033-9.002,14.003c-4.596,1.663-8.748,0.512-12.504,2.501
 c-3.117,1.651-7.98,9.404-8.502,14.003c-0.748,6.625,2.275,12.594,6.002,16.504c-0.713,1.287-1.615,2.386-1.5,4.501
 c-5.883,1.452-10.193,4.478-18.504,3.501c-1.684,0.316-4.646-0.645-5.502,0.5c-2.668,0-5.334,0-8.002,0
 c-1.684,0.316-4.645-0.645-5.502,0.5c-2.666,0-5.334,0-8.002,0c-1.684,0.316-4.645-0.645-5.5,0.5
 c-12.211,0.197-21.813,7.38-31.008,12.003c-8.523,4.285-16.541,7.522-24.006,12.003c-11.572-2.931-23.703-5.303-35.008-8.502
 c-17.121-22.554-34.861-47.157-48.51-71.517c6.645-0.522,14.094-0.241,20.004-1.5c3.156-9.429,1.619-20.374,3.5-29.507
 c1.412-6.854,5.945-13.942,7.502-21.505c2.24-10.87,1.836-24.517,3.002-37.009c0.533-5.733,1.441-11.911,2-18.004
 c0.537-5.876,1.732-12.743,1-17.504c-1.043-6.773-5.283-14.015-8.002-21.005c-2.588-6.651-7.232-14.544-8.002-21.005
 c-0.441-3.712,0.98-8.423,1.5-13.003c0.482-4.25,0.182-9.028,1-13.003c2.141-10.392,9.006-21.348,11.504-33.008
 c2.17-10.125,0.41-21.711,3-30.507c5.758-9.167,15.742-8.554,26.506-14.503c3.541-1.957,8.979-6.144,12.004-9.002
 c3.121-2.951,5.645-8.404,8.502-9.502c3.232-1.244,10.299-1.729,14.002-1c3.074,0.605,6.523,4.829,10.002,7.502
 c7.916,6.081,13.107,9.773,20.506,15.503c3.42,2.65,6.877,6.662,10.002,8.002c8.432,3.616,15.584,1.682,25.506,5.501
 c4.303,15.436-2.008,19.555-8.002,28.506c-3.225,4.817-8.416,10.662-8.502,15.503c-0.078,4.409,5.43,13.495,7.502,16.504
 c3.346,4.858,12.357,11.303,14.004,17.004c2.277,7.894-0.465,15.084,1.5,26.006c-3.293,4.746-15.668,6.805-18.004,12.003
 c-1.809,4.022,0.287,9.412-0.5,16.003C1083.416,300.207,1082.436,304.021,1083.592,305.699z
"
        />
      </g>

      <g
        @click="changePage2"
        id="서초구"
        @mouseover="서초구 = true"
        @mouseleave="서초구 = false"
      >
        <title>서초구</title>
        <desc>
          <image xlink:href="/09.jpg" alt=""></image>
        </desc>
        <path
          d="
      M806.527,888.332
 c4.836,12.346,15.342,23.65,19.506,37.509c1.785,5.944,2.385,13.452,3.5,20.005c1.16,6.825,0.615,14.923,3,20.504
 c2.943,6.886,13.414,11.089,15.504,17.504c2.102,6.455,0.887,15.961,1.5,24.006c1.275,16.718,2.035,32.602,11.004,41.01
 c2.125,2.543,4.457,4.877,7,7.001c2.293,2.71,4.793,5.21,7.502,7.502c5.152,4.351,13.154,5.851,19.004,9.502
 c4.793,5.21,9.795,10.211,15.004,15.003c6.199,24.977,8.586,53.764,22.506,71.018c12.578-3.768,27.584-9.42,44.51-10.503
 c2.496-3.239,4.85-6.384,7.502-10.503c2.125-3.299,3.473-8.528,7.002-11.002c7.916-5.549,30.465-10.368,42.51-5.502
 c3.742,1.513,5.676,5.699,9.002,7.002c1.172,0.827,1.082,2.918,1,5.002c0.313,1.52-0.641,4.307,0.5,5c0,2.168,0,4.335,0,6.502
 c0.324,2.51-0.656,6.323,0.5,8.002c0,0.666,0,1.334,0,2c3.568,5.435,8.084,9.92,11.502,15.504
 c10.914,5.424,19.607,13.066,26.006,23.006c-5.477,3.372-17.676,2.81-21.004,8.001c-2.535,3.952,0.248,8.76-0.5,14.003
 c-0.789,5.527-5.758,10.554-5.502,15.504c-6.285,1.717-15.844,0.159-19.504,4.501c-2.889,8.221-3.168,16.153-10.502,20.005
 c-4.592,2.41-14.232,3.557-20.506,5.001c-5.934,1.366-17.129,2.228-20.004,5.501c-3.428,3.902-2.934,13.344-4,19.004
 c-1.336,7.069-2.83,12.834-4.502,18.505c-6.668,0-13.336,0-20.004,0c-8.256-0.581-14.83-2.841-23.006-3.501
 c-9.994-6.312-21.668-14.544-32.508-21.505c-3.898-2.504-12.398-4.849-11.002-10.503c0.832-1.848,0.832-7.153,0-9.002
 c-2.578-16.594-7.609-30.731-11.502-46.01c0-1.834,0-3.668,0-5.502c0-1.666,0-3.334,0-5c0-5.836,0-11.67,0-17.504
 c1.156-1.845,0.174-5.828,0.5-8.502c-0.33-3.672,0.66-8.664-0.5-11.504c0.693-8.93-8.209-7.638-15.004-9.002
 c-6.039-1.211-10.387-3.737-15.504-3c-4.658,0.671-11.443,6.838-16.504,10.002c-5.42,3.389-12.389,6.385-16.504,10.002
 c-7.127,6.268-11.402,16.109-17.004,20.506c-4.719,0.825-12.785,0.825-17.504,0c-5.65-5.113-1.145-14.549-2.5-22.006
 c-0.734-4.045-7.217-10.967-10.002-12.002c-2.207-0.821-8.766-1.677-13.004,0c-4.18,1.652-4.135,6.661-8.002,9.502
 c-12.281-15.393-19.408-35.938-29.006-54.013c-0.332-6.669,0.664-14.668-0.5-20.505c-4.701-15.217-4.1-29.432-1.5-47.511
 c1.387-9.655,2.531-19.489,4.5-27.006c1.068-4.075,4.164-8.104,4.002-12.003c-0.203-4.844-4.217-9.573-6.002-13.503
 c-2.219-4.882-3.709-9.038-6.002-13.503c-7.08-1.088-14.927-1.41-23.005-1.5c-1.562-5.441-2.924-11.08-4.001-17.004
 c19.89-0.508,35.938,1.268,50.012-4.502c6.559-2.688,13.355-10.818,19.004-16.004C772.443,924.47,790.729,906.379,806.527,888.332z
"
        />
      </g>

      <g
        @click="changePage2"
        id="서대문구"
        @mouseover="서대문구 = true"
        @mouseleave="서대문구 = false"
      >
        <title>서대문구</title>
        <desc>
          <image xlink:href="/09.jpg" alt=""></image>
        </desc>
        <path
          d="
      M651.993,687.787
 c5.392,5.944,12.344,10.328,17.504,16.503c-9.036,16.137-28.058,22.287-41.509,34.008c-13.573-1.495-30.166-3.397-45.511-5.001
 c-8.969-0.938-16.812-0.158-20.504-6.002c-2.458-2.875-5.125-5.543-8.002-8.001c-2.292-2.71-4.792-5.21-7.501-7.502
 c-0.405-0.095-0.499-0.501-1-0.5c-2.459-2.876-5.126-5.544-8.002-8.002c-2.292-2.709-4.792-5.21-7.502-7.502
 c-13.18-8.723-25.485-21.902-36.508-34.008c-4.069-4.468-14.517-11.841-15.503-17.003c-0.5-2.617,1.692-16.675,3-20.004
 c0.917-2.335,2.949-3.667,4.501-5.001c1.876-1.458,3.543-3.125,5.001-5.001c0-0.167,0-0.333,0-0.5
 c2.043-1.624,3.876-3.458,5.501-5.501c1.278-1.556,2.11-3.558,5.501-3.001c5.502,0,11.003,0,16.504,0
 c3.173-0.328,7.661,0.66,10.002-0.5c6.487,0.152,12.591-0.079,18.504-0.5c6.326-6.176,10.388-14.618,13.503-24.005
 c10.889-2.615,19.731-7.274,29.507-11.002c2.503-10.667,6.462-19.877,11.502-28.007c8.276-3.82,13.486-11.91,27.006-9.002
 c0,0.5,0,1,0,1.5c-1.161,2.673-0.171,7.497-0.5,11.002c0,3.834,0,7.669,0,11.503c4.386,4.449,11.701,5.969,17.504,9.002
 c2.945,11.225,5.782,22.557,8.002,34.508c-4.303,13.218-8.536,28.992-13.003,44.01c-1.528,5.135-4.425,10.297-4.501,14.504
 c-0.115,6.354,4.344,11.713,5.501,18.004c1.625,2.043,3.458,3.876,5.501,5.501C648.116,684.328,649.95,686.162,651.993,687.787z
"
        />
      </g>

      <g
        @click="changePage2"
        id="성북구"
        @mouseover="성북구 = true"
        @mouseleave="성북구 = false"
      >
        <title>성북구</title>
        <desc>
          <image xlink:href="/09.jpg" alt=""></image>
        </desc>
        <path
          d="
      M729.51,392.219
 c4.775,3.428,6.586,11.528,11.504,15.003c6.434,4.547,15.797,4.11,23.004,8.002c4.41,2.381,8.689,6.688,13.004,10.002
 c13.127,10.086,26.316,20.602,38.508,30.507c3.721,15.952,7.818,31.525,11.504,47.511c6.191,3.309,10.23,8.773,21.004,7.501
 c3.502,0,7.002,0,10.502,0c2.014-0.321,5.318,0.65,6.502-0.5c3.168,0,6.336,0,9.502,0c3.502,0,7.002,0,10.502,0
 c2.014-0.321,5.318,0.65,6.502-0.5c14.43,1.926,18.871-6.135,27.506-10.002c8.346-16.495,17.166-32.512,26.006-48.511
 c5.18,6.521,9.941,14.057,15.504,22.005c3.65,5.213,11.018,18.608,16.504,21.505c9.67,5.107,23.432,3.499,34.508,9.002
 c0,2.334,0,4.667,0,7.001c-1.166,7.836-0.168,17.837-0.5,26.506c-24.066,7.941-54.93,9.086-72.016,24.006
 c-3.877,3.459-7.545,7.126-11.004,11.002c-5.734,8.601-10.057,18.616-15.502,27.506c-14.291,4.829-22.807,10.759-33.508,19.004
 c-3.418,2.634-8.207,4.543-10.002,7.502c-3.072,5.061-2.602,13.886-5.502,20.005c-1.129,2.381-7.93,10.95-10.002,11.502
 c-5.072,1.351-12.443-1.066-18.504-1.5c-6.207-0.444-12.348-0.835-19.006-1c-15.918-17.589-23.059-43.956-35.508-65.015
 c-7.059-1.465-12.77-6.458-21.004-8.502c-14.41-3.577-30.959-1.897-40.01-9.502c0.285-6.216,1.23-11.773,2-17.504
 c5.316-1.52,10.008-3.664,15.004-5.501c1.957-7.628,7.678-12.839,8.502-20.505c1.564-14.538-5.063-26.023-9.002-36.508
 c-2.35-6.257-5.504-12.853-7.502-19.505c-5.582-18.59-7.576-37.961-14.002-53.512c-4.844-3.493-10.78-5.892-14.504-10.503
 c6.551-1.802,13.174,0.948,18.004-1C724.17,405.237,724.545,395.769,729.51,392.219z
"
        />
      </g>

      <g
        @click="changePage2"
        id="성동구"
        @mouseover="성동구 = true"
        @mouseleave="성동구 = false"
      >
        <title>성동구</title>
        <desc>
          <image xlink:href="/03.jpg" alt=""></image>
        </desc>
        <path
          d="
      M874.543,701.29c2.168,0,4.334,0,6.502,0
 c5.318-3.184,4.223-12.782,14.504-11.002c0.693,1.141,3.48,0.187,5,0.5c9.426-0.09,18.045,0.627,27.006,1
 c2.555,7.281,4.742,14.93,7.002,22.506c24.572,8.603,50.193,16.154,73.018,26.506c-4.559,27.309-8.412,49.525-20.506,68.516
 c-4.107,6.451-11.859,11.41-14.002,18.004c-1.691,5.203-0.707,11.029-1.5,16.004c-1.453,9.091-4.732,16.918-6.502,26.006
 c-21.135-10.752-42.318-26.766-69.516-33.008c-5.611-1.287-13.537-1.091-20.506-1.5c-20.389-1.197-34.918,0.928-52.512,5.001
 c-3.926-15.579-7.852-31.157-12.002-46.511c6.348-10.322,10.541-22.799,16.504-33.508c2.709-2.291,5.209-4.792,7.502-7.502
 c2.875-2.458,5.543-5.125,8-8.002c5.986-5.184,8.691-13.647,13.004-20.504c1.156-1.679,0.176-5.493,0.5-8.002
 c0-2.834,0-5.668,0-8.502c1.15-1.184,0.18-4.489,0.5-6.501c0-2.5,0-5.001,0-7.501c4.824,2.01,6.006,7.664,13.004,7.501
 C870.236,701.93,873.023,700.976,874.543,701.29z
"
        />
      </g>

      <g
        @click="changePage2"
        id="송파구"
        @mouseover="송파구 = true"
        @mouseleave="송파구 = false"
      >
        <title>송파구</title>
        <desc>
          <image xlink:href="/03.jpg" alt=""></image>
        </desc>
        <path
          d="
      M1142.104,808.314
 c3.291,2.545,5.451,6.219,8.002,9.502c3.914,0.421,8.018,0.652,12.504,0.5c6.393,10.426,0.719,26.423-3.502,37.508
 c-1.508,3.963-4.914,9.193-4.5,12.004c0.85,5.775,13.672,9.944,16.004,15.003c4.35,8.153,6.883,18.123,12.002,25.506
 c5.994,2.008,14.322,1.683,21.506,2.501c5.795,5.874,12.436,10.902,23.504,11.502c-2.807,6.306-6.541,11.023-10.502,17.504
 c-2.289,3.744-10.203,13.9-9.502,19.004c0.586,4.262,7.207,5.046,8.502,10.003c1.482,5.668-1.051,8.273,0,15.503
 c10.061,14.612,33.895,15.451,51.512,22.506c2.176,1.158,6.496,0.173,9.502,0.5c1.162,3.505,0.17,9.166,0.5,13.503
 c-11.891,3.552-17.787,8.655-21.004,20.505c-2.311,8.503-1.09,19.406-4.002,27.506c-2.273,6.328-7.365,9.609-10.002,14.504
 c-5.816,2.695-12.551,1.388-16.504,5.001c-2.094,1.915-5.465,12.249-7.002,17.504c-1.119,3.833,1.193,8.827,0.5,12.003
 c-0.814,3.739-5.057,5.746-7,8.002c-2.51,0.324-6.324-0.656-8.002,0.5c-7.412,0.801-13.502-1.392-18.004,1
 c-3.674,1.951-5.508,9.667-7.502,14.003c-2.639,5.731-4.676,10.651-7.002,14.503c-5.922-14.547-13.602-28.167-22.006-40.509
 c-2.869-4.215-7.066-8.269-8.502-12.503c-3.799-11.217-2.223-24.072-6.5-36.508c-9.463-7.208-20.561-12.782-30.008-20.005
 c-1.467-4.368-2.533-9.136-4-13.503c-2.793-3.209-5.793-6.21-9.002-9.002c-13.086-4.025-29.4-3.43-41.51-7.502
 c-4.102-1.379-8.607-4.791-13.004-7.002c-10.031-5.043-16.197-8.297-24.006-14.503c-3.416-2.716-8.016-5.854-10.002-8.502
 c-4.135-5.515-5.576-12.743-9.502-19.505c-0.322-2.178,0.652-5.652-0.5-7.001c0-2.834,0-5.668,0-8.502c0-3.335,0-6.669,0-10.003
 c-0.318-1.848,0.648-4.981-0.5-6.001c0-3.001,0-6.001,0-9.002c0-3.334,0-6.668,0-10.003c-0.318-1.848,0.648-4.981-0.5-6
 c0-0.834,0-1.668,0-2.502c3.814,0.688,7.262,1.74,12.002,1.501c2.334,0,4.668,0,7.002,0c3.334,0,6.668,0,10.002,0
 c1.521-0.313,4.309,0.64,5.002-0.5c4.5,0,9.002,0,13.504,0c1.684-0.317,4.645,0.645,5.5-0.5c8.596-2.126,18.393-2.595,27.006-6.001
 c7.645-3.023,11.229-8.839,16.004-15.004c8.344-10.771,16.424-21.131,24.506-31.508c5.502-7.063,12.068-13.736,16.004-21.004
 C1133.998,825.777,1137.637,816.13,1142.104,808.314z
"
        />
      </g>

      <g
        @click="changePage2"
        id="양천구"
        @mouseover="양천구 = true"
        @mouseleave="양천구 = false"
      >
        <title>양천구</title>
        <desc>
          <image xlink:href="/03.jpg" alt=""></image>
        </desc>
        <path
          d="
      M199.39,804.313
 c2.805-5.029,4.873-10.797,8.502-15.003c6.626,0.688,11.923-2.626,17.004-1.501c2.33,0.518,7.231,5.06,8.502,7.002
 c1.986,3.038,3.1,8.013,5.001,12.504c4.896,11.561,11.807,26.589,15.504,37.008c6.607,6.648,15.021,9.528,27.006,12.002
 c5.238,1.082,10.646,2.888,15.003,2.502c10.121-0.897,18.733-8.26,27.006-10.503c2.177-9.443,12.685-18.485,15.003-27.007
 c2.679-9.844-0.558-21.725,2.001-30.506c1.62-5.564,5.628-8.434,8.502-13.004c6.39,0.445,10.828,2.842,16.003,4.502
 c5.52,1.48,14.479-0.477,20.004,1c6.588,12.133,10.032,26.038,16.504,38.008c1.717,3.177,5.399,5.818,6.501,9.503
 c1.723,5.761-0.143,11.556,1.5,17.504c-8.795,8.376-18.912,15.43-27.507,24.005c0,5.002,0,10.003,0,15.004
 c-1.163,4.171-0.169,10.5-0.5,15.504c0,8.335,0,16.67,0,25.006c-2.254,12.416-8.858,20.48-13.003,31.006
 c-0.757,1.244-4.308-0.307-5.001,1.001c-14.251,0.537-29.897,2.867-38.009-4.501c-2.647-7.188-4.854-14.817-7.501-22.006
 c-4.339-0.828-9.2-1.135-14.503-1c-0.856-1.145-3.817-0.184-5.501-0.5c-2.501,0-5.001,0-7.502,0
 c-10.922,8.749-19.826,19.518-32.007,27.006c-4.167,0-8.335,0-12.502,0c-2.344,0.324-5.989-0.653-7.502,0.5c-2,0-4.001,0-6.001,0
 c-1.747-5.422-3.626-10.71-6.001-15.503c-9.487-1.849-19.228-3.443-29.007-5.001c1.961-7.553,11.313-18.918,12.503-27.006
 c1.75-11.883,0-27.833,0-43.01c0-15.213,2.144-31.803,0-43.51C207.808,816.662,200.691,810.254,199.39,804.313z
"
        />
      </g>

      <g
        @click="changePage2"
        id="영등포구"
        @mouseover="영등포구 = true"
        @mouseleave="영등포구 = false"
      >
        <title>영등포구</title>
        <desc>
          <image xlink:href="/03.jpg" alt=""></image>
        </desc>
        <path
          d="
      M385.432,872.828
 c3.914-3.196,8.258-7.184,13.503-11.502c3.549-2.922,11.847-7.633,13.003-12.003c1.547-5.849-1.958-11.689-1-19.505
 c-7.127-8.824-10.49-18.873-15.503-30.506c-4.992-11.584-10.961-20.336-10.503-36.009c12.586,8.73,21.889,21.758,35.008,30.507
 c6.313,4.211,14.327,6.894,21.505,10.502c21.057,10.588,42.679,22.491,66.516,29.508c4.151,20.021,4.892,40.504,12.503,56.012
 c5.411,11.027,16.118,15.754,25.506,22.506c0,0.166,0,0.333,0,0.5c-9.933,15.573-19.521,31.49-27.006,49.512
 c0.1,21.104-4.123,37.887-11.002,52.012c-9.291,2.553-22.559,2.559-30.507,6.501c-2.952,1.464-13.389,10.814-14.503,13.503
 c-3.051,7.357-0.555,17.23-4.001,26.006c-2.515,0.152-3.951,1.384-6.001,2.001c-6.938-4.23-13.496-8.843-20.004-13.503
 c0-1.168,0-2.334,0-3.501c-0.317-1.685,0.644-4.646-0.5-5.501c0-2.668,0-5.335,0-8.002c-0.316-1.684,0.645-4.646-0.5-5.502
 c0-2.834,0-5.668,0-8.502c-0.316-1.684,0.645-4.645-0.5-5.501c2.547-10.949-5.78-12.446-8.002-19.005
 c-2.365-6.984-2.019-15.568-4.001-23.505c-1.954-7.823-3.791-15.308-5.501-22.505c-9.452-5.885-19.485-11.189-29.007-17.004
 c0-8.502,0-17.004,0-25.506c0-7.335,0-14.67,0-22.005C386.091,880.49,385.104,876.002,385.432,872.828z M597.48,900.335
 c-20.856-23.653-42.328-46.692-74.017-59.514c2.068,15.437,4.544,30.464,9.502,43.01c5.697,5.112,13,14.698,21.004,17.004
 c10.17,2.929,21.25,0.715,34.008,1.001C589.714,900.138,598.159,902.816,597.48,900.335z
"
        />
      </g>

      <g
        @click="changePage2"
        id="용산구"
        @mouseover="용산구 = true"
        @mouseleave="용산구 = false"
      >
        <desc>
          <title>용산구</title>
          <image
            xlink:href="https://images.unsplash.com/photo-1636911963109-c94c745fb272?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
            alt=""
          ></image>
        </desc>
        <path
          d="
      M737.012,767.305
 c8.662,5.808,11.73,17.15,28.506,14.504c1.02,1.146,4.154,0.18,6.002,0.5c3.002,0,6.002,0,9.002,0c1.02,1.146,4.154,0.181,6.002,0.5
 c8.139,3.197,14.717,7.955,21.504,12.502c2.967,15.711,8.664,31.341,11.004,46.011c-17.625,10.849-33.219,28.17-48.512,45.011
 c-11.588,12.76-23.234,22.858-35.508,34.508c-7.422,7.045-10.861,11.924-22.006,13.003c-12.885,1.247-36.42,1.669-46.01-2.001
 c-5.798-2.218-10.817-9.58-15.003-14.503c-4.786-5.628-9.421-10.618-13.503-16.004c-2.026-3.475-5.16-5.843-8.001-8.502
 c-2.187-0.646-3.144-2.523-4.501-4.001c-1.958-2.376-4.125-4.543-6.501-6.501c-1.792-2.21-3.792-4.21-6.001-6.001
 c-5.487-5.35-10.367-11.305-15.503-17.004c25.86-24.984,53.596-48.095,62.514-90.021c13.819-0.684,26.499-2.507,40.509-3
 c2.834,0,5.668,0,8.502,0c2.344-0.324,5.988,0.654,7.502-0.5c3.334,0,6.668,0,10.002,0
 C730.596,766.053,735.563,764.919,737.012,767.305z
"
        />
      </g>
    </svg>
    <div id="all">
      <div id="provinceInfo">
        <div v-if="강남구">
          <img
            src="https://images.unsplash.com/photo-1517154421773-0529f29ea451?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>강남구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="강동구">
          <img
            src="https://images.unsplash.com/photo-1617541086271-4d43983704bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1769&q=80"
          />
          <h1>강동구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="강북구">
          <img
            src="https://images.unsplash.com/photo-1472387040940-3ae0cdbf127d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2818&q=80"
          />
          <h1>강북구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="강서구">
          <img
            src="https://images.unsplash.com/photo-1570559396209-4dde7519837f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>강서구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="관악구">
          <img
            src="https://images.unsplash.com/photo-1601747297625-cf77828558db?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1856&q=80"
          />
          <h1>관악구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="광진구">
          <img
            src="https://images.unsplash.com/photo-1549221428-495f00892696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2174&q=80"
          />
          <h1>광진구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="구로구">
          <img
            src="https://images.unsplash.com/photo-1617108309814-3326655a165a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>구로구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="금천구">
          <img
            src="https://images.unsplash.com/photo-1574251672167-9f4da00dc5c1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>금천구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="노원구">
          <img
            src="https://images.unsplash.com/photo-1544094552-172c2153499e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>노원구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="도봉구">
          <img
            src="https://images.unsplash.com/photo-1592660453134-1bcec4280e4a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>도봉구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="동대문구">
          <img
            src="https://images.unsplash.com/photo-1581929986999-cd05dc8125b8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>동대문구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="동작구">
          <img
            src="https://images.unsplash.com/photo-1566800890932-e89159daf3dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>동작구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="마포구">
          <img
            src="https://images.unsplash.com/photo-1608731789519-d766f7907272?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1674&q=80"
          />
          <h1>마포구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="서대문구">
          <img
            src="https://images.unsplash.com/photo-1617108309814-3326655a165a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>서대문구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="서초구">
          <img
            src="https://images.unsplash.com/photo-1617541101297-1391249475e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1769&q=80"
          />
          <h1>서초구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="성동구">
          <img
            src="https://images.unsplash.com/photo-1608977522061-2bfeb782b728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>성동구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="성북구">
          <img
            src="https://images.unsplash.com/photo-1595037676638-3e1dc5626691?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>성북구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="송파구">
          <img
            src="https://images.unsplash.com/photo-1614346950571-ddda7fc206af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>송파구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="양천구">
          <img
            src="https://images.unsplash.com/photo-1555425293-16e3d1e49b85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80"
          />
          <h1>양천구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="영등포구">
          <img
            src="https://images.unsplash.com/photo-1591600483482-9ce703c60917?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>영등포구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="용산구">
          <img
            src="https://images.unsplash.com/photo-1568743295327-cfc48ccc456d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>용산구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="은평구">
          <img
            src="https://images.unsplash.com/photo-1593726222205-21404ff4e5fd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1673&q=80"
          />
          <h1>은평구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="종로구">
          <img
            src="https://images.unsplash.com/photo-1601621915196-2621bfb0cd6e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1772&q=80"
          />
          <h1>종로구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="중구">
          <img
            src="https://images.unsplash.com/photo-1616156568139-78aeb88d76f5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>중구</h1>
        </div>
      </div>

      <div id="provinceInfo">
        <div v-if="중랑구">
          <img
            src="https://images.unsplash.com/photo-1581958414928-f410016e5988?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <h1>중랑구</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { selectHashName } from "../service";
export default {
  data() {
    return {
      강남구: false,
      강동구: false,
      강북구: false,
      강서구: false,
      관악구: false,
      광진구: false,
      구로구: false,
      금천구: false,
      노원구: false,
      도봉구: false,
      동대문구: false,
      동작구: false,
      마포구: false,
      서대문구: false,
      서초구: false,
      성동구: false,
      성북구: false,
      송파구: false,
      양천구: false,
      영등포구: false,
      용산구: false,
      은평구: false,
      종로구: false,
      중구: false,
      중랑구: false
    };
  },
  methods: {
    async changePage2(event) {
      const hash_name = event.currentTarget.id;
      const locationhash = event.currentTarget.id;
      const ret3 = await selectHashName({ hash_name });
      this.$router.push({
        path: "/detail3",
        name: "Detail3",
        query: {
          hash_name: ret3.data,
          locationhash: locationhash
        }
      });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.all-svg {
  background-color: #ffffff;
}
#Korea-svg {
  display: flex;
  width: 40%;
  stroke: #666;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
}
#Korea-svg g {
  transition: 0.3s;
  fill: #71b66a;
  cursor: pointer;
}
#Korea-svg g:hover {
  fill: #b8e2b3;
  cursor: pointer;
  outline: 0;
}
/* .active, .active:hover {
  fill: #248b81 !important;
} */
#provinceInfo {
  position: absolute;
  top: -50%;
  right: 0;
  width: 40%;

  margin-top: 1600px;
  margin-right: 150px;

  /* background: rgba(0, 0, 0, 0.2); */

  pointer-events: none;
  /* opacity: 0; */
  transition: 1s;
}
#provinceInfo div img {
  width: 550px;
  height: 400px;
}
/* @media all and (max-width: 800px) {
  #provinceInfo {
    width: 40%;
  }
}
@media all and (max-width: 750px) {
  #provinceInfo {
    width: 100%;
    position: static;
    background: none;
  }
  #provinceInfo.show p {
    font-family: 'Nanum Gothic', sans-serif;
    color: #7bc4c4 !important;
    margin-bottom: 2rem;
  }
} */
#provinceInfo.show {
  opacity: 1;
}
#provinceInfo h1 {
  font-family: "Nanum Gothic", sans-serif;
  background: #7bc4c4;
  color: #f4f4f4;
  padding: 0.3rem;
  padding-left: 1rem;
  text-align: center;
  font-weight: 400;
  font-size: 25px;
}
#provinceInfo h3 {
  font-family: "Nanum Gothic", sans-serif;
  background: #ffffff;
  color: #6e6e6e;
  margin-top: 4px;
  padding: 0.3rem;
  padding-left: 1rem;
  font-size: 1.4em;
  text-align: center;
}
#provinceInfo img {
  width: 100%;
}
@media (max-width: 1800px) {
  #provinceInfo {
    margin-top: 1800px;
    margin-right: 150px;
  }
  #provinceInfo div img {
    width: 100%;
    height: 450px;
  }
}
@media (min-width: 1801px) {
  #provinceInfo {
    margin-top: 2200px;
    margin-right: 150px;
  }
  #provinceInfo div img {
    width: 100%;
    height: 450px;
  }
}
</style>

```
### account.js
- user데이터와 token정보를 담아두는 vuex파일
```
import accountApi from "@/api/account";

export default {
  state: {
    user: null,
    token: null
  },
  getters: {
    user: state => state.user,
    token: state => state.token
  },
  actions: {
    fetchUser({ state, commit }, callback) {
      state.user
        ? callback && callback()
        : accountApi.getUser(res => {
            commit("setUser", res.user);
            callback && callback();
          });
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  }
};
```


--------------------------------------------------------------------------------------------------------------

## src/components 디렉터리

### Board.vue
- 고객센터 리스트

```
<template>
  <div>
    <b-container>
      <!-- fields 속성을 사용해서 보여주고 싶은 컬럼만 사용 가능! -->
      <div class="boardName">고객센터</div>
      <b-table
        class="board"
        hover
        :per-page="perPage"
        :current-page="currentPage"
        :items="items"
        :fields="fields"
        @row-clicked="rowClick"
      >
      </b-table>
    </b-container>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="center"
    ></b-pagination>

    <b-button variant="outline-primary" @click="writeContent">글쓰기</b-button>
  </div>
</template>

<script>
import { findContentList } from "../service";

export default {
  name: "Board",
  async created() {
    const ret = await findContentList();
    this.items = ret.data;
  },
  data() {
    return {
      currentPage: 1,
      perPage: 20,
      fields: [
        {
          key: "content_no",
          label: "글번호"
        },
        {
          key: "title",
          label: "제목"
        },
        {
          key: "regdate",
          label: "등록일"
        },
        {
          key: "username",
          label: "작성자"
        }
      ],
      items: []
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    rowClick(item, index, e) {
      this.$router.push({
        path: `/board/free/detail/${item.content_no}`
      });
    },
    writeContent() {
      this.$router.push({
        path: "/board/free/create"
      });
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.board {
  margin-top: 20px;
}
.boardName {
  text-align: left;
  font-weight: bold;
  font-size: 35px;
  margin-bottom: 40px;
  padding-top: 100px;
  text-align: center;
  color: rgb(124, 124, 124);
}
</style>
```

## CommentCreate.vue
- 댓글 추가

```
<template>
  <div class="comment-create">
    <b-input-group :prepend="name" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="context"
        :placeholder="
          isSubComment ? '댓글에 댓글을 달아주세요' : '댓글을 달아주세요'
        "
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button
          class="writeBtn"
          variant="outline-primary"
          @click="isSubComment ? createSubComment() : createComment()"
          >작성하기</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { addComment, addSubComment } from "../service";
export default {
  name: "CommentCreate",
  props: {
    contentNo: Number,
    reloadComments: Function,
    reloadSubComments: Function,
    subCommentToggle: Function,
    isSubComment: Boolean,
    commentNo: Number
  },
  data() {
    return {
      name: this.$store.state.account.user.username,
      context: ""
    };
  },
  methods: {
    async createComment() {
      await addComment({
        user_no: this.$store.state.account.user.userId,
        content_no: this.contentNo,
        context: this.context
      });
      this.$router.go(this.$router.currentRoute);
      this.reloadComments();
      this.subCommentToggle();
      this.context = "";
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.comment-create {
  display: flex;
  margin-bottom: 1em;
}
.writeBtn {
  margin-left: 20px;
  margin-top: 20px;
}
</style>
```

### CommentList.vue
- 댓글리스트

```
<template>
  <div>
    <div :key="item.comment_no" v-for="item in comments">
      <CommentListItem :commentObj="item" />
    </div>
    <CommentCreate :contentNo="contentNo" :reloadComments="reloadComments" />
  </div>
</template>

<script>
import CommentListItem from "./CommentListItem";
import CommentCreate from "./CommentCreate";
import { findComment } from "../service";

export default {
  name: "CommentList",
  props: {
    contentNo: Number
  },
  components: {
    CommentListItem,
    CommentCreate
  },
  async created() {
    const ret = await findComment({ content_no: this.contentNo });
    this.comments = ret.data;
  },
  data() {
    return {
      comments: []
    };
  },
  methods: {
    async reloadComments() {
      const ret = await findComment({ content_no: this.contentNo });
      this.comments = ret.data;
    }
  }
};
</script>

```

### CommentListItem.vue
- 댓글 작성 후 보이는 폼과 댓글 수정/삭제 기능
```
<template>
  <div>
    <!-- 수정누르면 템플릿 보였다 안보였다하게 -->
    <template v-if="disappear">
      <div class="comment-list-item">
        <div class="img"></div>

        <div class="comment-list-item-name">
          <div class="name-name">{{ commentObj.username }}</div>
          <div class="comment-list-item-time">{{ commentObj.regdate }}</div>
          <div class="comment-list-item-context">{{ commentObj.context }}</div>
        </div>

        <div class="comment-list-item-button">
          <b-button
            size="sm"
            class="btn1"
            variant="outline-success"
            @click="dbId == storeId ? modifyCoData() : notCorrectMsg()"
            >수정</b-button
          >
          <b-button
            size="sm"
            class="btn2"
            variant="outline-danger"
            @click="dbId == storeId ? deleteCoData() : notCorrectMsg()"
            >삭제</b-button
          >
          <!-- <b-button variant="info" @click="subCommentToggle">대댓글 달기</b-button> -->
        </div>
      </div>

      <!-- 대댓글 기능 안넣을거 같아서 주석처리 -->
      <!-- <template v-if="subCommentCreateToggle">
      <CommentCreate
        :isSubComment="true"
        :commentNo="commentObj.comment_no"
        :reloadSubComments="reloadSubComments"
        :subCommentToggle="subCommentToggle"
      />
    </template> -->

      <!-- <template v-if="subCommentList.length > 0">
      <div
        class="comment-list-item-subcomment-list"
        :key="item.subcomment_no"
        v-for="item in subCommentList"
      >
        <div class="comment-list-item-name">
          <div>{{item.user_name}}</div>
          <div>{{item.regdate}}</div>
        </div>
        <div class="comment-list-item-context">{{item.context}}</div>
        <div class="comment-list-item-button">
          <b-button variant="info">수정</b-button>
          <b-button variant="info"  @click="deleteScData">삭제</b-button>
        </div>
      </div>
    </template> -->
    </template>

    <template v-if="!disappear">
      <div class="comment-create">
        <b-input-group :prepend="name" class="mt-3">
          <b-form-textarea
            id="textarea"
            v-model="context"
            rows="3"
            max-rows="6"
            >{{ context }}</b-form-textarea
          >
          <b-input-group-append>
            <b-button
              class="writeBtn"
              variant="outline-primary"
              @click="[modifyCoData(), modifyCoData2()]"
              >수정하기</b-button
            >
            <b-button
              class="writeBtn"
              variant="outline-danger"
              @click="cancleModify"
              >취소</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
    </template>
  </div>
</template>

<script>
import CommentCreate from "./CommentCreate";
import {
  findSubComment,
  deleteComment,
  deleteSubComment,
  modifyComment,
  addComment
} from "../service";

export default {
  name: "CommentListItem",
  props: {
    commentObj: Object
  },
  components: {
    CommentCreate
  },

  // async created(){
  //   const ret = await findSubComment({comment_no});
  //   this.subCommentList = ret.data;
  // },
  data() {
    // name: data.User.filter(
    //   item => item.user_no === this.commentObj.user_no
    // )[0].name,
    return {
      name: this.$store.state.account.user.username,
      subCommentList: [],
      subCommentCreateToggle: false,
      modifyCreateToggle: false,
      disappear: true,
      context: `${this.commentObj.context}`,
      dbId: `${this.commentObj.user_id}`,
      storeId: `${this.$store.state.account.user.userId}`
    };
  },
  methods: {
    notCorrectMsg() {
      alert("권한이 존재하지 않습니다.");
    },
    // subCommentToggle() {
    //   this.subCommentCreateToggle = !this.subCommentCreateToggle;
    // },
    // async reloadSubComments() {
    //   const ret = await findSubComment({comment_no: this.commentObj.comment_no});
    //   this.subCommentList = ret.data;
    // },
    async deleteCoData() {
      alert("댓글을 삭제합니다");
      await deleteComment({ comment_no: this.commentObj.comment_no });
      this.$router.go(this.$router.currentRoute);
    },

    modifyCoData() {
      this.disappear = !this.disappear;
    },

    async modifyCoData2() {
      await modifyComment({
        context: this.context,
        comment_no: Number(this.commentObj.comment_no)
      });
      this.$router.go(this.$router.currentRoute);
    },
    cancleModify() {
      this.$router.go(this.$router.currentRoute);
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.comment-list-item {
  display: grid;
  padding-bottom: 20px;
}
.comment-list-item-name {
  /* justify-content: center; */
  /* border: 0.5px solid rgb(139, 139, 139); */
  height: 60px;
  text-align: center;
  width: 700px;
}
.name-name {
  grid-row: 1;
  font-weight: bold;
  text-align: left;
}
.comment-list-item-time {
  font-size: 6px;
  position: relative;
  bottom: 20px;
  right: 245px;
}
.comment-list-item-context {
  text-align: left;
  width: 44em;
  position: relative;
  /* border: 0.5px solid rgb(139, 139, 139); */
  bottom: 12px;
  left: 15px;
}
.comment-list-item-button {
  grid-column: 4;
  grid-row: 1;
  justify-content: center;
  align-items: center;
  /* border: 0.5px solid rgb(139, 139, 139); */
  border-left: none;
  height: 60px;
  padding-bottom: 1px;
  writing-mode: horizontal-tb;
  width: 120px;
}
.btn {
  margin-right: 1em;
}
.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
.btn1,
.btn2 {
  height: 40px;
  font-size: 10px;
  writing-mode: horizontal-tb;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url("https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg")
    no-repeat center;
  background-size: cover;
  position: relative;
  bottom: 3px;
}
</style>

```

### ContentDetail.vue
- 고객센터 게시판 목록 클릭시 세부정보를 볼 수 있는 컴포넌트

```
<template>
  <div class="all-all">
    <br />
    <a class="btn btn-primary" href="/board/free">목록으로</a>
    <b-container>
      <br />
      <b-card class="card-all">
        <div class="content-detail-content-info-header">
          세부내용 보기
        </div>

        <div class="content-detail-content-info">
          <div class="content-detail-content-info-left">
            <div class="content-detail-content-info-left-number">
              {{ contentNo }}
            </div>
          </div>

          <div class="content-detail-content-info-center">
            <div class="content-detail-content-info-center-subject">
              {{ title }}
            </div>
          </div>

          <div class="content-detail-content-info-right">
            <div class="content-detail-content-info-right-user">
              작성자: {{ user }}
            </div>
            <div class="content-detail-content-info-right-regdate">
              등록일: {{ regdate }}
            </div>
          </div>
        </div>

        <div class="content-detail-content">
          {{ context }}
        </div>

        <div class="content-detail-button">
          <b-button
            variant="outline-success"
            @click="dbId == storeId ? updateData() : notCorrectMsg()"
            >수정</b-button
          >
          <b-button
            variant="outline-danger"
            @click="dbId == storeId ? deleteData() : notCorrectMsg()"
            >삭제</b-button
          >
        </div>
        <div class="content-detail-comment">
          <CommentList :contentNo="contentNo" />
        </div>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import CommentList from "./CommentList";
import { findContent, deleteContent } from "../service";
export default {
  name: "ContentDetail",
  components: {
    CommentList
  },
  async created() {
    const ret = await findContent({
      content_no: Number(this.$route.params.contentNo)
    });
    const { data } = ret;
    this.title = data.title;
    this.context = data.context;
    this.user = data.username;
    this.regdate = data.regdate;
    this.dbId = data.user_id;
    this.storeId = this.$store.state.account.user.userId;
    // this.comment_no = data.comment_no;
  },
  data() {
    const contentNo = Number(this.$route.params.contentNo);
    return {
      contentNo: contentNo,
      title: "",
      context: "",
      user: "",
      regdate: "",
      dbId: "",
      storeId: ""
      // comment_no : ''
    };
  },
  methods: {
    notCorrectMsg() {
      alert("권한이 존재하지 않습니다.");
    },
    async deleteData() {
      alert("글을 삭제합니다");
      await deleteContent({ content_no: this.contentNo }),
        this.$router.push({
          path: "/board/free"
        });
    },
    async updateData() {
      this.$router.push({
        path: `/board/free/create/${this.contentNo}`
      });
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.all-all {
  padding-top: 100px;
  padding-bottom: 50px;
}
.card-all {
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  width: 1000px;
  margin: 0px auto;
}
.content-detail-content-info-header {
  border: 1px solid rgb(236, 236, 236);
  background-color: #7bc4c4;
  font-weight: 600;
  padding: 0.4rem;
  margin-bottom: 2px;
}
.content-detail-content-info {
  border: 1px solid rgb(236, 236, 236);
  display: flex;
  justify-content: space-between;
  height: 45px;
  margin-bottom: 2px;
}
.content-detail-content-info-left {
  width: 300px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 12px;
}
.content-detail-content-info-center {
  width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 18px;
  font-weight: 600;
}
.content-detail-content-info-right {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 11px;
}
.content-detail-content {
  border: 1px solid rgb(236, 236, 236);
  padding-top: 1rem;
  min-height: 300px;
}
.content-detail-button {
  height: 50px;
  padding: 0.3rem;
}
.content-detail-comment {
  margin-top: 1rem;
  padding: 2rem;
}
</style>

```

### Create.vue
- 고객센터 글 작성
```
<template>
  <div class="create-all">
    <div class="content-detail-create-header">
      글 작성하기
    </div>
    <b-container class="content-detail-create-info">
      <b-input v-model="subject" placeholder="제목을 입력해 주세요"></b-input>
    </b-container>

    <b-container class="content-detail-create-content">
      <b-form-textarea
        size="lg"
        v-model="context"
        placeholder="내용을 입력해 주세요"
        rows="3"
        max-rows="6"
      ></b-form-textarea>
    </b-container>
    <!-- 업데이트모드가 true면 content update 하고 false면 그냥 새걸로 upload -->
    <br />
    <br />
    <b-button
      class="btn-c"
      variant="primary"
      @click="updateMode ? updateContent() : uploadContent()"
      >저장</b-button
    >
    <b-button class="btn-c" @click="updateMode ? cancle2() : cancle()"
      >취소</b-button
    >
  </div>
</template>

<script>
import data from "@/data";
import { addContent, modifyContent, findContent } from "../service";
export default {
  name: "Create",
  data() {
    return {
      subject: "",
      context: "",
      userNo: this.$store.state.account.user.userId,
      regdate: "",
      content_no: Number(this.$route.params.contentNo),
      updateMode: this.$route.params.contentNo > 0 ? true : false
    };
  },
  async created() {
    if (this.$route.params.contentNo > 0) {
      // contentno가 존재하면 전에 있던것들을 불러오기
      const ret = await findContent({
        content_no: Number(this.$route.params.contentNo)
      });
      const { data } = ret;
      this.subject = data.title;
      this.context = data.context;
      this.regdate = data.regdate;
    }
  },
  methods: {
    async uploadContent() {
      // 역순으로 하게 만드는게 items
      let items = data.Content.sort((a, b) => {
        return b.content_no - a.content_no;
      });
      // 제일 최신것이 items 배열 첫번째보다 1씩 오른것 -> 글번호 자동으로 1씩 증가
      const content_no = items[0].content_no + 1;
      await addContent({
        user_no: this.userNo,
        title: this.subject,
        context: this.context,
        regdate: this.regdate
      });
      this.$router.push({
        path: "/board/free/"
      });
    },
    async updateContent() {
      await modifyContent({
        title: this.subject,
        context: this.context,
        content_no: Number(this.$route.params.contentNo)
      });
      this.$router.push({
        path: "/board/free/"
      });
    },
    cancle() {
      this.$router.push({
        path: "/board/free/"
      });
    },
    cancle2() {
      this.$router.push({
        path: `/board/free/detail/${this.content_no}`
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.create-all {
  width: 1000px;
  margin: 0px auto;
  margin-bottom: 30px;
}
.content-detail-create-header {
  border: 1px solid rgb(236, 236, 236);
  background-color: #7bc4c4;
  font-weight: 600;
  padding: 0.4rem;
  width: 975px;
  display: inline-block;
  text-align: center;
  margin-top: 180px;
}
.content-detail-create-info {
  margin-top: 10px;
  margin-bottom: 10px;
  height: 45px;
}
.content-detail-create-content {
  min-height: 10px;
}
.btn-c {
  margin-bottom: 15px;
}
</style>

```

### Detail1.vue
- 상세검색 페이지
- 장소에 대한 정보와 좋아요 기능, 인피니트 핸들러
```
<template>
  <div class="gallery" style="width: 25rem">
    <div
      class="gallery-panel"
      v-for="location in locations"
      :key="location.loca_no"
    >
      <div class="contents">
        <!--  v-if="location.loca_no != ''" -->
        <img
          class="test"
          :src="location.picture1"
          height="320"
          width="350"
          @click="goDetail(location.loca_no, location.title)"
        />

        <!-- 좋아요 버튼 -->
        <button class="like" v-on:click="like(location)">
          <svg
            class="heart"
            id="heart"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            viewBox="0 0 32 31"
          >
            <title>heart</title>
            <g stroke-width="2">
              <path
                id="heart"
                d="M10.55 2.31a8.07 8.07 0 0 0-8.07 8.08c0 3.15 2.16 5.66 4.28 7.61 3.35 3.44 6.46 7.37 9.59 11.08 
            2.92-3.86 5.48-7.41 8.91-11.36 1.72-2.24 4.71-4.18 4.7-7.33a8.07 8.07 0 0 0-0.79-3.49l0.02-0.06-0.05-0.01a8.07 8.07 0 0 0-12.85-2.26l-0.12 0.02a8.07 8.07 0 0 0-5.62-2.28z"
                stroke-linecap="round"
                stroke-linejoin="round"
                :style="location.liked === true ? { fill: 'red' } : null"
              ></path>
            </g>
          </svg>
          <span></span>
        </button>

        <h3
          class="test-loc-title"
          @click="goDetail(location.loca_no, location.title)"
        >
          {{ location.title }}
        </h3>
        <p
          class="test-test"
          @click="goDetail(location.loca_no, location.title)"
        >
          {{ location.hash_name }}
        </p>
      </div>
    </div>
    <infinite-loading @infinite="infiniteHandler" spinner="bubbles">
      <h1
        slot="no-more"
        style="color:rgb(102,102,102); font-size: 20px; margin: 150px; padding: 25px 0px;"
      >
        No More Data :)
      </h1>
      <h1
        slot="no-results"
        style="color:rgb(102,102,102); font-size: 14px; padding: 10px 0px;"
      >
        결과가 없어용 ㅠㅠ
      </h1>
    </infinite-loading>
  </div>
</template>

<script>
import { updateheart, deleteheart, selectheart } from "../service";
import EventBus from "./EventBus";
import InfiniteLoading from "vue-infinite-loading";
import axios from "axios";
const api =
  "http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:3000/find/location_list";

export default {
  name: "gallery",

  async created() {
    if (this.$store.state.account.user != null) {
      var user = this.$store.state.account.user.userId;
      var test = await selectheart({ user });
      this.test = test.data;
    }
    // 지도 router
    if (this.$route.query.hash_name != null) {
      this.locations = this.$route.query.hash_name;
      if (this.locations[0].hash_name == undefined) {
        this.$router.push({
          path: "/detail3"
        });
      }
    }
    // 해시태그 선택
    await EventBus.$on("changePage", ret2 => {
      this.ret2 = ret2;
      this.locations = this.ret2;
    });
    // 중복 해시태그
    await EventBus.$on("changePage3", ret3 => {
      this.locations = ret3;
    });
  },

  data() {
    return {
      test: [],
      locations: [], // infinite handler로 불러올거기 때문에 비워둠, 안비워두면 두 번 중복되서 나옴
      limit: 0,
      busy: false,
      locationsitems: []
    };
  },
  components: {
    InfiniteLoading
  },
  mounted() {
    this.infiniteHandler();
    this.$route.query.hash_name;
  },

  methods: {
    async like(event) {
      if (this.$store.state.account.user.userId != null) {
        var user = this.$store.state.account.user.userId;
        var title = event.title;
        for (let x = 0; x < this.locations.length; x++) {
          if (this.locations[x].loca_no == event.loca_no) {
            // 클릭된 loca_no이랑 같은것이 전체중에 있다면
            var clickliked = event.liked; // event.liked의 상태를 넣어줌
            if (clickliked == false) {
              // clickliked가 false인 경우
              // db테이블에 liked와 like_color, liektotal 컬럼 추가
              for (let z = 0; z < this.locations.length; z++) {
                if (this.locations[z].loca_no == event.loca_no) {
                  this.locations[z].like_color = "rgb(255, 54, 54)";
                  this.locations[z].liked = true;
                  await updateheart({ user, title }); // 해당 loca_no를 updateheart
                }
              }
            } else {
              // clickliked가 true인 상태일경우
              for (let t = 0; t < this.locations.length; t++) {
                if (this.locations[t].loca_no == event.loca_no) {
                  this.locations[t].like_color = "";
                  this.locations[t].liked = false;
                  await deleteheart({ user, title }); // db에서 삭제
                }
              }
            }
          }
        }
        var user = this.$store.state.account.user.userId;
        var test2 = await selectheart({ user });
        if (test2.length > this.test.length) {
          if (this.test != []) {
            for (let y = 0; y < this.locations.length; y++) {
              for (let r = 0; r < test2.length; r++) {
                if (this.locations[y].title == test2.data[r].title) {
                  this.locations[y].liked = true;
                  this.locations[y].like_color = "red";
                }
              }
            }
          }
        }
      } else {
        alert("로그인 이후 좋아요 클릭이 가능합니다.");
      }
    },
    // 무한 스크롤
    async infiniteHandler($state) {
      await axios
        .get(api, {
          params: {
            limit: this.limit
          }
        })
        .then(res => {
          setTimeout(() => {
            const temp = [];
            if (this.busy === false) {
              for (
                let i = this.locations.length;
                i <= this.locations.length + 2;
                i++
              ) {
                this.locationsitems = res.data;
                if (
                  this.locationsitems.length === i ||
                  this.$route.query.hash_name != null ||
                  this.ret2 != null
                ) {
                  this.busy = true;
                  break;
                }
                // 인피니트로딩 될때 좋아요 표시 --> 유저가 누른

                for (let k = 0; k < this.test.length; k++) {
                  if (this.locationsitems[i].title == this.test[k].title) {
                    if (
                      this.test[k].user_id ==
                      this.$store.state.account.user.userId
                    ) {
                      this.locationsitems[i].liked = true;
                      this.locationsitems[i].like_color = "red";
                    }
                  }
                }
                temp.push(this.locationsitems[i]);
              }
            }
            if (this.busy === true) {
              $state.complete();
            }
            this.locations = this.locations.concat(temp);
            $state.loaded();
          }, 1000);
        })
        .catch(err => {
          console.error(err);
        });
    },

    async goDetail(loca_no, title) {
      this.$router.push({
        name: "LocationDetail",
        query: {
          loca_no: loca_no,
          title: title
        }
      });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.heart {
  transition: all 0.1s ease;
  stroke: #ff3636;
  fill: none;
  margin-right: 10px;
}
button:active .heart {
  transform: scale(0.9);
}
.like a,
button {
  color: rgba(0, 0, 0, 0.7);
}
button {
  margin: 0;
  background: none;
  font: inherit;
  padding: 0.8em 1em;
  display: flex;
  align-items: center;
  transition: 0.1s ease;
  border: 0;
  float: right;
}

.gallery {
  flex-wrap: wrap;
  padding: 3rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 30px;
  padding-left: 120px;
}
.contents {
  margin: 5px;
  border: 1px solid rgb(196, 196, 196);
  cursor: pointer;
  border-radius: 4px;
}
.contents:hover {
  /* border-radius: 4px; */
  box-shadow: inset 0 0 0 1px rgb(0 0 0 / 15%);
  content: "";
  top: -4px;
  position: relative;
}
.test-loc-name {
  color: #848c94;
  font-size: 15px;
  max-width: 100%;
  overflow: hidden;
  margin: 0;
  text-align: left;
  padding: 10px 0 0 10px;
}
.test-loc-title {
  color: #000000;
  font-size: 25px;
  max-width: 80%;
  overflow: hidden;
  margin: 0;
  text-align: left;
  padding: 10px 0 10px 10px;
}
.test-test {
  color: #858585;
  font-size: 12px;
  max-width: 100%;
  overflow: hidden;
  margin: 0;
  text-align: left;
  padding: 0 0 10px 10px;
}
@media (min-width: 1801px) and (max-width: 2649px) {
  .gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    padding-left: 60px;
  }
}

@media (max-width: 1800px) {
  .gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding-left: 90px;
  }
}
</style>

```

### Detail2.vue
- 상세검색 페이지
- 해시태그와 관련된 모든 기능
- 화면이 전환될 경우 Detail1에서 좋아요가 표시되어야 하므로 Detail1과 연결되어 있음
```
<template>
  <div class="hashtag">
    <div class="tag-container" v-for="(hash, i) in hashs" :key="i">
      <div class="contents-tag">
        <ul class="area" id="region">
          <li>
            <button
              type="button"
              @click="
                [changeColor(hash.hash_no, $event), changePage(hash.hash_name)]
              "
              :style="
                hash.clicked === true
                  ? { 'background-color': 'black', color: 'white' }
                  : null
              "
            >
              {{ hash.hash_name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
    <br /><br />
    <div></div>

    <div class="tag-container2" v-for="(hash2, j) in hashs2" :key="'a' + j">
      <div class="contents-tag2">
        <ul class="area2" id="region2">
          <li>
            <button
              type="button"
              @click="
                [
                  changeColor2(hash2.hash_no, $event),
                  changePage3(hash2.hash_name)
                ]
              "
              :style="
                hash2.clicked === 1
                  ? { 'background-color': 'black', color: 'white' }
                  : null
              "
            >
              {{ hash2.hash_name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  findHashList,
  findHashList2,
  selectHashName,
  findLocationList,
  selectheart
} from "../service";
import EventBus from "./EventBus";

export default {
  name: "hashtag",
  data() {
    return {
      hashs2: [
        {
          hash_no: "",
          hash_name: "",
          clicked: 0
        }
      ],
      hashs: [
        {
          hash_no: "",
          hash_name: "",
          clicked: false
        }
      ],
      hashsdata: [],
      hashsdata2: [],
      checkDuple: []
    };
  },
  async created() {
    if (
      this.$route.query.locationhash != null ||
      this.$route.query.searchhash != null
    ) {
      var locationhash = null;
      if (this.$route.query.locationhash != null) {
        locationhash = "#" + this.$route.query.locationhash;
      }
      if (this.$route.query.searchhash != null) {
        locationhash = this.$route.query.searchhash;
      }
      const ret10 = await findHashList({ locationhash });
      for (let i = 0; i < 25; i++) {
        // 해쉬태그 넣을때마다 숫자 바꿔주자..
        if (ret10.data[i].hash_name == locationhash) {
          ret10.data[i].clicked = true;
        }
      }
      // search는 전체 for문
      this.hashs = ret10.data;
    }
    if (
      this.$route.query.locationhash != null ||
      this.$route.query.searchhash != null
    ) {
      locationhash = null;
      if (this.$route.query.locationhash != null) {
        locationhash = "#" + this.$route.query.locationhash;
      }
      if (this.$route.query.searchhash != null) {
        locationhash = this.$route.query.searchhash;
      }
      const ret11 = await findHashList2({ locationhash });
      for (let i = 0; i < 14; i++) {
        // 해쉬태그 넣을때마다 숫자 바꿔주자..
        if (ret11.data[i].hash_name == locationhash) {
          // 검색한 해쉬가 hash2의 이름과 같으면 clicked를 1로 바꿔줌
          ret11.data[i].clicked = 1;
        }
      }
      // search는 전체 for문
      this.hashs2 = ret11.data;
    } else {
      findHashList().then(response => (this.hashs = response.data));
      findHashList2().then(response => (this.hashs2 = response.data));
    }
  },
  methods: {
    changeColor(e) {
      if (this.hashs[e - 1].clicked === true) {
        this.hashs[e - 1].clicked = false;
      } else {
        for (let i = 0; i < 25; i++) {
          this.hashs[i].clicked = false;
        }
        this.hashs[e - 1].clicked = true;
      }
    },
    // 친구끼리 선택되어져있으면 전체 렌더링x
    async changePage(hash_name) {
      var ret2 = {};
      var ret3 = [];
      var cc = [];
      var count = 0;
      var check_hash = 0;
      var check_location = 0;
      var check_locationname = "";
      var check_hashname = [];
      var justcount = [];
      var countcheck = [];

      for (let i = 0; i < 25; i++) {
        if (this.hashs[i].clicked == true) {
          count += 1;
        }
      }
      for (let j = 0; j < this.hashs2.length; j++) {
        if (this.hashs2[j].clicked == 1) {
          check_hashname.push(this.hashs2[j].hash_name); // 가족끼리 담음
          check_hash += 1;
        }
      }
      // 1. 가족끼리 선택 후  지역을 선택했을경우(지역만 load됨 -> 교집합)
      // 2. 지역 해제했을경우(전체렌더링 됨 -> 가족끼리만 나오게)
      if (check_hash > 0) {
        for (let k = 0; k < this.hashs.length; k++) {
          // 지역이 클릭되었는지 구분
          if (this.hashs[k].clicked == true) {
            check_locationname = this.hashs[k].hash_name;
            check_location += 1;
          }
        }
        if (check_location > 0) {
          // 지역과 가족끼리가 선택된 상태
          hash_name = check_locationname;
          ret2 = await selectHashName({ hash_name });
          for (let l = 0; l < ret2.data.length; l++) {
            var splitdata2 = ret2.data[l].hash_name.split(" ");
            for (let m = 0; m < splitdata2.length; m++) {
              for (let n = 0; n < check_hashname.length; n++) {
                if (splitdata2[m] == check_hashname[n]) {
                  ret3.push(ret2.data[l]);
                  console.log(ret3);
                }
              }
            }
          }
          ret2 = ret3;
        } else if (check_location == 0) {
          // 지역 클릭했다 클릭해제한 상태
          for (let o = 0; o < check_hashname.length; o++) {
            hash_name = check_hashname[o];
            cc.push(await selectHashName({ hash_name }));
          }
          for (let f = 0; f < this.hashs2.length; f++) {
            if (this.hashs2[f].clicked == 1) {
              countcheck.push(this.hashs2[f].hash_name);
            }
          }

          if (countcheck != null) {
            this.hashsdata2 = [];
            for (let i = 0; i < countcheck.length; i++) {
              hash_name = countcheck[i];
              console.log(hash_name);
              justcount = await selectHashName({ hash_name });
              for (let m = 0; m < justcount.data.length; m++) {
                this.hashsdata2.push(justcount.data[m]);
              }
            }
          }
          if (justcount.length != 0) {
            ret3 = [...new Set(this.hashsdata2.map(JSON.stringify))].map(
              JSON.parse
            );
            ret2 = ret3;
            console.log(ret2);
          }
        }
        // 지역은 클릭해제된 상태, 가족끼리는 선택된 상태 -> else if문 사용
      }
      // 3. 지역x, 가족끼리x 상태
      if (count == 0 && check_hash == 0) {
        ret2 = await findLocationList();
      } else if (count == 1 && check_hash == 0) {
        // 4. 지역만 선택되었을경우
        ret2 = await selectHashName({ hash_name });
      }

      if (ret3.length != 0) {
        var test1 = new Set(ret2);
        ret2 = [...test1];
        this.hashsdata = ret2;
        if (this.$store.state.account.user != null) {
          var user = this.$store.state.account.user.userId;
          var clickheart = await selectheart({ user });
          for (let i = 0; i < ret2.length; i++) {
            for (let j = 0; j < clickheart.data.length; j++) {
              if (ret2[i].title == clickheart.data[j].title) {
                ret2[i].liked = true;
                ret2[i].like_color = "red";
              }
            }
          }
        }
        EventBus.$emit("changePage", ret2);
      } else if (ret3.length == 0) {
        var test2 = new Set(ret2.data);
        ret2.data = [...test2];
        this.hashsdata = ret2.data;
        if (this.$store.state.account.user != null) {
          var user = this.$store.state.account.user.userId;
          var clickheart2 = await selectheart({ user });
          console.log(clickheart2.data.length);
          for (let i = 0; i < ret2.data.length; i++) {
            for (let j = 0; j < clickheart2.data.length; j++) {
              if (ret2.data[i].title == clickheart2.data[j].title) {
                ret2.data[i].liked = true;
                ret2.data[i].like_color = "red";
              }
            }
          }
        }
        EventBus.$emit("changePage", ret2.data);
      }
    },

    async changePage3(hash_name) {
      var ret3 = [];
      var splitdata2 = [];
      var count = 0;
      var check_name = [];
      var check_name2 = [];
      var qureycheck_name = [];
      var count_click = 0;
      var count_click2 = 0;
      var check2 = [];
      var check = [];
      var check_hashs2 = 0;

      var ret2 = await selectHashName({ hash_name }); // 가족끼리 데이터 가져옴
      // hashsdata --> 지역해시태그 정보 담고있음
      // hashs2 --> 친구끼리, 가족끼리 등등 해시태그
      for (let i = 0; i < 25; i++) {
        // 클릭 검증
        if (this.hashs[i].clicked == true) {
          // hashsdata에는 정보가 있는 상태니까 hashs에 데이터가 있는지 없는지만 확인 --> 강남구랑 hash_name이랑 비교
          count += 1;
        }
      }
      // 지역 클릭 안된상태
      if (count == 0 && this.hashsdata2 != null) {
        // 0. 지역과 중복태그가 전부 null값인지 판단
        // 1. click된 값만 데이터를 가지고 있어야 하고 push값도 초기화
        for (let i = 0; i < this.hashs2.length; i++) {
          // clicked을 기준으로 잡음, click된 요소가 몇개인지 확인
          if (this.hashs2[i].clicked == true) {
            check_name.push(this.hashs2[i].hash_name);
            count_click += 1;
          }
        }
        console.log(count_click);
        // 클릭된 값이 0보다 클경우 무조건 들어옴
        if (count_click > 0) {
          // null 값이면 그냥 넣어줌 딱 한번만 들어옴
          console.log(this.hashsdata2);
          if (this.hashsdata2.length == 0) {
            for (let l = 0; l < ret2.data.length; l++) {
              this.hashsdata2.push(ret2.data[l]);
              var cs = this.hashsdata2;
              ret3 = cs;
            }
          } else {
            // null값 이후의 중복태그 클릭
            this.hashsdata2 = [];
            var cs = [];
            for (let k = 0; k < check_name.length; k++) {
              hash_name = check_name[k]; // 클릭되어있는 해시태그들
              console.log(hash_name);
              var ret7 = await selectHashName({ hash_name }); // 전부 가져옴 데이터
              for (let m = 0; m < ret7.data.length; m++) {
                this.hashsdata2.push(ret7.data[m]);
              }
            }
            // Set을 통해 중복 제거
            ret3 = [...new Set(this.hashsdata2.map(JSON.stringify))].map(
              JSON.parse
            );
          }
        } else {
          // TODO: 되돌리기, 전체 렌더링 안됨
          this.hashsdata2 = [];
          for (let i = 0; i < 25; i++) {
            if (this.hashs[i].clicked == true) {
              count_click2 += 1;
            }
          }
          if (count_click2 == 0) {
            var aa = await findLocationList();
            ret3 = aa.data;
          } else if (count_click2 != 0) {
            // 지역 선택되어져 있으면 지역 데이터 렌더링 시키고
            ret3 = this.hashsdata;
          }
        }
      }
      // 지역 클릭된상태
      else if (count == 1) {
        for (let k = 0; k < this.hashs2.length; k++) {
          // clicked을 기준으로 잡음, click된 요소가 몇개인지 확인
          if (this.hashs2[k].clicked == true) {
            count_click += 1;
          }
        }
        // 친구끼리 선택x
        if (count_click == 0) {
          for (let l = 0; l < this.hashs.length; l++) {
            if (this.hashs[l].clicked == true) {
              hash_name = this.hashs[l].hash_name;
              var bb = await selectHashName({ hash_name });
              ret3 = bb.data;
            }
          }
          // 친구끼리 선택o
        } else if (count_click >= 1) {
          // search나 지도로 들어왔을경우
          if (
            this.$route.query.locationhash != null ||
            this.$route.query.searchhash != null
          ) {
            for (let a = 0; a < this.hashs2.length; a++) {
              if (this.hashs2[a].clicked == 1) {
                qureycheck_name.push(this.hashs2[a].hash_name);
              }
            }
            // hashs2의 데이터가 하나이상 선택되어있는 경우이므로 this.hashsdata2에 저장시켜놓고 새로운 데이터 들어올때마다 초기화 및 넣어주면될듯
            console.log(qureycheck_name); // 가족끼리와 힐링 출력
            console.log(this.$route.query.hash_name); // 처음에 선택한 가족끼리만 들어옴
            for (let b = 0; b < this.$route.query.hash_name.length; b++) {
              var test = this.$route.query.hash_name[b].hash_name.split(" ");
              for (let c = 0; c < test.length; c++) {
                this.hashsdata2.push(ret2.data[c]);
                for (let d = 0; d < qureycheck_name.length; d++) {
                  if (test[c] == qureycheck_name[d]) {
                    check.push(this.$route.query.hash_name[b]);
                  }
                }
              }
            }
            var connect = new Set(check);
            var commondata = [...connect];
            for (let z = 0; z < commondata.length; z++) {
              ret3.push(commondata[z]);
            }
            // search나 지도가 아닌 detail페이지에서 동작
          } else {
            for (let t = 0; t < this.hashs2.length; t++) {
              if (this.hashs2[t].clicked == 1) {
                check_name2.push(this.hashs2[t].hash_name); // hashs2의 클릭된 hash_name
              }
            }
            // check_name2 = hashs2의 hash_name
            // this.hashsdata = #강남구 데이터 --> loca_no, title, hash_name
            for (let i = 0; i < this.hashsdata.length; i++) {
              var splitdata2 = this.hashsdata[i].hash_name.split(" ");
              // #가족끼리가 있는지 확인하는 반복문
              // splitdata로 hashsdata안에 클릭한 hash_name이 존재하는지 판단
              for (let j = 0; j < splitdata2.length; j++) {
                this.hashsdata2.push(ret2.data[i]);
                for (let r = 0; r < check_name2.length; r++) {
                  if (splitdata2[j] == check_name2[r]) {
                    // 클릭된값과 같은해시네임이 존재한다면
                    check.push(this.hashsdata[i]);
                  }
                }
              }
            }
            var connect = new Set(check);
            var commondata = [...connect];
            for (let z = 0; z < commondata.length; z++) {
              ret3.push(commondata[z]);
            }
          }
        }
      }
      if (this.$store.state.account.user != null) {
        var user = this.$store.state.account.user.userId;
        var clickheart3 = await selectheart({ user });
        for (let i = 0; i < ret3.length; i++) {
          for (let j = 0; j < clickheart3.data.length; j++) {
            if (ret3[i].title == clickheart3.data[j].title) {
              ret3[i].liked = true;
              ret3[i].like_color = "red";
            }
          }
        }
      }
      EventBus.$emit("changePage3", ret3);
    },

    changeColor2(e) {
      var e2 = 0;
      e2 = e - 26; // 해쉬태그 넣을때마다 고치기
      if (this.hashs2[e2].clicked == 0) {
        this.hashs2[e2].clicked = 1;
      } else {
        this.hashs2[e2].clicked = 0;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.hashtag {
  background-color: rgb(243, 243, 243);
  border-radius: 10px;
  padding: 8px;
  /* display: block; */
  /* -webkit-box-pack: end; */
  /* -ms-flex-pack: end; */
  /* justify-content: flex-end; */
  position: absolute;
  left: 1100px;
  top: 400px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;

  max-width: 100%;
  max-height: 100%;
}
.hashtag li button {
  padding: 7px 3px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
  border: none;
  width: 80px;
}
ul {
  display: block;
  padding: 0;
  margin: 0;
  font-size: 13px;
}
li {
  list-style: none;
  /* margin: 0 auto; */
}
button {
  border: 0 none;
  cursor: pointer;
  background-color: rgb(243, 243, 243);
  display: block;
  font-weight: bold;
}
button:hover {
  color: #ffffff;
  background-color: #7bc4c4;
}
/* .line3{
  border: 1px solid rgb(207, 207, 207);
  
} */
@media (min-width: 1801px) and (max-width: 2649px) {
  .hashtag {
    left: 1550px;
    top: 450px;
  }
}
@media (max-width: 1800px) {
  .hashtag {
    left: 1200px;
    top: 380px;
  }
}
</style>

```

### Search
- 검색창
```
<template>
  <div class="wrap">
    <div
      id="app"
      v-on:keyup.down="selectValue('down')"
      v-on:keyup.up="selectValue('up')"
    >
      <div class="search">
        <input
          type="text"
          class="s"
          placeholder="'#'을 입력해보세요!"
          v-on:input="searchQuery = $event.target.value"
          @keyup.enter="onSubmit($event.target.value)"
        />
        <button type="submit" class="search_searchButton" @click="getSearch()">
          <img src="../assets/search2.jpg" alt="search" />
        </button>
        <ul class="r" tabindex="0" v-bind:class="{ show: isActive }">
          <li
            tabindex="-1"
            v-for="(el, index) in filterList"
            :key="index"
            v-on:click="changeValue(el.name)"
            v-on:keyup.enter="selectValue('enter', el.name)"
          >
            <span>{{ el.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { selectHashName } from "../service";
var names = [
  { name: "#강남구" },
  { name: "#도봉구" },
  { name: "#동대문구" },
  { name: "#동작구" },
  { name: "#마포구" },
  { name: "#서대문구" },
  { name: "#서초구" },
  { name: "#성동구" },
  { name: "#성북구" },
  { name: "#송파구" },
  { name: "#양천구" },
  { name: "#강동구" },
  { name: "#영등포구" },
  { name: "#용산구" },
  { name: "#은평구" },
  { name: "#종로구" },
  { name: "#중구" },
  { name: "#중랑구" },
  { name: "#강북구" },
  { name: "#강서구" },
  { name: "#관악구" },
  { name: "#광진구" },
  { name: "#구로구" },
  { name: "#금천구" },
  { name: "#노원구" },
  { name: "#가족끼리" },
  { name: "#힐링" },
  { name: "#데이트코스" },
  { name: "#카페투어" },
  { name: "#가볼만한곳" },
  { name: "#기념일" },
  { name: "#나홀로" },
  { name: "#전통한옥" },
  { name: "#전시관" },
  { name: "#인스타감성" },
  { name: "#혼술" },
  { name: "#오늘뭐먹지" },
  { name: "#이색체험" }
];
export default {
  data() {
    return {
      isActive: false,
      searchQuery: "",
      names: names
    };
  },
  methods: {
    async onSubmit(hash_name) {
      // hashname은 #이 안 붙어서 검색할수도있음(사용자가)
      // 조건문으로 #이 없다면 넣어줌
      if (hash_name.indexOf("#") == -1) {
        hash_name = "#".concat(hash_name);
      }
      var searchhash = hash_name;
      const ret3 = await selectHashName({ hash_name });
      this.$router.push({
        name: "Detail3",
        query: {
          hash_name: ret3.data,
          searchhash: searchhash
        }
      });
    },
    async getSearch() {
      var hash_name = document.querySelector(".s").value;
      this.onSubmit(hash_name);
      console.log(hash_name);
    },
    changeValue(str) {
      console.log(`change value: ${str}`);

      this.isActive = false;
      this.searchQuery = "";
      document.querySelector(".s").value = str;
    },
    selectValue(keycode, str) {
      if (this.isActive === true) {
        const hasClass = document.querySelector(".r").classList.contains("key");
        if (keycode === "down") {
          if (!hasClass) {
            const thisEl = document.querySelectorAll(".r li")[0];
            document.querySelector(".r").classList.add("key");
            thisEl.classList.add("sel");
            thisEl.focus();
          } else {
            const lastEl = document.querySelector(".r li:last-child");
            const thisEl = document.querySelector(".r li.sel");
            const nextEl = thisEl.nextElementSibling;
            if (!lastEl.classList.contains("sel")) {
              thisEl.classList.remove("sel");
              nextEl.classList.add("sel");
              nextEl.focus();
            }
          }
        }
        if (keycode === "up" && hasClass) {
          const firstEl = document.querySelectorAll(".r li")[0];
          const thisEl = document.querySelector(".r li.sel");
          const prevEl = thisEl.previousElementSibling;
          if (!firstEl.classList.contains("sel")) {
            thisEl.classList.remove("sel");
            prevEl.classList.add("sel");
            prevEl.focus();
          } else {
            document.querySelector(".s").focus();
          }
        }
        if (keycode === "enter" && hasClass) {
          this.changeValue(str);
        }
      }
    }
  },
  computed: {
    filterList() {
      const str = this.searchQuery;
      const reg = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9|#|\s]/.test(str);
      console.log(`typing value: ${str}`);
      if (reg === false && str !== "" && str !== " ") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isActive = true;
        console.log(this.isActive);
        console.log(2);
        return this.names.filter(el => {
          return el.name.match(str);
        });
      } else {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.isActive = false;
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
html,
body {
  height: 100%;
}
body {
  background-color: #ddd;
  font-size: 14px;
  color: #333;
}
strong {
  font-weight: bold;
}
.wrap {
  display: table;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
#app {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
#app .search {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
  margin-top: 10px;
}
#app .search .s {
  padding: 10px 20px;
  width: 1000px;
  max-width: 600px;
  height: 40px;
  box-sizing: border-box;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #888;

  font-size: 16px;
}
#app .search .r {
  display: none;
  position: absolute;
  left: 0;
  top: 40px;
  width: 100%;
  height: 156px;
  overflow-y: auto;
  list-style: none;
  padding-left: 0;
}
#app .search .r.show {
  display: block;
}
#app .search .r li {
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  margin-top: -1px;
  padding: 0 20px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  box-sizing: border-box;

  outline: black;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
  display: flex;
}
#app .search .r li:hover,
#app .search .r li.sel {
  background-color: #7bc4c4;
}
#app .search p {
  padding: 10px 0;
  text-align: right;
  font-size: 12px;
}
.search_searchButton {
  height: 40px;
  background-color: #fff;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  border: 1px solid #888;
  border-left: none;
  cursor: pointer;
  font-size: 20px;
  /* position: absolute; */
}
.search_searchButton img {
  width: 20px;
  height: 20px;
  /* position: relative; */
}
.search {
  display: flex;
  height: 40px;
  margin: 0 auto;
  width: 50%;
}
</style>

```

### EventBus.js
- detail1과 detail2에서 사용하는 eventbus
```
import Vue from "vue";

const EventBus = new Vue();

export default EventBus;
```

### Detail3
- detail1과 detail2, search 페이지의 부모 컴포넌트

```
<template>
  <div class="detail3" style="position: relative;">
    <div class="rela-block top-section grad-back" id="topSection">
      <div class="abs-cent-text top-text">
        <h1 class="big-text">상세검색</h1>
        <Search />
      </div>
    </div>

    <Detail1 />
    <Detail2 />
  </div>
</template>

<script>
import Search from "@/components/Search";
import Detail1 from "@/components/Detail1";
import Detail2 from "@/components/Detail2";
export default {
  name: "Detail3",
  components: {
    Search,
    Detail1,
    Detail2
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
/** 메인 이미지 설정*/
.rela-block {
  display: block;
  position: relative;
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
}
/** 메인 이미지 소스*/
.top-section {
  height: 47vh;
  background-color: cadetblue;
  background-size: cover;
}
/** 메인 텍스트 설정 */
.top-text {
  color: #fff;
  top: 58%;
  line-height: 28px;
}
.big-text {
  font-family: "Nanum Gothic", sans-serif;
  text-transform: uppercase;
  font-size: 20px;
  font-weight: bold;
  line-height: 50px;
  /* letter-spacing: 20px; */
  margin-bottom: -30px;
}
.abs-cent-text {
  position: absolute;
  width: 90%;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
/* .search{
  margin-top: 0;
  margin-bottom: 0;
  
} */
@media (min-width: 1801px) and (max-width: 2649px) {
  .top-section {
    height: 38vh;
  }
}
</style>

```

### Footer
- 최하단에 항상 존재하는 footer 컴포넌트
```
<template>
<footer class="footsie">
  <div class="leftFooter">
      <p>
         <span>Useful Links</span>
          <ul>
              <li class="list"><a href="/">HOME</a></li>
              <li class="list"><a href="/detail3">상세검색</a></li>
              <li class="list"><a href="/board/free">고객센터</a></li>
              <li v-if="this.$store.state.account.token == null" class="list"><a href="/login">로그인</a></li>
              <li v-if="this.$store.state.account.token != null" class="list"><a href="/logout">로그아웃</a></li>
              <li class="list"><a href="/mypage">마이페이지</a></li>
          </ul>

      </p>
  </div>
  <div class="middleFooter">
      <p>
         <span>Address</span>
          <ul>
              <li class="list">서울특별시 서초구</li>
              <li class="list">서초동 서초대로74길 33</li>
              <li class="list">02-3486-3456</li>
              <li class="list">bitacademy@bit.co.kr</li>
              <li class="list google"><a href="https://www.google.com/maps/place/%EB%B9%84%ED%8A%B8%EA%B5%90%EC%9C%A1%EC%84%BC%ED%84%B0/@37.4945301,127.0275661,18.51z/data=!4m5!3m4!1s0x0:0x44f6db1c2b6c3bf7!8m2!3d37.4946287!4d127.0276197">View on Google Maps</a></li>

          </ul>

      </p>
  </div>
  <div class="rightFooter">
      <p>
         <span>Legal</span>
          <ul>
              <li class="list">Copyright &copy;2021</li>
              <li class="list">All rights reserved.</li>
              <li class="list">Terms &amp; Conditions</li>
          </ul>

      </p>
  </div>

</footer>

</template>


<script>
export default {
  name:"Footer",

}
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Nanum Gothic', sans-serif;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
body {
  
  height: 25vh;
  font-family: 'Raleway', sans-serif;
}
.footsie {
  background: #7bc4c4;
  border-top: 0.0625em solid lightgrey;
  bottom: 0;
  color: rgba(110, 110, 110, 0.95);
  height: auto;
  font-size: 1em;
  text-align: center;
  display: flex;
  flex-direction: row;
  cursor: default;
}
.footsie .leftFooter,
.footsie .rightFooter,
.footsie .middleFooter {
  flex: 1;
  padding: 0.2em;
}
.leftFooter li a:hover{
  color: #fff;
}
.footsie ul {
  list-style-type: none;
}
.footsie .list {
  padding-top: 0.6em;
}
.footsie .list a {
  text-decoration: none;
  color: rgba(110, 110, 110, 0.95);
}
.footsie .google {
  text-decoration: underline;
}
.footsie p {
  padding: 1.25em;
}
.footsie span {
  font-size: 1.4em;
  color: #ffffff;
  font-weight: 800;
}



</style>
```

### Navbar.vue
- 화면 최상단에 위치하는 네비바
```
<template>
  <header class="scrolled-nav">
    <nav>
      <div class="nav-logo">
        <router-link to="/">
          <img class="pic" src="../assets/Noolim-logo.png" />
        </router-link>
      </div>
      <ul v-show="!mobile" class="navigation">
        <div v-if="this.$store.state.account.token != null" class="blank">
          안녕하세요 {{ this.$store.state.account.user.username }}님
        </div>
        <li><router-link class="link" to="/">Home</router-link></li>
        <li><router-link class="link" to="/detail3">상세 검색</router-link></li>
        <li v-if="this.$store.state.account.token != null">
          <router-link class="link" to="/board/free">고객센터</router-link>
        </li>
        <li v-if="this.$store.state.account.token == null">
          <router-link class="link" to="/login">로그인</router-link>
        </li>
        <li v-if="this.$store.state.account.token != null">
          <router-link class="link" to="/mypage">마이페이지</router-link>
        </li>
        <li v-if="this.$store.state.account.token != null">
          <router-link class="link" to="/logout">로그아웃</router-link>
        </li>
      </ul>
      <div class="icon">
        <i
          @click="toggleMobileNav"
          v-show="mobile"
          class="far fa-bars"
          :class="{ 'icon-active': mobileNav }"
        ></i>
      </div>

      <transition name="mobile-nav">
        <ul v-show="mobileNav" class="dropdown-nav">
          <li>
            <router-link class="link" :to="{ name: 'Home' }">Home</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: '' }"
              >Popular Places</router-link
            >
          </li>
          <li>
            <router-link class="link" :to="{ name: '' }">Location</router-link>
          </li>
          <li>
            <router-link class="link" to="/board/free">고객센터</router-link>
          </li>
          <li>
            <router-link class="link" :to="{ name: '' }">로그인</router-link>
          </li>
        </ul>
      </transition>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      scrollPosition: null,
      mobile: null,
      mobileNav: null,
      windowWidth: null
    };
  },
  created() {
    window.addEventListener("resize", this.checkScreen);
    this.checkScreen();
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    toggleMobileNav() {
      this.mobileNav = !this.mobileNav;
    },

    updateScroll() {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 50) {
        // this.scrolledNav = true;
        return;
      }
      // this.scrolledNav = false;
    },

    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 750) {
        this.mobile = true;
        return;
      }
      this.mobile = false;
      this.mobileNav = false;
      return;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.blank {
  margin: 0 20% 0 30%;
  font-size: 18px;
  /* background-color: black; */
}
nav {
  padding: 10px 0;
  background-color: #7bc4c4;
  z-index: 99;
  color: #fff;

  align-items: center;
  width: 100%;
  justify-content: flex-end;
  position: fixed;
  /* 아니 고정하면 다른 div가 가려짐;;; */
}
nav {
  width: 100%;
  transition: 0.5s ease all;
  margin: 0 auto;
  flex-direction: row;
}
ul,
.link {
  font-weight: 500;
  color: #fff;
  list-style: none;
  text-decoration: none;
  /* 로고 전체 클릭할려면 position 없어야 함 */
  /* position: relative; */
}
li {
  text-transform: uppercase;
  padding: 16px;
  margin-left: 16px;
}
.link {
  font-size: 14px;
  transition: 0.5s ease all;
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
}
.link.active,
.link:hover {
  color: rgb(255, 255, 255);
}
.nav-logo {
  position: absolute;
  top: 50%;
  left: 2%;
  transform: translateY(-50%);
  letter-spacing: 0px;
  color: #fff;
  transition: 0.4s ease;
  cursor: pointer;
}
.nav-logo img {
  width: 170px;
  left: 10px;
  cursor: pointer;
}
.navigation {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;
}
.icon {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  right: 24px;
  height: 100%;
}
i {
  cursor: pointer;
  font-size: 24px;
  transition: 0.8s ease all;
}
.icon-active {
  transform: rotate(180deg);
}
.dropdown-nav {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 100%;
  max-width: 250px;
  height: 100%;
  background-color: #fff;
  top: 0;
  left: 0;
}
li {
  margin-left: 0;
}
.link {
  color: rgb(138, 138, 138);
}
.scrolled-nav {
  background-color: #7bc4c4;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
nav {
  padding: 10px 0;
}
</style>

```

### index.vue
- 로그인과 로그아웃 관리 컴포넌트
- 로그인 성공시 home화면으로 보내주는 역할 && 로그아웃시 token과 user정보 null && 로그인 and 로그아웃 버튼 navbar에서 표시
```
<template lang="pug">
.bp-content-container
  nav-bar(
    :stickyMode='stickyMode'
    @onOpenLoginModal='openLoginModal'
    @onLogout='logout'
  )
  router-view.router
  login-modal(
    v-if='isLoginModalOpen'
    :isOpen='isLoginModalOpen'
    @onCloseModal='isLoginModalOpen = false'
  )
</template>

<script>
import Login from "./Login";
import { mapGetters, mapMutations } from "vuex";

export default {
  // components에 NavBar 있었음
  components: { Login },
  data() {
    return {
      isLoginModalOpen: false,
      isScrollTop: true
    };
  },
  created() {
    window.addEventListener("scroll", e => {
      this.isScrollTop = window.scrollY === 0;
    });
  },
  methods: {
    ...mapMutations(["setToken", "setUser"]),
    openLoginModal() {
      this.isLoginModalOpen = true;
    },
    logout() {
      this.setToken(null);
      this.setUser(null);
      alert("로그아웃되었습니다.");
      if (this.$route.path !== "/") this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters(["token"]),
    stickyMode() {
      return !(this.isScrollTop && this.$route.path === "/");
    }
  }
};
</script>

```

### Login.vue
- login 폼

```
<template lang="pug">
.modal-container
  div
    .container
        .modal-dialog
          .modal-content
            .modal-header
              h4.modal-title 로그인
              button.close(@click='$emit("onCloseModal")') ×
            .modal-body
              .socal_login_container
                template(v-for='social in socials')
                  a.social_btn(:href='socialLoginUrl(social.socialType)')
                    img.social_login(
                      :src='social.src'
                      :style='{width: social.width, height: social.height}'
                    )
                    | {{ social.comment }}
</template>

<script>
import $ from "@/utils";
import accountApi from "@/api/account";
import { mapActions, mapMutations } from "vuex";

export default {
  props: ["isOpen"],
  data() {
    return {
      id: "",
      password: "",
      isProcess: false,
      cannotLogin: false,
      isLoginFailed: false,
      socials: [
        {
          socialType: "google",
          src: $.getSocialImage("google"),
          width: "32px",
          height: "32px",
          comment: "구글 로그인"
        },
        {
          socialType: "facebook",
          src: $.getSocialImage("facebook"),
          width: "32px",
          height: "32px",
          comment: "페이스북 로그인"
        },
        {
          socialType: "naver",
          src: $.getSocialImage("naver"),
          width: "32px",
          height: "32px",
          comment: "네이버 로그인"
        },
        {
          socialType: "kakao",
          src: $.getSocialImage("kakao"),
          width: "32px",
          height: "32px",
          comment: "카카오 로그인"
        }
      ]
    };
  },
  methods: {
    ...mapActions(["fetchUser"]),
    ...mapMutations(["setToken"]),
    login() {
      if (this.isProcess) return;
      if (this.id.trim() === "" || this.password.trim() === "") {
        this.cannotLogin = true;
        return;
      }
      accountApi.login(
        {
          id: this.id,
          password: this.password,
          socialType: "LOCAL"
        },
        body => {
          this.setToken(body.token);
          this.id = this.password = "";
          this.isProcess = false;
          this.fetchUser(() => {
            this.$emit("onCloseModal");
          });
        },
        err => {
          if (err.response.data.status === 401) {
            this.isLoginFailed = true;
          }
        }
      );
    },
    inputChanged() {
      if (!this.cannotLogin) return;
      if (this.id.trim() !== "" && this.password.trim() !== "") {
        this.cannotLogin = false;
      }
    },
    socialLoginUrl(socialType) {
      return $.getSocialLoginUrl(socialType);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
}

.modal-dialog {
  position: relative;
  width: auto;
  margin: 0;
  padding-top: 120px;
  padding-bottom: 30px;
  pointer-events: none;
}

.modal.show .modal-dialog {
  -webkit-transform: none;
  transform: none;
}

.modal-content {
  position: relative;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-direction: column;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.3rem;
  outline: 0;
}

.modal-header {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: start;
  -webkit-box-align: start;
  align-items: flex-start;
  -ms-flex-pack: justify;
  -webkit-box-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-bottom: 1px solid #dee2e6;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}

.modal-title {
  margin-bottom: 0;
  line-height: 1.5;
  font-size: 1.5rem;
}

.modal-header .close {
  padding: 1rem 1rem;
  margin: -1rem -1rem -1rem auto;
  cursor: pointer;
}

button.close {
  padding: 0;
  background-color: transparent;
  border: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.close {
  float: right;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.5;
}

.show {
  display: block;
}
.modal-body > ul > li {
  list-style: none;
}
.social_login {
  height: 32px;
  float: left;
  margin-top: 5.2px;
  margin-left: 10px;
}
.social_btn:hover {
  color: #2098f3;
}
.social_btn {
  margin-bottom: 15px;
  font-weight: 400;
  font-size: 16px;
  display: block;
  width: 100%;
  height: 45px;
  line-height: 45px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  color: black;
  text-decoration: none;
}
.modal-body {
  padding-left: 2em;
  padding-right: 2em;
  position: relative;
  -ms-flex: 1 1 auto;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  padding: 1rem;
}

.form-control {
  display: block;
  width: calc(100% - 1.5rem);
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  -webkit-transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.socal_login_container {
  text-align: center;
}

.or-text {
  position: absolute;
  left: 46%;
  top: 0;
  background: #fff;
  padding: 10px;
  color: rgba(0, 0, 0, 0.45);
}

.or-separator {
  border-bottom: 1px solid #eee;
  padding: 10px 0;
  position: relative;
  display: block;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 1em;
}

.form-item {
  margin-bottom: 18px;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, -webkit-box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}

.login-error {
  display: none;
  color: red;
}

.login-error.show {
  display: block;
}

.btn-block {
  display: block;
  width: 100%;
}

.btn-primary {
  color: #fff;
  background-color: #2098f3;
  border-color: #2098f3;
  font-size: 14px;
  border-radius: 4px;
  height: 45px;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-primary.disabled {
  background-color: #a0d6ff;
  border-color: #a0d6ff;
}

.modal-backdrop.show {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}

.modal-footer {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  -webkit-box-align: center;
  align-items: center;
  -ms-flex-pack: end;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding: 0.75rem;
  border-top: 1px solid #dee2e6;
  border-bottom-right-radius: calc(0.3rem - 1px);
  border-bottom-left-radius: calc(0.3rem - 1px);
}

@media screen and (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}
@media screen and (min-width: 576px) {
  .container {
    max-width: 540px;
  }
  .modal-dialog {
    max-width: 500px;
    margin: 0;
    padding-top: 120px;
    padding-bottom: 30px;
  }
}
</style>

```

### Logout.vue
- 로그아웃 폼
- 
```
<template lang="pug">
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  created() {
    var token = this.$store.state.account.token;
    var user = this.$store.state.account.user;

    if (token) {
      alert("로그아웃 합니다");
      token = null;
      user = null;
      this.setToken(token);
      this.setUser(user);
      this.fetchUser();
    }
    this.$router.replace("/");
  },
  methods: {
    ...mapActions(["fetchUser"]),
    ...mapMutations(["setToken"]),
    ...mapMutations(["setUser"])
  }
};
</script>

```

### LocationDetail.vue
- 장소정보 상세페이지
- 해당 장소에 대한 정보와 네이버 Api, 댓글기능이 구현되어있다.

```
<template>
  <div class="test">
    <div>
      <div class="test-title">
        <h1>{{ title }}</h1>
        <p>{{ context1 }}</p>
      </div>

      <div class="line"></div>
      <div class="contents-Detail">
        <img
          v-if="picture2 != ''"
          class="test"
          :src="picture2"
          height="500"
          width="800"
        />
        <div class="textall">{{ context2 }}</div>
        <img
          v-if="picture3 != ''"
          class="test"
          :src="picture3"
          height="500"
          width="800"
        />
        <div class="textall">{{ context3 }}</div>
        <img
          v-if="picture4 != ''"
          class="test"
          :src="picture4"
          height="500"
          width="800"
        />
        <div class="textall">{{ context4 }}</div>
        <img
          v-if="picture5 != ''"
          class="test"
          :src="picture5"
          height="500"
          width="800"
        />
        <div class="textall">{{ context5 }}</div>
        <img
          v-if="picture6 != ''"
          class="test"
          :src="picture6"
          height="500"
          width="800"
        />
        <div class="textall">{{ context6 }}</div>
      </div>
      <div class="line"></div>
      <div>
        <naver-maps
          :height="height"
          :width="width"
          :mapOptions="mapOptions"
          :initLayers="initLayers"
          v-if="this.mapOptions.lat != 0"
          @load="onLoad"
        >
          <naver-info-window
            class="info-window"
            @load="onWindowLoad"
            :isOpen="info"
            :marker="marker"
          >
            <div class="info-window-container">
              <!-- 마크 안에 정보 들어가는 곳 -->
              <!-- 데이터가 null값인것도 생각해서 꾸며주기 ㅎㅎ.. -->
              <h1>{{ mapdata.map_name }}</h1>
              <h2>{{ mapdata.map_address }}</h2>
              <p>{{ mapdata.map_tel }}</p>
              <p>{{ mapdata.map_page }}</p>
              <p>{{ mapdata.map_time }}</p>
            </div>
          </naver-info-window>
          <naver-marker
            :lat="this.mapOptions.lat"
            :lng="this.mapOptions.lng"
            @click="onMarkerClicked"
            @load="onMarkerLoaded"
          />
          <naver-ground-overlay
            :bounds="{ south: 36.7, north: 36.9, west: 126.5, east: 127.5 }"
          />
        </naver-maps>
        <p class="marker-notice">📍마커 클릭시 자세한정보가 나옵니다</p>
      </div>

      <div class="map-info">
        <h4>📌 위치 정보</h4>
        <li>주소 : {{ mapdata.map_address }}</li>
        <li>전화번호 : {{ mapdata.map_tel }}</li>
        <li>홈페이지 : {{ mapdata.map_page }}</li>
        <li>영업시간 : {{ mapdata.map_time }}</li>
      </div>
      <br />
      <br />
    </div>
    <!-- <div class="line"></div> -->
    <div class="text7">
      <h4>📋 추가 정보</h4>
      {{ context7 }}<br />
    </div>
    <br />
    <br />
    <div class="line2"></div>

    <div class="content-detail-comment">
      <LocationCommentList
        v-if="this.$store.state.account.user != null"
        :locaNo="locaNo"
      />
    </div>
  </div>
</template>

<script>
import { findLocation, findMap } from "../service";
import LocationCommentList from "./LocationCommentList";

export default {
  name: "LocationDetail",
  components: {
    LocationCommentList
  },
  async created() {
    const ret2 = await findMap({ title: this.$route.query.title });
    // 넣어야할 데이터들
    this.mapdata = ret2.data[0];
    this.mapOptions.lat = Number(ret2.data[0].lat);
    this.mapOptions.lng = Number(ret2.data[0].lng);
    console.log(Number(ret2.data[0].lat));
    const ret = await findLocation({
      loca_no: Number(this.$route.query.loca_no)
    });
    const { data } = ret;
    this.title = data.title;
    this.picture1 = data.picture1;
    this.picture2 = data.picture2;
    this.picture3 = data.picture3;
    this.picture4 = data.picture4;
    this.picture5 = data.picture5;
    this.context1 = data.context1;
    this.context2 = data.context2;
    this.context3 = data.context3;
    this.context4 = data.context4;
    this.context5 = data.context5;
    this.picture6 = data.picture6;
    this.context6 = data.context6;
    this.context7 = data.context7;
    this.tag = data.tag;
  },
  data() {
    const locaNo = Number(this.$route.query.loca_no);
    return {
      width: 800,
      height: 400,
      info: false,
      marker: null,
      count: 1,
      map: null,
      isCTT: false,
      mapOptions: {
        lat: 0,
        lng: 0,
        zoom: 17,
        zoomControl: true,
        zoomControlOptions: { position: "TOP_RIGHT" },
        mapTypeControl: true
      },
      initLayers: [
        "BACKGROUND",
        "BACKGROUND_DETAIL",
        "POI_KOREAN",
        "TRANSIT",
        "ENGLISH",
        "CHINESE",
        "JAPANESE"
      ],
      locaNo: locaNo,
      title: "",
      picture1: "",
      picture2: "",
      picture3: "",
      picture4: "",
      picture5: "",
      context1: "",
      context2: "",
      context3: "",
      context4: "",
      context5: "",
      picture6: "",
      context6: "",
      context7: "",
      tag: "",
      mapdata: []
    };
  },
  computed: {
    markclick() {
      return this.mapdata;
    }
  },
  mounted() {
    setInterval(() => this.count++, 1000);
  },
  methods: {
    onLoad(vue) {
      this.map = vue;
      console.log(this.mapOptions.lng);
    },
    onWindowLoad(that) {},
    onMarkerClicked(event) {
      this.info = !this.info;
    },
    onMarkerLoaded(vue) {
      this.marker = vue.marker;
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
#vue-naver-maps {
  margin: 0 auto; /* 가운데 정렬 */
}
/* 글씨 */
.info-window-container {
  padding: 10px;
  width: 300px;
  height: 100px;
}
.info-window-container h1 {
  font-size: 15px;
  font-weight: bold;
}
.info-window-container h2 {
  font-size: 10px;
  padding-bottom: 2px;
}
.info-window-container p,
a {
  margin: 0;
  font-size: 10px;
}
/* 하얀색 박스???? 없어도 될듯?*/
/* .info-window { 
    width: 500px;
    height: 100px;
} */
.test-title h1 {
  padding-top: 130px;
  box-shadow: inset 0 -20px 0 #96dddd;
  width: 30%;
  margin: 0 auto; /* 가운데 정렬 */
}
.test-title h4 {
  font-size: 20px;
  padding-top: 10px;
  color: #777;
}
.test-title {
  padding-bottom: 70px;
}
.contents3 h2 {
  padding: 100px;
  padding-bottom: 20px;
}
.test-taglist {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  padding: 0;
  z-index: 1;
  display: block;
  padding-bottom: 10px;
  left: 380px;
}
.test-taglist ul {
  padding: 15px 0 0 15px;
  list-style: none;
}
.test-taglist ul li {
  float: left;
  width: auto;
  padding: 5px;
}
.test-taglist ul li a:hover {
  color: #ffffff;
  background-color: #7bc4c4;
}
.test-taglist ul li a span {
  display: inline-block;
  height: 38px;
  line-height: 38px;
  padding: 0 20px;
}
.test-taglist ul li a {
  display: inline-block;
  overflow: hidden;
  background: #fff;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #777;
  border: 1px solid #d8d7d7;
  border-radius: 7px;
}
a:link {
  text-decoration: none;
}
.line {
  border-top: 1px solid #e9ecef;
  height: 20px;
  /* background:rgb(187, 187, 187);
    padding-bottom: 50px;
    margin-bottom: 10px;  */
  width: 70%;
  margin: 0 auto; /* 가운데 정렬 */
}
.marker-notice {
  padding: 15px;
  font-size: 13px;
  font-weight: bold;
}
.content-detail-comment {
  /* border: 1px solid black; */
  margin-top: 1rem;
  padding: 2rem;
  margin-left: 350px;
  margin-right: 300px;
}
.contents-Detail {
  padding-top: 10px;
}
.textall {
  font-size: 15xpx;
  font-weight: bold;
  padding-top: 20px;
  padding-bottom: 20px;
  width: 510px;
  margin: 0 auto; /* 가운데 정렬 */
}
/* 추가 정보 */
.map-info {
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  background-color: #fafafa;
  padding: 20px;
  color: black;
  text-align: left;
  /* margin-top: 20px;
  margin-left:100px; 
  margin-right:100px;  */
  width: 1070px;
  margin: 0 auto; /* 가운데 정렬 */
  height: 150px;
}
.text7 {
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  background-color: #fafafa;
  padding: 20px;
  color: black;
  text-align: left;
  /* margin-top: 20px;
  margin-left:100px; 
  margin-right:100px;  */
  width: 1070px;
  margin: 0 auto; /* 가운데 정렬 */
  height: 120px;
}
.text7 h4 {
  font-size: 18px;
  font-weight: bold;
}
.map-info h4 {
  font-size: 18px;
  font-weight: bold;
}
.map-info li {
  float: left;
  width: 50%;
  padding: 0 0 9px 0;
}
.line2 {
  border-top: 1px solid #e9ecef;
}
@media (min-width: 1650px) {
  .contents-Detail img {
    height: 600px;
    width: 1100px;
  }
  .textall {
    font-size: 20px;
    width: 1000px;
  }
}
</style>

```

### LocationCommentCreate.vue
-  장소 상세정보 페이지 댓글 기능
```
<template>
  <div class="comment-create">
    <b-input-group :prepend="name" class="mt-3">
      <b-form-textarea
        id="textarea"
        v-model="context"
        :placeholder="
          isSubComment ? '댓글에 댓글을 달아주세요' : '댓글을 달아주세요'
        "
        rows="3"
        max-rows="6"
      ></b-form-textarea>
      <b-input-group-append>
        <b-button
          class="writeBtn"
          variant="outline-primary"
          @click="isSubComment ? createSubComment() : createComment()"
          >작성하기</b-button
        >
      </b-input-group-append>
    </b-input-group>
  </div>
</template>

<script>
import { addLocationComment, addSubComment } from "../service";

export default {
  name: "LocationCommentCreate",
  props: {
    locaNo: Number,
    reloadComments: Function,
    reloadSubComments: Function,
    subCommentToggle: Function,
    isSubComment: Boolean,
    commentNo: Number
  },
  data() {
    return {
      name: this.$store.state.account.user.username,
      context: ""
    };
  },
  methods: {
    async createComment() {
      await addLocationComment({
        user_no: this.$store.state.account.user.userId,
        loca_no: this.locaNo,
        context: this.context
      });
      this.$router.go(this.$router.currentRoute);
      this.reloadComments();
      this.subCommentToggle();
      this.context = "";
    }

    // async createSubComment() {
    //   await addSubComment({
    //    user_no:1,
    //    comment_no:this.commentNo,
    //    context:this.context});
    //   this.reloadSubComments();
    //   this.subCommentToggle();
    //   this.context = "";
    // },
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.comment-create {
  display: flex;
  margin-bottom: 1em;
}
.writeBtn {
  margin-left: 20px;
  margin-top: 20px;
}
</style>

```

### LocationCommentList.vue
-  상세정보 페이지 댓글기능 확인
```
<template>
  <div>
    <div :key="item.comment_no" v-for="item in comments">
      <LocationCommentListItem :commentObj="item" />
    </div>
    <LocationCommentCreate :locaNo="locaNo" :reloadComments="reloadComments" />
  </div>
</template>

<script>
import LocationCommentListItem from "./LocationCommentListItem";
import LocationCommentCreate from "./LocationCommentCreate";
import { findLocationComment } from "../service";

export default {
  name: "LocationCommentList",
  props: {
    locaNo: Number
  },
  components: {
    LocationCommentListItem,
    LocationCommentCreate
  },
  async created() {
    const ret = await findLocationComment({ loca_no: this.locaNo });
    this.comments = ret.data;
  },
  data() {
    return {
      comments: []
    };
  },
  methods: {
    async reloadComments() {
      const ret = await findLocationComment({ loca_no: this.locaNo });
      this.comments = ret.data;
    }
  }
};
</script>

```

### LocationCommentListItem.vue
-  상세정보 페이지 댓글기능 구현
- 해당 유저가 아니면 수정/삭제 불가능, 고객센터도 마찬가지

```
<template>
  <div>
    <!-- 수정누르면 템플릿 보였다 안보였다하게 -->
    <template v-if="disappear">
      <div class="comment-list-item">
        <div class="img"></div>

        <div class="comment-list-item-name">
          <div class="name-name">{{ commentObj.username }}</div>
          <div class="comment-list-item-time">{{ commentObj.regdate }}</div>
          <div class="comment-list-item-context">{{ commentObj.context }}</div>
        </div>

        <div class="comment-list-item-button">
          <b-button
            size="sm"
            class="btn1"
            variant="outline-success"
            @click="dbId == storeId ? modifyCoData() : notCorrectMsg()"
            >수정</b-button
          >
          <b-button
            size="sm"
            class="btn2"
            variant="outline-danger"
            @click="dbId == storeId ? deleteCoData() : notCorrectMsg()"
            >삭제</b-button
          >
        </div>
      </div>
    </template>

    <template v-if="!disappear">
      <div class="comment-create">
        <b-input-group :prepend="name" class="mt-3">
          <b-form-textarea
            id="textarea"
            v-model="context"
            rows="3"
            max-rows="6"
            >{{ context }}</b-form-textarea
          >
          <b-input-group-append>
            <b-button
              class="writeBtn"
              variant="outline-primary"
              @click="[modifyCoData(), modifyCoData2()]"
              >수정하기</b-button
            >
            <b-button
              class="writeBtn"
              variant="outline-danger"
              @click="cancleModify"
              >취소</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
    </template>
  </div>
</template>

<script>
import LocationCommentCreate from "./LocationCommentCreate";
import {
  findSubComment,
  deleteLocationComment,
  deleteSubComment,
  modifyLocationComment,
  addLocationComment
} from "../service";
export default {
  name: "LocationCommentListItem",
  props: {
    commentObj: Object
  },
  components: {
    LocationCommentCreate
  },
  data() {
    return {
      // name: data.User.filter(
      //   item => item.user_no === this.commentObj.user_no
      // )[0].name,
      name: this.$store.state.account.user.username,
      subCommentList: [],
      subCommentCreateToggle: false,
      modifyCreateToggle: false,
      disappear: true,
      context: `${this.commentObj.context}`,
      dbId: `${this.commentObj.user_id}`,
      storeId: `${this.$store.state.account.user.userId}`
    };
  },
  methods: {
    notCorrectMsg() {
      alert("권한이 존재하지 않습니다.");
    },
    async deleteCoData() {
      alert("댓글을 삭제합니다");
      await deleteLocationComment({ comment_no: this.commentObj.comment_no });
      this.$router.go(this.$router.currentRoute);
    },
    modifyCoData() {
      this.disappear = !this.disappear;
    },
    async modifyCoData2() {
      await modifyLocationComment({
        context: this.context,
        comment_no: Number(this.commentObj.comment_no)
      });
      this.$router.go(this.$router.currentRoute);
    },
    cancleModify() {
      this.$router.go(this.$router.currentRoute);
    }
  }
};
</script>
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
.comment-list-item {
  display: grid;
  padding-bottom: 20px;
}
.comment-list-item-name {
  /* justify-content: center; */
  /* border: 0.5px solid rgb(139, 139, 139); */
  height: 60px;
  text-align: center;
  width: 700px;
}
.name-name {
  grid-row: 1;
  font-weight: bold;
  text-align: left;
}
.comment-list-item-time {
  font-size: 6px;
  position: relative;
  bottom: 20px;
  right: 245px;
}
.comment-list-item-context {
  text-align: left;
  width: 44em;
  position: relative;
  /* border: 0.5px solid rgb(139, 139, 139); */
  bottom: 12px;
  left: 15px;
}
.comment-list-item-button {
  grid-column: 4;
  grid-row: 1;
  justify-content: center;
  align-items: center;
  /* border: 0.5px solid rgb(139, 139, 139); */
  border-left: none;
  height: 60px;
  padding-bottom: 1px;
  writing-mode: horizontal-tb;
  width: 120px;
}
.btn {
  margin-right: 1em;
}
.comment-list-item-subcomment-list {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1em;
  margin-left: 10em;
}
.btn1,
.btn2 {
  height: 40px;
  font-size: 10px;
  writing-mode: horizontal-tb;
}
.img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: url("https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/7r5X/image/9djEiPBPMLu_IvCYyvRPwmZkM1g.jpg")
    no-repeat center;
  background-size: cover;
  position: relative;
  bottom: 3px;
}
</style>
```

### Modal.vue
- modal관련 설정

```
<template>
  <v-dialog v-model="modal.open" persistent max-width="290">
    <v-card>
      <v-card-title>
        {{ modal.title }}
      </v-card-title>
      <hr />
      <v-card-text class="mt-3">
        {{ modal.content }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="submit"
          class="white--text mb-3 mr-3"
          color="indigo"
          v-if="modal.option2 !== null"
        >
          {{ modal.option2 }}
        </v-btn>
        <v-btn
          @click="modalOption"
          class="white--text mb-3 mr-3"
          color="indigo"
          >{{ modal.option1 }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Modal",
  computed: {
    modal() {
      return this.$store.state.common.modal;
    }
  },
  methods: {
    modalOption() {
      if (this.modal.option1 === "닫기") {
        this.$store.commit("CLOSE_MODAL");
      } else {
        this.$emit("pass");
      }
    },
    submit() {
      this.$emit("pass");
    }
  },
  destroyed() {
    this.$store.commit("CLOSE_MODAL");
  }
};
</script>

<style scoped></style>

```

### Mypage.vue
- 마이페이지

```
<template>
  <div>
    <div id="tabs" class="container">
      <h1>My Account</h1>

      <div class="tabs">
        <a
          v-on:click="activetab = 1"
          v-bind:class="[activetab === 1 ? 'active' : '']"
          >내 글 보기</a
        >

        <a
          v-on:click="activetab = 3"
          v-bind:class="[activetab === 3 ? 'active' : '']"
          >회원탈퇴</a
        >
      </div>

      <div class="content">
        <div v-if="activetab === 1" class="tabcontent">
          <TabComment />
        </div>
        <div v-if="activetab === 3" class="tabcontent">
          <Update />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Update from "./Update";
import TabComment from "./TabComment";
export default {
  components: {
    Update,
    TabComment
  },
  data() {
    return {
      activetab: 1
    };
  }
};
</script>

<style scoped>
/* Import Google Font */
@import url(https://fonts.googleapis.com/css?family=Nunito+Sans);
/* RESET */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 30px;
}
/* STYLING */
.container {
  /* max-width: 620px;  */
  min-width: 420px;
  margin: 40px auto;
  font-family: "Nunito Sans", Arial, Helvetica, sans-serif;
  color: #888;
  /* top: 150px; */
}
/* Style the tabs */
.tabs {
  overflow: hidden;
  margin-left: 20px;
  margin-bottom: -2px;
}
.tabs ul {
  list-style-type: none;
  margin-left: 20px;
  border-bottom: 3px solid #51abf3;
}
.tabs a {
  float: left;
  cursor: pointer;
  padding: 12px 24px;
  transition: background-color 0.2s;
  color: rgb(92, 92, 92);
  border-right: none;
  text-decoration: none;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
/* .tabs a:last-child { 
    border-right: 1px solid #ccc;
} */
/* Change background color of tabs on hover */
.tabs a:hover {
  background-color: rgb(255, 255, 255);

  color: rgb(0, 0, 0);
}
/* Styling for active tab */
.tabs a.active {
  background-color: #fff;
  border-bottom: 3px solid #7bc4c4;
  cursor: default;
}
/* Style the tab content */
/* .tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 3px 3px 6px #e1e1e1
}
h4{
    text-align: left;
    padding: 0;
} */
.content {
  padding: 0;
  margin: -40px;
}
</style>

```

### TabCooment.vue
- user가 활동한 내역을 기반으로 한 좋아요와 고객센터 페이지

```
<template>
  <div>
    <main id="app" class="pagebody">
      <nav>
        <ul class="sidenav__tabs">
          <li
            class="sidenav__tab"
            v-for="category in categories"
            v-bind:key="category.id"
            @click="selectedCategory = category"
            :class="{ 'active-tab': selectedCategory == category }"
          >
            {{ category }}
            <p class="sidenav__tab__info">
              {{ categoryCount(category).length - 1 }} Bookmarks
            </p>
          </li>
        </ul>
      </nav>
      <section class="rightsection">
        <ul>
          <li class="linkli__header">
            {{ selectedCategory }} ({{
              categoryCount(selectedCategory).length - 1
            }})
          </li>
          <li
            v-for="link in filteredLinks"
            v-bind:key="link.id"
            :class="{ current: selectedCategory == link.category }"
            class="linkli"
          >
            <p class="flexleft">{{ link.title }}</p>

            <a
              v-if="link.title != ''"
              @click="go(link.loca_no, link.title, link.content_no)"
              class="btn gobutton"
              >Go</a
            >

            <a
              v-if="link.title != ''"
              @click="deleteItem(link, link.content_no, link.title)"
              class="btn deletebutton"
              href="#"
              >Delete</a
            >
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import { getBoard, getLike, deleteContent, deleteheart } from "../service";

export default {
  data() {
    return {
      links: [
        {
          title: "",
          category: "좋아요",
          loca_no: ""
        },
        {
          title: "",
          category: "고객센터",
          content_no: ""
        }
        // // {
        //   // title: "내가 쓴 댓글의 글 제목은 여기에",
        //   title: this.links.title,
        //   category: "좋아요",
        //   // url: "내가 쓴 내용은 여기에?"
        // },
      ],
      categories: [],
      selectedCategory: ""
    };
  },
  async created() {
    this.getCategories();
    this.selectedCategory = this.categories[0];
    var user_id = this.$store.state.account.user.userId;
    var test = await getBoard({ user_id });
    var test2 = await getLike({ user_id });
    for (let i = 0; i < test.data.length; i++) {
      test.data[i].category = "고객센터";
      this.links.push(test.data[i]);
    }
    console.log(this.links);
    for (let j = 0; j < test2.data.length; j++) {
      test2.data[j].category = "좋아요";
      this.links.push(test2.data[j]);
    }
  },
  computed: {
    filteredLinks() {
      return this.links.filter(link => {
        return link.category.match(this.selectedCategory);
      });
    }
  },
  methods: {
    getCategories() {
      let categoriesSet = new Set();
      console.log(categoriesSet);
      this.links.forEach(link => {
        categoriesSet.add(link.category);
      });
      this.categories = Array.from(categoriesSet);
    },
    categoryCount(category) {
      return this.links.filter(link => {
        return link.category.match(category);
      });
    },
    async deleteItem(link, content_no, title) {
      if (confirm("정말 삭제하시겠습니까?")) {
        let index = this.links.indexOf(link);
        this.links.splice(index, 1);

        var user = this.$store.state.account.user.userId;
        if (content_no != null) {
          await deleteContent({ content_no });
        } else {
          await deleteheart({ user, title });
        }
      }
    },
    go(loca_no, title, content_no) {
      if (loca_no != null) {
        this.$router.push({
          name: "LocationDetail",
          query: {
            loca_no: loca_no,
            title: title
          }
        });
      } else if (content_no) {
        this.$router.push({
          path: `/board/free/detail/${content_no}`
        });
      }
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");
* {
  font-family: "Nanum Gothic", sans-serif;
}
body {
  background-color: #e8e7e5;
  font-family: "Nanum Gothic", sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}
.pagebody {
  display: flex;
  width: 100%;
  padding-right: 0;
}
a {
  text-decoration: none;
}
.btn {
  font-family: "Open Sans", sans-serif;
  font-size: 0.9em;
  padding: 0.5em 1em;
  color: white;
  transition: all 200ms;
  letter-spacing: 0.1em;
  border: none;
  border-radius: 2px;
  background-color: #7bc4c4;
}
.btn:hover {
  cursor: pointer;
  box-shadow: 0px 0px 0px 1px white, 0px 0px 0px 3px #248b81;
}
.btn:active {
  background-color: #248b81;
}
/* Sidenav */
.sidenav__tabs {
  text-align: right;
  background-color: #7bc4c4;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
}
.sidenav__tab {
  align-self: flex-start;
  width: 100px;
  list-style-type: none;
  /*   border-bottom: 1px solid #ccc; */
  padding: 0.6em 0.4em 0.6em 0.8em;
  color: rgb(255, 255, 255);
  font-size: 1.1em;
  letter-spacing: 0;
  transition: all 300ms;
}
.sidenav__tab:hover {
  background-color: #248b81;
  cursor: pointer;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
}
.sidenav__tab__info {
  font-size: 0.65em;
  margin-top: 3px;
  color: rgb(255, 255, 255);
  font-style: italic;
  letter-spacing: 0;
}
.active-tab {
  background-color: #248b81;
  box-shadow: 0 5px 5px -2px rgba(0, 0, 0, 0.22);
}
/* End Sidenav */
.rightsection {
  width: 100%;
  margin-left: 10px;
  background-color: white;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  align-self: flex-start;
  border-radius: 2px;
}
.rightsection ul {
  padding-left: 0;
  list-style: none;
  margin-bottom: 0;
}
/* Styles for Link box li */
.linkli__header {
  background-color: #7bc4c4;
  color: white;
  padding: 0.7em;
  text-align: center;
  font-style: italic;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
}
.linkli {
  display: flex;
  border-top: 1px solid #ddd;
  padding: 1em;
  background-color: white;
}
.linkli:first-child {
  border-top: none;
}
.linkli:last-child {
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
}
.linkli__title {
  font-size: 1.2em;
  margin-bottom: 8px;
}
.linkli__url {
  font-style: italic;
  font-size: 0.8em;
  color: #777;
}
.flexleft {
  color: #333300;
  width: 100%;
  font-size: 18px;
  /* font-weight: bold; */
}
.deletebutton {
  align-self: center;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
}
.gobutton {
  align-self: center;
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.3);
  margin-right: 10px;
}
/* End style for Link box li */
</style>

```

### Update.vue
- 회원탈퇴를 위한 컴포넌트

```
<template>
  <div>
    <form class="vue-form" @submit.prevent="submit">
      <fieldset>
        <legend>회원탈퇴</legend>
        <div>
          <label class="label" for="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            required=""
            v-model="name"
            readonly
          />
        </div>
        <div>
          <label class="label" for="regdate">가입일</label>
          <input
            type="text"
            name="regdate"
            id="regdate"
            required=""
            v-model="regdate"
            readonly
          />
        </div>
        <div>
          <label class="label" for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required=""
            readonly
            :class="{ email, error: !email.valid }"
            v-model="email.value"
          />
          <div class="error-message">
            <p v-show="!email.valid">이메일 형식으로 기입해주세요!</p>
          </div>
          <div></div>
        </div>
        <div>
          <button class="drop" @click="goDrop">회원탈퇴</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script>
import { dropUser, dropUserToken } from "../service";
var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export default {
  data: function() {
    return {
      name: this.$store.state.account.user.username,
      // idname: "수정 불가능",
      regdate: this.$store.state.account.user.createdAt,
      // password:"아무거나 쓰기",
      email: {
        value: this.$store.state.account.user.email,
        valid: true
      }
    };
  },
  methods: {
    async goDrop() {
      if (confirm("정말 탈퇴하시겠습니까?") == true) {
        // 확인누르면 여기서 await dropUser 함수 실행시켜서 db에서 회원정보 삭제하고 logout 페이지로 router push
        const user_id = this.$store.state.account.user.userId;
        await dropUser({ user_id });
        await dropUserToken({ user_id });
        this.$router.push({
          path: "/logout"
        });
      } else {
        return false;
      }
    },
    // submit form handler
    submit: function() {
      this.submitted = true;
    },
    // validate by type and value
    validate: function(type, value) {
      if (type === "email") {
        this.email.valid = this.isEmail(value) ? true : false;
      }
    },
    // check for valid email adress
    isEmail: function(value) {
      return emailRegExp.test(value);
    },
    // check or uncheck all
    checkAll: function(event) {
      this.selection.features = event.target.checked ? this.features : [];
    }
  },
  watch: {
    // watching nested property
    "email.value": function(value) {
      this.validate("email", value);
    }
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Code+Pro:300,400");
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  color: #fff;
  background: #949c4e;
  background: linear-gradient(
    115deg,
    rgba(86, 216, 228, 1) 10%,
    rgba(159, 1, 234, 1) 90%
  );
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body,
.container {
  min-height: 100vh;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
a {
  color: #2c3e50;
  text-decoration: none;
}
header {
  position: relative;
  height: 150px;
  padding-top: 100px;
}
header h1 {
  text-align: center;
  font-size: 2.4rem;
  font-weight: 300;
}
#app {
  display: flex;
}
.vue-form {
  font-size: 16px;
  width: 500px;
  padding: 15px 30px;
  border-radius: 4px;
  margin: 0px auto;
  background-color: #fff;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
}
.vue-form fieldset {
  margin: 24px 0 0 0;
}
.vue-form legend {
  padding-bottom: 10px;
  border-bottom: 1px solid #ecf0f1;
}
.vue-form div {
  position: relative;
  margin: 20px 0;
}
.vue-form h4,
.vue-form .label {
  color: #94aab0;
  margin-bottom: 10px;
}
.vue-form .label {
  display: block;
  text-align: left;
}
.vue-form input,
.vue-form textarea,
.vue-form select,
.vue-form label {
  color: #2b3e51;
}
.vue-form input[type="text"],
.vue-form input[type="password"],
.vue-form input[type="email"],
.vue-form textarea,
.vue-form select,
.vue-form legend {
  display: block;
  width: 100%;
  appearance: none;
}
.vue-form input[type="text"],
.vue-form input[type="password"],
.vue-form input[type="email"],
.vue-form textarea,
.vue-form select {
  padding: 12px;
  border: 1px solid #cfd9db;
  background-color: #ffffff;
  border-radius: 0.25em;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
}
.vue-form input[type="text"]:focus,
.vue-form input[type="password"]:focus,
.vue-form input[type="email"]:focus,
.vue-form textarea:focus,
.vue-form select:focus {
  outline: none;
  border-color: #2c3e50;
  box-shadow: 0 0 5px rgba(44, 151, 222, 0.2);
}
.vue-form .select {
  position: relative;
}
.vue-form .select::after {
  content: "";
  position: absolute;
  z-index: 1;
  right: 16px;
  top: 50%;
  margin-top: -8px;
  display: block;
  width: 16px;
  height: 16px;
  background: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cg%3E%0D%0A%09%3Cpolygon%20fill%3D%22%232c3e50%22%20points%3D%220.9%2C5.5%203.1%2C3.4%208%2C8.3%2012.9%2C3.4%2015.1%2C5.5%208%2C12.6%20%09%22%2F%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E")
    no-repeat center center;
  pointer-events: none;
}
.vue-form select {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  cursor: pointer;
}
.vue-form select::-ms-expand {
  display: none;
}
.vue-form .vue-form-list {
  margin-top: 16px;
}
.vue-form .vue-form-list::after {
  clear: both;
  content: "";
  display: table;
}
.vue-form .vue-form-list li {
  display: inline-block;
  position: relative;
  user-select: none;
  margin: 0 26px 16px 0;
  /* float: left; */
}
.vue-form input[type="radio"],
.vue-form input[type="checkbox"] {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  margin: 0;
  padding: 0;
  opacity: 0;
  z-index: 2;
}
.vue-form input[type="radio"] + label,
.vue-form input[type="checkbox"] + label {
  padding-left: 24px;
}
.vue-form input[type="radio"] + label::before,
.vue-form input[type="radio"] + label::after,
.vue-form input[type="checkbox"] + label::before,
.vue-form input[type="checkbox"] + label::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -8px;
  width: 16px;
  height: 16px;
}
.vue-form input[type="radio"] + label::before,
.vue-form input[type="checkbox"] + label::before {
  border: 1px solid #cfd9db;
  background: #ffffff;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.08);
}
.vue-form input[type="radio"] + label::before,
.vue-form input[type="radio"] + label::after {
  border-radius: 50%;
}
.vue-form input[type="checkbox"] + label::before,
.vue-form input[type="checkbox"] + label::after {
  border-radius: 0.25em;
}
.vue-form input[type="radio"] + label::after,
.vue-form input[type="checkbox"] + label::after {
  background-color: #2c3e50;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 0 0 5px rgba(44, 151, 222, 0.4);
  display: none;
}
.vue-form input[type="radio"] + label::after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Ccircle%20fill%3D%22%23FFFFFF%22%20cx%3D%228%22%20cy%3D%228%22%20r%3D%223%22%2F%3E%0D%0A%3C%2Fsvg%3E");
}
.vue-form input[type="checkbox"] + label::after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2018.1.1%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%2216px%22%20height%3D%2216px%22%20viewBox%3D%220%200%2016%2016%22%20enable-background%3D%22new%200%200%2016%2016%22%20xml%3Aspace%3D%22preserve%22%3E%0D%0A%3Cpolyline%20fill%3D%22none%22%20stroke%3D%22%23FFFFFF%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22square%22%20stroke-miterlimit%3D%2210%22%20points%3D%225%2C8%207%2C10%2011%2C6%20%22%2F%3E%0D%0A%3C%2Fsvg%3E");
}
.vue-form input[type="radio"]:focus + label::before,
.vue-form input[type="checkbox"]:focus + label::before {
  box-shadow: 0 0 5px rgba(44, 151, 222, 0.6);
}
.vue-form input[type="radio"]:checked + label::after,
.vue-form input[type="checkbox"]:checked + label::after {
  display: block;
}
.vue-form input[type="radio"]:checked + label::before,
.vue-form input[type="radio"]:checked + label::after,
.vue-form input[type="checkbox"]:checked + label::before,
.vue-form input[type="checkbox"]:checked + label::after {
  animation: cd-bounce 0.3s;
}
.vue-form textarea {
  min-height: 120px;
  resize: vertical;
  overflow: auto;
}
.drop {
  border: none;
  background: #7bc4c4;
  border-radius: 0.25em;
  padding: 12px 20px;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  appearance: none;
}
.drop :hover {
  background: #42a2e1;
}
.vue-form input[type="submit"] {
  border: none;
  background: #7bc4c4;
  border-radius: 0.25em;
  padding: 12px 20px;
  color: #ffffff;
  font-weight: bold;
  float: right;
  cursor: pointer;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  appearance: none;
}
.no-touch .vue-form input[type="submit"]:hover {
  background: #42a2e1;
}
.vue-form input[type="submit"]:focus {
  outline: none;
  background: #2b3e51;
}
.vue-form input[type="submit"]:active {
  transform: scale(0.9);
}
.vue-form .error-message {
  margin: 0px;
}
.vue-form .error-message p {
  background: #ffffff;
  color: #ff0000;
  font-size: 1rem;
  text-align: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}
.vue-form .error {
  border-color: #e94b35 !important;
}
.vue-form .counter {
  background-color: #ecf0f1;
  position: absolute;
  right: 0px;
  top: 0px;
  font-size: 10px;
  padding: 4px;
}
.debug {
  border-radius: 4px;
  margin: 50px auto;
  width: 500px;
  background-color: #000;
  padding: 50px;
  background: rgba(0, 0, 0, 0.8);
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
}
.debug pre {
  color: #ffffff;
  font-size: 18px;
  line-height: 30px;
  font-family: "Source Code Pro", monospace;
  font-weight: 300;
  white-space: pre-wrap;
}
@-webkit-keyframes cd-bounce {
  0%,
  100% {
    -webkit-transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.8);
  }
}
@-moz-keyframes cd-bounce {
  0%,
  100% {
    -moz-transform: scale(1);
  }
  50% {
    -moz-transform: scale(0.8);
  }
}
@keyframes cd-bounce {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
}
.vue-form input[class="lock"] {
  background-color: rgb(218, 218, 218);
}
</style>
```
