import Swal from "sweetalert2";

export function alertaConfirmacion(titulo, mensaje) {
  return Swal.fire({
    title: titulo,
    text: mensaje,
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

export function alertaError(mensaje) {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: mensaje,
    confirmButtonText: "Aceptar",
  });
}

export function alertaRedireccion(redireccion, titulo, mensaje, icono, url) {
  let timerInterval;
  Swal.fire({
    title: titulo,
    html: `${mensaje}<br><strong>Redirigiendo en <b></b> segundos...</strong>`,
    timer: 2000,
    icon: icono,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      redireccion(url);
    },
  });
}

export function alertaEliminar(id, api, setTareasApi) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
      fetch(`${api}/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          Swal.fire('Eliminado', 'La tarea ha sido eliminada.', 'success');
          setTareasApi((prev) => prev.filter((tarea) => tarea.id !== id)); // 💡 actualiza solo el estado
        })
        .catch((err) => {
          Swal.fire('Error', 'No se pudo eliminar la tarea.', 'error');
          console.error(err);
        });
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });

    }
  });
}

export function generarToken() {
  return Math.random().toString(36).substring(2, 10);
}
