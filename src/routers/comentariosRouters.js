const {Router} = require('express');
const myController = require("../controller/comentariosController");
const autenticarJWT = require("../utils/authMiddleware");

const rota = Router()


rota.get("/:idpost", myController.listarComentariosPorPost);
rota.post("/:idpost", myController.adicionarComentario);


module.exports = rota;