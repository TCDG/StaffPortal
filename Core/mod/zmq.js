const zmq = require('zmq')
const EventEmitter = require('events');

class SocketError extends Error {
  constructor(type, message) {
    super()
    this.type = type
    this.message = message
  }
}

class Socket extends EventEmitter {
  constructor(addr, console, secret, commands) {
    // Feed the socket our console object
    this.console = console
    
    // Pepare socket and address value
    this.sock = zmq.socket('router')
    
    this.addr = addr
    
    // Authentication
    this.secret = secret
    
    this.commands = commands
    this.convos = new Map()
  }
  
  async bind() {
    return new Promise((resolve, reject) => {
      this.sock.on("listen", resolve)
      this.sock.on("bind_error", reject)
      this.sock.on("accept", this.onAccept)
      this.sock.on("accept_error", this.onError)
      this.sock.on("disconnect", this.onDisconnect)
      this.sock.on("message", this.onMessage)
    
      this.sock.monitor(50, 0)
      
      // Bind to address
      this.sock.bindSync(this.addr)
    })
  }
  
  onAccept(fd, ep) {
    this.emit("accept", fd, ep)
  }
  
  onError(fd, ep) {
    this.emit("error", new SocketError("socketBindError", "Socket failed to bind to address"), fd, ep)
  }
  
  onDisconnect(fd, ep) {
    this.emit("disconnected", fd, ep)
  }
  
  
  async onMessage() {
    // Handle incoming messages
    const arg = Array.apply(null, arguments);
    const id = arg[0].toString("utf8");
    const msg = arg[1].toString("utf8")
    
    /*
      ID strings are the first value in an envelope sent from either a BOT or SERVER worker, or the MTC.
      An ID string is formatted as follows:
      
      TYPE.ID
      Where,
      TYPE the first letter of the sender is (M for Maintainer Console, S for Server, B for Bot, C for Core)
      ID the actual random identity associated with the author.
      
      Example: B.Fa2gH*ak
      
      Message strings are the third value in an envelope, right after an Empty delimiter frame.
      A Message string is formatted as follows:

      SECRET.ID.MESSAGE[.ARGS]
      Where,
      SECRET the secret string is, as configured in config.js;
      ID the convo identifier is;
      MESSAGE the base 'command' is;
      ARGS the optional arguments are.
      
      Example: Hg3S7*jL3KK.5523.REGISTER.{ORIGIN:"172.0.0.1"}
    */
    
    // Parsing id and message string
    const type = id.split('.')[0]
    ,     author = id.split('.')[1]
    ,     convo = msg.split('.')[0]
    ,     secret = msg.split('.')[1]
    ,     message = msg.split('.')[2]
    ,     args = msg.split('.').splice(0, 3).join(".")
    
    await this.console.log(`Incoming ZMQ message from ${author}.`, {mode: "core", type, message, args, author})
    
    // Check authentication
    if (this.secret && secret === this.secret) {
      // Check command
      if (this.commands[type][message]) {
        // Check conversation
        if (!this.convos.get(convo)) {
          // Create a conversation and move on
          this.convos.set(convo, {
            hist: [message], 
            players: [author],
            
          })
        }
      } else {
        this.console.log(`ZMQ message from ${author} denied for unknown command.`, {mode: "core", secret, author})
        this.send(id, `ERR.UNKNOWN`, convo)
      }
    } else {
      this.console.log(`ZMQ message from ${author} denied for secret mismatch.`, {mode: "core", secret, author})
      this.send(id, `ERR.SECRET`, convo)
    }
  }
  
  send(to, msg, convo) {
    this.sock([to, '', `${this.secret}.${convo}.${msg}`])
  } 
}

module.exports = Socket;