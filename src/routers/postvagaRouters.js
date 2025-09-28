const { Router } = require('express');
const { CriarPost} = require("../model/postvagaService");
const myController = require("../controller/postvagaController");
const upload = require('../config/upload_foto_vaga');

const rota = Router();

rota.post("/", upload.single("arquivo"), myController.CriarPostvaga);
rota.get("/", myController.ListarPostsvaga);
rota.get("/usuario/:id", myController.ListarPostsvagaPorUsuario);

module.exports = rota;
