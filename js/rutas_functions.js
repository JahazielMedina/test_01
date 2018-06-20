$('#add_ruta').validate({

  highlight: function(input) {
    $(input).parents('.form-line').addClass('error');
  },
  unhighlight: function(input) {
    $(input).parents('.form-line').removeClass('error');
  },
  errorPlacement: function(error, element) {
    $(element).parents('.form-group').append(error);
  },
  submitHandler: function(form) {

    $.ajax({
        url: url_php + '/rutas.php',
        type: 'POST',
        data: $('#add_ruta').serialize() + "&op=add_ruta",
      })
      .done(function(data) {
        console.log(data);
        switch (data) {
          case "OK":
            swal({
                title: "Success",
                text: "La ruta se agrego satisfactoriamente",
                type: "success",
              },
              function() {
                location.reload();
              });
            break;
          case "ERROR":
            swal("ERROR", "Hubo un error al agregar la ruta, intentelo de nuevo más tarde", "error")
            break;
          default:

        }
      })
      .fail(function(data) {
        console.log("error " + data);
      });
  }
});

function edit_ruta(id) {
  //console.log(id);
  $.ajax({
      url: url_php + '/rutas.php',
      type: 'POST',
      data: {
        id: id,
        op: 'rutas_info'
      }
    })
    .done(function(data) {
      //console.log("success " + data);
      var datos = JSON.parse(data);
      $("input[name=nombre]").val(datos.nombre);
      $('#modal_edit_ruta').openModal();
      $('#edit_ruta').submit(function(event) {
        $.ajax({
            url: url_php + '/rutas.php',
            type: 'POST',
            data: $('#edit_ruta').serialize() + "&op=edit_ruta&id=" + id,
          })
          .done(function(data) {
            console.log(data);
           if (data == "OK") {
              swal({
                  title: "Listo!",
                  text: "La información a sido actualizada",
                  type: "success",
                },
                function() {
                  location.reload();
                });
            } else {
              swal("Error!", "Algo salió mal, inténtalo más tarde.", "error");
            }
          })
          .fail(function(data) {
            console.log("error:", data);
            swal("Error!", "Algo salió mal, inténtalo más tarde.", "error");
          });
        event.preventDefault();
      })
    })
}

function delete_ruta(id) {
  swal({
    title: "¿Eliminar ruta?",
    text: "¿Esta seguro de eliminar esta ruta?",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, eliminar",
    cancelButtonText: "Cancelar",
    },function() {
      $.ajax({
        url: url_php + '/rutas.php',
        type: 'POST',
        data: {
          id: id,
          op: 'delete_ruta'
        }
      })
      .done(function(data) {
      console.log("success " + data);
      if (data == "OK") {
        swal({
          title: "Listo!",
          text: "La ruta a sido eliminada",
          type: "success",
        },
        function() {
          location.reload();
        });
      } else {
        swal("Error!", "Algo salió mal, inténtalo más tarde.", "error");
      }
      })
      .fail(function(data) {
      console.log("error:", data);
      swal("Error!", "Algo salió mal, inténtalo más tarde.", "error");
      })
    });
}
