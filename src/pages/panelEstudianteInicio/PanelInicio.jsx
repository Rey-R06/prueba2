import Header from "../../components/header/Header";
import ResumenTareas from "./ResumenTareas";
import "./PanelInicio.css"

export default function PanelEstudiante() {
  return (
    <>
      <Header />
      <section className="banner">
        <h1>TAREAS</h1>
      </section>
      <ResumenTareas />
    </>
  );
}
