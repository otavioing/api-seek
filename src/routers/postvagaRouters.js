const { Router } = require('express');
const myController = require("../controller/postvagaController");

const rota = Router();

rota.post("/buscar-vaga",myController.BuscarVagaLinkedin);
rota.post("/", myController.CriarPostvaga);
rota.get("/", myController.ListarPostsvaga);
rota.get("/usuario/:id", myController.ListarPostsvagaPorUsuario);



module.exports = rota;
