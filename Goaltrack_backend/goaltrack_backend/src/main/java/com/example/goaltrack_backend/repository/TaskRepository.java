package com.example.goaltrack_backend.repository;

import com.example.goaltrack_backend.model.TaskModel;
import org.springframework.data.domain.Limit;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<TaskModel, String> {

    List<TaskModel> findByDeadlineBeforeAndStatusNot(LocalDateTime deadline, String status);
}
