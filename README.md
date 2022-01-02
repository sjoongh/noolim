# SpringBoot의 JWT기반 OAuth2로그인 구현

## 순서는 루트 디렉토리 파일부터 --> 로그인 동작이 이루어지는 순서대로 설명될 것임
### 구현시 미숙했던 부분과 개념에 대한 정리를 위해 시작했음
------------------------------------------------------------------------------------------------
## yml파일이란??
xml과 JSon, yml파일의 차이및 역할
- 타 시스템간에 데이터를 주고 받을 때 데이터 포맷에 대한 약속이 필요
- 데이터를 내부 시스템에 전송할때 포맷에 대한 형태가 정의 되어 있으면 데이터의 크기는 작아짐
But 타 시스템들과 연동할때에는,
데이터 규칙 및 문서를 구성하는것에 다양한 문제가 발생함
--> 때문에 xml,Json,yml과 같이 데이터 포맷을 정의하고 이 포맷들에는 규칙도 존재한다.
xml : 태그 형식을 통해 key와 value를 정의한다.
Json : Object는 {}, Array는 []형태로 감싸줌
Yaml(yml) : -(하이픈)을 통해 Array구분, 들여쓰기(계층구조)가 주요 특징

#### 또한 이후에 설명될 properties은 yml파일과 같은 역할을 하는데 구조와 사용방법이 조금씩 다르다
#### 둘 다 springboot서버가 실행될때 같이 실행되어진다.
------------------------------------------------------------------------------------------------
## 1. CI/CD(지속적통합, 지속적배포)
*첫 CI/CD구현시 travis CI를 사용했으나 무료 토큰을 전부 사용해버려 Git Actions로 변경했음*
### travis CI.yml

branches:
  only:
   - main

Trivis CI 서버의 Home
gradle부터 의존성을 받으면 같은 의존성은 다음 배포 때부터 받지 않음
cache:
  directories:
    - '$HOME/.m2/repository'
    - '#HOME/.gradle'

script: "./gradlew clean build"

before_install:
  - chmod +x gradlew

before_deploy:
  - mkdir -p before-deploy
  - cp scripts/*.sh before-deploy/
  - cp appspec.yml before-deploy/
  - cp build/libs/*.jar before-deploy/
  - cd before-deploy && zip -r before-deploy *
  - cd ../ && mkdir -p deploy
  - mv before-deploy/before-deploy.zip deploy/springboot2-webservice.zip

deploy:
  - provider: s3
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $AWS_SECRET_KEY
    bucket: noolim
    region: ap-northeast-2
    skip_cleanup: true
    acl: private # zip 파일 접근 private
    locla_dir: deploy # before_deploy에서 생성한 dir
    wait-until-deployed: true
    on:
      all_branches: true

  - provider: codedeploy
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $AWS_SECRET_KEY
    bucket: noolim
    key: springboot2-webservice.zip
    bundle_type: zip
    application: noolim
    deployment_group: noolim-group
    region: ap-northeast-2
    wait-until-deployed: true
    on:
      all_branches: true


# CI 실행 완료 시 메일로 알림ㅎ
notifications:
  email:
    recipients:
      - az45687@naver.com
