function createMap(info){
	var mapOptions={
         	center: new google.maps.LatLng(info.coords.latitude,info.coords.longitude),
          	zoom: info.zoom || 15,
          	mapTypeId: info.mapType || google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
          	styles: info.style
    };
    var map=new google.maps.Map($('#'+info.mapId).get(0), mapOptions);
    return map;
}

function createMapMarker(map, latitude, longitude){
  var position = new google.maps.LatLng(latitude, longitude);
  var marker = new google.maps.Marker({
      position: position,
      map: map,
      title: 'Hello World!'
  });
}

function geolocation(){
  if (navigator.geolocation){
    navigator.geolocation.getCurrentPosition(found_position, function(error){
      alert('If you don\'t share your location we can\'t find the best offers for you');
    });
  }
}
