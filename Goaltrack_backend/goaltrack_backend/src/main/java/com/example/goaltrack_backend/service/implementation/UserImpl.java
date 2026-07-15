package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.dto.ProjectDtoResponse;
import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.UserDtoResponse;
import com.example.goaltrack_backend.mapper.ProjectMapper;
import com.example.goaltrack_backend.mapper.TaskMapper;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.model.ProjectModel;
import com.example.goaltrack_backend.model.TaskModel;
import com.example.goaltrack_backend.model.UserModel;
import com.example.goaltrack_backend.repository.ProjectRepository;
import com.example.goaltrack_backend.repository.TaskRepository;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.service.UserService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Builder
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

    @Override
    public List<ProjectDtoResponse> getProjectsForUser(String idUser){
        List<ProjectModel> models = projectRepository.getProjectModelsByUserID(idUser);
        return projectMapper.toDtoList(models);
    }

    @Override
    public UserDtoResponse createUser( String username, String email, String password){
        UserModel userModel = null;
        userModel.setEmail(email);
        userModel.setUsername(username);
        userModel.setPassword(password);
        userRepository.save(userModel);

        return userMapper.toDto(userModel);
    }

    @Override
    public void deleteUserById(String id){
        if(!userRepository.existsById(id)){
            throw new IllegalArgumentException("Nu exista acest user");
        }
        userRepository.deleteById(id);
    }



}
