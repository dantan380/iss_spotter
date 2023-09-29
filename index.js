const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});*/

/*fetchCoordsByIP('142.179.77.77', (error, data) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }

  console.log('It worked! Returned coordinates:' , data);
});*/

const myCoords = {
  "latitude": 48.4284207,
  "longitude": -123.3656444
};

fetchISSFlyOverTimes(myCoords, (error, data) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }
    
  console.log('It worked! Returned coordinates:' , data);
});