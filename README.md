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
```
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
```
------------------------------------------------------------------------------------------------

### appsec.yml
```
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
```   
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
```
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
```
------------------------------------------------------------------------------------------------

### application-real-db.properties
```
spring.jpa.hibernate.ddl-auto=none
spring.datasource.url=jdbc:mariadb://springboot2-webservice.covzzjccqpoz.ap-northeast-2.rds.amazonaws.com:3306/board_db # RDS 주소
spring.datasource.username=# 유저 name
spring.datasource.password=# 유저 password
spring.datasource.driver-class-name=org.mariadb.jdbc.Driver # RDS는 Maria DB로 설정되어있어 mariadb로 연결
```
------------------------------------------------------------------------------------------------
## 2. Gradle파일 사용 라이브러리
1. lombok
2. springboot web, springboot security
3. data jpa
4. oauth2-client
5. mariadb
6. jdbc
7. jjwt(3가지)

------------------------------------------------------------------------------------------------
## 3. 코드 구현

**main.class**
```
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
```
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
## http설정과 jwt token & api 응답 여부

**AppProperties : access token과 refreshtoken, tokensecret 및 redirecturi관련 properties**

```
@Getter
@Setter
@ConfigurationProperties(prefix = "cors")
public class CorsProperties {

    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private Long maxAge;
}
```
**CorsProperties : Cors에 대한 모든 접근 허용**
```
@Getter
@Setter
@ConfigurationProperties(prefix = "cors")
public class CorsProperties {

    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private Long maxAge;
}
```
**JwtConfig : jwt secret토큰 설정**
```
@Configuration
public class JwtConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public AuthTokenProvider jwtProvider() {
        return new AuthTokenProvider(secret);
    }
}
```
**SecurityConfig**
```
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
```
------------------------------------------------------------------------------------------------

**ApiResponse(api 호출 실패 시 message && code)**
```
@Getter
@RequiredArgsConstructor
public class ApiResponse<T> {

    private final static int SUCCESS = 200;
    private final static int NOT_FOUND = 400;
    private final static int FAILED = 500;
    private final static String SUCCESS_MESSAGE = "SUCCESS";
    private final static String NOT_FOUND_MESSAGE = "NOT FOUND";
    private final static String FAILED_MESSAGE = "서버에서 오류가 발생하였습니다.";
    private final static String INVALID_ACCESS_TOKEN = "Invalid access token.";
    private final static String INVALID_REFRESH_TOKEN = "Invalid refresh token.";
    private final static String NOT_EXPIRED_TOKEN_YET = "Not expired token yet.";

    private final ApiResponseHeader header;
    private final Map<String, T> body;

    public static <T> ApiResponse<T> success(String name, T body) {
        Map<String, T> map = new HashMap<>();
        map.put(name, body);

        return new ApiResponse(new ApiResponseHeader(SUCCESS, SUCCESS_MESSAGE), map);
    }

    public static <T> ApiResponse<T> fail() {
        return new ApiResponse(new ApiResponseHeader(FAILED, FAILED_MESSAGE), null);
    }

    public static <T> ApiResponse<T> invalidAccessToken() {
        return new ApiResponse(new ApiResponseHeader(FAILED, INVALID_ACCESS_TOKEN), null);
    }

    public static <T> ApiResponse<T> invalidRefreshToken() {
        return new ApiResponse(new ApiResponseHeader(FAILED, INVALID_REFRESH_TOKEN), null);
    }

    public static <T> ApiResponse<T> notExpiredTokenYet() {
        return new ApiResponse(new ApiResponseHeader(FAILED, NOT_EXPIRED_TOKEN_YET), null);
    }
}

```

**ApiResponseHeader**
```
@Setter
@Getter
@AllArgsConstructor
public class ApiResponseHeader {
    private int code;
    private String message;
}

```

---------------------------------------------------------------------------------------------


## 로그인 페이지 응답 코드 and JPA 설정 & find user data

