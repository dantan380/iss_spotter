const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  const myIP = 'https://api.ipify.org?format=json{"ip":"142.179.77.77"}';

  request(myIP, (error, response, body) => {
    if (error) {
      callback(error, null);
    }
        
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }

    callback(null, body);
  });
};



const fetchCoordsByIP = function(ip, callback) {
  const myIP2 = `http://ipwho.is/${ip}`;
  console.log(myIP2);
  request(myIP2, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const data = JSON.parse(body);
    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = data;
        
    callback(null, {latitude, longitude});
  });
};


/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
    const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
    request(url, (error, response, body) => {
        if(error) {
            callback(error, null);
            return;
        }
        if (response.statusCode !== 200){
            const message = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`
            callback(Error(message), null);
        }
        const data = JSON.parse(body).response;
        callback(null, data)
    })
  };
  
module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };