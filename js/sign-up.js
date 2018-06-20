
$(function() {
  $('#sign_up').validate({
    rules: {
      'terms': {
        required: true
      },
      'confirm': {
        equalTo: '[name="password"]'
      }
    },
    highlight: function(input) {
      //console.log(input);
      $(input).parents('.form-line').addClass('error');
    },
    unhighlight: function(input) {
      $(input).parents('.form-line').removeClass('error');
    },
    errorPlacement: function(error, element) {
      $(element).parents('.input-group').append(error);
      $(element).parents('.form-group').append(error);
    },

    submitHandler: function(form) {
      //comienza REGISTRADO
      $('#sign_up').hide();
      $('#loading_data').show();
      
      var username = $('username').val();
      var email = $('#email').val();
      var password = $('#password').val();


      $.ajax({
        type: "POST",
        url: url_php + "/login.php?accion=register",
        data: $(sign_up).serialize(),
        success: function(data) {
          if (data == "OK") {
            $.ajax({
              type: "POST",
              url: url_php + "/send_email.php",
              data: $(sign_up).serialize(),
              success: function(data) {
                console.log("Recibi: "+data);
                if (data.trim() == "OK") {
                  swal({
                    title: "Se ha registrado exitosamente!",
                    text: "Se le ha enviado un correo para confirmar su cuenta.",
                    type: "success",
                  }, function() {
                    window.location = "index.html";
                  });
                } else {
                  swal({
                    title: "ERROR!",
                    text: "Su correo no es válido, por favor ingrese un correo activo.",
                    type: "error",
                  }, function() {
                    window.reload();
                  });
                }
              }
            });
          } else {
            swal("ERROR", "Hubo un error al intentar acceder, por favor inténtelo más tarde.", "error");
            $('#sign_up').show();
          }
        }
      }); //Fin ajax
    }
  });
});
