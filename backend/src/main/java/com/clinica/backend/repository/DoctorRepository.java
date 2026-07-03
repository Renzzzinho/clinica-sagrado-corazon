package com.clinica.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.clinica.backend.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    List<Doctor> findByEspecialidad(String especialidad);

Optional<Doctor> findByEmail(String email);

//   Doctor findByEmail(String email);

    
}