**AuthControlller**
```
@RestController
@RequestMapping("/api/v1/auth") # ~~ 매핑하여 사용
@CrossOrigin("*") # 모든 요청에 대한 접근 허용
@RequiredArgsConstructor
public class AuthController {

    private final AppProperties appProperties;
    private final AuthTokenProvider tokenProvider;
    private final AuthenticationManager authenticationManager;
    private final UserRefreshTokenRepository userRefreshTokenRepository;

    private final static long THREE_DAYS_MSEC = 259200000;
    private final static String REFRESH_TOKEN = "refresh_token";

    @PostMapping("/login") // /login에 대한 post데이터가 들어오면 여기서 받음
    public ApiResponse login(
            HttpServletRequest request,
            HttpServletResponse response,
            @RequestBody AuthReqModel authReqModel
    ) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authReqModel.getId(),
                        authReqModel.getPassword()
                )
        );

        String userId = authReqModel.getId();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userId,
                ((UserPrincipal) authentication.getPrincipal()).getRoleType().getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();
        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userId);
        if (userRefreshToken == null) {
            // 없는 경우 새로 등록
            userRefreshToken = new UserRefreshToken(userId, refreshToken.getToken());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        } else {
            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(refreshToken.getToken());
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtil.addCookie(response, REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return ApiResponse.success("token", accessToken.getToken());
    }

    @GetMapping("/refresh") // /refresh에 대한 get
    public ApiResponse refreshToken (HttpServletRequest request, HttpServletResponse response) {
        // access token 확인
        String accessToken = HeaderUtil.getAccessToken(request);
        AuthToken authToken = tokenProvider.convertAuthToken(accessToken);
        if (!authToken.validate()) {
            return ApiResponse.invalidAccessToken();
        }

        // expired access token 인지 확인
        Claims claims = authToken.getExpiredTokenClaims();
        if (claims == null) {
            return ApiResponse.notExpiredTokenYet();
        }

        String userId = claims.getSubject();
        RoleType roleType = RoleType.of(claims.get("role", String.class));

        // refresh token
        String refreshToken = CookieUtil.getCookie(request, REFRESH_TOKEN)
                .map(Cookie::getValue)
                .orElse((null));
        AuthToken authRefreshToken = tokenProvider.convertAuthToken(refreshToken);

        if (authRefreshToken.validate()) {
            return ApiResponse.invalidRefreshToken();
        }

        // userId refresh token 으로 DB 확인
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserIdAndRefreshToken(userId, refreshToken);
        if (userRefreshToken == null) {
            return ApiResponse.invalidRefreshToken();
        }

        Date now = new Date();
        AuthToken newAccessToken = tokenProvider.createAuthToken(
                userId,
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        long validTime = authRefreshToken.getTokenClaims().getExpiration().getTime() - now.getTime();

        // refresh 토큰 기간이 3일 이하로 남은 경우, refresh 토큰 갱신
        if (validTime <= THREE_DAYS_MSEC) {
            // refresh 토큰 설정
            long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

            authRefreshToken = tokenProvider.createAuthToken(
                    appProperties.getAuth().getTokenSecret(),
                    new Date(now.getTime() + refreshTokenExpiry)
            );

            // DB에 refresh 토큰 업데이트
            userRefreshToken.setRefreshToken(authRefreshToken.getToken());

            int cookieMaxAge = (int) refreshTokenExpiry / 60;
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            CookieUtil.addCookie(response, REFRESH_TOKEN, authRefreshToken.getToken(), cookieMaxAge);
        }

        return ApiResponse.success("token", newAccessToken.getToken());
    }
}
```

**UserController**

```
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin("*")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ApiResponse getUser() {
        org.springframework.security.core.userdetails.User principal = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        User user = userService.getUser(principal.getUsername());
        return ApiResponse.success("user", user);
    }
}
```

**AuthReqModel**
```
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AuthReqModel {
    private String id;
    private String password;
}
```

**User(JPA)**

