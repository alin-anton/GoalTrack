package com.example.goaltrack_backend.mapper;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.model.TaskModel;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface TaskMapper {

    TaskDtoResponse toDto(TaskModel taskModel);

    List<TaskDtoResponse> toDtoList(List<TaskModel> taskModels);
}
