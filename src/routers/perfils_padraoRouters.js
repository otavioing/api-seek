const {Router} = require('express');
// const {GetAll, GetById, Erase, Create, Update} = require("../model/perfils_padrao")
const myController = require("../controller/perfils_padraoController");


const rota = Router()

rota.get("/", myController.GetAll);
rota.get("/:usuario_id", myController.GetById);
rota.post("/:usuario_id", myController.Create);
rota.put("/:usuario_id", myController.Update);
rota.delete("/:usuario_id", myController.Erase);

module.exports = rota;
