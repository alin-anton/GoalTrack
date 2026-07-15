package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.UserDtoResponse;
import com.example.goaltrack_backend.mapper.ProjectMapper;
import com.example.goaltrack_backend.mapper.TaskMapper;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.model.TaskModel;
import com.example.goaltrack_backend.model.UserModel;
import com.example.goaltrack_backend.repository.ProjectRepository;
import com.example.goaltrack_backend.repository.TaskRepository;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;

    @Override
    public UserDtoResponse getUserById(String idUser){
        UserModel userModel = userRepository.getUserModelById(idUser);
        return userMapper.toDto(userModel);
    }

    @Override
    public List<TaskDtoResponse> getTasksForUser(String idUser){
        List<TaskModel> models = taskRepository.getTaskModelsByUserID(idUser);
        return taskMapper.toDtoList(models);
    }

    

}
