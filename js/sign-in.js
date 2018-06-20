$('#sign_in').validate({

  highlight: function(input) {
    $(input).parents('.input-field').addClass('error');
  },
  unhighlight: function(input) {
    $(input).parents('.input-field').removeClass('error');
  },
  errorPlacement: function(error, element) {
    $(element).parents('.form-group').append(error);
  },
  submitHandler: function(form) {
    var Email = $('#email').val();
    var Password = $('#password').val();
    console.log("tengo: "+Email+", "+Password);
    $.ajax({
        url: url_php + '/login.php',
        type: 'POST',
        data: $('#sign_in').serialize() + "&op=login",
      })
      .done(function(data) {
        console.log(data);
        console.log("Recibi de remoto: "+data);
        switch (data) {
          case 'ERROR':
            swal("ERROR!!", "Algo salió mal, inténtelo más tarde.", "error");
            break;
          case 'ERROR1':
            swal("ERROR!!", "No la contraseña o usuario no coinciden", "error");
            $('#password').val("");
            break;
          case 'ERROR2':
            swal("Tu usuario o contraseña no son correctos", "Usuario o contraseña invalidos.", "error");
            break;
          default:
          var id_user = data.substring(2, data.length);
          localStorage.setItem("id_user", id_user);
          window.location = "dashboard.html";
        } //Fin de switch
      })
      .fail(function(data) {
        console.log("error " + data);
      });
  }
});
