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

  var marker = new google.maps.Marker({
    position: position,
    map: map
  });
}

function createMarkerPlus(data) {
var image = {
    url: data['url'],
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(50, 50),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(50, 50)
  };
  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  var shape = {
    coords: [1, 1, 1, 50, 50, 50, 50, 1],
    type: 'poly'
  };

    var marker = new google.maps.Marker({
      position: data['location'],
      map: map,
      icon: image,
      shape: shape,
      title: 'TEXTO'
    });
  
}


function arrMarkers(arr) {
  
  arr.forEach(function(data){
    createMarkerPlus(data)    
  });
}
