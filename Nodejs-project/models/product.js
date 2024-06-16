'use strict'

const mongoose = require ('mongoose');
const Schema = mongoose.Schema


const ProductSchema = Schema ({
    name: String,
    picture: String,
    price: { type: Number, default: 0 },
    category: { type: String, enum : ['Fruyogu','Brisa Jabonosa', 'Aseo personal','Aseo hogar' ]},
    description: String
})

// Para exportar el modelo empleamos el método Model de mongoose
module.exports = mongoose.model('Product', ProductSchema)