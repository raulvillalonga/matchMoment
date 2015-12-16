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

  $(document).on("click", ".js-drawCircles",function(event){
    event.preventDefault();
    $('.slides').hide();
    deleteMarkers();
    arrCircles(arr_todo);
  });

  $(document).on("click", ".js-drawAllMarkers",function(event){
    event.preventDefault();
    $('.slides').hide();
    deleteMarkers();
    arrMarkers(arr_todo);
  });

  $(document).on("click", ".js-drawMatchMarkers",function(event){
    event.preventDefault();
    $('.slides').show();
    drawPhotoMatch();
  });

  function drawPhotoMatch() {
    deleteMarkers();
    var arr_match = getArrMatch(arr_todo, $( "#slider1" ).slider( "value" ));
    arrMarkersMatch(arr_match);
  }

  function getData(UserData){
    arr_todo.push(UserData);
  }


function loadData() {
 event.preventDefault();

    var users_shown = $('.users_shown');

    if (users_shown.length > 0) {
      ajax.execute('/api/media/' + users_shown[0].innerHTML, getData);
      if (users_shown.length > 1) {
        for (var i = 1; i < users_shown.length; i++) {
          ajax.execute('/api/media/' + users_shown[i].innerHTML, getData);
        }
      }
    }    
  }

  $( document ).ready(function() {
      loadData();
      setTimeout(drawPhotoMatch, 1000);
      
  });


})();