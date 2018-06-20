$(document).ready(function() {
  consulta_permisos_admin(id_user);
  cargar_menu(id_user);
  $.ajax({
      url: url_php + '/promotores.php',
      type: 'POST',
      data: {
        op: 'contenido',
      }
    })
    .done(function(data) {
      $('#contenido').html(data);
    })
    .fail(function(data) {
      console.log("error en listar posts " + data);
    });
});

$("input[name=buscar]").keyup(function() {

    var buscar = $("input[name=buscar]").val();

    $.ajax({
        url: url_php + '/promotores.php',
        type: 'POST',
        data: {
          op: "search_promotor",
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


$('#add_promotor').validate({
  rules: {
    'nombre': {
      required: true
    },
    'matricula': {
      required: true
    },
    'ruta': {
      required: true
    },
    'telefono': {
      required: true
    },
    'correo': {
      required: true
    }
  },
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
        url: url_php + '/promotores.php',
        type: 'POST',
        data: $('#add_promotor').serialize() + "&op=add_promotor",
      })
      .done(function(data) {
        console.log(data);
        if (data == "OK") {
          swal({
              title: "Listo!",
              text: "Se ha agregado un nuevo promotor.",
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
  } //Fin de submitHandler
});

function edit_promotor(id){
  //console.log(id);
  $.ajax({
      url: url_php + '/promotores.php',
      type: 'POST',
      data: {
        id: id,
        op: 'promotores_info'
      }
    })
    .done(function(data) {
      console.log("success " + data);
      var datos = JSON.parse(data);
      $( "input[name=nombre_edit]" ).val(datos.Nombre);
      $( "input[name=matricula_edit]" ).val(datos.Matricula);
      $( "input[name=ruta_edit]" ).val(datos.Ruta);
      $( "input[name=telefono_edit]" ).val(datos.Telefono);
      $( "input[name=correo_edit]" ).val(datos.Correo);
      $('#modal6').openModal();
      $('#edit_promotor').submit(function(event) {
      $.ajax({
          url: url_php + '/promotores.php',
          type: 'POST',
          data: $('#edit_promotor').serialize() + "&op=edit_promotor&id="+id,
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
