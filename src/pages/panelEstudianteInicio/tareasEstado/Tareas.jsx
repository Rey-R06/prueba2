import React, { useState } from "react";
import {
  alertaEliminar,
  alertaConfirmacion,
  alertaError,
} from "../../../helpers/funciones";
import "./Tareas.css";

export default function Tareas({ estado, api, tareasApi, seTareasApi }) {
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [formulario, setFormulario] = useState({
    titulo: "",
    materia: "",
    fechaLimite: "",
    estado: "",
  });

  //Filtrado de tareas
  const tareasFiltradas = tareasApi.filter((tarea) => {
    if (estado === "totales" || estado === "") return true;
    return tarea.estado === estado;
  });

  // Cuando se selecciona una tarea
  const abrirModal = (tarea) => {
    setTareaSeleccionada(tarea);
    setFormulario(tarea); // copia los datos a editar
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const guardarCambios = async () => {
    try {
      const respuesta = await fetch(`${api}/${tareaSeleccionada.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formulario),
      });

      if (respuesta.ok) {
        // Aquí puedes llamar a una función para recargar tareas desde la API si tienes una
        alertaConfirmacion("Actualizado", "La tarea se actualizo exitosamente");
        // Actualiza el estado local reemplazando la tarea actualizada
        seTareasApi((prev) =>
          prev.map((tarea) => (tarea.id === formulario.id ? formulario : tarea))
        );
        setTareaSeleccionada(null);
      } else {
        alertaError();
        alert("Error al actualizar la tarea");
      }
    } catch (error) {
      console.error("Error al guardar cambios:", error);
    }
  };

  function eliminarTarea(id) {
    alertaEliminar(id, api, seTareasApi);
  }

  return (
    <section className="lista-tareas">
      {estado && (
        <h3 className="subtitulo-filtrado">
          Mostrando:{" "}
          {estado === "totales" ? "todas las tareas" : `tareas ${estado}`}
        </h3>
      )}
      <ul>
        {(tareasFiltradas.length > 0 ? tareasFiltradas : tareasApi).map(
          (tarea) => (
            <li
              key={tarea.id}
              className={
                tarea.estado === "completada"
                  ? "tarea-completada"
                  : "tarea-pendiente"
              }
              onClick={() => abrirModal(tarea)}
            >
              <button
                className="btn-cerrar"
                onClick={(e) => {
                  e.stopPropagation(); // evita que se dispare abrirModal al hacer clic en la X
                  eliminarTarea(tarea.id);
                }}
              >
                ×
              </button>
              <strong>{tarea.titulo}</strong>
              <p>Materia: {tarea.materia}</p>
              <p>Fecha límite: {tarea.fechaLimite}</p>
              <p>Estado: {tarea.estado}</p>
            </li>
          )
        )}
      </ul>

      {/* Modal de edición */}
      {tareaSeleccionada && (
        <div className="modal">
          <div className="modal-content">
            {console.log()}
            <h3>Editar Tarea</h3>
            <form>
              <label>
                Título:
                <input
                  type="text"
                  name="titulo"
                  value={formulario.titulo}
                  onChange={manejarCambio}
                />
              </label>
              <label>
                Materia:
                <input
                  type="text"
                  name="materia"
                  value={formulario.materia}
                  onChange={manejarCambio}
                />
              </label>
              <label>
                Fecha Límite:
                <input
                  type="date"
                  name="fechaLimite"
                  value={formulario.fechaLimite}
                  onChange={manejarCambio}
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
            </form>
            <div className="botones-modal">
              <button onClick={guardarCambios}>Guardar</button>
              <button onClick={() => setTareaSeleccionada(null)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
