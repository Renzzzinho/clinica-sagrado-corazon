package com.clinica.backend.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CitaRequest {

    private Long doctorId;
    private Long pacienteId;
    private LocalDateTime fechaInicio;

    // getters y setters
}