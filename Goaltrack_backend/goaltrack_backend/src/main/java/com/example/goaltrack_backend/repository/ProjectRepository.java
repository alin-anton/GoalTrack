package com.example.goaltrack_backend.repository;

import com.example.goaltrack_backend.model.ProjectModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<ProjectModel, String> {
}
