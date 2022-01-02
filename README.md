# SpringBoot의 JWT기반 OAuth2로그인 구현

## 순서는 루트 디렉토리 파일부터 --> 로그인 동작이 이루어지는 순서대로 설명될 것임
### 구현시 미숙했던 부분과 개념에 대한 정리를 위해 시작했음
**OAuth2 동작 과정**
1. 인증요청(클라이언트->서버)
2. 로그인 인증 페이지제공(서버->클라이언트, properties파일을 통해)
3. 로그인 완료 후 클라이언트는 서버에게 권한코드(Authorization Code Grant) 전달 # 권한코드 : Resource Owner에게 사용 허락을 받았다는 증서
4. 서버 -> Authorization Server(구글,네이버,카카오)에게 권한코드 전달
5. 검증 후 서버는 Token과 Profile을 제공받음
6. DB에 Access Token과 Refresh Token을 저장
7. 로그인시 자원 요청(Access Token)을 통해 로그인
8. 검증 후 vue에 자원 제공(유저정보, refresh token) --> 세션/쿠키 기반
------------------------------------------------------------------------------------------------
## yml파일이란??
xml과 JSon, yml파일의 차이및 역할
- 타 시스템간에 데이터를 주고 받을 때 데이터 포맷에 대한 약속이 필요
- 데이터를 내부 시스템에 전송할때 포맷에 대한 형태가 정의 되어 있으면 데이터의 크기는 작아짐 But 타 시스템들과 연동할때에는, 데이터 규칙 및 문서를 구성하는것에 다양한 문제가 발생함
- 때문에 xml,Json,yml과 같이 데이터 포맷을 정의하고 이 포맷들에는 규칙도 존재한다.

xml : 태그 형식을 통해 key와 value를 정의한다.
Json : Object는 {}, Array는 []형태로 감싸줌
Yaml(yml) : -(하이픈)을 통해 Array구분, 들여쓰기(계층구조)가 주요 특징

