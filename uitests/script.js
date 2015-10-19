var map;
function initMap() {
 var spot = {lat: 12.977682, lng: 77.715176}
 
 map = new google.maps.Map(document.getElementById('map'), {
    center: spot,
    zoom: 15
  });
    var marker = new google.maps.Marker({

	position:spot,
	map:map,
	title:'Lul'

    });




}

