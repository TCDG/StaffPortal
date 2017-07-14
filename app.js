// STAFFPORTAL LAUNCH

// Preparing modules and default values
const utils = require('./Global/utils');
const events = require('./Global/events')

const d = {
  ADDR: process.argv.indexOf("-d") > -1 ? process.argv[process.argv.indexOf("-d")+1] : "tcp://172.0.0.1:1916"
}

// Initialize maintainer console
var mtc = utils.screen.init();

var console = new utils.Logger(mtc)

mtc.input.on("submit", () => {events.command(mtc, console)})

// This is how we're going to do it
/*
Because PM2 doesn't like blessed, this script will launch staffportal in the background and open the maintainer console.
If staffportal is already running (the standard port is allowing connections and returns expected responses) this script only opens the maintainer console.
*/