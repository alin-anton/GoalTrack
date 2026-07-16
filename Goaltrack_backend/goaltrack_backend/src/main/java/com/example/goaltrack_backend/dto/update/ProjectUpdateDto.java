package com.example.goaltrack_backend.dto.update;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ProjectUpdateDto {
    String title;
    String description;
    LocalDateTime deadline;
}
