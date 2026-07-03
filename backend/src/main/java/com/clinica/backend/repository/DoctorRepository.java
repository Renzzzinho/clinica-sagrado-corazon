package com.clinica.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.clinica.backend.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findByEspecialidad(String especialidad);

    Doctor findByEmail(String email);
}
