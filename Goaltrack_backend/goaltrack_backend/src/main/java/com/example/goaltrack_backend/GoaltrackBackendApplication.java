package com.example.goaltrack_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@SpringBootApplication
@EnableMongoAuditing
public class GoaltrackBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(GoaltrackBackendApplication.class, args);
    }

}