```
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER")
public class User {
    @JsonIgnore
    @Id
    @Column(name = "USER_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userSeq;

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "USERNAME", length = 100)
    @NotNull
    @Size(max = 100)
    private String username;

    @JsonIgnore
    @Column(name = "PASSWORD", length = 128)
    @NotNull
    @Size(max = 128)
    private String password;

    @Column(name = "EMAIL", length = 512, unique = true)
    @NotNull
    @Size(max = 512)
    private String email;

    @Column(name = "EMAIL_VERIFIED_YN", length = 1)
    @NotNull
    @Size(min = 1, max = 1)
    private String emailVerifiedYn;

    @Column(name = "PROFILE_IMAGE_URL", length = 512)
    @NotNull
    @Size(max = 512)
    private String profileImageUrl;

    @Column(name = "PROVIDER_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private ProviderType providerType;

    @Column(name = "ROLE_TYPE", length = 20)
    @Enumerated(EnumType.STRING)
    @NotNull
    private RoleType roleType;

    @Column(name = "CREATED_AT")
    @NotNull
    private LocalDateTime createdAt;

    @Column(name = "MODIFIED_AT")
    @NotNull
    private LocalDateTime modifiedAt;

    public User(
            @NotNull @Size(max = 64) String userId,
            @NotNull @Size(max = 100) String username,
            @NotNull @Size(max = 512) String email,
            @NotNull @Size(max = 1) String emailVerifiedYn,
            @NotNull @Size(max = 512) String profileImageUrl,
            @NotNull ProviderType providerType,
            @NotNull RoleType roleType,
            @NotNull LocalDateTime createdAt,
            @NotNull LocalDateTime modifiedAt
    ) {
        this.userId = userId;
        this.username = username;
        this.password = "NO_PASS";
        this.email = email != null ? email : "NO_EMAIL";
        this.emailVerifiedYn = emailVerifiedYn;
        this.profileImageUrl = profileImageUrl != null ? profileImageUrl : "";
        this.providerType = providerType;
        this.roleType = roleType;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }
}

```

**UserRepository(회원가입시 user가 존재하는지 확인)**
```
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(String userId);
}
```

**UserRefreshTokenRepository(회원가입이 완료된 유저가 재로그인시 user확인)**
```
@Repository
public interface UserRefreshTokenRepository extends JpaRepository<UserRefreshToken, Long> {
    UserRefreshToken findByUserId(String userId);
    UserRefreshToken findByUserIdAndRefreshToken(String userId, String refreshToken);
}
```

**UserService(??)**
```
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
```

**UserRefreshToken(JPA)**
```
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER_REFRESH_TOKEN")
public class UserRefreshToken {
    @JsonIgnore
    @Id
    @Column(name = "REFRESH_TOKEN_SEQ")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long refreshTokenSeq;

    @Column(name = "USER_ID", length = 64, unique = true)
    @NotNull
    @Size(max = 64)
    private String userId;

    @Column(name = "REFRESH_TOKEN", length = 256)
    @NotNull
    @Size(max = 256)
    private String refreshToken;

    public UserRefreshToken(
            @NotNull @Size(max = 64) String userId,
            @NotNull @Size(max = 256) String refreshToken
    ) {
        this.userId = userId;
        this.refreshToken = refreshToken;
    }
}
```
---------------------------------------------------------------------------------------------------

## OAuth2 로그인 구현 및 설정

**ProviderType**
```
// 구글, 페이스북, 네이버, 카카오, 로컬, 로그인 TYPE 분류
@Getter
public enum ProviderType {
    GOOGLE,
    FACEBOOK,
    NAVER,
    KAKAO,
    LOCAL;
}

```

**RoleType(user role정보 분류 및 설정)**

```
@Getter
@AllArgsConstructor
public enum RoleType {
    USER("ROLE_USER", "일반 사용자 권한"),
    ADMIN("ROLE_ADMIN", "관리자 권한"),
    GUEST("GUEST", "게스트 권한");

    private final String code;
    private final String displayName;

    public static RoleType of(String code) {
        return Arrays.stream(RoleType.values())
                .filter(r -> r.getCode().equals(code))
                .findAny()
                .orElse(GUEST);
    }
}

```

