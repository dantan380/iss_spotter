const { fetchMyIP, fetchCoordsByIP } = require('./iss');

/*fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});*/

fetchCoordsByIP('142.179.77.77', (error, data) => {
  if (error) {
    console.log("It didn't work! ", error);
    return;
  }

  console.log('It worked! Returned coordinates:' , data);
});