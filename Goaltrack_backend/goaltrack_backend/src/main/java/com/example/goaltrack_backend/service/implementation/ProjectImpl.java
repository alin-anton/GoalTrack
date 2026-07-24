package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.dto.ProjectDtoResponse;
import com.example.goaltrack_backend.dto.update.ProjectUpdateDto;
import com.example.goaltrack_backend.mapper.ProjectMapper;
import com.example.goaltrack_backend.mapper.TaskMapper;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.model.ProjectModel;
import com.example.goaltrack_backend.model.TaskModel;
import com.example.goaltrack_backend.model.UserModel;
import com.example.goaltrack_backend.repository.ProjectRepository;
import com.example.goaltrack_backend.repository.TaskRepository;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.service.ProjectService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProjectImpl implements ProjectService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;



    @Override
    public ProjectDtoResponse addProject(String title, String description,
                                  LocalDateTime deadline, String userID){

        ProjectModel projectModel = ProjectModel.builder()
                .userID(userID)
                .deadline(deadline)
                .title(title)
                .status("IN PROGRESS")
                .description(description).build();

        projectRepository.save(projectModel);

        UserModel user = userRepository.findById(projectModel.getUserID()).get();
        Long count = user.getTotalProjects() + 1L;
        user.setTotalProjects(count);
        userRepository.save(user);
        return projectMapper.toDto(projectModel);
    }

    @Override
    public List<ProjectDtoResponse> getProjectsForUser(String idUser){
        List<ProjectModel> models = projectRepository.getProjectModelsByUserID(idUser);
        return projectMapper.toDtoList(models);
    }

    @Override
    public ProjectDtoResponse getProjectById(String id){
        ProjectModel model = projectRepository.findById(id).get();
        return projectMapper.toDto(model);
    }

    @Override
    public void deleteProject(String id){
        if(!projectRepository.existsById(id)){
            return;
        }

        List<TaskModel> tasksForProj = taskRepository.getTaskModelsByProjectID(id);
        for(TaskModel task : tasksForProj){
            taskRepository.deleteById(task.getId());
        }

        projectRepository.deleteById(id);
    }

    @Override
    public ProjectDtoResponse updateProject(String id, ProjectUpdateDto dto){
        ProjectModel model = projectRepository.findById(id).get();

        model.setDeadline(dto.getDeadline());
        model.setTitle(dto.getTitle());
        model.setDescription(dto.getDescription());

        projectRepository.save(model);
        return projectMapper.toDto(model);
    }

    @Override
    @Scheduled(cron = "0 0 * * * *")
    public void dueProjects(){
        LocalDateTime deadline = LocalDateTime.now();

        List<ProjectModel> models = projectRepository.findProjectModelsByDeadlineBefore(deadline);

        for(ProjectModel proj : models){
            proj.setStatus("DUE");
            UserModel user = userRepository.findById(proj.getUserID()).get();
            Long comp = user.getDueProjects() + 1L;
            user.setDueProjects(comp);
            userRepository.save(user);
        }

        projectRepository.saveAll(models);
    }

    @Override
    public void completeProject(String idProject){

        ProjectModel projectModel = projectRepository.findById(idProject).get();
        if(taskRepository.countByProjectIDAndStatusNot(idProject,"COMPLETED") == 0){
            projectModel.setStatus("COMPLETED");
        }
        projectRepository.save(projectModel);

        UserModel user = userRepository.findById(projectModel.getUserID()).get();
        Long comp = user.getFinishedProjects() + 1L;
        user.setFinishedProjects(comp);
        userRepository.save(user);

    }

}
