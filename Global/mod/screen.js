// Global screen handler

var blessed = require('blessed')
var contrib = require('blessed-contrib')
var screen = blessed.screen()
var grid = new contrib.grid({rows: 16, cols: 5, screen: screen})
const colors = require('colors')

// Init the screen for non-scale launcher
// Returns the screen object
module.exports.init = () => {
  var toreturn = {}
  
  // Status Markdowns
  toreturn.spstat = grid.set(0, 0, 2, 1, contrib.markdown);
  toreturn.corestat = grid.set(0, 1, 2, 1, contrib.markdown);
  toreturn.svrstat = grid.set(0, 2, 2, 1, contrib.markdown);
  toreturn.botstat = grid.set(0, 3, 2, 1, contrib.markdown);
  toreturn.spstat.setMarkdown(`# StaffPortal\n${"Status: ".bold + "Offline"}\n${"Task: ".bold + "None".green}`);
  toreturn.corestat.setMarkdown(`# Core\n${"Status: ".bold + "Offline"}\n${"Task: ".bold + "None".green}`);
  toreturn.svrstat.setMarkdown(`# Server Cluster\n${"Status: ".bold + "Offline"}\n${"Task: ".bold + "None".green}`);
  toreturn.botstat.setMarkdown(`# Connector Cluster\n${"Status: ".bold + "Offline"}\n${"Task: ".bold + "None".green}`);
  
  // Resource Donuts
  toreturn.corecpu = grid.set(0, 4, 4, 1, contrib.donut, {
    label: "Core CPU",
    radius: 16,
    arcWidth: 6,
    yPadding: 2,
    data: [
      {percent: 80, label: "Core CPU", color: 'red'}
    ]
  })
  toreturn.coreram = grid.set(4, 4, 4, 1, contrib.donut, {
    label: "Core CPU",
    radius: 16,
    arcWidth: 6,
    yPadding: 2,
    data: [
      {percent: 40, label: "Core Memory - 2543MB", color: 'green'}
    ]
  })
  toreturn.coredisk = grid.set(8, 4, 4, 1, contrib.donut, {
    label: "Core CPU",
    radius: 16,
    arcWidth: 6,
    yPadding: 2,
    data: [
      {percent: 74, label: "Diskspace - 5GB", color: 'yellow'}
    ]
  })
  
  // Connected Nodes
  toreturn.nodelist = grid.set(12, 4, 4, 1, contrib.markdown);
  toreturn.nodelist.setMarkdown(`## Core\n * 123.45.67.89\n\n## Servers\n * 987.65.43.21\n * 132.412.53.54\n\n## Connectors\n * 21.21.42.42`)
  
  // Logs
  toreturn.log = grid.set(2, 2, 12, 2, contrib.log,  { fg: ""
    , selectedFg: "gray"
    , label: 'StaffPortal Logs'})

  toreturn.inputLog = grid.set(2, 0, 12, 2, contrib.log,  { fg: ""
    , selectedFg: "gray"
    , label: 'Console Output'})
  
  // Console Input
  toreturn.input = grid.set(14, 0, 2, 4, blessed.textbox, {inputOnFocus: true, label: "Console Input"})
  toreturn.input.focus();
  
  // Render the screen.
  screen.render();
  
  toreturn.screen = screen;
    
  screen.key('q', function() {
    process.exit(0);
  });
  
  return toreturn;
}