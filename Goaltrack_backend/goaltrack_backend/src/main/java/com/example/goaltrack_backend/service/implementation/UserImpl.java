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
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDtoResponse getUserById(String idUser){
        UserModel userModel = userRepository.getUserModelById(idUser);
        return userMapper.toDto(userModel);
    }


    @Override
    public UserDtoResponse createUser( String username, String email, String password){
        UserModel userModel = UserModel.builder()
                .email(email)
                .username(username)
                .password(passwordEncoder.encode(password))
                .build();

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

    @Override
    public UserDtoResponse getUserByEmail(String email){
        UserModel model = userRepository.getUserModelByEmail(email);
        return userMapper.toDto(model);
    }


    @Override
    public UserDtoResponse updatePassword(String idUser, String oldPassword, String newPassword){
        UserModel model = userRepository.getUserModelById(idUser);
        if(oldPassword == model.getPassword()){
            model.setPassword(newPassword);
        }

        userRepository.save(model);
        return userMapper.toDto(model);
    }

}
