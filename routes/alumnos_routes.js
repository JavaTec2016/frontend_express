'use strict';
const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

//MOSTRAR TODOTE
router.get('/', controller.findAll);

//ALTAS
router.post('/:tabla', controller.create);


//CONSULTA
router.get('/:tabla/:field/:value', controller.findBy);

//CAMBIOS
router.post('/:tabla/:field/:value', controller.update);

//BAJAS
router.post('/eliminar/:tabla/:field/:value', controller.delete);

module.exports = router;