package com.example.goaltrack_backend.controller;


import com.example.goaltrack_backend.dto.UserDtoResponse;
import com.example.goaltrack_backend.dto.login.AuthResponse;
import com.example.goaltrack_backend.dto.login.LoginRequest;
import com.example.goaltrack_backend.dto.login.RegisterRequest;
import com.example.goaltrack_backend.mapper.UserMapper;
import com.example.goaltrack_backend.model.UserModel;
import com.example.goaltrack_backend.repository.UserRepository;
import com.example.goaltrack_backend.security.SecurityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final SecurityService securityService;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        UserModel userModel = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Nu exista user-ul"));

        String jwtToken = securityService.generateToken(userDetails);

        UserDtoResponse userDtoResponse = userMapper.toDto(userModel);


        return ResponseEntity.ok(new AuthResponse(jwtToken,userDtoResponse));
    }


    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){

        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Email-ul este folosit");
        }

        UserModel userModel = new UserModel();
        userModel.setUsername(request.getUsername());
        userModel.setEmail(request.getEmail());
        userModel.setPassword(passwordEncoder.encode(request.getPassword()));

        userModel.setTotalTasks(0L);
        userModel.setFinishedTasks(0L);
        userModel.setDueTasks(0L);
        userModel.setTotalProjects(0L);
        userModel.setFinishedProjects(0L);
        userModel.setDueProjects(0L);

        userRepository.save(userModel);
        
        return ResponseEntity.ok("Cont creat cu succes!");
    }

}
