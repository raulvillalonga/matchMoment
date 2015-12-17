var map;
var markers = [];

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
  console.log("Error: Google Maps no soporta IE 7??", err);
}

function createMap(position){
  var mapOptions = {
    center: position,
    zoom: 14
  };

  map = new google.maps.Map($('#map')[0], mapOptions);

}

function createMarker(data) {

    var pos = {};
    pos['lng'] = data['longitude'];
    pos['lat'] = data['latitude'];

  var marker = new google.maps.Marker({
    position: pos,
    map: map
  });
}

function createMarkerPlus(data) {

  if (data['longitude'] != null) {

var pos = {};
pos['lng'] = data['longitude'];
pos['lat'] = data['latitude'];

var size_px = 50;
var url_size = convert_url(data['low_resolution'], size_px); 
var image = {
    url: url_size,
    size: new google.maps.Size(size_px, size_px),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(25, 25)
  };
  var shape = {
    coords: [1, 1, 1, size_px, size_px, size_px, size_px, 1],
    type: 'poly'
  };

    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      icon: image,
      shape: shape
    });

    marker.addListener('click', function() {
      document.getElementById('js-medium-img').src = data['high_resolution'];
      $(".js-user-name").text(data['latitude']);
      $(".js-medium-modal").modal("show");
    });

  markers.push(marker);
};
}

function createCircles(data, id_user) {

  if (data['longitude'] != null) {
    var pos = {};
    pos['lng'] = data['longitude'];
    pos['lat'] = data['latitude'];

    var color = "";

    if (id_user < 9) {
      id_user = id_user % 10;
    };

    switch (id_user) {
      case 1:
        color = "red";
        break;
      case 2:
        color = "blue";
        break;
      case 3:
        color = "orange";
        break;
      case 4:
        color = "green";
        break;
      case 5:
        color = "yellow";
        break;
      case 6:
        color = "indigo";
        break;
      case 7:
        color = "fuchsia";
        break;
      case 8:
        color = "maroon";
        break;
      case 9:
        color = "gray";
        break;
      case 0:
        color = "black";
        break;
    }


      var shape = {
        coords: [1, 1, 1, 50, 50, 50, 50, 1],
        type: 'poly'
      };

      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: getCircle(30, color),
        shape: shape
      });   


  marker.addListener('click', function() {
    document.getElementById('js-medium-img').src = data['high_resolution'];
    $(".js-user-name").text(data['latitude']);
    $(".js-medium-modal").modal("show");
  });

  markers.push(marker);
  };
}


function getCircle(magnitude,color) {
  var circle = {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: color,
    fillOpacity: .2,
    strokeColor: 'white',
    strokeWeight: .5,
    scale: magnitude
  };
  return circle;
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
      createMarkerPlus(data);    
    });
  });

}

function arrMarkersMatch(arr) {

  arr.forEach(function(arr2){ 
    if (arr2.length > 1) {
      arr2.forEach(function(data){
        createMarkerPlus(data[0]);    
      });
    }; 
  });

}

function arrCircles(arr) {
  var id_user = 1;
  arr.forEach(function(arr2){  
    arr2.forEach(function(data){
      createCircles(data, id_user);    
    });
    id_user++;
  });
}

function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function deleteMarkers() {
  clearMarkers();
  markers = [];
}