// index.js
const iss = require('./iss');

let ipAddress = '';

iss.fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  ipAddress = ip;
});

iss.fetchCoordsByIP(ipAddress, (error, data) => {
  if (!error) {
    // Pulls the data from open_notify api
    iss.fetchISSFlyOverTimes(data, (error, data) => {
      if (!error) {
        passOverTimes = data;
      } else {
        console.log(error);
      }
      iss.nextISSTimesForMyLocation(passOverTimes, (error, passTimes) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        // success, print out the deets!
        printPassTimes(passTimes);
      });
    });
  }
});

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



// > node index.js
// Next pass at Fri Jun 01 2021 13:01:35 GMT-0700 (Pacific Daylight Time) for 465 seconds!
// Next pass at Fri Jun 01 2021 14:36:08 GMT-0700 (Pacific Daylight Time) for 632 seconds!
// Next pass at Fri Jun 01 2021 16:12:35 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 17:49:29 GMT-0700 (Pacific Daylight Time) for 648 seconds!
// Next pass at Fri Jun 01 2021 19:26:12 GMT-0700 (Pacific Daylight Time) for 643 seconds!

// "response": [
//   {
//     "duration": 657,
//     "risetime": 1617926602
//   },
//   {
//     "duration": 618,
//     "risetime": 1617932416
//   },
//   {
//     "duration": 337,
//     "risetime": 1617938308
//   },
//   {
//     "duration": 542,
//     "risetime": 1617992811
//   },
//   {
//     "duration": 652,
//     "risetime": 1617998531
//   }
// ]
// }