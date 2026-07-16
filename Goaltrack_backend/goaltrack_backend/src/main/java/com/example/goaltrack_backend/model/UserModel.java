package com.example.goaltrack_backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class UserModel {

    @Id
    private String id;

    private String username;

    private String email;

    private String password;

    private Long totalTasks;

    private Long finishedTasks;

    private Long dueTasks;

    private Long totalProjects;

    private Long finishedProjects;

    private Long dueProjects;
}
