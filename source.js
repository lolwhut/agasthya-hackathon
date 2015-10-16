// Function to get the required data
//LOLWHUT 

function getData(){
	var schools = [
	{"name":"Gudipalli", "lng":5, "lat":10, "strength":[10,20,30,40,50]},
	{"name":"Komanapalli", "lng":7, "lat":12, "strength":[20,15,40,12]}
	];

return schools
};

// Our data is here
var schoolData = getData();

console.log(getDistance(schoolData[0]+schoolData[1]));

// Function to calculate the distance between two schools
function getDistance(x,y)
{
	var long1 = x.lng;
	var lat1 = x.lat;

	var long2 = y.lng;
	var lat2 = y.lat;

	var dist = 
};

