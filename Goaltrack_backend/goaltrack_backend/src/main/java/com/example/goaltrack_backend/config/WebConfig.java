package com.example.goaltrack_backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                // Permitem originile de dezvoltare și, eventual, cele de producție ulterior
                .allowedOriginPatterns("http://localhost:3000", "http://localhost:8080")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true) // Acum este permis deoarece folosim patterns
                .maxAge(3600);
    }
}