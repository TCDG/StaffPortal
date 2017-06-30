// Global screen handler

var blessed = require('blessed')
var contrib = require('blessed-contrib')
var screen = blessed.screen()
var grid = new contrib.grid({rows: 16, cols: 5, screen: screen})
const colors = require('colors')

// Init the screen for non-scale launcher
// Returns the screen object
module.exports.launch = (config) => {
  
  // Status Markdowns
  var spstat = grid.set(0, 0, 2, 1, contrib.markdown);
  var corestat = grid.set(0, 1, 2, 1, contrib.markdown);
  var svrstat = grid.set(0, 2, 2, 1, contrib.markdown);
  var botstat = grid.set(0, 3, 2, 1, contrib.markdown);
  spstat.setMarkdown(`# StaffPortal\n${"Status: ".bold + "Healthy".green}\n${"Task: ".bold + "None".green}`);
  corestat.setMarkdown(`# Core\n${"Status: ".bold + "Healthy".green}\n${"Task: ".bold + "None".green}`);
  svrstat.setMarkdown(`# Server Cluster\n${"Status: ".bold + "Healthy".green}\n${"Task: ".bold + "None".green}`);
  botstat.setMarkdown(`# Connector Cluster\n${"Status: ".bold + "Healthy".green}\n${"Task: ".bold + "None".green}`);
  
  // Resource Donuts
  var corecpu = grid.set(0, 4, 4, 1, contrib.donut, {
    label: "Core CPU",
    radius: 16,
    arcWidth: 6,
    yPadding: 2,
    data: [
      {percent: 80, label: "Core CPU", color: 'red'}
    ]
  })
  var coreram = grid.set(4, 4, 4, 1, contrib.donut, {
    label: "Core CPU",
    radius: 16,
    arcWidth: 6,
    yPadding: 2,
    data: [
      {percent: 40, label: "Core Memory - 2543MB", color: 'green'}
    ]
  })
  var coredisk = grid.set(8, 4, 4, 1, contrib.donut, {
    label: "Core CPU",
    radius: 16,
    arcWidth: 6,
    yPadding: 2,
    data: [
      {percent: 74, label: "Diskspace - 5GB", color: 'yellow'}
    ]
  })
  
  // Connected Nodes
  var nodelist = grid.set(12, 4, 4, 1, contrib.markdown);
  nodelist.setMarkdown(`## Core\n * 123.45.67.89\n\n## Servers\n * 987.65.43.21\n * 132.412.53.54\n\n## Connectors\n * 21.21.42.42`)
  
  // Logs
  var log = grid.set(2, 2, 12, 2, contrib.log,  { fg: ""
    , selectedFg: "gray"
    , label: 'StaffPortal Logs'})
  log.log("Data from some worker")
  log.log("Errors from another worker".red)

  var inputLog = grid.set(2, 0, 12, 2, contrib.log,  { fg: ""
    , selectedFg: "gray"
    , label: 'Console Output'})
  inputLog.log("Data returned from command")
  inputLog.log("A command failed and thus this message is sexy red".red)
  
  // Console Input
  var input = grid.set(14, 0, 2, 4, blessed.textbox, {inputOnFocus: true, label: "Console Input"})
  input.focus();
  
  // Handle Inputs
  input.on('submit', () => {
    inputLog.log(input.getValue())
    input.clearInput()
    input.focus()
  })
  
  // Handle Exits
  screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
  });
  
  // Render the screen.
  screen.render();
  return screen;
}