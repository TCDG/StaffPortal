//STAFFPORTAL CORE

const config = require("./../config")

const cluster = require("cluster")

const utils = require("./../Global/utils")
const logger = new utils.Logger()

logger.info("Starting StaffPortal core...", {mode: "core"})

// Prepare zmq router
const Socket = require('./mod/zmq').Socket

const s = new Socket(config.core.address, logger)

