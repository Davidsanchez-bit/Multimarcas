const express = require('express'); // Impotamos el paquete
const router = express.Router();
const Post = require('../models/Post'); // Asegúrate de que la ruta sea correcta

router.post('/', async (req,res) =>{
    //console.log(req.body); Se ultiliza para la respuesta del Post en consola
    const post = new Post ({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save (); // método que guarda en la BD
        res.json(savedPost);

    }catch (error){
        res.json({message:error});
    }
});

// bloque para mostrar solo un post por el ID

router.get('/:postId', async (req,res) =>{
    try {
        const post = await Post.findByID(req.params.postId); // encuentra por Id
        res.json(post);
    }catch (error){
        res.json({message:error});
    }
});

//bloque para borrar un post
router.delete('/:postId', async (req,res)=> {
    try {
        const removedPost = await Post.remove ({_id: req.params.postId}); // borra
        res.json(removedPost);
    }catch (error){
        res.json({message:error});
    }
});

//bloque para Actualizar un Post

router.patch('/:postId', async (req,res) => {
    //patch para actualizar
    try{
        const updatePost = await Post.updateOne(//Actualiza de uno en uno
            {_id: req.params.postId},
            {$set: {title: req.body.title}});
        res.json(updatePost);
        
    }catch (error){
        res.json({message: error});
    }
});
module.exports = router; // devuelve como modulo lo que se le asigna a route