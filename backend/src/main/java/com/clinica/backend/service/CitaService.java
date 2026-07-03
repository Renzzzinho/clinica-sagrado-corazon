package com.clinica.backend.service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clinica.backend.dto.CitaRequest;
import com.clinica.backend.model.Cita;
import com.clinica.backend.model.Doctor;
import com.clinica.backend.model.EstadoCita;
import com.clinica.backend.model.Paciente;
import com.clinica.backend.repository.CitaRepository;
import com.clinica.backend.repository.DoctorRepository;
import com.clinica.backend.repository.PacienteRepository;

import jakarta.transaction.Transactional;

@Service
public class CitaService {

    @Autowired
    private CitaRepository citaRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private PacienteRepository pacienteRepository;

    @Transactional
    public Cita crear(CitaRequest request) {

        LocalDateTime inicio = request.getFechaInicio();
        LocalDateTime fin = inicio.plusMinutes(30);

        // 🔴 REGLA 1: no pasado
        if (inicio.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("No puedes agendar en el pasado");
        }

        // 🔴 REGLA 2: horario (08:00 - 18:00)
        LocalTime hora = inicio.toLocalTime();
        if (hora.isBefore(LocalTime.of(8, 0)) || hora.isAfter(LocalTime.of(18, 0))) {
            throw new RuntimeException("Fuera de horario");
        }

        // 🔴 REGLA 3: conflicto doctor
        if (citaRepository.existeConflictoDoctor(request.getDoctorId(), inicio, fin)) {
            throw new RuntimeException("Doctor no disponible");
        }

        // 🔴 REGLA 4: conflicto paciente
        if (citaRepository.existeConflictoPaciente(request.getPacienteId(), inicio, fin)) {
            throw new RuntimeException("Paciente ya tiene cita en ese horario");
        }

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor no existe"));

        Paciente paciente = pacienteRepository.findById(request.getPacienteId())
                .orElseThrow(() -> new RuntimeException("Paciente no existe"));

        Cita cita = new Cita();
        cita.setDoctor(doctor);
        cita.setPaciente(paciente);
        cita.setFechaInicio(inicio);
        cita.setFechaFin(fin);
        cita.setEstado(EstadoCita.PROGRAMADA);
        cita.setFechaCreacion(LocalDateTime.now());

        return citaRepository.save(cita);
    }

    public Cita cancelar(Long id) {

        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        // ❌ No cancelar atendidas
        if (cita.getEstado() == EstadoCita.ATENDIDA) {
            throw new RuntimeException("No se puede cancelar una cita atendida");
        }

        // ❌ No cancelar dos veces
        if (cita.getEstado() == EstadoCita.CANCELADA) {
            throw new RuntimeException("La cita ya está cancelada");
        }

        cita.setEstado(EstadoCita.CANCELADA);

        return citaRepository.save(cita);
    }

    public Cita atender(Long id) {

        Cita cita = citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));

        // ❌ No atender canceladas
        if (cita.getEstado() == EstadoCita.CANCELADA) {
            throw new RuntimeException("No se puede atender una cita cancelada");
        }

        // ❌ No atender dos veces
        if (cita.getEstado() == EstadoCita.ATENDIDA) {
            throw new RuntimeException("La cita ya fue atendida");
        }

        cita.setEstado(EstadoCita.ATENDIDA);

        return citaRepository.save(cita);
    }

    public List<Cita> listar() {
        return citaRepository.findAll();
    }

    public Cita buscarPorId(Long id) {
        return citaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cita no encontrada"));
    }
//metodo cada docor para sus cittas
    public List<Cita> obtenerMisCitas(String email) {

    return citaRepository.findByDoctorEmail(email);

}
//metodo cada paciete  sus citas
public List<Cita> obtenerMisCitasPaciente(String email) {
    
    return citaRepository.findByPacienteEmail(email);

}
}
