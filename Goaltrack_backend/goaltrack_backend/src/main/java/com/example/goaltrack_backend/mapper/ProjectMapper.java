package com.example.goaltrack_backend.mapper;

import com.example.goaltrack_backend.dto.ProjectDtoResponse;
import com.example.goaltrack_backend.model.ProjectModel;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface ProjectMapper {

    ProjectDtoResponse toDto(ProjectModel projectModel);

    List<ProjectDtoResponse> toDtoList(List<ProjectModel> projectModels);
}
