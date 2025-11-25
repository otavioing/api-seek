const { Router } = require('express');
const myController = require("../controller/tendenciasController");


const rota = Router();

rota.get("/", myController.verificarTendencias);
rota.get("/:id_categoria", myController.listarpostscategoria);

module.exports = rota;