**UserPrincipal(???)**
```
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class UserPrincipal implements OAuth2User, UserDetails, OidcUser {
    private final String userId;
    private final String password;
    private final ProviderType providerType;
    private final RoleType roleType;
    private final Collection<GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return userId;
    }

    @Override
    public String getUsername() {
        return userId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public Map<String, Object> getClaims() {
        return null;
    }

    @Override
    public OidcUserInfo getUserInfo() {
        return null;
    }

    @Override
    public OidcIdToken getIdToken() {
        return null;
    }

    public static UserPrincipal create(User user) {
        return new UserPrincipal(
                user.getUserId(),
                user.getPassword(),
                user.getProviderType(),
                RoleType.USER,
                Collections.singletonList(new SimpleGrantedAuthority(RoleType.USER.getCode()))
        );
    }

    public static UserPrincipal create(User user, Map<String, Object> attributes) {
        UserPrincipal userPrincipal = create(user);
        userPrincipal.setAttributes(attributes);

        return userPrincipal;
    }
}
```

**OAuthProviderMissMatchException(OAuth로그인 예외 처리)**
```
public class OAuthProviderMissMatchException extends RuntimeException {

    public OAuthProviderMissMatchException(String message) {
        super(message);
    }
}
```

**RestAuthenticationEntryPoint(Slf4j를 이용한 http 관련 에러 발생시 로그 남김)**
```
@Slf4j
public class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException
    ) throws IOException, ServletException {
        authException.printStackTrace();
        log.info("Responding with unauthorized error. Message := {}", authException.getMessage());
        response.sendError(
                HttpServletResponse.SC_UNAUTHORIZED,
                authException.getLocalizedMessage()
        );
    }
}
```

**TokenValidFailedException(token 에러처리)**
```
public class TokenValidFailedException extends RuntimeException {

    public TokenValidFailedException() {
        super("Failed to generate Token.");
    }

    private TokenValidFailedException(String message) {
        super(message);
    }
}
```

**TokenAuthenticationFilter(token 에러 처리)**
```
@Slf4j
@RequiredArgsConstructor
public class TokenAuthenticationFilter extends OncePerRequestFilter {
    private final AuthTokenProvider tokenProvider;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)  throws ServletException, IOException {

        String tokenStr = HeaderUtil.getAccessToken(request);
        AuthToken token = tokenProvider.convertAuthToken(tokenStr);

        if (token.validate()) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }

}
```

**OAuth2AuthenticationFailureHandler(OAuth2로그인 실패시)**
```
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String targetUrl = CookieUtil.getCookie(request, OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue)
                .orElse(("/"));

        exception.printStackTrace();

        targetUrl = UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("error", exception.getLocalizedMessage())
                .build().toUriString();

        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
```

