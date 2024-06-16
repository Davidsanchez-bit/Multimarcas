'use strict';

const mongoose = require('mongoose');
const app = require('./app')
const port = process.env.PORT || 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/tienda') 
    .then(() => {
        console.log('Conectado a MongoDB');
        // Inicia el servidor
        app.listen(port, () => {
            console.log(`API REST corriendo en http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Error al conectar con MongoDB:', err);
        // Sale de la aplicación si no se puede conectar a MongoDB
        process.exit(1);
    });