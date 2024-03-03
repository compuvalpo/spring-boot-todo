$(document).ready(function () {

	const taskModal = $('#taskModal')[0]
	if (taskModal) {
		taskModal.addEventListener('show.bs.modal', event => {
		const button = event.relatedTarget
		const recipient = button.getAttribute('data-titulo')

		$('.modal-title').text(recipient)
		})
	}

});


function SwalDelete(id, nombre, gl_url) {
  Swal.fire({
    title:
      "¿Esta seguro que quiere eliminar la tarea " + nombre + " ?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Confirmar",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location = gl_url + id;
    }
  });
}

//'', 'Tarea Guardada', 'La tarea ha sido guardada', 'success'
function SwalMensaje(gl_url, title, text, icon) {
    swal.fire({
          title: title,
          text: text,
          icon: icon,
          confirmButtonText: 'OK',
          timer: 2500,
          timerProgressBar: true
    }).then((result) => {

         //window.location =  gl_url
        window.location.reload();
    });
}

function crearTask(){

    if($("#fecha_task").val()){
        fecha = new Date($("#fecha_task").val())
    }else{
        fecha = new Date()
    }
    fecha_task = fecha.toLocaleDateString() +' '+fecha.getHours()+':'+fecha.getMinutes()

    $.ajax({
        url: '/task',
        type: 'post',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
                          "nombre": $("#taskNombre").val(),
                          "descripcion": $("#taskDescripcion").val(),
                          "estado": $("#taskEstado").val(),
                          "fecha_task": fecha_task
                        }),
        success: function(data) {
            SwalMensaje('', 'Tarea Guardada', 'La tarea ha sido guardada', 'success');
        },
        error: function(jqXHR, status, error) {
            console.log(error)
            SwalMensaje('', 'Tarea NO Guardada', 'La tarea no ha sido guardada', 'error');
        }
    });
}

function editarTask(id){

    if($("#fecha_task").val()){
        fecha = new Date($("#fecha_task").val())
    }else{
        fecha = new Date()
    }
    fecha_task = fecha.toLocaleDateString() +' '+fecha.getHours()+':'+fecha.getMinutes()

    $.ajax({
        url: '/task/+id',
        type: 'post',
        method: 'PUT',
        dataType: 'json',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify({
                          "nombre": $("#taskNombre").val(),
                          "descripcion": $("#taskDescripcion").val(),
                          "estado": $("#taskEstado").val(),
                          "fecha_task": fecha_task
                        }),
        success: function(data) {
            SwalMensaje('', 'Tarea Actualizada', 'La tarea ha sido actualizada', 'success');
        },
        error: function(jqXHR, status, error) {
            console.log(error)
            SwalMensaje('', 'Tarea NO Actualizada', 'La tarea no ha sido actualizada', 'error');
        }
    });
}

function eliminarTask(id){

    $.ajax({
        url: '/task/'+id,
        type: 'post',
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        success: function(data) {
            SwalMensaje('', 'Tarea Eliminada', 'La tarea ha sido eliminada', 'success');
        },
        error: function(jqXHR, status, error) {
            console.log(error)
            SwalMensaje('', 'Tarea NO Eliminada', 'La tarea no ha sido eliminada', 'error');
        }
    });
}

function finalizarTask(id){

    $.ajax({
        url: '/task/finalizar/'+id,
        type: 'post',
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        success: function(data) {
            SwalMensaje('', 'Tarea Finalizada', 'La tarea ha sido finalizada', 'success');
        },
        error: function(jqXHR, status, error) {
            console.log(error)
            SwalMensaje('', 'Tarea NO Finalizada', 'La tarea no ha sido finalizada', 'error');
        }
    });
}
