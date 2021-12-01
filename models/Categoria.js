const mongoose = require("mongoose");

const categoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    unique: true,
    trim: true,
  },
});

module.exports = mongoose.model("Categoria", categoriaSchema);