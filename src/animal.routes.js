const express = require('express');
const Animal = require('./cuesta.model');
const router = express.Router();

// Add new animal
router.post('/', async (req, res) => {
  const animal = new Animal(req.body);
  try {
    await animal.save();
    res.status(201).send(animal);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all animals
router.get('/', async (req, res) => {
  try {
    const animals = await Animal.find();
    res.status(200).send(animals);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
