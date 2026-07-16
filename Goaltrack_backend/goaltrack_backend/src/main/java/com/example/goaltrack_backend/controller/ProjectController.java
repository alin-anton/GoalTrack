package com.example.goaltrack_backend.controller;

import com.example.goaltrack_backend.dto.ProjectDtoResponse;
import com.example.goaltrack_backend.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectDtoResponse> createProject(@RequestParam String title,
                                                            @RequestParam String description,
                                                            @RequestParam @DateTimeFormat
                                                                    (iso = DateTimeFormat.ISO.DATE_TIME)
                                                                LocalDateTime deadline,
                                                            @RequestParam String userID){

        ProjectDtoResponse response = projectService.addProject(title,description,deadline,userID);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/{idProiect}")
    public ResponseEntity<ProjectDtoResponse> getById(@PathVariable String idProiect){
        return ResponseEntity.ok( projectService.getProjectById(idProiect));
    }

    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<ProjectDtoResponse>> getByUser(@PathVariable String idUser){
        return ResponseEntity.ok( projectService.getProjectsForUser(idUser));
    }

    @DeleteMapping("/{idProiect}")
    public ResponseEntity<Void> deleteById(@PathVariable String idProiect){
        projectService.deleteProject(idProiect);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{idProiect}")
    public ResponseEntity<ProjectDtoResponse> updateProiect(@PathVariable String idProiect,
                                                            @RequestParam String title,
                                                            @RequestParam String description,
                                                            @RequestParam LocalDateTime deadline){

        return ResponseEntity.ok(projectService.updateProject(idProiect, title, description, deadline));
    }

}
