const express = require('express');
const http = require('http');
const socket_io  = require('socket.io');
const cors = require('cors');
const {handleSocketConnection} = require('./controller/socketController.js')
const {initializeWhatsAppClient} = require('./config/whatsappClient.js');
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
}));
const server = http.createServer(app);
const io = socket_io(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});
const port = 4000;

io.on('connection', handleSocketConnection)
initializeWhatsAppClient(io);

const routes = require('./routes/homeRoute.js');
app.use('/', routes);
app.use((req , res, next) =>{
     res.status(404).send('File Note Found');
})

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
server.on('error', (error) => {
     console.error(`Server is Crashed: ${error}`);
})