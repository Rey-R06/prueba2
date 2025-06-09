import PanelInicio from "../pages/panelEstudianteInicio/PanelInicio";
import CrearTarea from "../pages/crearTarea/CrearTarea";

export let enrutador = [
  {
    path: "/",
    element: <PanelInicio />
  },,
  {
    path: "/crear-tarea",
    element: <CrearTarea />
  },
];
