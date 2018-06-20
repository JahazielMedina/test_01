$(document).ready(function() {
  //console.log(id_user);
    consulta_permisos_admin(id_user);

  $("input[name=buscar]").keyup(function() {

    var buscar = $("input[name=buscar]").val();

    $.ajax({
        url: url_php + '/productos.php',
        type: 'POST',
        data: {
          op: "buscar_producto",
          buscar: buscar,
        }
      })
      .done(function(data) {
        console.log(data);
        $('#contenido').html("");
        $('#contenido').append(data);
        if (data == "") {
          var empty =
            `
          <div id="profile-card" class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <center>
                <center><h4><p>No existe el producto</p></h4></center>
              </center>
            </div>
          </div>
        `;
          $("#contenido").append(empty);
        }
      })
      .fail(function(data) {
        console.log("error en listar posts " + data);
      });
  });

  $.ajax({
      url: url_php + '/productos.php',
      type: 'POST',
      data: {
        op: 'ob_producto'
      }
    })
    .done(function(data) {
      $('#contenido').html("");
      $('#contenido').append(data);
    })
    .fail(function(data) {
      console.log("error:", data);
    });

  $('#ag_producto').validate({
    rules: {
      'pupc': {
        required: true
      },
      'pdescripcion': {
        required: true
      },
      'pcodigo': {
        required: true
      },
      /*'pfoto': {
        required: true
      },*/
      'alto': {
        required: true
      },
      'ancho': {
        required: true
      },
      'espesor': {
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
          url: url_php + '/productos.php',
          type: 'POST',
          data: $('#ag_producto').serialize() + "&op=ag_producto",
        })
        .done(function(data) {
          console.log(data);
          if (data == "OK") {
            //console.log("Se agregó nuevo producto");
            swal({
                title: "Listo!",
                text: "Se ha agregado un nuevo producto.",
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

  $('#editar_producto').validate({
    rules: {
      'pmupc': {
        required: false
      },
      'pmdescripcion': {
        required: false
      },
      'pmcodigo': {
        required: false
      },
      'malto': {
        required: false
      },
      'mancho': {
        required: false
      },
      'mespesor': {
        required: false
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
          url: url_php + '/productos.php',
          type: 'POST',
          data: $('#editar_producto').serialize() + "&op=ed_producto",
        })
        .done(function(data) {
          //console.log(data);
          if (data == "OK") {
            //console.log("Se editó producto");
            swal({
                title: "Listo!",
                text: "Se han guardado tus cambios correctamente.",
                type: "success",
              },
              function() {
                location.reload();
              });
          } else {
            //console.log("no se editó producto");
            swal("Error!", "Algo salió mal, inténtalo más tarde.", "error");
          }
        })
        .fail(function(data) {
          console.log("error:", data);
          swal("Error!", "Algo salió mal, inténtalo más tarde.", "error");
        });
    } //Fin de submitHandler
  });

});//Fin de document.ready

function editar_producto(id) {

  //console.log("Entré a función", id);

  $.ajax({
      url: url_php + '/productos.php',
      type: 'POST',
      data: {
        id: id,
        op: "ob_ed_producto"
      }
    })
    .done(function(data) {
      var dato = JSON.parse(data);
      var status = dato.status;
      if (status == "OK") {
        $('#modal_edit').openModal();
        var producto_id = dato.id;
        var upc = dato.upc;
        var descripcion = dato.descripcion;
        var codigo_ole = dato.codigo_ole;
        var alto = dato.alto;
        var ancho = dato.ancho;
        var espesor = dato.espesor;
        $("input[name=producto_id").val(producto_id);
        $("input[name=mupc").val(upc);
        $("input[name=mdescripcion").val(descripcion);
        $("input[name=mcodigo").val(codigo_ole);
        $("input[name=malto").val(alto);
        $("input[name=mancho").val(ancho);
        $("input[name=mespesor").val(espesor);
        //console.log("Todo bien");
      } else {
        console.log("Todo mal");
      }
    })
    .fail(function(data) {
      console.log("error:", data);
    });

}
