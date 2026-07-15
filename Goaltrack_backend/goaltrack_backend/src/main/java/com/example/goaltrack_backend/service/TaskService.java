package com.example.goaltrack_backend.service;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

public interface TaskService {

    TaskDtoResponse addTask(String title,LocalDateTime deadline,String userID,String projectID);

    void finishTask(String idTask);

    void dueTasks(LocalDateTime deadline);

}
