const express = require('express'); // Impotamos el paquete
const app = express();
app.get('/', (req, res) => {
    res.send('Prueba de Respuesta Servidor');
});
//se configura el puerto como el servidor va a escuchar las peticiones//
app.listen(10000);