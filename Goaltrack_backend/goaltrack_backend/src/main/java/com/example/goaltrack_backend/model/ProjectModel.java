package com.example.goaltrack_backend.model;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "projects")
public class ProjectModel {

    @Id
    private String id;

    private String title;

    private String description;

    @CreatedDate
    private LocalDateTime creationDate;

    private LocalDateTime deadline;

    private String userID;

}
