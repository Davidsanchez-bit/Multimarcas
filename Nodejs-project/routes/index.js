'use strict';
const express = require('express');
const productCtrl = require('../controllers/product')
const api = express.Router()

api.get('/product', productCtrl.getProducts);
// Implementación para obtener un producto por su ID
api.get('/product/:productId', productCtrl.getProduct);
    // Implementación para obtener un producto por su ID
api.post('/product', productCtrl.saveProduct)
        // Creamos una variable para un nuevo prodcuto
api.put('/product/:productId', productCtrl.updateProduct)
     // Los datos de actualización del producto se envían en el cuerpo de la solicitud
api.delete('/product/:productId', productCtrl.deleteProduct)
          // Verificar si product es una instancia válida de Product y eliminar el producto utilizando el método deleteOne()

module.exports = api