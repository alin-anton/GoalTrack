package com.example.goaltrack_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectDtoResponse {

    private String title;

    private String description;

    private LocalDateTime creationDate;

    private LocalDateTime deadline;

}
