package com.example.goaltrack_backend.controller;

import com.example.goaltrack_backend.dto.UserDtoResponse;
import com.example.goaltrack_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class UserController {
    private final UserService userService;


    @GetMapping("/{idUser}")
    public ResponseEntity<UserDtoResponse> getById(@PathVariable String idUser){
        return ResponseEntity.ok(userService.getUserById(idUser));
    }

    @PostMapping
    public ResponseEntity<UserDtoResponse> addUser(@RequestParam String username,
                                                   @RequestParam String email,
                                                   @RequestParam String password){

        UserDtoResponse response = userService.createUser(username, email, password);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping("{idUser}")
    public ResponseEntity<Void> deleteUser(@PathVariable String idUser){

        userService.deleteUserById(idUser);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDtoResponse> getByEmail(@PathVariable String email){
        return ResponseEntity.ok(userService.getUserByEmail(email));
    }

    @PatchMapping("/{idUser}")
    public ResponseEntity<UserDtoResponse> updatePassword(@PathVariable String idUser,
                                                          @RequestParam String old,
                                                          @RequestParam String news){

        return ResponseEntity.ok(userService.updatePassword(idUser, old, news));
    }

}
