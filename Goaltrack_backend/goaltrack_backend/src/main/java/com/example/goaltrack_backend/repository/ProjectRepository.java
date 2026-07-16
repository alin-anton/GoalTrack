package com.example.goaltrack_backend.repository;

import com.example.goaltrack_backend.model.ProjectModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<ProjectModel, String> {
    List<ProjectModel> getProjectModelsByUserID(String idUser);

    List<ProjectModel> findProjectModelsByDeadlineBefore(LocalDateTime deadline);

}
