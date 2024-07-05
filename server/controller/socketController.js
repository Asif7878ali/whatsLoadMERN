const handleSocketConnection = (socket) => {
    console.log(`user connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`user disconnected: ${socket.id}`);
        socket.disconnect();
    });
};

module.exports = { handleSocketConnection };
