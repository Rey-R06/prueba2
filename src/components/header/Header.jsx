import "./Header.css"
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [animacionActiva, setAnimacionActiva] = useState(false);
  
  const location = useLocation();

  let usuarioSesion = {user: "luis"}
  // Obtener la ruta actual sin el slash inicial
    const pathActual = location.pathname.replace("/", "");
  // Definir las rutas que deben mostrarse
const navItems = [
    { path: "", text: "Inicio" },
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
      <section className="botones-login">
        {usuarioSesion ? (
          <Link className="usuario-sesion" to="/estudiante-home">
            <span>{usuarioSesion.user}</span>
          </Link>
        ) : (
          <>
            <Link to="/login" className="boton-registrarse">
              <p>Login</p>
            </Link>
            <Link to="/registrarse" className="boton-sesion">
              <p>Sign up</p>
            </Link>
          </>
        )}
      </section>
    </header>
  );
}