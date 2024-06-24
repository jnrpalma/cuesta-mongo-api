const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  id: { type: String, required: true },
  genero: { type: String, required: true },
  categoria: { type: String, required: true },
  data: { type: Date, required: true },
  dataNascimento: { type: Date, required: true },
  peso: { type: Number, required: true },
  raca: { type: String, required: true },
  registradoPor: { type: String, required: true },
  denticao: { type: String, required: true },
  quantity: { type: Number, required: true },
  paiAnimal: { type: String, required: true },
  nomePai: { type: String, required: true },
  maeAnimal: { type: String, required: true },
  nomeMae: { type: String, required: true },
});

module.exports = mongoose.model('Animal', animalSchema);