**OAuth2AuthenticationSuccessHandler(OAuth 로그인 성공)**
```
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final AuthTokenProvider tokenProvider;
    private final AppProperties appProperties;
    private final UserRefreshTokenRepository userRefreshTokenRepository;
    private final OAuth2AuthorizationRequestBasedOnCookieRepository authorizationRequestRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        String targetUrl = determineTargetUrl(request, response, authentication);

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        Optional<String> redirectUri = CookieUtil.getCookie(request, OAuth2AuthorizationRequestBasedOnCookieRepository.REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new IllegalArgumentException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        ProviderType providerType = ProviderType.valueOf(authToken.getAuthorizedClientRegistrationId().toUpperCase());

        OidcUser user = ((OidcUser) authentication.getPrincipal());
        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        Collection<? extends GrantedAuthority> authorities = ((OidcUser) authentication.getPrincipal()).getAuthorities();

        RoleType roleType = hasAuthority(authorities, RoleType.ADMIN.getCode()) ? RoleType.ADMIN : RoleType.USER;

        Date now = new Date();
        AuthToken accessToken = tokenProvider.createAuthToken(
                userInfo.getId(),
                roleType.getCode(),
                new Date(now.getTime() + appProperties.getAuth().getTokenExpiry())
        );

        // refresh 토큰 설정
        long refreshTokenExpiry = appProperties.getAuth().getRefreshTokenExpiry();

        AuthToken refreshToken = tokenProvider.createAuthToken(
                appProperties.getAuth().getTokenSecret(),
                new Date(now.getTime() + refreshTokenExpiry)
        );

        // DB 저장
        UserRefreshToken userRefreshToken = userRefreshTokenRepository.findByUserId(userInfo.getId());
        if (userRefreshToken != null) {
            userRefreshToken.setRefreshToken(refreshToken.getToken());
        } else {
            userRefreshToken = new UserRefreshToken(userInfo.getId(), refreshToken.getToken());
            userRefreshTokenRepository.saveAndFlush(userRefreshToken);
        }

        int cookieMaxAge = (int) refreshTokenExpiry / 60;

        CookieUtil.deleteCookie(request, response, OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN);
        CookieUtil.addCookie(response, OAuth2AuthorizationRequestBasedOnCookieRepository.REFRESH_TOKEN, refreshToken.getToken(), cookieMaxAge);

        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", accessToken.getToken())
                .build().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        authorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean hasAuthority(Collection<? extends GrantedAuthority> authorities, String authority) {
        if (authorities == null) {
            return false;
        }

        for (GrantedAuthority grantedAuthority : authorities) {
            if (authority.equals(grantedAuthority.getAuthority())) {
                return true;
            }
        }
        return false;
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    // Only validate host and port. Let the clients use different paths if they want to
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
```

**TokenAccessDeniedHandler(token에 대한 접근 거부시)**
```
@Component
@RequiredArgsConstructor
public class TokenAccessDeniedHandler implements AccessDeniedHandler {

    private final HandlerExceptionResolver handlerExceptionResolver;

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException {
        //response.sendError(HttpServletResponse.SC_FORBIDDEN, accessDeniedException.getMessage());
        handlerExceptionResolver.resolveException(request, response, null, accessDeniedException);
    }
}
```

**OAuth2UserInfoFactory(페이스북, 구글, 카카오, 네이버 class가 따로 분류되어 있으므로 case로 분류해 해당 class로 넘겨줌)**
```
public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(ProviderType providerType, Map<String, Object> attributes) {
        switch (providerType) {
            case GOOGLE: return new GoogleOAuth2UserInfo(attributes);
            case FACEBOOK: return new FacebookOAuth2UserInfo(attributes);
            case NAVER: return new NaverOAuth2UserInfo(attributes);
            case KAKAO: return new KakaoOAuth2UserInfo(attributes);
            default: throw new IllegalArgumentException("Invalid Provider Type.");
        }
    }
}
```

**OAuth2UserInfoFactory(OAuth로그인시 필요한 데이터 정보)**

```
public abstract class OAuth2UserInfo {
    protected Map<String, Object> attributes;

    public OAuth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public Map<String, Object> getAttributes() {
        return attributes;
    }

    public abstract String getId();

    public abstract String getName();

    public abstract String getEmail();

    public abstract String getImageUrl();
}
```

**GoogleOAuth2UserInfo**
```
public class GoogleOAuth2UserInfo extends OAuth2UserInfo {

    public GoogleOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("sub");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }
}
```

