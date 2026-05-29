package com.clinica.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.backend.model.Paciente;
import com.clinica.backend.repository.PacienteRepository;

@Service
public class PacienteService {

    @Autowired
    private PacienteRepository repository;

    public Paciente crear(Paciente paciente) {

        // Validación básica
        if (repository.findByEmail(paciente.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (repository.findByDni(
                paciente.getDni()
        ).isPresent()) {

            throw new RuntimeException(
                    "El DNI ya está registrado"
            );
        }

        return repository.save(paciente);
    }

    public List<Paciente> listar() {
        return repository.findAll();
    }

    public Paciente obtenerPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    }

    public Paciente actualizar(Long id, Paciente data) {

        Paciente paciente
                = obtenerPorId(id);

        paciente.setNombre(
                data.getNombre()
        );

        paciente.setDni(
                data.getDni()
        );

        paciente.setEmail(
                data.getEmail()
        );

        paciente.setTelefono(
                data.getTelefono()
        );

        paciente.setDireccion(
                data.getDireccion()
        );

        paciente.setFechaNacimiento(
                data.getFechaNacimiento()
        );

        return repository.save(paciente);
    }

    public void eliminar(Long id) {

        Paciente paciente
                = obtenerPorId(id);

        repository.delete(paciente);
    }

}
