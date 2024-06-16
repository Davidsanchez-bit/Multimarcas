'use strict';

//importar el modelo 
const Product = require('../models/product');

async function getProducts (req, res){
  // Implementación para obtener un producto por su ID
    try {
        const products = await Product.find({});
        if (!products || products.length === 0) {
            return res.status(404).send({ message: 'No existen productos' });
        }
        res.status(200).send({ products: products });
    } catch (err) {
        res.status(500).send({ message: `Error al realizar la petición: ${err}` });
    }
};

async function getProduct (req, res){
   // Implementación para obtener un producto por su ID
   let productId = req.params.productId;

   try{
       const product = await Product.findById(productId);
       if(!product) return res.status(404).send({message:' El producto no existe'});
       res.status(200).send({product});
   } catch (err){
       res.status(500).send({ message: `Error al realizar la petición: ${err}`});
   }

};

async function saveProduct (req, res){
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

};


async function updateProduct(req, res){

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
};


async function deleteProduct(req, res){
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
};


module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}