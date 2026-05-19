const {Router} = require('express');
const myController = require("../controller/comentariosController");
const autenticarJWT = require("../utils/authMiddleware");

const rota = Router()


rota.get("/:idpost", myController.listarComentariosPorPost);
rota.post("/:idpost", myController.adicionarComentario);

// Rota para responder a um comentário (comentario_pai_id)
// POST /comentarios/{postId}/responder/{id_comentario_pai}
rota.post("/:postId/responder/:id_comentario_pai", myController.responderComentario);


module.exports = rota;