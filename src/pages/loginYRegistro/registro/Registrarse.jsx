import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  alertaError,
  alertaRedireccion,
  generarToken,
} from "../../../helpers/funciones";
import "../LoginYRegistro.css";

const apiEstudiantes = "http://localhost:3001/estudiantes";

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const registrarUsuario = async () => {
    if (!nombre || !email || !contraseña) {
      return alertaError("Todos los campos son obligatorios");
    }

    try {
      const res = await fetch(apiEstudiantes);
      const estudiantes = await res.json();

      const usuarioExistente = estudiantes.find((est) => est.email === email);
      if (usuarioExistente) {
        return alertaError("El email ya existe");
      }

      const nuevoUsuario = { nombre, email, contraseña, tareas: [] };
      await fetch(apiEstudiantes, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      alertaRedireccion(
        navigate,
        "Registro exitoso",
        "Redirigiendo al login...",
        "success",
        "/"
      );
    } catch (error) {
      alertaError("Error al registrar usuario");
      console.error(error);
    }
  };

  return (
    <main className="contenedor-form">
      <form className="form">
        <span className="title">Registrarse</span>

        <label htmlFor="nombre" className="label">
          Nombre completo
        </label>
        <input
          type="text"
          id="nombre"
          className="input"
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <label htmlFor="email" className="label">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="contraseña" className="label">
          Contraseña
        </label>
        <input
          type="contraseña"
          id="contraseña"
          className="input"
          onChange={(e) => setContraseña(e.target.value)}
          required
        />

        <button type="button" onClick={registrarUsuario} className="submit">
          Crear cuenta
        </button>

        <p className="signup-link">
          ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
        </p>
      </form>
    </main>
  );
}
