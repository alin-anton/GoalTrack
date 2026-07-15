package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.mapper.ProjectMapper;
import com.example.goaltrack_backend.mapper.TaskMapper;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.repository.ProjectRepository;
import com.example.goaltrack_backend.repository.TaskRepository;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskImpl implements TaskService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;


}
