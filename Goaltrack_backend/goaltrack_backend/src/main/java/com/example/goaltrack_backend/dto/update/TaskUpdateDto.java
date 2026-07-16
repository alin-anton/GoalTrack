package com.example.goaltrack_backend.dto.update;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TaskUpdateDto {

    private String title;
    private LocalDateTime deadline;
}
