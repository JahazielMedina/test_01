
var url_php = "http://demo.interglobalcs.com/promo_app";
var current_url = window.location.href;
//console.log(current_url);

if(current_url.indexOf("index.html") !== -1 || current_url.indexOf("sign-up.html") !== -1){
  console.log("Estoy en pagina inicial o en sign up.");
} else {
  if(localStorage.getItem("id_user") === null) {
    window.location = "index.html";
  } else {
    var id_user = localStorage.getItem("id_user");
  }
}

function get_current_date(){
  var event = new Date();
  var options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  var current_date = event.toLocaleDateString('es-ES', options);
  $('#current_date').html("<p class='task-card-date' style='text-align:right;margin-top:10px;'>" + current_date + "</p>");
}

function consulta_permisos_admin(id_user){
  $.ajax({
    url: url_php + '/promotores.php',
    type: 'POST',
    data: {
      op: 'es_admin',
      id_usuario: id_user,
    }
  })
  .done(function(data) {
    //console.log("success "+data);
    if(data == '1'){
      $('#sidemenu_html').html(side_menu());
      $('#dashboard_menu').html(dashboard_menu_admin());
      $('#chart-dashboard').show();
      cargar_menu(id_user);
    } else {
      $('#sidemenu_html').html(side_menu_prom());
      $('#dashboard_menu').html(dashboard_menu_prom());
      get_promt_dash(id_user);
      get_calendar(id_user);
      get_current_date();
      $('#chart-dashboard').hide();
    }
  })
  .fail(function(data) {
    console.log("error "+data);
  });
}//Fin de consulta_permisos_admin

function side_menu(){
  return `
    <li class="user-details cyan darken-2">
      <div class="row">
        <div class="col col s4 m4 l4">
          <img src="images/user.png" alt="" class="circle responsive-img valign profile-image">
        </div>
        <div class="col col s8 m8 l8">
          <ul id="profile-dropdown" class="dropdown-content">
            <li><a href="#"><i class="mdi-action-face-unlock"></i> Profile</a></li>
            <li><a href="#"><i class="mdi-action-settings"></i> Settings</a></li>
            <li class="divider"></li>
            <li><a href="#"><i class="mdi-hardware-keyboard-tab"></i> Logout</a></li>
          </ul>
          <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" data-activates="profile-dropdown">
            <div id="username"></div>
          </a>
          <p class="user-roal">Administrator</p>
        </div>
      </div>
    </li>
    <li class="bold"><a href="index.html" class="waves-effect waves-cyan"><i class="mdi-action-dashboard"></i> Dashboard</a></li>
    <li class="bold"><a href="plan_trabajo.html" class="waves-effect waves-cyan"><i class="mdi-action-event"></i> Plan de trabajo</a></li>
    <li class="bold"><a href="promoters.html" class="waves-effect waves-cyan"><i class="mdi-action-accessibility"></i> Promotores</a></li>
    <li class="bold"><a href="customers.html" class="waves-effect waves-cyan"><i class="mdi-action-perm-identity"></i> Clientes</a></li>
    <li class="bold"><a href="productos.html" class="waves-effect waves-cyan"><i class="mdi-maps-local-grocery-store"></i> Productos</a></li>
    <li class="bold"><a href="rutas.html" class="waves-effect waves-cyan"><i class="mdi-action-trending-up"></i> Rutas</a></li>
    <li class="bold"><a onclick="function_no_disponible()" class="waves-effect waves-cyan"><i class="mdi-action-settings"></i> Configuraciones</a></li>
    <li class="bold"><a class="waves-effect waves-cyan" onclick="cerrar_sesion();"><i class="mdi-action-lock-outline"></i> Cerrar sesión</a></li>
  `;
}//Fin de top_bar_menu

function footer(){
  return `
    <footer class="page-footer">
      <div class="footer-copyright">
        <div class="container">
          Copyright © 2015 <a class="grey-text text-lighten-4" href="http://www.interglobalcs.com/" target="_blank">InterGlobalCS</a> All rights reserved.
          <span class="right"> Design and Developed by <a class="grey-text text-lighten-4" href="http://www.interglobalcs.com/">InterGlobalCS</a></span>
        </div>
      </div>
    </footer>
  `;
}

