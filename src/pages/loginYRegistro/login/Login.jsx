import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  alertaError,
  alertaRedireccion,
  generarToken,
} from "../../../helpers/funciones";
import "../LoginYRegistro.css";

const apiEstudiantes = "http://localhost:3001/estudiantes";

export default function Login() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [user, setUser] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(apiEstudiantes)
      .then((res) => res.json())
      .then(setEstudiantes)
      .catch(console.error);
  }, []);

  const buscarUsuario = () => {
    const estudiante = estudiantes.find(
      (e) => e.email === user && e.contraseña === contraseña
    );
    return estudiante ? { usuario: estudiante, ruta: "/panel-inicio" } : null;
  };

  const inicioSesion = () => {
    const resultado = buscarUsuario();

    if (resultado) {
      const token = generarToken();
      localStorage.setItem("token", token);
      localStorage.setItem("estudiante", JSON.stringify(resultado.usuario));
      alertaRedireccion(
        navigate,
        `Bienvenido ${resultado.usuario.nombre}`,
        "Redirigiendo...",
        "success",
        resultado.ruta
      );
    } else {
      alertaError("Usuario y/o contraseña incorrectos");
    }
  };

  return (
    <main className="contenedor-form">
      <form className="form">
        <span className="title">Iniciar sesión</span>

        <label htmlFor="username" className="label">Correo electrónico</label>
        <input
          type="text"
          id="username"
          className="input"
          onChange={(e) => setUser(e.target.value)}
          required
        />

        <label htmlFor="password" className="label">Contraseña</label>
        <input
          type="password"
          id="password"
          className="input"
          onChange={(e) => setContraseña(e.target.value)}
          required
        />

        <button type="button" onClick={inicioSesion} className="submit">
          Iniciar sesión
        </button>

        <p className="signup-link">
          ¿No tienes cuenta? <Link to="/registro">Registrarse</Link>
        </p>
      </form>
    </main>
  );
}
