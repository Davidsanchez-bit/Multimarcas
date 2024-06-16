
'use strict';

const express = require('express');
const bodyParser = require ('body-parser')
const mongoose = require('mongoose');

//importar el modelo 
const Product = require('./models/product')

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.get('/api/product', async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products || products.length === 0) {
            return res.status(404).send({ message: 'No existen productos' });
        }
        res.status(200).send({ products: products });
    } catch (err) {
        res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    }
});

app.get('/api/product/:productId', async (req, res) => {
    // Implementación para obtener un producto por su ID
    let productId = req.params.productId;

    try{
        const product = await Product.findById(productId);
        if(!product) return res.status(404).send({message:' El producto no existe'});
        res.status(200).send({product});
    } catch (err){
        res.status(500).send({ message: `Error al realizar la petición: ${err}`});
    }

});

app.post('/api/product', async (req, res) => {
    console.log('POST /api/product');
    console.log (req.body);
    // Creamos una variable para un nuevo prodcuto
    let product = new Product ();
    product.name = req.body.name;
    product.picture = req.body.picture;
    product.price = req.body.price;
    product.category = req.body.category;
    product.description = req.body.description;

    try {

        //Guardamos el producto creado
        const productStored = await product.save();
        res.status(200).send({product:productStored});

    } catch (err) {
        res.status(500).send({message:`Error al guardar en la base de datos: ${err}`});
        
    }

});

app.put('/api/product/:productId', async (req, res) => {
    try {
        let productId = req.params.productId;
        let update = req.body; // Los datos de actualización del producto se envían en el cuerpo de la solicitud

        const updatedProduct = await Product.findByIdAndUpdate(productId, update, { new: true });

        if (!updatedProduct) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        res.status(200).send({ message: 'El producto ha sido actualizado', product: updatedProduct });
    } catch (err) {
        res.status(500).send({ message: `Error al actualizar el producto: ${err}` });
    }
});


app.delete('/api/product/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).send({ message: 'Producto no encontrado' });
        }

        // Verificar si product es una instancia válida de Product
        if (!product instanceof Product) {
            return res.status(500).send({ message: 'El objeto encontrado no es un producto válido' });
        }

        // Eliminar el producto utilizando el método deleteOne()
        await Product.deleteOne({ _id: productId });
        res.status(200).send({ message: 'El producto ha sido eliminado' });
    } catch (err) {
        res.status(500).send({ message: `Error al borrar el producto: ${err}` });
    }
});




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