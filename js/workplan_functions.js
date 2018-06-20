$(document).ready(function() {

  consulta_permisos_admin(id_user);

  //cargar_menu(id_user);

  /*var event = new Date();
  var options = {  year: 'numeric', month: 'long', day: 'numeric' };
  var current_date = event.toLocaleDateString('en-ES', options);
  $('#current_date').html("<p class='task-card-date' style='text-align:right;margin-top:10px;'>"+current_date+"</p>");*/
  //console.log(current_date);

  //get_calendar(id_user);


});

function get_promt_dash(id_user){

  console.log("tengo id_user",id_user);
  $.ajax({
      url: url_php + '/workplan.php',
      type: 'POST',
      data: {
        op: 'contenido',
        id_user: id_user
      }
    })
    .done(function(data) {
      //console.log("contenido",data);
      if (data == "") {
        $('#contenido').html(`
          <li class='collection-item dismissable'>
            <label for='task1'>
              <center>No tienes tiendas por visitar<a class='secondary-content'><span class='medium'>Hoy</span></a></center>
            </label>
          </li>`);
      } else {
        $('#contenido').html(data);
      }
    })
    .fail(function(data) {
      console.log("error en listar posts " + data);
    });

}

function get_calendar(id_user){

  //console.log("calendar",id_user);

  $.ajax({
      url: url_php + '/workplan.php',
      type: 'POST',
      data: {
        op: 'calendar',
        id_user: id_user
      },
      dataType: 'json',
    })
    .done(function(data) {
      //console.log(data);
      $('#calendar').fullCalendar({
        lang: 'es',
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,listWeek'
        },
        hiddenDays: [ 0, 6 ],
        businessHours: {
          dow: [ 1, 2, 3, 4, 5 ], // Monday - Thursday
          start: '8:00', // a start time (10am in this example)
          end: '18:00', // an end time (6pm in this example)
        },
         //eventLimit: false, // allow "more" link when too many events
        events: data,
      });
    })
    .fail(function(data) {
      console.log("error en listar posts " + data);
    });
}
