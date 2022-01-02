//package com.PlayProject.web;
//
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import static org.hamcrest.Matchers.is;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
//import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
//
//// 스프링부트 테스트와 JUnit 사이에 연결자 역할
//@RunWith(SpringRunner.class)
//// Web(Spring MVC)에 집중할 수 있는 어노테이션
//// @Controller, @ControllerAdvice 등을 사용 가능
//@WebMvcTest(controllers = HelloController.class)
//@AutoConfigureMockMvc
//// 테스트 클래스는 Test를 붙임(관례)
//public class HelloControllerTest {
//
//    // 스프링이 관리하는 bean을 주입받음
//    @Autowired
//    // 웹 API를 테스트할때 사용, GET,POST등에 대한 API 테스트
//    private MockMvc mvc;
//
//    // @Test로 test 메서드임을 명시
//    @Test
//    public void hello가_리턴된다() throws Exception {
//        String hello = "hello";
//        // MockMvc를 통해 /hello 주소로 HTTP GET 요청을 한다, 체이닝이 지원되어 여러 검증 기능을 이어서 선언 가능
//        mvc.perform(get("/hello"))
//                .andExpect(status().isOk()) // mvc.perform의 결과를 검증, HTTP Header의 Status를 검증, ex : 200, 404, 500등의 상태
//                .andExpect(content().string(hello)); // mvc.perform의 결과를 검증, 응답 본문의 내용을 검증, "hello"값이 맞는지
//    }
//
//    @Test
//    public void helloDto가_리턴된다() throws Exception {
//        String name = "hello";
//        int amount = 1000;
//
//        mvc.perform(
//                get("/hello/dto")
//                        // API : 내가 구현하지 않은 어떠한 기능, 코드를 테스트, 프로그램과 사용자를 연결하는 가교, 오픈 API는 기능을 가져올수도있음
//                        // param : API 테스트할 때 사용될 요청 파라미터를 설정, 단 값은 String만 허용, 다른 타입의 데이터는 String으로 변경해야함
//                        .param("name", name)
//                        .param("amount", String.valueOf(amount)))
//                        .andExpect(status().isOk())
//                        // jsonPath : JSON 응답값을 필드 별로 검증할 수 있는 메소드, $를 기준으로 빌드명을 명시
//                        .andExpect(jsonPath("$.name", is(name)))
//                        .andExpect(jsonPath("$.amount", is(amount)));
//    }
//}
