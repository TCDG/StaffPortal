// Global screen logs handler
const winston = require('winston')

class Console {
  constructor(mtc) {
    this.inputLog = mtc.inputLog
    this.outputLog = mtc.log
    
    this.levels = {
      crit: 0,
      err: 1,
      warn: 2,
      info: 3,
      logging: 4
    }
    
    this.clevel = "info";
    
    this.logger = new (winston.Logger)({
      exitOnError: false,
      levels: this.levels,
      transports: [
        new (winston.transports.File)({
          name: "file",
          filename: "/var/log/staffportal.log",
          colorize: false,
          level: "logging",
          maxsize: 10*1024*1024,
          tailable: true,
          json: false
        })
      ]
    })
  }
    
  get timestamp() {
    return new Date().toDateString()
  }
  
  crit(msg, data) {
    this.logger.crit(`(${this.timestamp}) (${data.mode}) ${msg}`, data)
    
    this.outputLog.log(`CRITICAL  : ${msg}`.red.bold + `\n${JSON.stringify(data)}`)
  }
  
  err(msg, data) {
    this.logger.err(`(${this.timestamp}) (${data.mode}) ${msg}`, data)
    
    this.outputLog.log(`ERROR  : ${msg}`.red + `\n${JSON.stringify(data)}`)
  }
  
  warn(msg, data) {
    this.logger.warn(`(${this.timestamp}) (${data.mode}) ${msg}`, data)
    
    this.outputLog.log(`WARNING  : ${msg}`.yellow + `\n${JSON.stringify(data)}`)
  }
  
  info(msg, data) {
    this.logger.info(`(${this.timestamp}) (${data.mode}) ${msg}`, data)
    
    this.outputLog.log(`INFO   : ${msg}`.white.bold + `\n${JSON.stringify(data)}`)
  }
  
  log(msg, data) {
    this.logger.logging(`(${this.timestamp}) (${data.mode}) ${msg}`, data)
    
    this.outputLog.log(`LOG  : ${msg}` + `\n${JSON.stringify(data)}`)
  }
}

module.exports = Console