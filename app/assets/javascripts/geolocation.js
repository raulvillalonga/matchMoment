var map;

if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){
  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
}

function onError(err){
  console.log("What are you using, IE 7??", err);
}

function createMap(position){
  var mapOptions = {
    center: position,
    zoom: 17
  };
  map = new google.maps.Map($('#map')[0], mapOptions);
  //createMarker(position);

}

function createMarker(position) {
var iconBase = 'https://scontent.cdninstagram.com/hphotos-xap1/t51.2885-15/s150x150/e35/';


var marker = new google.maps.Marker({
  position: position,
  map: map,
  icon: iconBase + '12345836_476326889223129_1145783503_n.jpg'

   });
}

function arrMarkers(arr) {
  
  arr.forEach(function(pos){
    createMarker(pos)    
  });
}
