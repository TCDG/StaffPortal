// Global events, primarly for the launcher

const commands = require('./mod/commands')

var events = module.exports;


events.command = (mtc, console) => {
  var value = mtc.input.getValue()
  var cmd = value.split(" ")[0]
  
  if (commands[cmd] !== undefined) {
    commands[cmd].handle(value, mtc)
  } else {
    mtc.inputLog.log(`${cmd}: Command not found.`.red)
  }
  
  mtc.input.clearValue();
  mtc.input.focus();
}