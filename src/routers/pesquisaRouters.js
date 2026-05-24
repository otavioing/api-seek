const { Router } = require("express");
const myController = require("../controller/pesquisaController");

const rota = Router();

rota.get("/usuarios/:termo", myController.BuscarUsuarios);
rota.post("/historico", myController.CriarHistoricoPesquisa);
rota.get("/historico/:usuario_id", myController.ListarHistoricoPesquisas);
rota.delete("/historico/:usuario_id/:id", myController.ExcluirHistoricoPesquisa);

module.exports = rota;