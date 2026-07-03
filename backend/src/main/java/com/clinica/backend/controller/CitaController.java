package com.clinica.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.clinica.backend.dto.CitaRequest;
import com.clinica.backend.model.Cita;
import com.clinica.backend.service.CitaService;


@RestController
@RequestMapping("/api/citas")
public class CitaController {

    @Autowired
    private CitaService service;

    @PostMapping
    public Cita crear(@RequestBody CitaRequest request) {
        return service.crear(request);
    }

    @PutMapping("/{id}/cancelar")
    public Cita cancelar(@PathVariable Long id) {
        return service.cancelar(id);
    }

    @PutMapping("/{id}/atender")
    public Cita atender(@PathVariable Long id) {
        return service.atender(id);
    }

    @GetMapping
    public List<Cita> listar() {
        return service.listar();
    }

@GetMapping("/mis-citas-doctor")
public List<Cita> obtenerMisCitas(Authentication authentication) {

    User usuario =
            (User) authentication.getPrincipal();

    return service.obtenerMisCitas(
            usuario.getUsername()
    );
}
@GetMapping("/mis-citas-paciente")
public List<Cita> obtenerMisCitasPaciente(Authentication authentication) {

    User usuario =
            (User) authentication.getPrincipal();

    return service.obtenerMisCitasPaciente(
            usuario.getUsername()
    );
}
    

    @GetMapping("/{id}")
    public Cita buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }
}
