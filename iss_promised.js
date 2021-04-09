const request = require('request-promise-native');

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function (callback) {
  return request(`https://api.ipify.org?format=json`);
};



/* 
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  //const ipObj = JSON.parse(body);

  return request(`https://freegeoip.app/json/`);
};

const fetchISSFlyOverTimes = (jsonCoords) => {
  // const { latitude, longitude } = JSON.parse(body).data;*** SUGGESTED IMPLEMENTATION ***
  const coords = {
    lat: JSON.parse(jsonCoords).latitude,
    lon: JSON.parse(jsonCoords).longitude
  }
  const url = request(`http://api.open-notify.org/iss-pass.json?lat=${coords.lat}&lon=${coords.lon}`);
  
  return url;
};

/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */
 const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

const nextISSTimesForMyLocation = () => {

};

module.exports = { 
  fetchMyIP, 
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  printPassTimes,
  nextISSTimesForMyLocation};

