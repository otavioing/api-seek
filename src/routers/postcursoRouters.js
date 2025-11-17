const { Router } = require('express');
const myController = require("../controller/postcursoController");
const upload = require('../config/upload_foto_capa_curso');


const rota = Router();

rota.get("/", myController.Listarcursos);
rota.get("/:id", myController.Listarcursosporusuario);
rota.post("/", upload.single("imagem_curso"), myController.CriarPostcurso);
rota.delete("/:id", myController.ApagarPostcurso);

module.exports = rota;
