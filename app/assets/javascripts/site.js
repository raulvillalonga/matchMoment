// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function () {

  "user strict";
  var numero = 3;

  $(document).on("click", ".js-btn-add",function(event){
    event.preventDefault();
    $(".js-btn-add").text("-");

    var linea = "<div id='js-rmv-line-"+numero+"'><div class='row js-txbox-line'><div class='col-md-3'></div><div class='col-md-6'><input class='form-control' placeholder='usuario_instagram' type='text' name='usuarios[usu_"+numero+"]' id='usuarios_usu_"+numero+"'> </div><div class='col-md-3'><button class='js-btn-add btn btn-default' >+</button></div></div></div>"

    $(".js-add-textbox").append(linea);
    numero += 1;
  });

  $(document).on("click", ".js-pintar",function(event){

    event.preventDefault();
    var arr = [{lat: 40.4288712,lng: -3.70087},
               {lat: 40.429400853,lng: -3.70225602},
               {lat: 40.429490859,lng: -3.70229609},
               {lat: 40.4277802,lng: -3.7102399}];

    arrMarkers(arr);
  });


})();

