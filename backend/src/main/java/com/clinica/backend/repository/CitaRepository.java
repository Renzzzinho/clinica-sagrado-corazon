package com.clinica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.clinica.backend.model.Cita;

import java.time.LocalDateTime;

public interface CitaRepository extends JpaRepository<Cita, Long> {

    @Query("""
    SELECT COUNT(c) > 0 FROM Cita c
    WHERE c.doctor.id = :doctorId
    AND c.estado = 'PROGRAMADA'
    AND (:inicio < c.fechaFin AND :fin > c.fechaInicio)
    """)
    boolean existeConflictoDoctor(Long doctorId, LocalDateTime inicio, LocalDateTime fin);

    @Query("""
    SELECT COUNT(c) > 0 FROM Cita c
    WHERE c.paciente.id = :pacienteId
    AND c.estado = 'PROGRAMADA'
    AND (:inicio < c.fechaFin AND :fin > c.fechaInicio)
    """)
    boolean existeConflictoPaciente(Long pacienteId, LocalDateTime inicio, LocalDateTime fin);
}