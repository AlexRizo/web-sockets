
// Referencias ;
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');



const socket = io();

socket.on('connect', () => {
    console.log('Conectado');
    lblOnline.style.display = 'inline';
    lblOffline.style.display = 'none';
});

socket.on('disconnect', () => {
    lblOnline.style.display = 'none';
    lblOffline.style.display = 'inline';
    console.log('Desconectado');
})

socket.on('send-message', (payload) => {
    console.log(payload);
})

btnEnviar.addEventListener('click', () =>{ 
    const mensaje = txtMensaje.value;
    const payload = {
        id: '123ABC',
        mensaje,
        fecha: new Date().getTime()
    };
    socket.emit('send-message', payload);
})