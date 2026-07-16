package com.example.goaltrack_backend.service.implementation;

import com.example.goaltrack_backend.dto.ProjectDtoResponse;
import com.example.goaltrack_backend.dto.update.ProjectUpdateDto;
import com.example.goaltrack_backend.mapper.ProjectMapper;
import com.example.goaltrack_backend.mapper.TaskMapper;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.model.ProjectModel;
import com.example.goaltrack_backend.repository.ProjectRepository;
import com.example.goaltrack_backend.repository.TaskRepository;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.service.ProjectService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
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
                .description(description).build();

        projectRepository.save(projectModel);

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

}