function side_menu_prom(){
  return `
    <li class="user-details cyan darken-2">
      <div class="row">
        <div class="col col s4 m4 l4">
          <img src="images/user.png" alt="" class="circle responsive-img valign profile-image">
        </div>
        <div class="col col s8 m8 l8">
          <ul id="profile-dropdown" class="dropdown-content">
            <li><a href="#"><i class="mdi-action-face-unlock"></i> Profile</a></li>
            <li><a href="#"><i class="mdi-action-settings"></i> Settings</a></li>
            <li class="divider"></li>
            <li><a href="#"><i class="mdi-hardware-keyboard-tab"></i> Logout</a></li>
          </ul>
          <a class="btn-flat dropdown-button waves-effect waves-light white-text profile-btn" href="#" data-activates="profile-dropdown" >
            <div id="username"></div>
          </a>
          <p class="user-roal">Promotor</p>
        </div>
      </div>
    </li>
    <li class="bold"><a href="index.html" class="waves-effect waves-cyan"><i class="mdi-action-dashboard"></i> Dashboard</a></li>
    <li class="bold"><a href="promocional.html" class="waves-effect waves-cyan"><i class="mdi-editor-insert-comment"></i> Formulario</a></li>
    <li class="bold"><a href="plan_promotor.html" class="waves-effect waves-cyan"><i class="mdi-action-event"></i> Plan de trabajo</a></li>
    <li class="bold"><a onclick="function_no_disponible()" class="waves-effect waves-cyan"><i class="mdi-action-settings"></i> Configuraciones</a></li>
    <li class="bold"><a class="waves-effect waves-cyan" onclick="cerrar_sesion();"><i class="mdi-action-lock-outline"></i> Cerrar sesión</a></li>
  `;
}//Fin de top_bar_menu

function dashboard_menu_admin(){
  return `
    <div class="row">
      <div class="col s12 m6 l3">
        <div class="card">
          <div class="card-content green white-text">
            <p class="card-stats-title">Clientes</p>
              <h4 class="card-stats-number"><div id="num_customers"></div></h4>
              <i class="mdi-social-group-add medium"></i>
            </p>
          </div>
          <div class="card-action  green darken-2">
            <div id="clients-bar" class="center-align"></div>
          </div>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="card">
          <a class="card" href="plan_trabajo.html#planned">
            <div class="card-content pink lighten-1 white-text">
              <p class="card-stats-title">Plan de trabajo</p>
              <h4 class="card-stats-number"><div id="num_planes"></div></h4>
              <i class="mdi-notification-event-note medium"></i>
            </div>
            <div class="card-action pink darken-2">
              <div id="invoice-line" class="center-align"></div>
            </div>
          </a>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="card">
          <a class="card" href="plan_trabajo.html">
            <div class="card-content cyan lighten-1 white-text">
              <p class="card-stats-title">Plan de trabajo</p>
              <h4 class="card-stats-number"><i class="mdi-content-create"></i></h4>
              <i class="mdi-action-assignment medium"></i>
            </div>
            <div class="card-action cyan darken-2">
              <div id="invoice-line" class="center-align"></div>
            </div>
          </a>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="card">
          <a class="card" href="productos.html">
            <div class="card-content blue-grey white-text">
              <p class="card-stats-title">Productos</p>
              <h4 class="card-stats-number"><div id="num_products"></div></h4>
              <i class="mdi-maps-local-grocery-store medium"></i>
            </div>
            <div class="card-action blue-grey darken-2">
              <div id="profit-tristate" class="center-align"></div>
            </div>
          </a>
        </div>
      </div>
      <div class="col s12 m6 l3">
        <div class="card">
          <a class="card" href="promoters.html">
            <div class="card-content purple white-text">
              <p class="card-stats-title">Promotores</p>
              <h4 class="card-stats-number"><div id="num_promotores"></div></h4>
              <i class="mdi-action-account-circle medium"></i>
            </div>
            <div class="card-action purple darken-2">
              <div id="sales-compositebar" class="center-align"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `;
}

