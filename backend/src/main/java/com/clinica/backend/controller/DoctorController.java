package com.clinica.backend.controller;

import com.clinica.backend.model.Doctor;
import com.clinica.backend.service.DoctorService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/doctores")
public class DoctorController {

    @Autowired
    private DoctorService service;

    @PostMapping
    public Doctor crear(@RequestBody Doctor doctor) {
        return service.crear(doctor);
    }

    @GetMapping
    public List<Doctor> listar() {
        return service.listar();
    }

    @GetMapping("/{id}")
    public Doctor obtener(@PathVariable Long id) {
        return service.obtenerPorId(id);
    }

    @PutMapping("/{id}")
    public Doctor actualizar(@PathVariable Long id, @RequestBody Doctor doctor) {
        return service.actualizar(id, doctor);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        service.eliminar(id);
    }

    @GetMapping("/especialidad/{esp}")
    public List<Doctor> porEspecialidad(@PathVariable String esp) {
        return service.buscarPorEspecialidad(esp);
    }
}