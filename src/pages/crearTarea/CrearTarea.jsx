import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { alertaConfirmacion, alertaError } from "../../helpers/funciones";
import Header from "../../components/header/Header";
let apiTareas = "http://localhost:3001/tareas";
import "./CrearTarea.css";

export default function CrearTarea() {

  let estudiante = JSON.parse(localStorage.getItem("estudiante"));
  const navigate = useNavigate();

  const [formulario, setFormulario] = useState({
    titulo: "",
    materia: "",
    fechaLimite: "",
    estado: "pendiente",
    idEstudiante: estudiante.id
  });

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const crearTarea = async () => {
    try {
      const respuesta = await fetch(`${apiTareas}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      if (respuesta.ok) {
        alertaConfirmacion("Creado", "La tarea fue creada exitosamente");
        navigate("/panel-inicio"); // redirige a la lista de tareas
      } else {
        alertaError("Error", "Hubo un problema al crear la tarea");
      }
    } catch (error) {
      console.error("Error al crear tarea:", error);
      alertaError("Error", "Error inesperado al crear la tarea");
    }
  };

  return (
    <>
    <Header />
      <div className="crear-tarea-container">
        <h2>Crear Nueva Tarea</h2>
        <form>
          <label>
            Título:
            <input
              type="text"
              name="titulo"
              value={formulario.titulo}
              onChange={manejarCambio}
              required
            />
          </label>

          <label>
            Materia:
            <input
              type="text"
              name="materia"
              value={formulario.materia}
              onChange={manejarCambio}
              required
            />
          </label>

          <label>
            Fecha límite:
            <input
              type="date"
              name="fechaLimite"
              value={formulario.fechaLimite}
              onChange={manejarCambio}
              required
            />
          </label>

          <label>
            Estado:
            <select
              name="estado"
              value={formulario.estado}
              onChange={manejarCambio}
            >
              <option value="pendiente">Pendiente</option>
              <option value="completada">Completada</option>
            </select>
          </label>

          <button type="button" onClick={crearTarea}>
            Crear Tarea
          </button>
        </form>
      </div>
    </>
  );
}
