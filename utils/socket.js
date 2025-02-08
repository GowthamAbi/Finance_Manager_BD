// Create HTTP server for socket.io
const server = http.createServer(app);

// Initialize socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:5173', // Allow connections from your frontend
    methods: ['GET', 'POST'],        // Allow GET and POST methods
    credentials: true                // Allow cookies/credentials
  }
});

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Example of emitting a message to the frontend
  socket.emit('message', 'Hello from the WebSocket server!');
  
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});