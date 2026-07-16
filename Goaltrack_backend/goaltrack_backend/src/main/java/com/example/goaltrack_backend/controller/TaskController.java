package com.example.goaltrack_backend.controller;

import com.example.goaltrack_backend.dto.TaskDtoResponse;
import com.example.goaltrack_backend.dto.update.TaskUpdateDto;
import com.example.goaltrack_backend.service.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {
    private final TaskService taskService;


    @PostMapping
    public ResponseEntity<TaskDtoResponse> addTask(@RequestParam String title,
                                                   @RequestParam LocalDateTime deadline,
                                                   @RequestParam String userID,
                                                   @RequestParam(required = false) String projectID){
        TaskDtoResponse taskDtoResponse = taskService.addTask(title, deadline, userID, projectID);
        return new ResponseEntity<>(taskDtoResponse, HttpStatus.CREATED);
    }

    @PatchMapping("/{idTask}")
    public ResponseEntity<Void> finishTask(@PathVariable String idTask){
        taskService.finishTask(idTask);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{idUser}")
    public ResponseEntity<List<TaskDtoResponse>> getByUser(@PathVariable String idUser){
        return ResponseEntity.ok(taskService.getTasksForUser(idUser));
    }

    @GetMapping("/project/{idProiect}")
    public ResponseEntity<List<TaskDtoResponse>> getByProject(@PathVariable String idProiect){
        return ResponseEntity.ok(taskService.getTasksForProject(idProiect));
    }

    @DeleteMapping("/{idTask}")
    public ResponseEntity<Void> deleteTask(@PathVariable String idTask){
        taskService.deleteTask(idTask);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{idTask}")
    public ResponseEntity<TaskDtoResponse> updateTask(@PathVariable String idTask,
                                                      @RequestBody TaskUpdateDto dto){

        return ResponseEntity.ok(taskService.updateTask(idTask, dto));
    }

}
