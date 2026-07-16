package com.example.goaltrack_backend.service;

import com.example.goaltrack_backend.dto.ProjectDtoResponse;

import java.time.LocalDateTime;
import java.util.List;

public interface ProjectService {

    ProjectDtoResponse addProject(String title,String description,
                                  LocalDateTime deadline,String userID);

    List<ProjectDtoResponse> getProjectsForUser(String idUser);

    ProjectDtoResponse getProjectById(String id);

    void deleteProject(String id);

    ProjectDtoResponse updateProject(String id,String title,String description, LocalDateTime deadline);

}
