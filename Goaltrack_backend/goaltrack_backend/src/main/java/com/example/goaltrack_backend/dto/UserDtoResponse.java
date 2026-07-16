package com.example.goaltrack_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDtoResponse {

    private String username;

    private String email;

    private Long totalTasks;

    private Long finishedTasks;

    private Long dueTasks;

    private Long totalProjects;

    private Long finishedProjects;

    private Long dueProjects;

}
