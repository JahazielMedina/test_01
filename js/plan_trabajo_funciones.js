var items = [];
var date = moment();
date.locale('es');

$(document).ready(function() {

  $("input[name=buscar]").keyup(function() {

    var buscar = $("input[name=buscar]").val();

    $.ajax({
        url: url_php + '/plan_trabajo.php',
        type: 'POST',
        data: {
          op: "promotores",
          buscar: buscar,
        }
      })
      .done(function(data) {
        //console.log(data);
        var prom = JSON.parse(data);
        var nombre = prom.nombre;
        if (nombre != "") {
          var matricula = prom.matricula;
          var prom_id = prom.id;
          var ruta = prom.ruta;
          var promotor = prom.promotor;
          $("input[name=nombre]").val(nombre);
          $("input[name=matricula]").val(matricula);
          $("input[name=promotor_id]").val(prom_id);
          $("input[name=ruta_promotor]").val(ruta);
          $("input[name=promotor]").val(promotor);
        } else {
          $("input[name=nombre]").val("");
          $("input[name=matricula]").val("");
          $("input[name=promotor_id]").val("");
          $("input[name=ruta_promotor]").val("");
          $("input[name=promotor]").val("");
        }

      })
      .fail(function(data) {
        console.log("error en listar posts " + data);
      });
  }); //Fin de keyup para obtener información del promotor


  $('#calendar').fullCalendar({
    lang: 'es',
    dayClick: function(date, jsEvent, view) {
      var dia = parseInt(date.format("DD"));
      var mes = parseInt(date.format("MM"));
      var año = parseInt(date.format("YYYY"));
      var currDate = date.format("MM/DD/YYYY");
      var semana = getWeek(año, mes, dia);
      get_routs(date.format("MM/DD/YYYY"));
      $("input[name=week]").val(semana);
      $("#modal1").openModal();
      $("#dia").val(date.format("MM/DD/YYYY"));
      //console.log(currDate);
    }
  }); //Fin de calendario

  /********** Formularios **********/

  $.ajax({
      url: url_php + '/plan_trabajo.php',
      type: 'POST',
      data: {
        op: 'ob_plan_trabajo'
      }
    })
    .done(function(data) {
      //console.log(data);
      var data_json = JSON.parse(data);
      if (data_json.status == "") {
        $("#tabla").html("<br><center>No hay nada planeado</center>");
      } else {
        generar_datatable(data_json);
      }
    })
    .fail(function(data) {
      console.log("error:", data);
    }); //Fin de ajax de Plan de Trabajo

}); /***fin document.ready***/

function send_form() {

  var dia = $("input[name=dia]").val();
  var tiendas = $("input[name=tiendas_id]").val();
  var promotor_id = $("input[name=promotor_id]").val();
  var semana = $("input[name=week]").val();

  $.ajax({
    url: url_php + '/plan_trabajo.php',
    type: 'POST',
    data: {
      op: 'ag_tienda',
      tiendas: tiendas,
      promotor_id: promotor_id,
      dia: dia,
      week: semana,
    }
  })
  .done(function(data) {
    //console.log("success:",data);
    var dato = JSON.parse(data);
    items.length = 0;
    if (dato.status == "OK") {
      swal({
          title: "Listo!",
          text: "Se han agregado las tiendas al plan de trabajo.",
          type: "success",
        },
        function() {
          //location.reload();
          event.preventDefault();

          $('#table_rutas').DataTable().rows( '.selected' )
          .nodes()
          .to$()
          .removeClass( 'selected' );
          var data_json = JSON.parse(data);
          rutas_datatable(data_json);
        });
    } else {
        //console.log("success",data);
        swal("Error!", "Se produjo un error al intentar agregar las tiendas, inténtalo de nuevo.", "error");
    }
  })
  .fail(function(data) {
    console.log("error", data);
  });

} //Fin de ajax que inserta tiendas en plan de trabajo

function getWeek(año, mes, dia) {

  Date.prototype.getWeekNumber = function() {

    var d = new Date(Date.UTC(año, mes - 1, dia));
    var dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  };

  var selected_week = new Date().getWeekNumber();
  return selected_week;

} //Fin función que obtiene el número de semana actual

function addItems(ids) {

  var index = jQuery.inArray(ids, items);

  if (index == -1) {
    items.push(ids);
    $("#tiendas_id").val(items);
  } else {
    items.splice(index, 1);
    $("#tiendas_id").val(items);
  }

  var input_tiendas = $("input[name=tiendas_id]").val();
  //console.log("items:",items,"input:",input_tiendas);

} //Fin de función que agrega a un array las tiendas que se van seleccionando

function get_routs(dia) {

  var promotor = $("input[name=promotor]").val();
  var ruta = $("input[name=ruta_promotor]").val();
  var promotor_id = $("input[name=promotor_id]").val();

  $.ajax({
      url: url_php + '/plan_trabajo.php',
      type: 'POST',
      data: {
        op: "ob_tienda",
        promotor: promotor,
        promotor_id: promotor_id,
        ruta: ruta,
        dia: dia,
        //dataType: "jsonp"
      }
    })
    .done(function(data) {
      console.log(data);
      var data_json = JSON.parse(data);
      rutas_datatable(data_json);
      console.log("Di click");

      //$('#table_rutas').DataTable().ajax.reload(null, false);
      console.log('reload');

      //$('#table_rutas').DataTable().ajax.reload();
    })
    .fail(function(data) {
      console.log("error:", data);
    });
} //Fin de función que obtiene las tiendas dependiendo de la ruta del promotor

