package com.example.goaltrack_backend.service;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.update.TaskUpdateDto;

import java.time.LocalDateTime;
import java.util.List;

public interface TaskService {

    TaskDtoResponse addTask(String title,LocalDateTime deadline,String userID,String projectID);

    void finishTask(String idTask);

    void dueTasks();

    List<TaskDtoResponse> getTasksForProject(String project);

    List<TaskDtoResponse> getTasksForUser(String idUser);

    void deleteTask(String id);

    TaskDtoResponse updateTask(String id,TaskUpdateDto taskUpdateDto);

    TaskDtoResponse getTaskById(String id);
}
