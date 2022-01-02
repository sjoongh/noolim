# SpringBoot의 JWT기반 OAuth2로그인 구현

## 순서는 루트 디렉토리 파일부터 --> 로그인 동작이 이루어지는 순서대로 설명될 것임
### 구현시 미숙했던 부분과 개념에 대한 정리를 위해 시작했음

## 1. CI/CD(지속적통합, 지속적배포)
### 첫 CI/CI구현시 travis CI를 사용했으나 무료 토큰을 전부 사용해버려 Git Actions로 변경했음
### travis CI
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
