const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const games = require('./games')

const server = Router();

server.use('/',games)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = server;
