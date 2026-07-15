package com.example.goaltrack_backend.repository;

import com.example.goaltrack_backend.model.TaskModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends MongoRepository<TaskModel, String> {
}
