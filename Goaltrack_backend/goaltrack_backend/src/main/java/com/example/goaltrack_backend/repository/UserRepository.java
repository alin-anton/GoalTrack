package com.example.goaltrack_backend.repository;

import com.example.goaltrack_backend.model.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<UserModel, String> {
    UserModel getUserModelById(String id);

    UserModel getUserModelByEmail(String email);

    Optional<UserModel> findByEmail(String email);

}
