package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.update.TaskUpdateDto;
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

        TaskModel taskModel = TaskModel.builder()
                .title(title)
                .userID(userID)
                .status("IN PROGRESS")
                .deadline(deadline)
                .projectID(projectID)
                .build();

        taskRepository.save(taskModel);

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
    public void dueTasks(){
        LocalDateTime deadline = LocalDateTime.now();

        List<TaskModel> models = taskRepository.findByDeadlineBeforeAndStatusNot(deadline, "COMPLETED");

        if(models.isEmpty()){
            return;
        }

        for(TaskModel task : models){
            task.setStatus("DUE");
        }

        taskRepository.saveAll(models);
    }


    @Override
    public List<TaskDtoResponse> getTasksForProject(String project){
        List<TaskModel> models = taskRepository.getTaskModelsByProjectID(project);
        return taskMapper.toDtoList(models);
    }

    @Override
    public List<TaskDtoResponse> getTasksForUser(String idUser){
        List<TaskModel> models = taskRepository.getTaskModelsByUserID(idUser);
        return taskMapper.toDtoList(models);
    }

    @Override
    public void deleteTask(String id){
        if(!taskRepository.existsById(id)){
            return;
        }

        taskRepository.deleteById(id);
    }

    @Override
    public TaskDtoResponse updateTask(String id,TaskUpdateDto dto){

        TaskModel model = taskRepository.findById(id).get();
        model.setDeadline(dto.getDeadline());
        model.setTitle(dto.getTitle());

        taskRepository.save(model);

        return taskMapper.toDto(model);
    }


}