function dashboard_menu_prom(){
  return  `
    <section id="content">
      <div class="container" style="margin-bottom:510px;">
        <div id="card-stats">
          <div class="row">
            <!--start tasks daily-->
            <section id="content" style="margin-top:20px;">
              <div class="container">
                <div id="profile-page" class="section">
                  <div id="profile-page-content" class="row">
                    <ul id="task-card" class="collection with-header">
                      <li class="collection-header cyan">
                        <h4 class="task-card-title">Tiendas a visitar hoy</h4>
                        <div id="current_date"></div>
                      </li>
                      <div id="contenido"></div>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <div class="col s12 m6 l3">
              <div class="card">
                <a class="card" href="plan_promotor.html">
                  <div class="card-content green white-text">
                    <p class="card-stats-title"></p>
                    <h4 class="card-stats-number">Plan de trabajo</h4>
                    <i class="mdi-action-today medium"></i>
                  </div>
                  <div class="card-action  green darken-2">
                    <div id="clients-bar" class="center-align"></div>
                  </div>
                </a>
              </div>
            </div>
            <div class="col s12 m6 l3">
              <div class="card">
                <a class="card" href="promocional.html">
                  <div class="card-content purple white-text">
                    <p class="card-stats-title"></p>
                    <h4 class="card-stats-number">Formulario</h4>
                    <i class="mdi-editor-insert-comment medium"></i>
                  </div>
                  <div class="card-action purple darken-2">
                    <div id="clients-bar" class="center-align"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}//Fin de parseURLParams

function cargar_menu(id_user){

  $.ajax({
    url: url_php+'/user_info.php',
    type: 'POST',
    data: {
      op: 'user_info',
      user_id: id_user,
    }
  })
  .done(function(data) {
  //console.log("Datos de usuario: "+data);
    var datos = JSON.parse(data);
    //console.log(datos);
    $('#username').html(datos.Nombre);
  })
  .fail(function(data) {
    console.log("Error al intentar obtener datos del usuario "+data);
  });

  $.ajax({
    url: url_php+'/user_info.php',
    type: 'POST',
    data: {
      op: 'contenido',
      user_id: id_user,
    }
  })
  .done(function(data) {
    //console.log("Datos de usuario: "+data);
    var datos = JSON.parse(data);
    $('#num_customers').html(datos.num_customers);
    $('#num_planes').html(datos.num_planes);
    $('#num_products').html(datos.num_products);
    $('#num_promotores').html(datos.num_promotores);
  })
  .fail(function(data) {
    console.log("Error al intentar obtener datos del usuario "+data);
  });

}//Fin de cargar_menu
function go_to_form(id_store) {
  console.log(id_store);
    window.location="promocional.html?id="+id_store;
}

function go_to_sign(id_store) {
  console.log(id_store);
    window.location="firma.html?id="+id_store;
}

function cerrar_sesion(){
  swal({
      title: "¿Cerrar sesión?",
      text: "¿Esta seguro de cerrar sesión?",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Si",
      cancelButtonText: "Cancelar",
    },
    function() {
      localStorage.clear();
      window.location = "dashboard.html";
    });
}//Fin de cerrar_sesion

function function_no_disponible(){
  swal("No disponible", "Esta función en versión demo no esta disponible","warning");
}


function grafica(id_user){
//  console.log(id_user);
  $.ajax({
    url: url_php+'/user_info.php',
    type: 'POST',
    data: {
      op: 'user_info',
      user_id: id_user,
    }
  })
  .done(function(data) {
  //console.log("Datos de usuario: "+data);
    var datos = JSON.parse(data);
    console.log(datos);
    $('#username').html(datos.Nombre);
  })
  .fail(function(data) {
    console.log("Error al intentar obtener datos del usuario "+data);
  });

  $.ajax({
    url: url_php+'/user_info.php',
    type: 'POST',
    data: {
      op: 'user_info',
      user_id: id_user,
    }
  })
  .done(function(data) {
    console.log("Datos de usuario: "+data);
    var datos = JSON.parse(data);
    $('#num_customers_x').html(datos.num_customers_x);
  })
  .fail(function(data) {
    console.log("Error al intentar obtener datos del usuario "+data);
  });

}//Fin de cargar_menu
