var SmartHomeConnection = require('mongoose');
//url syntax: 'mongodb://username:password@host:port/database?options...'
const uri = 'mongodb://localhost:27017/SmartHome';

const options = {
  reconnectTries: 30, // trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10 // Maintain up to 10 socket connections
   // If not connected, return errors immediately rather than waiting for reconnect
};

SmartHomeConnection.connect(uri, options).then(
  () => { /**ready to use*/
    console.log("Connect to "+uri);
  },
  err => { /** handle initial connection error */
    console.log("Connection error: "+err);
  }
);

module.exports = SmartHomeConnection;