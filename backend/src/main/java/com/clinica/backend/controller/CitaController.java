package com.clinica.backend.controller;

import java.util.List;

import com.clinica.backend.dto.CitaRequest;
import com.clinica.backend.model.Cita;
import com.clinica.backend.service.CitaService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{id}")
    public Cita buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }
}
