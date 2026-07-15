package com.example.goaltrack_backend.service;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.UserDtoResponse;

import java.util.List;

public interface UserService {

    UserDtoResponse getUserById(String idUser);

    List<TaskDtoResponse> getTasksForUser(String idUser);
}
