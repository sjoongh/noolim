package com.PlayProject;

import com.PlayProject.config.properties.AppProperties;
import com.PlayProject.config.properties.CorsProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
        CorsProperties.class,
        AppProperties.class
})
public class OauthLoginApplication {
    //gg
    public static void main(String[] args) {
        SpringApplication.run(OauthLoginApplication.class, args);
    }

}
