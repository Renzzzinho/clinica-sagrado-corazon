package com.clinica.backend.service;
//prueba

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.clinica.backend.model.Paciente;
import com.clinica.backend.model.Rol;
import com.clinica.backend.model.Usuario;
import com.clinica.backend.repository.PacienteRepository;
import com.clinica.backend.repository.UsuarioRepository;

@Service
public class PacienteService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteRepository repository;

    /* 
    public Paciente crear(Paciente paciente) {

        // Validación básica
        if (repository.findByEmail(paciente.getEmail()).isPresent()) {
            throw new RuntimeException("El email ya está registrado");
        }
        if (repository.findByDni(
                paciente.getDni()
        ).isPresent()) {

            throw new RuntimeException(
                    "El DNI ya está registrado"
            );
        }

        return repository.save(paciente);
    }
     */
    public Paciente crear(Paciente paciente) {

        if (repository.findByEmail(
                paciente.getEmail()
        ).isPresent()) {

            throw new RuntimeException(
                    "El email ya está registrado"
            );
        }

        if (repository.findByDni(
                paciente.getDni()
        ).isPresent()) {

            throw new RuntimeException(
                    "El DNI ya está registrado"
            );
        }

        Paciente nuevoPaciente
                = repository.save(paciente);

        Usuario usuario
                = new Usuario();

        usuario.setNombre(
                paciente.getNombre()
        );

        usuario.setEmail(
                paciente.getEmail()
        );

        usuario.setPassword(
                passwordEncoder.encode(
                        paciente.getPassword()
                )
        );

        usuario.setRol(
                Rol.PACIENTE
        );

        usuarioRepository.save(
                usuario
        );

        return nuevoPaciente;
    }

    public List<Paciente> listar() {
        return repository.findAll();
    }

    public Paciente obtenerPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Paciente no encontrado"));
    }

    public Paciente actualizar(Long id, Paciente data) {

        Paciente paciente
                = obtenerPorId(id);

        paciente.setNombre(
                data.getNombre()
        );

        paciente.setDni(
                data.getDni()
        );

        paciente.setEmail(
                data.getEmail()
        );

        paciente.setTelefono(
                data.getTelefono()
        );

        paciente.setDireccion(
                data.getDireccion()
        );

        paciente.setFechaNacimiento(
                data.getFechaNacimiento()
        );

        return repository.save(paciente);
    }
    //ultimo agregado para perfil
    public Paciente buscarPorEmail(String email) {

    return repository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("Paciente no encontrado"));

}
//      
//acrtualizar datos
public Paciente actualizarMiPerfil(
        String email,
        Paciente datos) {

    Paciente paciente = repository.findByEmail(email)
            .orElseThrow(() ->
                    new RuntimeException("Paciente no encontrado"));

    paciente.setEmail(datos.getEmail());

    paciente.setTelefono(datos.getTelefono());

    paciente.setDireccion(datos.getDireccion());

    return repository.save(paciente);

}
    public void eliminar(Long id) {

        Paciente paciente
                = obtenerPorId(id);

        repository.delete(paciente);
    }

}
