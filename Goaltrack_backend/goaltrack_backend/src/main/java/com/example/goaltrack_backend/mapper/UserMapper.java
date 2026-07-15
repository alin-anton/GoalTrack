package com.example.goaltrack_backend.mapper;

import com.example.goaltrack_backend.dto.UserDtoResponse;
import com.example.goaltrack_backend.model.UserModel;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE)
public interface UserMapper {

    UserDtoResponse toDto(UserModel userModel);

    List<UserDtoResponse> toDtoList(List<UserModel> userModels);
}
