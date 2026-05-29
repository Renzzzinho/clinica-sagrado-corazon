package com.clinica.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinica.backend.model.Doctor;

import java.util.List;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findByEspecialidad(String especialidad);
}