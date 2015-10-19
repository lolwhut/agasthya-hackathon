// Function to get the required data
//LOLWHUT 


function getData(){
	var schools = [
	    {"name":"Agastya","lng":50,"lat":50,"capacity":[300]},
	{"name":"Gudipalli", "lng":5, "lat":10, "strength":[10,20,30,40,50]},
	{"name":"Komanapalli", "lng":7, "lat":12, "strength":[20,15,40,12]}
	    //Add More Schools Here
	];

    return schools;
};

// Our data is here
var schoolData = getData();


function objectLength(obj) {
  var result = 0;
  for(var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
    // or Object.prototype.hasOwnProperty.call(obj, prop)
      result++;
    }
  }
  return result;
}


for(var i=1;i<objectLength(schoolData);++i){

console.log(getDistance(schoolData[0],schoolData[i])+"\n");

}

// Function to calculate the distance between two schools
function getDistance(x,y)
{
	var long1 = x.lng;
	var lat1 = x.lat;

	var long2 = y.lng;
	var lat2 = y.lat;

    var dist = Math.sqrt((Math.pow((long1-long2),2)+Math.pow((lat1-lat2),2)));

    return dist;
};