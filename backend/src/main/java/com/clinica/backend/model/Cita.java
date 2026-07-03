package com.clinica.backend.model;

import java.time.LocalDateTime;
import jakarta.persistence.*;
/* 
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
*/
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Cita {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaInicio;

    private LocalDateTime fechaFin;

    @Enumerated(EnumType.STRING)
    private EstadoCita estado;

    @ManyToOne(optional = false)
    private Paciente paciente;

    @ManyToOne(optional = false)
    private Doctor doctor;

    private LocalDateTime fechaCreacion;

    // getters y setters
}
