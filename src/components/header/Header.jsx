import "./Header.css"
import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { alertaRedireccion } from "../../helpers/funciones";

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [animacionActiva, setAnimacionActiva] = useState(false);
  
  const location = useLocation();

  const navigate = useNavigate();

  // Obtener la ruta actual sin el slash inicial
    const pathActual = location.pathname.replace("/", "");
  // Definir las rutas que deben mostrarse
const navItems = [
    { path: "panel-inicio", text: "Inicio" },
    { path: "crear-tarea", text: "Crear nueva tarea" },
  ];

  function toggleMenu() {
    if (menuAbierto) {
      // activa animación de cierre
      setAnimacionActiva(true);
      setTimeout(() => {
        setMenuAbierto(false);
        setAnimacionActiva(false);
      }, 400); // dura 0.4s, igual que la animación
    } else {
      setMenuAbierto(true);
    }
  }

  function cerrarSesion() {
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    alertaRedireccion(navigate, "Sesion finalizada", "En Breves segundos cerraremos la sesión", "info", "/")
  }

  return (
    <header className="header-principal">
      <section className="logo-nav">
        <button className="menu-hamburguesa" onClick={toggleMenu}>
          ☰
        </button>
        <Link className="logo" to="/">
          <img src="/logos/logo.png" alt="Logo EduWise Inc" />
        </Link>
        <nav
          className={
            menuAbierto
              ? animacionActiva
                ? "menu-oculto"
                : "menu-abierto"
              : "oculto"
          }
        >
          <ul>
            {navItems.map(
              (item) =>
                pathActual !== item.path && (
                  <Link to={`/${item.path}`} key={item.path}>
                    <li>{item.text}</li>
                  </Link>
                )
            )}
          </ul>
        </nav>
      </section>
      <section className="botones-cerrar">
        <button onClick={cerrarSesion} type="button">Salir</button>
      </section>
    </header>
  );
}