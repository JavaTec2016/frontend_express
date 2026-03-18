'use strict';
const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

//MOSTRAR TODOTE
router.get('/', controller.findAll);

//ALTAS
router.post('/', controller.create);


//CONSULTA
router.get('/:table/:field/:value', controller.findBy);

//CAMBIOS
router.post('/:field/:value', controller.update);

//BAJAS
router.post('/eliminar/:field/:value', controller.delete);

module.exports = router;