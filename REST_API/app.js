const express = require('express'); // Impotamos el paquete
const app = express();
//const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const { MongoClient } = require('mongodb');

//Llamamos el body-parser
app.use(bodyParser.json());
//importamos las rutas    
const postRoute = require ('./routes/post');
app.use('/servicios', postRoute);
app.get('/api/producto', (req, res) => {
    res.send(200, {users:[]});
});
app.post('/api/producto', (req, res) => {
    console.log(req.body); // Mostrar los datos recibidos en la consola
    res.status(200).send({ message: 'Producto recibido' });
});

//conexión a la BD en Mongo//
const uri ='mongodb+srv://Manageraccess:Manageraccess01@cluster0.1bbae6i.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useUnifiedTopology: true });

async function connectToDB() {
    try {
        await client.connect();
        console.log('Conexión a la base de datos establecida correctamente');
        // Aquí puedes realizar operaciones con la base de datos
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error); // Si no puedes conectar, puedes detener el servidor
        process.exit(1); // Detiene el proceso de Node☺.js con código de salida 1
    }
}

connectToDB();


//se configura el puerto como el servidor va a escuchar las peticiones//
app.listen(10000);