const { Router } = require("express");
const myController = require("../controller/notificacoesController");

const rota = Router();

rota.post("/", myController.criarNotificacao);
rota.get("/:destinatarioId", myController.listarPorDestinatario);
rota.put("/:id/lida", myController.marcarComoLida);

module.exports = rota;
