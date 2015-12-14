// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function () {

  "user strict";
  var ajax = new Ajax();
  var numero = 3;
  var arr_todo = [];

  $(document).on("click", ".js-btn-add",function(event){
    event.preventDefault();
    $(".js-btn-add").text("-");

    var linea = "<div id='js-rmv-line-"+numero+"'><div class='row js-txbox-line'><div class='col-md-3'></div><div class='col-md-6'><input class='form-control' placeholder='usuario_instagram' type='text' name='usuarios[usu_"+numero+"]' id='usuarios_usu_"+numero+"'> </div><div class='col-md-3'><button class='js-btn-add btn btn-default' >+</button></div></div></div>"

    $(".js-add-textbox").append(linea);
    numero += 1;
  });

  $(document).on("click", ".js-pintar",function(event){
    event.preventDefault();
    arrMarkers(arr_todo);
  });


  function getData(UserData){
    arr_todo.push(UserData);
    console.log(arr_todo);
  }

  $(document).on("click", ".js-ajax",function(event){
    event.preventDefault();

    var arr_principal = [];
    var arr_secundario = [];
    var users_shown = $('.users_shown');

    if (users_shown.length > 0) {
      for (var i = 0; i < users_shown.length; i++) {
        ajax.execute('/api/media/' + users_shown[i].innerHTML, getData);
      }        
    }    
  });



})();