**FacebookOAuth2UserInfo**
```
public class FacebookOAuth2UserInfo extends OAuth2UserInfo {
    public FacebookOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return (String) attributes.get("id");
    }

    @Override
    public String getName() {
        return (String) attributes.get("name");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }

    @Override
    public String getImageUrl() {
        return (String) attributes.get("imageUrl");
    }

    /*
    @Override
    public String getImageUrl() {
        if(attributes.containsKey("picture")) {
            Map<String, Object> pictureObj = (Map<String, Object>) attributes.get("picture");
            if(pictureObj.containsKey("data")) {
                Map<String, Object>  dataObj = (Map<String, Object>) pictureObj.get("data");
                if(dataObj.containsKey("url")) {
                    return (String) dataObj.get("url");
                }
            }
        }
        return null;
    }
    */
}
```
**KakaoOAuth2UserInfo**
```
public class KakaoOAuth2UserInfo extends OAuth2UserInfo {

    public KakaoOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        return attributes.get("id").toString();
    }

    @Override
    public String getName() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("profile_nickname");
    }

    @Override
    public String getEmail() {
        return (String) attributes.get("account_email");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> properties = (Map<String, Object>) attributes.get("properties");

        if (properties == null) {
            return null;
        }

        return (String) properties.get("profile_image");
    }
}
```
**NaverOAuth2UserInfo**
```
public class NaverOAuth2UserInfo extends OAuth2UserInfo {

    public NaverOAuth2UserInfo(Map<String, Object> attributes) {
        super(attributes);
    }

    @Override
    public String getId() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("id");
    }

    @Override
    public String getName() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("name");
    }

    @Override
    public String getEmail() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("email");
    }

    @Override
    public String getImageUrl() {
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");

        if (response == null) {
            return null;
        }

        return (String) response.get("profile_image");
    }
}
```

**OAuth2AuthorizationRequestBasedOnCookieRepository(Cookie설정, add, delete, get)**
```
public class OAuth2AuthorizationRequestBasedOnCookieRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    public final static String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public final static String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    public final static String REFRESH_TOKEN = "refresh_token";
    private final static int cookieExpireSeconds = 180;

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        return CookieUtil.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME)
                .map(cookie -> CookieUtil.deserialize(cookie, OAuth2AuthorizationRequest.class))
                .orElse(null);
    }

    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {
        if (authorizationRequest == null) {
            CookieUtil.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
            CookieUtil.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
            CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
            return;
        }

        CookieUtil.addCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, CookieUtil.serialize(authorizationRequest), cookieExpireSeconds);
        String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
        if (StringUtils.isNotBlank(redirectUriAfterLogin)) {
            CookieUtil.addCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin, cookieExpireSeconds);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request) {
        return this.loadAuthorizationRequest(request);
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {
        return this.loadAuthorizationRequest(request);
    }

    public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
        CookieUtil.deleteCookie(request, response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME);
        CookieUtil.deleteCookie(request, response, REDIRECT_URI_PARAM_COOKIE_NAME);
        CookieUtil.deleteCookie(request, response, REFRESH_TOKEN);
    }
}
```

