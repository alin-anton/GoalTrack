package com.example.goaltrack_backend.dto.login;

import com.example.goaltrack_backend.dto.UserDtoResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponse {
    private String token;
    private UserDtoResponse user;
}
