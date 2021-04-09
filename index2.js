const iss = require('./iss_promised');

iss.fetchMyIP()
  .then(() => iss.fetchCoordsByIP())
  .then((jsonCoords) => iss.fetchISSFlyOverTimes(jsonCoords))//   ************** MY IMPLEMENTATION **************
  
  //.then(iss.fetchISSFlyOverTimes) ****** Suggested Implementation **************

  .then((body) => console.log(body));