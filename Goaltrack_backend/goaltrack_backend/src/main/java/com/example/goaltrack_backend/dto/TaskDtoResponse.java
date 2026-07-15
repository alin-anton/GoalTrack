package com.example.goaltrack_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskDtoResponse {

    private String title;

    private String status;

    private LocalDateTime creationDate;

    private LocalDateTime deadline;
}
