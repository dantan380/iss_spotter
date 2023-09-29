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
  
module.exports = { fetchMyIP };