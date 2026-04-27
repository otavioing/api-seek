const {Router} = require('express');
const myController = require("../controller/comentariosController");

const rota = Router()


rota.get("/:idpost", myController.listarComentariosPorPost);
rota.post("/:idpost", myController.adicionarComentario);
rota.post("/:idpost/responder/:idcomentariopai", myController.responderComentario);


module.exports = rota;