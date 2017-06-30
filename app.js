// STAFFPORTAL LAUNCH

const utils = require('./Global/utils');

utils.screen.launch()

// This is how we're going to do it
/*
Because PM2 doesn't like blessed, this script will launch staffportal in the background and open the maintainer console.
If staffportal is already running (the standard port is allowing connections and returns expected responses) this script only opens the maintainer console.
*/