**CustomOAuth2UserService(User 정보 CRUD)**
```
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        try {
            return this.process(userRequest, user);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User process(OAuth2UserRequest userRequest, OAuth2User user) {
        ProviderType providerType = ProviderType.valueOf(userRequest.getClientRegistration().getRegistrationId().toUpperCase());

        OAuth2UserInfo userInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(providerType, user.getAttributes());
        User savedUser = userRepository.findByUserId(userInfo.getId());

        if (savedUser != null) {
            if (providerType != savedUser.getProviderType()) {
                throw new OAuthProviderMissMatchException(
                        "Looks like you're signed up with " + providerType +
                        " account. Please use your " + savedUser.getProviderType() + " account to login."
                );
            }
            updateUser(savedUser, userInfo);
        } else {
            savedUser = createUser(userInfo, providerType);
        }

        return UserPrincipal.create(savedUser, user.getAttributes());
    }

    private User createUser(OAuth2UserInfo userInfo, ProviderType providerType) {
        LocalDateTime now = LocalDateTime.now();
        User user = new User(
                userInfo.getId(),
                userInfo.getName(),
                userInfo.getEmail(),
                "Y",
                userInfo.getImageUrl(),
                providerType,
                RoleType.USER,
                now,
                now
        );

        return userRepository.saveAndFlush(user);
    }

    private User updateUser(User user, OAuth2UserInfo userInfo) {
        if (userInfo.getName() != null && !user.getUsername().equals(userInfo.getName())) {
            user.setUsername(userInfo.getName());
        }

        if (userInfo.getImageUrl() != null && !user.getProfileImageUrl().equals(userInfo.getImageUrl())) {
            user.setProfileImageUrl(userInfo.getImageUrl());
        }

        return user;
    }
}
```
**CustomUserDetailsService(회원가입시 user정보가 db에 존재하는지 확인, 없다면 create)**
```
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUserId(username);
        if (user == null) {
            throw new UsernameNotFoundException("Can not find username.");
        }
        return UserPrincipal.create(user);
    }
}
```
**AuthToken(권한코드jwt)**
```
@Slf4j
@RequiredArgsConstructor
public class AuthToken {

    @Getter
    private final String token;
    private final Key key;

    private static final String AUTHORITIES_KEY = "role";

    AuthToken(String id, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, expiry);
    }

    AuthToken(String id, String role, Date expiry, Key key) {
        this.key = key;
        this.token = createAuthToken(id, role, expiry);
    }

    private String createAuthToken(String id, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    private String createAuthToken(String id, String role, Date expiry) {
        return Jwts.builder()
                .setSubject(id)
                .claim(AUTHORITIES_KEY, role)
                .signWith(key, SignatureAlgorithm.HS256)
                .setExpiration(expiry)
                .compact();
    }

    public boolean validate() {
        return this.getTokenClaims() != null;
    }

    public Claims getTokenClaims() {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SecurityException e) {
            log.info("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.info("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.info("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.info("JWT token compact of handler are invalid.");
        }
        return null;
    }

    public Claims getExpiredTokenClaims() {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            log.info("Expired JWT token.");
            return e.getClaims();
        }
        return null;
    }
}
```
**AuthTokenProvider(권한코드jwt 설정)**
```
@Slf4j
public class AuthTokenProvider {

    private final Key key;
    private static final String AUTHORITIES_KEY = "role";

    public AuthTokenProvider(String secret) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public AuthToken createAuthToken(String id, Date expiry) {
        return new AuthToken(id, expiry, key);
    }

    public AuthToken createAuthToken(String id, String role, Date expiry) {
        return new AuthToken(id, role, expiry, key);
    }

    public AuthToken convertAuthToken(String token) {
        return new AuthToken(token, key);
    }

    public Authentication getAuthentication(AuthToken authToken) {

        if(authToken.validate()) {

            Claims claims = authToken.getTokenClaims();
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{claims.get(AUTHORITIES_KEY).toString()})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());

            log.debug("claims subject := [{}]", claims.getSubject());
            User principal = new User(claims.getSubject(), "", authorities);

            return new UsernamePasswordAuthenticationToken(principal, authToken, authorities);
        } else {
            throw new TokenValidFailedException();
        }
    }

}
```
**CookieUtil(쿠키 설정)**
```
public class CookieUtil {

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    return Optional.of(cookie);
                }
            }
        }
        return Optional.empty();
    }

    public static void addCookie(HttpServletResponse response, String name, String value, int maxAge) {
        Cookie cookie = new Cookie(name, value);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(maxAge);

        response.addCookie(cookie);
    }

    public static void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null && cookies.length > 0) {
            for (Cookie cookie : cookies) {
                if (name.equals(cookie.getName())) {
                    cookie.setValue("");
                    cookie.setPath("/");
                    cookie.setMaxAge(0);
                    response.addCookie(cookie);
                }
            }
        }
    }

    public static String serialize(Object obj) {
        return Base64.getUrlEncoder()
                .encodeToString(SerializationUtils.serialize(obj));
    }

    public static <T> T deserialize(Cookie cookie, Class<T> cls) {
        return cls.cast(
                SerializationUtils.deserialize(
                        Base64.getUrlDecoder().decode(cookie.getValue())
                )
        );
    }

}
```
**HeaderUtil(Header data설정)**
```
public class HeaderUtil {

    private final static String HEADER_AUTHORIZATION = "Authorization";
    private final static String TOKEN_PREFIX = "Bearer ";

    public static String getAccessToken(HttpServletRequest request) {
        String headerValue = request.getHeader(HEADER_AUTHORIZATION);

        if (headerValue == null) {
            return null;
        }

        if (headerValue.startsWith(TOKEN_PREFIX)) {
            return headerValue.substring(TOKEN_PREFIX.length());
        }

        return null;
    }
}
```