function obtener_data(prom_id) {

  $('#modal_prom').openModal();

  $.ajax({
      url: url_php + '/plan_trabajo.php',
      type: 'POST',
      data: {
        op: 'ob_data_plan',
        prom_id: prom_id,
      }
    })
    .done(function(data) {
      //console.log(data);
      var data_json = JSON.parse(data);
      generar_datatable_dos(data_json);
    })
    .fail(function(data) {
      console.log("error:", data);
    });
} //Fin de obtener_wc_data

function generar_datatable_dos(data_json) {

  $('#tabla_data').DataTable({
    processing: true,
    data: data_json.data,
    "oLanguage": {
      "sProcessing": "Procesando...",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "No se encontraron resultados",
      "sEmptyTable": "Ningún dato disponible en esta tabla",
      "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando del 0 al 0 de 0 registros",
      "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": "Buscar:",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }
    },
    columns: [{
        "data": "dia",
      },
      {
        "data": "determinante",
      },
      {
        "data": "cliente",
      },
      {
        "data": "cadena",
      },
      {
        "data": "estado",
      },
    ],
    paging: true,
    order: [[ 0, "desc" ]],
    retrieve: true,
    responsive: {
      breakpoints: [{
          name: 'dia',
          width: 148
        },
        {
          name: 'determinante',
          width: 48
        },
        {
          name: 'cliente',
          width: 1280
        },
        {
          name: 'cadena',
          width: 1188
        },
        {
          name: 'estado',
          width: 1024
        },
      ]
    },
    "bLengthChange": false
  }); //Fin de dataTable
}

function rutas_datatable(data_json) {

  var table = $('#table_rutas').DataTable({
    processing: true,
    data: data_json.data,
    columns: [{
        "data": "Determinante"
      },
      {
        "data": "Nombre_tienda"
      },
      {
        "data": "Cadena"
      },
      {
        "data": "Direccion"
      },
      {
        "data": "Ruta",
      },
      {
        "data": "Id",
        "visible": false
      },
      {
        "data": "bg",
        "visible": false
      },
    ],
    paging: true,
    //retrieve: true,
    "oLanguage": {
      "sProcessing": "Procesando...",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "No se encontraron resultados",
      "sEmptyTable": "Ningún dato disponible en esta tabla",
      "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando del 0 al 0 de 0 registros",
      "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": "Buscar:",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }
    },
    destroy: true,
    responsive: {
      breakpoints: [{
          name: 'Determinante',
          width: 48
        },
        {
          name: 'Nombre_tienda',
          width: 148
        },
        {
          name: 'Cadena',
          width: 1280
        },
        {
          name: 'Direccion',
          width: 1188
        },
        {
          name: 'Ruta',
          width: 1024
        },
      ]
    },

    "bLengthChange": false,
    select: true

  }); //Fin de dataTable

  //table.destroy();
  $('#table_rutas tbody').on('click', 'tr', function() {
    var info_row = table.row(this).data();
    var id_store = info_row.Id;
    if ($(this).hasClass('selected')) {
      $(this).removeClass('selected');
    } else {
      $(this).addClass('selected');
    }
    addItems(id_store);
  });
} //Fin de tabla que muestra las tiendas del promotor

function generar_datatable(data_json) {

  var table = $('#tabla').DataTable({
    processing: true,
    "oLanguage": {
      "sProcessing": "Procesando...",
      "sLengthMenu": "Mostrar _MENU_ registros",
      "sZeroRecords": "No se encontraron resultados",
      "sEmptyTable": "Ningún dato disponible en esta tabla",
      "sInfo": "Mostrando del _START_ al _END_ de _TOTAL_ registros",
      "sInfoEmpty": "Mostrando del 0 al 0 de 0 registros",
      "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
      "sInfoPostFix": "",
      "sSearch": "Buscar:",
      "sUrl": "",
      "sInfoThousands": ",",
      "sLoadingRecords": "Cargando...",
      "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Último",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
      },
      "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
      }
    },
    data: data_json.data,
    columns: [{
        "data": "promotor"
      },
      {
        "data": "ruta"
      },
      {
        "data": "promotor_id",
        "visible": false
      },
    ],
    paging: true,
    options: {
      events: ['click']
    },
    responsive: true,
    "bLengthChange": false
  }); //Fin de dataTable
  $('#tabla tbody').on('click', 'tr', function() {
    var info_row = table.row(this).data();
    var id_promotor = info_row.promotor_id;
    obtener_data(id_promotor);
  });
} //Fin de tabla de plan de trabajo de todos los promotores


function clear_datatable(table_id){
  console.log(table_id);
  var table = $("#"+table_id).DataTable();
  table.destroy();
}

/*function reload_window(){
  swal({
    title: "Se guardarán los cambios",
    text: 'Podrá ver la información guardada en la pestaña "Planeado".',
    type: "success",
    showCancelButton: false,
    confirmButtonText: "Ok",
    //cancelButtonText: "Cancelar",
    },function() {
      location.reload();
    });
}*/
