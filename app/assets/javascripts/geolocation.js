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

function createMarker(position) {

  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
}

function createMarkerPlus(data) {
var image = {
    url: data['url'],
    size: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(50, 50)
  };
  var shape = {
    coords: [1, 1, 1, 50, 50, 50, 50, 1],
    type: 'poly'
  };

    var marker = new google.maps.Marker({
      position: data['location'],
      map: map,
      icon: image,
      shape: shape,
      title: data['usu']
    });
  
}


function arrMarkers(arr) {
  
  arr.forEach(function(data){
    createMarkerPlus(data)    
  });
}
