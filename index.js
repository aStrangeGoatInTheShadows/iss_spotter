// index.js
const iss = require('./iss');

let ipAddress = '';

iss.fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  //console.log('It worked! Returned IP:' , ip);
  ipAddress = ip;
});

iss.fetchCoordsByIP(ipAddress, (error, data) => {
  if (!error) {
    // Pulls the data from open_notify api
    iss.fetchISSFlyOverTimes(data, (error, data) => {
      if (!error) {
        console.log(data);
      } else {
        console.log(error);
      }
    });
  }
});