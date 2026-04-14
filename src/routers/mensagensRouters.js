const { Router } = require("express");
const myController = require("../controller/mensagensController");
const uploadFotoConversa = require("../config/upload_foto_conversa");

const rota = Router();

rota.post("/conversas", uploadFotoConversa.single("foto"), myController.criarConversa);
rota.put("/conversas/:conversaId/foto", uploadFotoConversa.single("foto"), myController.atualizarFotoConversa);
rota.get("/usuarios/:usuarioId/conversas", myController.listarConversasPorUsuario);

rota.post("/conversas/:conversaId/mensagens", myController.criarMensagem);
rota.get("/conversas/:conversaId/mensagens", myController.listarMensagensPorConversa);

rota.post("/conversas/:conversaId/participantes", myController.adicionarParticipantes);
rota.delete("/conversas/:conversaId/participantes/:usuarioId", myController.removerParticipante);

rota.put("/conversas/:conversaId/lidas", myController.marcarMensagensComoLidas);
rota.get("/usuarios/:usuarioId/nao-lidas", myController.contarMensagensNaoLidas);

module.exports = rota;