const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    Nombre: String,
    Tipo: String,
    Precio: {
        type: Number,
        default: 0
    },
  date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Post', PostSchema);
