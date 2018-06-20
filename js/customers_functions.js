$(document).ready(function() {
  consulta_permisos_admin(id_user);
  cargar_menu(id_user);
  $.ajax({
      url: url_php + '/customers.php',
      type: 'POST',
      data: {
        op: 'contenido',
      }
    })
    .done(function(data) {
      //  console.log("Recibi: " + data);
      $('#contenido').html(data);
    })
    .fail(function(data) {
      console.log("error en listar posts " + data);
    });
});

$("input[name=buscar]").keyup(function() {

  var buscar = $("input[name=buscar]").val();

  $.ajax({
      url: url_php + '/customers.php',
      type: 'POST',
      data: {
        op: "search_customer",
        buscar: buscar,
      }
    })
    .done(function(data) {
      $('#contenido').html("");
      $('#contenido').append(data);
    })
    .fail(function(data) {
      console.log("error en listar posts " + data);
    });

});

$('#add_customer').validate({

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
        url: url_php + '/customers.php',
        type: 'POST',
        data: $('#add_customer').serialize() + "&op=add_customer",
      })
      .done(function(data) {
        console.log(data);
        switch (data) {
          case "OK":
            swal({
                title: "Success",
                text: "El cliente se agrego satisfactoriamente",
                type: "success",
              },
              function() {
                location.reload();
              });
            break;
          case "ERROR":
            swal("ERROR", "Hubo un error al agregar al cliente, intentelo de nuevo más tarde", "error")
            break;
          default:

        }
      })
      .fail(function(data) {
        console.log("error " + data);
      });
  }
});

function edit_customer(id) {
  //console.log(id);
  $.ajax({
      url: url_php + '/customers.php',
      type: 'POST',
      data: {
        id: id,
        op: 'customers_info'
      }
    })
    .done(function(data) {
      //console.log("success " + data);
      var datos = JSON.parse(data);
      $("input[name=Cadena_edit]").val(datos.Cadena);
      $("input[name=Nombre_tienda_edit]").val(datos.Nombre_tienda);
      $("input[name=Direccion_edit]").val(datos.Direccion);
      $("input[name=Determinante_edit]").val(datos.Determinante);
      $("input[name=Formato_tienda_edit]").val(datos.Formato_tienda);
      $("input[name=Ciudad_edit]").val(datos.Ciudad);
      $("input[name=Estado_edit]").val(datos.Estado);
      $("input[name=Zona_edit]").val(datos.Zona);
      $("input[name=Promotoria_edit]").val(datos.Promotoria);
      $("input[name=Ruta_edit]").val(datos.Ruta);
      $("input[name=Promotor_edit]").val(datos.Promotor);
      $('#modal_edit_customer').openModal();
      $('#edit_customer').submit(function(event) {
        $.ajax({
            url: url_php + '/customers.php',
            type: 'POST',
            data: $('#edit_customer').serialize() + "&op=edit_customer&id=" + id,
          })
          .done(function(data) {
            console.log(data);
           if (data == "OK") {
              swal({
                  title: "Listo!",
                  text: "El la información a sido actualizada",
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
function delete_customer(id) {
  swal({
    title: "¿Eliminar ruta?",
    text: "¿Esta seguro de eliminar este cliente?",
    type: "warning",
    showCancelButton: true,
    confirmButtonText: "Si, eliminar",
    cancelButtonText: "Cancelar",
    },function() {
      $.ajax({
        url: url_php + '/customer.php',
        type: 'POST',
        data: {
          id: id,
          op: 'delete_customer'
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
