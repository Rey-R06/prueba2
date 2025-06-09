import Login from "../pages/loginYRegistro/login/Login";
import Registro from "../pages/loginYRegistro/registro/Registrarse";
import PanelInicio from "../pages/panelEstudianteInicio/PanelInicio";
import CrearTarea from "../pages/crearTarea/CrearTarea";
import RutaProtegida from "../components/RutaProtegida";

export let enrutador = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/panel-inicio/",
    element: <RutaProtegida proteger={<PanelInicio />} />,
  },
  {
    path: "crear-tarea",
    element: <RutaProtegida proteger={<CrearTarea />} />
  },
];
