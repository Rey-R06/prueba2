import { useState, useEffect } from "react";
import Tareas from "./tareasEstado/Tareas";
let apiTareas = "http://localhost:3001/tareas"

export default function ResumenTareas() {
  const [tareas, setTareas] = useState([]);
  const [tareaSeleccioda, setTareaSeleccionada] = useState("totales");

  function getTareas() {
    fetch(apiTareas)
      .then((response) => response.json())
      .then((data) => setTareas(data))
      .catch((error) => console.log(error));
  }
  useEffect(() => {
    getTareas();
  }, []);

  const total = tareas.length;
  const completadas = tareas.filter(
    (t) => t.estado === "completada"
  ).length;
  const pendientes = tareas.filter(
    (t) => t.estado === "pendiente"
  ).length;

  return (
    <section className="resumen-tareas">
      <h2>Resumen Tareas</h2>
      <section className="tareas-bolas">
        <button
          type="button"
          onClick={(e) => {
            setTareaSeleccionada("totales");
          }}
        >
          <article className="tareas-totales">
            <h3>Tareas Totales</h3>
            <p>{total}</p>
          </article>
        </button>
        <button
          type="button"
          onClick={(e) => {
            setTareaSeleccionada("completada");
          }}
        >
          <article className="tareas-completadas">
            <h3>Tareas Completadas</h3>
            <p>{completadas}</p>
          </article>
        </button>
        <button
          type="button"
          onClick={(e) => {
            setTareaSeleccionada("pendiente");
          }}
        >
          <article className="tareas-pendientes">
            <h3>Tareas Pendientes</h3>
            <p>{pendientes}</p>
          </article>
        </button>
      </section>
      <Tareas estado={tareaSeleccioda} api={apiTareas} tareasApi={tareas} seTareasApi={setTareas} />
    </section>
  );
}
//hacer que se eliminen las taraeas hacer que se creen las tareas