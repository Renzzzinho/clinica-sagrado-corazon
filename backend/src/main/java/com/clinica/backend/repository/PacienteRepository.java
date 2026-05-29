package com.clinica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinica.backend.model.Paciente;

import java.util.Optional;

public interface PacienteRepository extends JpaRepository<Paciente, Long> {

    Optional<Paciente> findByEmail(String email);


    Optional<Paciente> findByDni(String dni);
}