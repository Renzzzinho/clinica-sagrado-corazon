package com.clinica.backend.security;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Service;

import com.clinica.backend.model.Usuario;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    private final String SECRET =
            "miclavejwtmiclavejwtmiclavejwt123456";

    private SecretKey getKey() {

        return Keys.hmacShaKeyFor(
                SECRET.getBytes()
        );
    }

    public String generarToken(
            Usuario usuario
    ) {

        return Jwts.builder()

                .setSubject(
                        usuario.getEmail()
                )

                .claim(
                        "rol",
                        usuario.getRol().name()
                )

                .setIssuedAt(
                        new Date()
                )

                .setExpiration(

                        new Date(
                                System.currentTimeMillis()
                                        + 1000 * 60 * 60
                        )
                )

                .signWith(
                        getKey(),
                        SignatureAlgorithm.HS256
                )

                .compact();
    }

    public String extraerEmail(
            String token
    ) {

        return Jwts.parserBuilder()

                .setSigningKey(getKey())

                .build()

                .parseClaimsJws(token)

                .getBody()

                .getSubject();
    }

    public String extraerRol(
            String token
    ) {

        return Jwts.parserBuilder()

                .setSigningKey(getKey())

                .build()

                .parseClaimsJws(token)

                .getBody()

                .get(
                        "rol",
                        String.class
                );
    }
}