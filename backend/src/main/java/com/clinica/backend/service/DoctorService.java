package com.clinica.backend.service;


//ulimos imports
import com.clinica.backend.model.Usuario;
import com.clinica.backend.model.Rol;
import com.clinica.backend.repository.UsuarioRepository;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//aqui acaban los impors
import com.clinica.backend.model.Doctor;
import com.clinica.backend.repository.DoctorRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository repository;


    /*  probblemas
    public Doctor crear(Doctor doctor) {
        return repository.save(doctor);
    }*/

        public Doctor crear(Doctor doctor) {

    Doctor doctorGuardado =
            repository.save(doctor);

    Usuario usuario =
            new Usuario();

    usuario.setNombre(
            doctor.getNombre()
    );

    usuario.setEmail(
            doctor.getEmail()
    );

    usuario.setPassword(
            passwordEncoder.encode(
                    doctor.getPassword()
            )
    );

    usuario.setRol(
            Rol.DOCTOR
    );

    usuarioRepository.save(
            usuario
    );

    return doctorGuardado;
}
    @Autowired
private UsuarioRepository usuarioRepository;

@Autowired
private BCryptPasswordEncoder passwordEncoder;

    public List<Doctor> listar() {
        return repository.findAll();
    }

    public Doctor obtenerPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor no encontrado"));
    }

    public Doctor actualizar(Long id, Doctor data) {
        Doctor doctor = obtenerPorId(id);

        doctor.setNombre(data.getNombre());
        doctor.setEspecialidad(data.getEspecialidad());
        doctor.setEmail(data.getEmail());
        doctor.setTelefono(data.getTelefono());

        return repository.save(doctor);
    }

    public void eliminar(Long id) {
        Doctor doctor = obtenerPorId(id);
        repository.delete(doctor);
    }

    public List<Doctor> buscarPorEspecialidad(String especialidad) {
        return repository.findByEspecialidad(especialidad);
    }
}
