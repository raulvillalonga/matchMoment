// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

(function () {

  "user strict";
  var ajax = new Ajax();
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

    var arr = [{location:{lat: 40.4288712,lng: -3.70087}, url: 'https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/s50x50/e35/12277408_693961800703643_478006682_n.jpg'},
               {location:{lat: 40.429400853,lng: -3.70225602}, url: 'https://scontent.cdninstagram.com/hphotos-xtp1/t51.2885-15/s50x50/e35/12298859_1660225194236718_353917363_n.jpg'},
               {location:{lat: 40.429490859,lng: -3.70229609}, url: 'https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/s50x50/e35/12256766_802203706574085_1495794820_n.jpg'},
               {location:{lat: 40.4277802,lng: -3.7102399}, url: 'https://scontent.cdninstagram.com/hphotos-xat1/t51.2885-15/s50x50/e35/12080528_193715177627277_1961656243_n.jpg'}];

    arrMarkers(arr);
  });


  function getData(UserData){
    console.log(UserData);
  }

  $(document).on("click", ".js-ajax",function(event){
    event.preventDefault();

      var user_id = 1;      
      ajax.execute('/api/user/' + user_id, getData);



  });
})();

