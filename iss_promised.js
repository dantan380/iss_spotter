const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json{"ip":"142.179.77.77"}');
};


const fetchCoordsByIP = function(body) {
  const ip = body;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  const URL = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(URL);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()    //Return IP address from fetchMyIP.
    .then(fetchCoordsByIP)  //IP address is fed into "then", which fetchCoordsByIP uses to...
    .then(fetchISSFlyOverTimes) //Coords from fetchCoordsByIP is used by fetchISSFlyOverTimes to retrieve fly over times.
    .then((data) => {       //Fly over times are fed into an anonymous callback function which parses the data.
      const { response } = JSON.parse(data);
      return response;      //Fly over times are returned so they can be returned in a more readable format.
    });
};
module.exports = { nextISSTimesForMyLocation };