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

    var ruta = 'https://scontent.cdninstagram.com/hphotos-xfp1/t51.2885-15/s50x50/e35/12277408_693961800703643_478006682_n.jpg'

    var arr = [
                {location:{lat: 40.429400853,lng: -3.70225602},  usu: '321329',     url: ruta},
                {location:{lat: 41.408951801,lng: 2.126988622},  usu: '244332023',  url: ruta},
                {location:{lat: 37.3772202,  lng: -5.9865699},   usu: '241603449',  url: ruta},
                {location:{lat: 37.3772,     lng: -5.98694},     usu: '213188040',  url: ruta},
                {location:{lat: 41.384794362,lng: 2.132599489},  usu: '498017',     url: ruta},
                {location:{lat: 38.711895845,lng: -9.139086455}, usu: '746079015',  url: ruta},
                {location:{lat: 40.002975701,lng: 3.848131328},  usu: '297445204',  url: ruta},
                {location:{lat: 40.425,      lng: -3.690277778}, usu: '396788422',  url: ruta},
                {location:{lat: 40.415555556,lng: 3.707222222},  usu: '456567595',  url: ruta},
                {location:{lat: 40.420412203,lng: -3.706713528}, usu: '235741377',  url: ruta},
                {location:{lat: 40.429400853,lng: -3.70225602},  usu: '321329',     url: ruta},
                {location:{lat: 40.426370838,lng: -3.689385343}, usu: '219380638',  url: ruta},
                {location:{lat: 40.4170666,  lng: -3.70347705},  usu: '3002373',    url: ruta},
                {location:{lat: 40.4288712,  lng: -3.70087},     usu: '1021856313', url: ruta},
                {location:{lat: 40.4379311,  lng: -3.68152},     usu: '41747275',   url: ruta},
                {location:{lat: 40.4114494,  lng: -3.69418},     usu: '192613',     url: ruta},
                {location:{lat: 40.411034344,lng: -3.709146582}, usu: '60032',      url: ruta},
                {location:{lat: 40.420413901,lng: -3.703935006}, usu: '106723464',  url: ruta},
                {location:{lat: 40.466103343,lng: -3.689962483}, usu: '243026615',  url: ruta},
                {location:{lat: 40.4277802,  lng: -3.7102399},   usu: '838318348',  url: ruta},
                {location:{lat: 40.47501784, lng: -3.78488361},  usu: '401939032',  url: ruta},
                {location:{lat: 40.47501784, lng: -3.78488361},  usu: '401939032',  url: ruta},
                {location:{lat: 40.406284705,lng: -3.896384171}, usu: '3803940',    url: ruta},
                {location:{lat: 39.7167,     lng: -6.28333},     usu: '308114256',  url: ruta}
              ];



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

