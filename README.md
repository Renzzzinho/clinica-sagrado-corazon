 # 🏥
 Clínica Sagrado Corazón

Sistema Web de Gestión Clínica desarrollado como proyecto integrador del curso de Desarrollo Web Integrado.

## 📌 Descripción

La aplicación permite administrar la información de una clínica mediante una plataforma web moderna y segura.

El sistema implementa autenticación con JWT, control de roles y gestión de:

* Doctores
* Pacientes
* Citas médicas
* Dashboard administrativo

## 🚀 Tecnologías utilizadas

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* LOMBOK
* MySQL

### Frontend

* Angular
* Bootstrap 5
* TypeScript
* SweetAlert2
* AOS

### Base de datos

* MySQL (Railway)

### Despliegue

* Backend: Render
* Frontend: Vercel

---

# Arquitectura

El proyecto implementa una arquitectura cliente-servidor.

```
Angular
     │
     │ HTTP + JWT
     ▼
Spring Boot REST API
     │
     ▼
MySQL
```

---

# Funcionalidades

## Administrador

* Login seguro
* Dashboard
* CRUD de doctores
* CRUD de pacientes
* Gestión de citas
* Gestión de administradores

## Doctor

* Inicio personalizado
* Visualización de sus citas
* Edición de perfil

## Paciente

* Inicio personalizado
* Historial de citas
* Edición de perfil
* Registro de menores de edad

---

# Seguridad

El sistema implementa:

* JWT
* Spring Security
* BCrypt
* Control de roles
* Protección de endpoints
* Restricción por propietario de perfil

---

# API REST

Principales endpoints:

```
POST   /auth/login

GET    /api/doctores
POST   /api/doctores
PUT    /api/doctores/{id}
DELETE /api/doctores/{id}

GET    /api/pacientes
POST   /api/pacientes

GET    /api/citas
POST   /api/citas
PUT    /api/citas/{id}/atender
PUT    /api/citas/{id}/cancelar
```

---

# Instalación

## Backend

```
mvn clean install
mvn spring-boot:run
```

## Frontend

```
npm install
ng serve
```

---

# Despliegue

Frontend

https://clinica-sagrado-corazon-sigma.vercel.app

Backend

https://clinica-sagrado-corazon.onrender.com

Swagger

https://clinica-sagrado-corazon.onrender.com/swagger-ui/index.html

---

# Autores

Proyecto desarrollado por:

* Renzo (Proyecto clinica)



Manual de Usuario
Inicio de sesión
Ingrese correo y contraseña.

Administrador
Gestiona doctores, pacientes, citas y administradores.

Doctor
Consulta sus citas y edita su perfil.

Paciente
Consulta sus citas y actualiza dirección, teléfono y correo.