------------------------------------------------------------------------------------------------
## 1. CI/CD(지속적통합, 지속적배포)
**또한 이후에 설명될 properties은 yml파일과 같은 역할을 하는데 구조와 사용방법이 조금 다르다. yml파일과 proerties파일 모두 build시 같이 실행되지만, ec2서버에 있는 properties파일은 따로 실행시켜야 하므로 deploy.sh에 설정 해놨음**
**첫 CI/CD구현시 travis CI를 사용했으나 무료 토큰을 전부 사용해버려 Git Actions로 변경했음**
- AWS는 Travis같은 외부서비스가 접근 할 수 없으므로 IAM을 통해 받은 key값으로 Travis CI와 AWS S3를 연동
- 빌드가 완료되면 내장 톰캣에 들어있는 jar파일이 생성됨 jar파일을 통해 AWS서버에서 springboot파일을 실행한다
- S3는 순수하게 파일서버의 역할을 하므로 파일을 저장하고 접근하여 검색이 가능하다.
- codeDeploy를 활용하여 ec2서버에 배포해야 하므로 IAM에서 역할을 추가해준다 --> 설정과 권한 또한 추가해야함
- codeDeploy에 대한 설정은 [appspec.yml](#appspec.yml)로 진행해야 한다.
### travis CI.yml

branches:
  only:
   - main

**Trivis CI 서버의 Home
gradle부터 의존성을 받으면 같은 의존성은 다음 배포 때부터 받지 않음**
cache:
  directories:
    - '$HOME/.m2/repository'
    - '#HOME/.gradle'

**gradlew파일을 clean 초기화후 실행**
script: "./gradlew clean build"
**처음 실행시 권한이 없으므로 권한 설정**
before_install:
  - chmod +x gradlew
**ec2서버에 존재하는 [deploy.sh](#deploy.sh)파일을 실행후 zip파일 위치 변경**
before_deploy:
  - mkdir -p before-deploy
  - cp scripts/*.sh before-deploy/
  - cp appspec.yml before-deploy/
  - cp build/libs/*.jar before-deploy/
  - cd before-deploy && zip -r before-deploy *
  - cd ../ && mkdir -p deploy
  - mv before-deploy/before-deploy.zip deploy/springboot2-webservice.zip
**외부 서비스와 연동할 행위들을 선언한다**
**s3 noolim버킷에 zip파일 올림, key들은 travis홈페이지에 저장되어있음, branches설정도 가능**
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
**codeploy 또한 설정**
  - provider: codedeploy
    access_key_id: $AWS_ACCESS_KEY
    secret_access_key: $AWS_SECRET_KEY
    bucket: noolim
    key: springboot2-webservice.zip
    bundle_type: zip
    application: noolim # 웹 콘솔에서 등록한 codedeploy 어플리케이션
    deployment_group: noolim-group # codedeploy 배포 그룹
    region: ap-northeast-2
    wait-until-deployed: true
    on:
      all_branches: true


**CI 실행 완료 시 메일로 알림**
notifications:
  email:
    recipients:
      - az45687@naver.com
------------------------------------------------------------------------------------------------

### appsec.yml
version: 0.0 # 우리 프로젝트 버전
os: linux
files:
  - source: / # 전체 파일을 명시
    destination: /home/ec2-user/app/step2/zip/ # source로 지정된 전체 파일이 받을 위치
    overwrite: yes # 기존 파일들이 있으면 덮어씌운다.

permissions:
  - object: /
    pattern: "**"
    owner: ec2-user
    group: ec2-user

hooks:
  ApplicationStart:
    - location: deploy.sh
      timeout: 60
      runas: ec2-user
      
------------------------------------------------------------------------------------------------

### deploy.sh

REPOSITORY=/home/ec2-user/app/step1
PROJECT_NAME=springboot2-webservice

cd $REPOSITORY/$PROJECT_NAME/

echo "> Git Pull"

git pull

echo "> 프로젝트 Build 시작"

./gradlew build

echo "> step1 디렉토리로 이동"

cd $REPOSITORY

echo "> Build 파일 복사"

cp $REPOSITORY/$PROJECT_NAME/build/libs/*.jar $REPOSITORY/

echo "> 현재 구동중인 애플리케이션pid확인"

CURRENT_PID=$(pgrep -f ${PROJECT_NAME}.*.jar)

echo "현재 구동 중인 애플리케이션pid: $CURRENT_PID"

if [ -z "$CURRENT_PID" ]; then
        echo "> 현재 구동 중인 애플리케이션이 없으므로 종료하지 않습니다."
else
        echo "> kill -15 $CURRENT_PID"
        kill -15 $CURRENT_PID
        sleep 5
fi

echo "> 새 애플리케이션 배포"

JAR_NAME=$(ls -tr $REPOSITORY/*.jar | tail -n 1)

echo "> JAR Name: $JAR_NAME"

echo "> $JAR_NAME 에 실행권한 추가"

chmod +x $JAR_NAME

echo "> $JAR_NAME 실행"

     nohup java -jar \
      -Dspring.config.location=classpath:/application.properties,classpath:/application-real.properties,/home/ec2-user/app/application-oauth.properties,/home/ec2-user/app/application-real-db.properties \
      -Dspring.profiles.active=real
- nohup : 터미널을 종료해도 애플리케이션이 계속 구동되게 하는 리눅스 명령어
- 찾은 jar파일명으로 해당 jar파일을 nohup로 실행한다
- 자바를 jar파일을 실행함(외장 톰캣 설치x, 스프링 부트의 장점)
- real.properties에는 OAuth2 login과 관련된 설정
- real-db.properties에는 RDS접속 정보가 들어있음

------------------------------------------------------------------------------------------------
## OAuth2로그인과 RDS접속을 위한 properties 파일 설정

### application-real.properties

- 스프링 부트에서는 properties의 이름을 application-xxx.properties로 만들면 xxx라는 이름의 profile이 생성되어 이를 통해 관리할 수 있다. 즉, profile=xxx라는 식으로 호출하면 해당 properties의 설정등을 가져올 수 있다.
- application.properties에 spring.profiles.include=oauth 추가
- 실행시 oauth, real-db, real이 적힌 properties를 포함해서 실행

spring.profiles.include=oauth, real-db, real
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL5InnoDBDialect # MYSQL사용

spring.session.store-type=jdbc
spring.session.jdbc.initialize-schema=always
cors.allowed-origins='http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:8082' # RDS연결
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS # 모든 요청
cors.allowed-headers='*' # 허용
cors.max-age=3600
jwt.secret='8O3NPTBqo319DHLNqsQAfRJEdKsETOds' # JWT시크릿 토큰

app.auth.tokenSecret=8O3NPTBqo319DHLNqsQAfRJEdKsETOds
app.auth.tokenExpiry=1800000
app.auth.refreshTokenExpiry=604800000
app.oauth2.authorizedRedirectUris=http://ec2-3-34-126-3.ap-northeast-2.compute.amazonaws.com:8082/oauth/redirect # 로그인 수행 후 리다이렉트 주소

------------------------------------------------------------------------------------------------

### application-real-db.properties

spring.jpa.hibernate.ddl-auto=none
spring.datasource.url=jdbc:mariadb://springboot2-webservice.covzzjccqpoz.ap-northeast-2.rds.amazonaws.com:3306/board_db # RDS 주소
spring.datasource.username=# 유저 name
spring.datasource.password=# 유저 password
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver # RDS는 Maria DB로 설정되어있어 mariadb로 연결

------------------------------------------------------------------------------------------------
## 2. Gradle파일 사용 라이브러리
1. lombok
2. springboot web, springboot security
3. data jpa
4. h2database
5. oauth2-client
6. mariadb
7. jdbc
8. jjwt(3가지)

------------------------------------------------------------------------------------------------
## 3. 코드 구현

**main.class**

@SpringBootApplication
@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
public class OauthLoginApplication {
    public static void main(String[] args) {
        SpringApplication.run(OauthLoginApplication.class, args);
    }

}

- @SpringBootApplication 어노테이션은 auto-configuration을 담당
- 스프링부트의 자동 설정, 스프링 Bean읽기와 생성이 자동으로 지원
- 항상 최상단에 위치해야함(어노테이션 위치부터 설정을 읽어가므로)
- 스프링 컨테이너 : 인스턴스의 생명주기를 관리, 생성된 인스턴스들에게 추가적인 기능을 제공
- 개발자가 작성한 코드의 처리과정을 위임받은 독립적인 존재(객체의 생성과 소멸을 컨트롤)
- 이 때 Spring Container에서 생성되는 객체를 Bean이라고 한다
- 개발자는 new 연산자, 인터페이스 호출, 팩토리 호출 방식으로 객체를 생성, 소멸할 수 있는데 스프링 컨테이너가 이 역할을 대신함 --> 즉 제어흐름을 외부에서 관리함
- 이점 : 자기가 사용할 클래스의 인스턴스를 직접 생성할 필요가없음, 사용은 하지만 인스턴스 생성및 소멸을 다른 누군가에게 맡겨 개발자는 그저 로직구현만 신경쓰면 됨
- 이런식으로 제어권이 IOC Container로 넘어가면 DI(의존성주입)과 AOP(관점 지향 프로그래밍)이 가능하다
- DI(Dependency Injection) : 객체간의 의존성을 자신이 아닌 외부에서 주입한다.(setter() or 생성자 사용)
#### 순서
1. 객체 생성
2. 의존성 객체 주입(스프링이 만들어 놓은 객체)
3. 의존성 객체 메소드 호출
**Bean : Spring IoC Container가 관리하는 자바객체(객체를 스프링이 실행될때 만들어주고 필요한곳에 주입함 싱글톤패턴 특징을 가짐)**
1. @Component어노테이션을 사용해 빈을 등록, @ComponentScan은 어느지점부터 컴포넌트를 찾으라고 알려주는 역할
2. 빈 설정파일에 직접 빈을 등록 --> @Configuration어노테이션을 클래스에 붙인뒤 그 안에 @Bean을 사용해 직접 빈을 정의
3. @EnableConfigurationProperties은 springboot 2.2이후 버전부터는 사용할 필요가없음 --> @ConfigurationProperties들을 알아서 다 찾아주기 때문이다.

------------------------------------------------------------------------------------------------

**AppProperties : access token과 refreshtoken, tokensecret 및 redirecturi관련 properties**

@Getter
@Setter
@ConfigurationProperties(prefix = "cors")
public class CorsProperties {
    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private Long maxAge;
}

**CorsProperties : Cors에 대한 모든 접근 허용**

@Getter
@Setter
@ConfigurationProperties(prefix = "cors")
public class CorsProperties {
    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private Long maxAge;
}

**JwtConfig : jwt secret토큰 설정**
import com.PlayProject.oauth.token.AuthTokenProvider;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JwtConfig {
    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public AuthTokenProvider jwtProvider() {
        return new AuthTokenProvider(secret);
    }
}

**SecurityConfig**

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsProperties corsProperties;
    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final CustomUserDetailsService userDetailsService;
    private final CustomOAuth2UserService oAuth2UserService;
    private final TokenAccessDeniedHandler tokenAccessDeniedHandler;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    /*
    * UserDetailsService 설정
    * */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
                .passwordEncoder(passwordEncoder());
    }

    @Override
    @CrossOrigin("*")
    protected void configure(HttpSecurity http) throws Exception {
        http
                    .cors()
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .csrf().disable()
                    .formLogin().disable()
                    .httpBasic().disable()
                    .exceptionHandling()
                    .authenticationEntryPoint(new RestAuthenticationEntryPoint())
                    .accessDeniedHandler(tokenAccessDeniedHandler)
                .and()
                    .authorizeRequests()
                    .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                    .antMatchers("/api/**").hasAnyAuthority(RoleType.USER.getCode())
                    .antMatchers("/**").hasAnyAuthority(RoleType.USER.getCode())
                    .antMatchers("/api/**/admin/**").hasAnyAuthority(RoleType.ADMIN.getCode())
                    .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                    .authorizationEndpoint()
                    .baseUri("/oauth2/authorization")
                    .authorizationRequestRepository(oAuth2AuthorizationRequestBasedOnCookieRepository())
                .and()
                    .redirectionEndpoint()
                    .baseUri("/*/oauth2/code/*")
                .and()
                    .userInfoEndpoint()
                    .userService(oAuth2UserService)
                .and()
                    .successHandler(oAuth2AuthenticationSuccessHandler())
                    .failureHandler(oAuth2AuthenticationFailureHandler());

        http.addFilterBefore(tokenAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    /*
    * auth 매니저 설
    * */
    @Override
    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

    /*
    * security 설정 시, 사용할 인코더 설정
    * */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
    * 토큰 필터 설정
    * */
    @Bean
    public TokenAuthenticationFilter tokenAuthenticationFilter() {
        return new TokenAuthenticationFilter(tokenProvider);
    }

    /*
    * 쿠키 기반 인가 Repository
    * 인가 응답을 연계 하고 검증할 때 사용.
    * */
    @Bean
    public OAuth2AuthorizationRequestBasedOnCookieRepository oAuth2AuthorizationRequestBasedOnCookieRepository() {
        return new OAuth2AuthorizationRequestBasedOnCookieRepository();
    }

    /*
    * Oauth 인증 성공 핸들러
    * */
    @Bean
    public OAuth2AuthenticationSuccessHandler oAuth2AuthenticationSuccessHandler() {
        return new OAuth2AuthenticationSuccessHandler(
                tokenProvider,
                appProperties,
                userRefreshTokenRepository,
                oAuth2AuthorizationRequestBasedOnCookieRepository()
        );
    }

    /*
     * Oauth 인증 실패 핸들러
     * */
    @Bean
    public OAuth2AuthenticationFailureHandler oAuth2AuthenticationFailureHandler() {
        return new OAuth2AuthenticationFailureHandler(oAuth2AuthorizationRequestBasedOnCookieRepository());
    }

    /*
    * Cors 설정
    * */
    @Bean
    @CrossOrigin("*")
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource corsConfigSource = new UrlBasedCorsConfigurationSource();

        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("*");
        corsConfig.addAllowedMethod("*");
        corsConfig.addAllowedHeader("*");
        corsConfig.setAllowCredentials(true);
        corsConfig.setMaxAge(corsConfig.getMaxAge());

        corsConfigSource.registerCorsConfiguration("/**", corsConfig);
        return corsConfigSource;
    }
}
