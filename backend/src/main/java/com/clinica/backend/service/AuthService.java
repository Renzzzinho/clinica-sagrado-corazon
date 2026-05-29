package com.clinica.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.clinica.backend.dto.LoginRequest;
import com.clinica.backend.dto.LoginResponse;
import com.clinica.backend.model.Usuario;
import com.clinica.backend.repository.UsuarioRepository;
import com.clinica.backend.security.JwtService;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest request) {

        Usuario usuario = usuarioRepository
                .findByEmail(request.getEmail())

                .orElseThrow(() ->
                        new RuntimeException("Usuario no encontrado")
                );

        boolean passwordCorrecto =
                passwordEncoder.matches(
                        request.getPassword(),
                        usuario.getPassword()
                );

        if (!passwordCorrecto) {

            throw new RuntimeException(
                    "Contraseña incorrecta"
            );
        }

       String token =
        jwtService.generarToken(
                usuario
        );

        return new LoginResponse(token);
    }
}