var map;
var agastya = {lat: 12.8249489, lng: 78.2560428};
var routePlan = [];
var capacity = 500;

var wayptscords = [];

var totalStrength = [];
for(var i = 0; i<schools.length; ++i)
{
    var ts = 0;
    for(var j = 0; j<Object.keys(schools[i]["strengths"]).length; j++)
    {
      ts += parseInt(schools[i]["strengths"][j+6]);
    }
    totalStrength[i] = ts;
  }


var coords=[];

    for(var i = 0; i < schools.length; ++i){

        var coordinates = {"lat":parseFloat(schools[i]["lat"]),
                            "lng":parseFloat(schools[i]["long"])};

        coords.push(coordinates);


    }





function initMap() {
  var bounds = new google.maps.LatLngBounds;
  var markersArray = [];
  
  var directionsDisplay = new google.maps.DirectionsRenderer({


    panel: document.getElementById('rpanel'),
  });
  var directionsService = new google.maps.DirectionsService;


  map = new google.maps.Map(document.getElementById('map'), {
    center: agastya,
    zoom: 10
  });

  directionsDisplay.setMap(map);
  



  var geocoder = new google.maps.Geocoder();

  var service = new google.maps.DistanceMatrixService();


coords.unshift(agastya);


for(var i=0;i<(schools.length) && (capacity>=0) ;++i)

{   
    wayptscords.push(coords[i+1]);
    service.getDistanceMatrix({
    origins: [coords[i]],
    destinations: [coords[i+1]],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  }, function(response, status) {
    if (status !== google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var originList = response.originAddresses;

      var destinationList = response.destinationAddresses;
      var outputDiv = document.getElementById('results');
      //outputDiv.innerHTML = '';
      deleteMarkers(markersArray);

      var showGeocodedAddressOnMap = function(asDestination) {
        return function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            //map.fitBounds(bounds.extend(results[0].geometry.location));
            //markersArray.push(new google.maps.Marker({
              //map: map,
              //position: results[0].geometry.location
            //}));

           




          } else {
            alert('Geocode was not successful due to: ' + status);
          }
        };
      };

      for (var i = 0; i < originList.length; i++) {
        var results = response.rows[i].elements;
        geocoder.geocode({'address': originList[i]},
            showGeocodedAddressOnMap(false));
        for (var j = 0; j < results.length; j++) {
          geocoder.geocode({'address': destinationList[j]},
              showGeocodedAddressOnMap(true));
          outputDiv.innerHTML +=  
              results[j].distance.text + ' in ' +
              results[j].duration.text + '<br>';
        }
      }
    }
  });

console.log(capacity);
capacity = capacity - totalStrength[i];


}


calculateAndDisplayRoute(directionsService, directionsDisplay,schools,wayptscords);



  var schoolInfo = [];
  var infoWindow = new google.maps.InfoWindow();
  for(var i = 0; i<wayptscords.length; i++){

    // Get the contents of the infowindow

    schoolInfo[i] = getSchoolInfo(schools[i]);

    // Add marker for school
    marker=new google.maps.Marker({
      position:wayptscords[i],
      map:map
    });

      // Set click event for marker
      google.maps.event.addListener(marker, 'click', (function(marker,i){
        return function(){
          infoWindow.setContent(schoolInfo[i]);
          infoWindow.open(map,marker);
        }
      })(marker,i));
    }

} //end of initMap



 
  function getSchoolInfo(school){

    var totalStrength = 0;
    for(var j = 0; j<Object.keys(school["strengths"]).length; j++)
    {
      totalStrength += parseInt(school["strengths"][j+6]);
    }

    var info = "<b><h4>"+school["name"]+"</h4></b>"+
    "<table class='customTable'><tr><th>Grade</th><th>Strength</th></tr>"+
    "<tr><td>6</td><td>"+school["strengths"]["6"]+"</td></tr>"+
    "<tr><td>7</td><td>"+school["strengths"]["7"]+"</td></tr>"+
    "<tr><td>8</td><td>"+school["strengths"]["8"]+"</td></tr>"+
    "<tr><td>9</td><td>"+school["strengths"]["9"]+"</td></tr>"+
    "<tr><td>10</td><td>"+school["strengths"]["10"]+"</td></tr></table>"+
    "<br><p><b>Total Strength: </b></p>"+totalStrength+" Students";

    return info;
  }



function calculateAndDisplayRoute(directionsService, directionsDisplay, schools, wayptscords) {
  var selectedMode = 'DRIVING';
  waypts = [];
  //add loop here
  console.log(wayptscords);
  for(i=0;i<wayptscords.length;++i)
  { 

  waypts.push({
        location: wayptscords[i],
        stopover: true
      });
  }
  directionsService.route({
    origin: agastya,  
    destination: agastya,
    waypoints: waypts,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode[selectedMode]
  }, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}




function deleteMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}






