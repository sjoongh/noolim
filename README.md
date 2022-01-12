# Noolim Project

**그 동안 익혔던 언어를 기반으로 MSA기반으로 구성해보고 싶어 node.js와 spring서버 두 서버로 AWS를 활용한 서버 배포까지 구현하였다. MSA를 비슷하게 따라하는것에 초점을 맞추었기 때문에 RDS 또한 공용으로 사용했다.
spring서버는 OAuth2로그인과 JWT토큰을 관리하고 있으며 node.js서버는 로그인 기능을 제외한 나머지 모든 데이터를 관리하도록 설계하였다.**
**프로젝트의 결과물 사이트는 다음과 같다.**
**http://www.noolim.kro.kr/**

- 백엔드 : Nodejs(https://github.com/sjoongh/noolim/tree/node) && Spring Boot(https://github.com/sjoongh/noolim/tree/spring)
- 프론트 : Vue.js

##

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
