// Global StaffPortal Configuration

// Configurate all StaffPortal's programs

var path = require('path'),
    config;

config = {
  // StaffPortal's global process, CORE
  // This process handles processing that should be accessable by all programs, the launch of staffportal, the managing of your staffportal instance, and global modules.
  core: {
    // Database configuration
    rethink: {
      // The rethinkdb nodes to connect to. An array if multiple, if only one node an object.
      nodes:
        {
          host: 'localhost',
          port: 28015
        }
      ,
      
      // Database to use
      db: 'StaffPortal',
      
      // User authentication
      user: 'admin',
      password: '',
      
      // Connection pool
      pool: true,
      buffer: 50,
      max: 100
    },
   
  },
  // StaffPortal's connector process, BOT
  // BOT handles all connections to third-party API's such as Discord.
  bot: {
    // Third-party service DISCORD
    discord: {
      login_token: "",
      app_id: "",
      app_secret: "",
      
      // oauth process
      oauth_endpoint: `https://discordapp.com/oauth2/authorize`,
      oauth_permissions: "2146827455"
    },
    
  },
  // StaffPortal's server process, SERVER
  // In command of the external API and express server, aswell as websockets.
  server: {
    // Binding IP and port
    server_ip: "172.0.0.1",
    server_port: 80,
    
    // User Authentication and Authorization required
    // SET TO TRUE IF BINDING IP IS NOT LOCALHOST. THIS GRANTS ADMIN PRIVILIGES TO EVERYONE.
    user_auth: false,
    
    // Standard admin user and password. If password left empty, it must be set on initial login.
    admin: "admin",
    pass: ""
  }
  
}