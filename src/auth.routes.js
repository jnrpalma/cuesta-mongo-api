const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./user.model');

const router = express.Router();

// Função para gerar o token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Rota de registro de usuário
router.post('/register', async (req, res) => {
  const { email, password, displayName, photoURL } = req.body;

  console.log('Received registration request:', req.body);

  try {
    if (!email || !password || !displayName) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ email, password: hashedPassword, displayName, photoURL });
    await user.save();

    res.status(201).json({
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(400).json({ message: 'Erro ao registrar usuário' });
  }
});

// Rota de login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    res.json({
      _id: user._id,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(400).json({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;
