const socketController = (socket) =>{
    console.log('Cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado', socket.id);
    });

    socket.on('send-message', (payload) => {
        socket.broadcast.emit('send-message', payload);
    });
}

export default socketController;