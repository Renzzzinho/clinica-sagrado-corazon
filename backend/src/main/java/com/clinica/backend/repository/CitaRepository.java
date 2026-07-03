package com.clinica.backend.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.clinica.backend.model.Cita;

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

    //para post citas doctor
    List<Cita> findByDoctorEmail(String email);
    //para paciente
    List<Cita> findByPacienteEmail(String email);
}