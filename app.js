// STAFFPORTAL LAUNCH

// Preparing modules and default values
const utils = require('./Global/utils');
var destination = "172.0.0.1:1916";

if (process.argv.indexOf("-d") > -1) {
  destination = process.argv[process.argv.indexOf("-d")+1]
} 

// Initialize maintainer console
var maintainerc = utils.screen.init();

var console = new utils.Console(maintainerc)

console.log("Too too", {ok: "ok", mode: "core"})

console.info("IN FO RM AT IO N?", {ok: "ok", mode: "core"})

console.err("EACCES", {ok: "no ok", mode: "server"})
// This is how we're going to do it
/*
Because PM2 doesn't like blessed, this script will launch staffportal in the background and open the maintainer console.
If staffportal is already running (the standard port is allowing connections and returns expected responses) this script only opens the maintainer console.
*/