//package com.PlayProject.web.Dto;
//
//import org.junit.Test;
//
//import static org.assertj.core.api.Assertions.assertThat;
//// JUnit의 기본 assertThat이 아닌 assertj의 assertThat을 사용
//// why? JUnit을 쓰게되면 is()와 같이 CoreMatchers 라이브러리가 필요함 && 자동완성이 좀 더 확실하게 지원됨
//
//public class HelloResponseDtoTest {
//
//    @Test
//    public void 롬복_기능_테스트() {
//        // given
//        String name = "test";
//        int amount = 1000;
//
//        // when
//        HelloResponseDto dto = new HelloResponseDto(name, amount);
//
//        // then
//        // assertThat라는 테스트 검증 라이브러리의 검증 메소드
//        // 검증하고 싶은 대상을 메소드 인자로 받음
//        // 메소드 체이닝이 지원되어 다른 메소드와 이어서 사용 가능
//        // assertj의 동등 비교 메소드, assertThat에 있는 값과 isEqualTo의 값을 비교해 같을 때만 성공
//        assertThat(dto.getName()).isEqualTo(name);
//        assertThat(dto.getAmount()).isEqualTo(amount);
//    }
//}
