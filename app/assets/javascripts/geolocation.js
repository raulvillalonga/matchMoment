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
    zoom: 14
  };
  map = new google.maps.Map($('#map')[0], mapOptions);
  //createMarker(position);

}

function createMarker(data) {

  debugger;
    var pos = {};
    pos['lng'] = data['longitude'];
    pos['lat'] = data['latitude'];

  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
}

function createMarkerPlus(data) {
  debugger;
var pos = {};
pos['lng'] = data['longitude'];
pos['lat'] = data['latitude'];

var size_px = 50;
var url_size = convert_url(data['low_resolution'], size_px); 
var image = {
    url: url_size,
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(50, 50)
  };
  var shape = {
    coords: [1, 1, 1, 50, 50, 50, 50, 1],
    type: 'poly'
  };

    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: image,
      shape: shape
    });
  
}

function convert_url(url, size) {

  var url_modi = "";
  separado = url.split('/');
  separado[5] = "s" + size + "x" + size;
  url_modi = separado.join('/');  
  return url_modi;
}

function arrMarkers(arr) {
  arr.forEach(function(arr2){  
    arr2.forEach(function(data){
      debugger;
      createMarkerPlus(data);    
       // createMarker(data);
    });
  });

}
