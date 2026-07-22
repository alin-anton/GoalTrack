package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.update.TaskUpdateDto;
import com.example.goaltrack_backend.mapper.ProjectMapper;
import com.example.goaltrack_backend.mapper.TaskMapper;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.model.TaskModel;
import com.example.goaltrack_backend.model.UserModel;
import com.example.goaltrack_backend.repository.ProjectRepository;
import com.example.goaltrack_backend.repository.TaskRepository;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.service.ProjectService;
import com.example.goaltrack_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final UserRepository userRepository;
    private final ProjectService projectService;

    @Override
    public TaskDtoResponse addTask(String title,
                                   LocalDateTime deadline, String userID, String projectID) {

        String finalProject = (projectID != null && projectID.isEmpty()) ? null : projectID;

        TaskModel taskModel = TaskModel.builder()
                .title(title)
                .userID(userID)
                .status("IN PROGRESS")
                .deadline(deadline)
                .projectID(finalProject)
                .build();

        taskRepository.save(taskModel);

        UserModel user = userRepository.findById(taskModel.getUserID()).get();
        Long comp = user.getTotalTasks() + 1L;
        user.setTotalTasks(comp);
        userRepository.save(user);

        return taskMapper.toDto(taskModel);
    }

    @Override
    public void finishTask(String idTask){
        TaskModel taskModel = taskRepository.findById(idTask).get();
        taskModel.setStatus("COMPLETED");
        taskRepository.save(taskModel);
        projectService.completeProject(taskModel.getProjectID());

        UserModel user = userRepository.findById(taskModel.getUserID()).get();
        Long comp = user.getFinishedTasks() + 1L;
        user.setFinishedTasks(comp);
        userRepository.save(user);

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
            UserModel user = userRepository.findById(task.getUserID()).get();
            Long comp = user.getDueTasks() + 1L;
            user.setDueProjects(comp);
            userRepository.save(user);
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

    @Override
    public TaskDtoResponse getTaskById(String id){
        TaskModel model = taskRepository.findById(id).get();
        return taskMapper.toDto(model);
    }
}
