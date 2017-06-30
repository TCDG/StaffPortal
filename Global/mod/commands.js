// Maintainer Console Commands

var commands = module.exports;
const console = require('./console')

commands.help = {
  description: "List all commands, or get help with a certain command.",
  help: "help [cmd]",
  base: "help"
}

commands.exit = {
  description: "Exit the maintainer console. This does not shutdown staffportal.",
  help: "exit",
  base: "exit"
}

commands.exit.handle = (value, mtc) => {
  process.exit(1)
}

commands.help.handle = (value, mtc) => {  
  mtc.inputLog.log("Available maintainer commands: ")
  
  for (var cmd in commands) {
    mtc.inputLog.log(`${commands[cmd].base.bold}: ${commands[cmd].description}\n   ${commands[cmd].help}`)
  }
  
}