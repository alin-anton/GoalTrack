package com.example.goaltrack_backend.service;

import com.example.goaltrack_backend.dto.ProjectDtoResponse;
import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.UserDtoResponse;

import java.util.List;

public interface UserService {

    UserDtoResponse getUserById(String idUser);

    List<TaskDtoResponse> getTasksForUser(String idUser);

    List<ProjectDtoResponse> getProjectsForUser(String idUser);

    UserDtoResponse createUser(String username, String email, String password);

    void deleteUserById(String id);
}
