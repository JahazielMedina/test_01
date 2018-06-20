
//var id_user = localStorage.getItem("id_user");

$(document).ready(function(id_store) {
  var id_store = id_user;
  //console.log(id_store);

  if (id_store) {

    $.ajax({
      url: url_php + '/formulario.php',
      type: 'POST',
      data: {
        op: 'get_info_tienda',
        id_store: id_store,
      }
    })
    .done(function(data) {
      //console.log(data);
      var datos = JSON.parse(data);
      $( "input[id=cadena]" ).val(datos.Cadena);
      $( "input[id=tienda]" ).val(datos.Tienda);
      $( "input[id=determinante]" ).val(datos.Determinante);
      $( "input[id=ruta]" ).val(datos.Ruta);
      $.ajax({
          url: url_php + '/formulario.php',
          type: 'POST',
          data: {
            op: 'firmar',
            id_store: id_store,
          }
        })
        .done(function(data) {
          //console.log("Recibi: " + data);
          $('#go_firmar').html(data);
        })
        .fail(function(data) {
          console.log("error en listar posts " + data);
        });
    })
    .fail(function(data) {
      console.log("error:", data);
      swal("Error!", "Algo salió mal, inténtalo más tarde.", "error");
    });
  } else {
    var id_store = 0;
  }
});


var id_store = localStorage.getItem("id_user");
var pictureSource;   // picture source
var destinationType; // sets the format of returned value
// Wait for Cordova to connect with the device
document.addEventListener("deviceready",onDeviceReady,false);
    // Cordova is ready to be used!
function onDeviceReady() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
  // Uncomment to view the base64 encoded image data
  console.log("Soy small: "+imageData);
  // Get image handle
  var smallImage = document.getElementById('smallImage');
  // Unhide image elements
  smallImage.style.display = 'block';
  // Show the captured photo - The inline CSS rules are used to resize the image
  smallImage.src = "data:image/jpeg;base64," + imageData;

  $.ajax({
    type: "POST",
    url: url_php + '/evidencia.php',
    data: {
      id_store: id_store,
      op: 'primera_foto',
      imgBase64: smallImage.src,
    }
  })
  .done(function(o) {
    console.log('Se guardó satisfactoriamente: '+o);
  });
}

// Called when a photo is successfully retrieve
function onPhotoURISuccess(imageURI) {
  // Uncomment to view the image file URI
  console.log("Soy large: "+imageURI);
  // Get image handle
  var largeImage = document.getElementById('largeImage');
  // Unhide image elements
  largeImage.style.display = 'block';
  // Show the captured photo - The inline CSS rules are used to resize the image
  largeImage.src = imageURI;
}

// A button will call this function
function capturePhoto() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail,{
    quality: 50,
    destinationType: destinationType.DATA_URL
  });
}

// A button will call this function
function capturePhotoEdit() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess, onFail,{
    quality: 50,
    allowEdit: true,
    destinationType: destinationType.DATA_URL
  });
}

// A button will call this function
function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, {
    quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source
  });
}

// Called if something bad happens.
function onFail(message) {
  alert('Fallo debido a: ' + message);
}

$( "#subir").click(function( event ) {
  //alert("Función no disponible en demo");
  capturePhotoEdit();
  return false;
});

function onPhotoDataSuccess_x(imageData) {
  // Uncomment to view the base64 encoded image data
  console.log("Soy small: "+imageData);
  // Get image handle
  var smallImage = document.getElementById('smallImage_dos');
  // Unhide image elements
  smallImage.style.display = 'block';
  // Show the captured photo - The inline CSS rules are used to resize the image
  smallImage.src = "data:image/jpeg;base64," + imageData;

  $.ajax({
    type: "POST",
    url: url_php + '/evidencia.php',
    data: {
      id_store: id_store,
      op: 'segunda_foto',
      imgBase64: smallImage.src,
    }
  }).done(function(o) {
    console.log('Se guardó satisfactoriamente: '+o);
  });
}

// A button will call this function
function capturePhoto_x() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess_x, onFail,{
    quality: 50,
    destinationType: destinationType.DATA_URL
  });
}

// A button will call this function
function capturePhotoEdit_x() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess_x, onFail,{
    quality: 50,
    allowEdit: true,
    destinationType: destinationType.DATA_URL
  });
}

$( "#subir_dos").click(function( event ) {
  //alert("Función no disponible en demo");
  capturePhotoEdit_x();
  return false;
});

function onPhotoDataSuccess_xd(imageData) {
  // Uncomment to view the base64 encoded image data
  console.log("Soy small: "+imageData);
  // Get image handle
  var smallImage = document.getElementById('smallImage_tres');
  // Unhide image elements
  smallImage.style.display = 'block';
  // Show the captured photo - The inline CSS rules are used to resize the image
  smallImage.src = "data:image/jpeg;base64," + imageData;

  $.ajax({
    type: "POST",
    url: url_php + '/evidencia.php',
    data: {
      id_store: id_store,
      op: 'firma',
      imgBase64: smallImage.src,
    }
  }).done(function(o) {
    console.log('Se guardó satisfactoriamente: '+o);
  });
}

// A button will call this function
function capturePhoto_xd() {
  // Take picture using device camera and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess_xd, onFail,{
    quality: 50,
    destinationType: destinationType.DATA_URL
  });
}

// A button will call this function
function capturePhotoEdit_xd() {
  // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
  navigator.camera.getPicture(onPhotoDataSuccess_xd, onFail,{
    quality: 50,
    allowEdit: true,
    destinationType: destinationType.DATA_URL
  });
}

$( "#subir_firma").click(function( event ) {
  //alert("Función no disponible en demo");
  capturePhotoEdit_xd();
  return false;
});

$('#promocional').submit(function(event) {

  $.ajax({
    url: url_php + '/formulario.php',
    type: 'POST',
    data: $('#promocional').serialize() + "&op=add_promocional",
  })
  .done(function(data) {
    console.log("Se envio: "+data);
    if (data == "OK") {
      swal({
        title: "Listo!",
        text: "Promotoría guardada.",
        type: "success",
      },
      function() {
        //location.reload();
        event.preventDefault();
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
});
