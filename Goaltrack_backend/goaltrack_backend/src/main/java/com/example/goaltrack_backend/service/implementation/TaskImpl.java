package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.mapper.ProjectMapper;
import com.example.goaltrack_backend.mapper.TaskMapper;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.model.TaskModel;
import com.example.goaltrack_backend.repository.ProjectRepository;
import com.example.goaltrack_backend.repository.TaskRepository;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskImpl implements TaskService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;

    @Override
    public TaskDtoResponse addTask(String title,
                                   LocalDateTime deadline, String userID, String projectID) {

        TaskModel taskModel = null;
        taskModel.setTitle(title);
        taskModel.setStatus("IN PROGRESS");
        taskModel.setDeadline(deadline);
        taskModel.setUserID(userID);
        if(projectID != null){
            taskModel.setProjectID(projectID);
        }

        return taskMapper.toDto(taskModel);
    }

    @Override
    public void finishTask(String idTask){
        TaskModel taskModel = taskRepository.findById(idTask).get();
        taskModel.setStatus("COMPLETED");
        taskRepository.save(taskModel);
    }

    @Override
    @Scheduled(cron = "0 0 * * * *")
    public void dueTasks(LocalDateTime deadline){
        List<TaskModel> models = taskRepository.findByDeadlineBeforeAndStatusNot(deadline, "COMPLETED");

        if(models.isEmpty()){
            return;
        }

        for(TaskModel task : models){
            task.setStatus("DUE");
        }

        taskRepository.saveAll(models);
    }


    
}
