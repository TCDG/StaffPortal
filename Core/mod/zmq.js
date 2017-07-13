const zmq = require('zmq')

class Socket {
  constructor(addr, console) {
    // Feed the socket our console object
    this.console = console
    
    // Pepare socket and address value
    this.sock = zmq.socket('router')
    
    this.addr = addr
    
  }
  
  bind() {
    return new Promise((resolve, reject) => {
      this.sock.on("listen", resolve)
      this.sock.on("bind_error", reject)
      this.sock.on("accept", this.onAccept)
      this.sock.on("accept_error", this.onError)
      this.sock.on("disconnect", this.onDisconnect)
      this.sock.on("message", this.onMessage)
    
      this.sock.monitor(500, 0)
      
      // Bind to address
      this.sock.bindSync(this.addr)
    })
  }
  
  onAccept(fd, ep) {
    this.console.log("Incoming connection on zmq socket!", {mode: "core", ep, fd})
  }
  
  onError(fd, ep) {
    this.console.log("A zmq peer failed to connect to the socket!", {mode: "core", ep, fd})
  }
  
  onDisconnect(fd, ep) {
    this.console.warn("A zmq peer disconnected! Please restart staff portal if this was not intentional.", {mode: "core", ep, fd})
  }
  
  
  onMessage() {
    // Handle incoming messages
    const arg = Array.apply(null, arguments)
    const author = arg[0]
    
    
  }
}

module.exports = Socket;