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




})();