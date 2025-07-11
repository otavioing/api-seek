const {Router} = require('express');
// const {GetAll, GetById, Erase, Create, Update} = require("../model/perfils_empresa")
const myController = require("../controller/perfils_empresaController");


const rota = Router()

rota.get("/", myController.GetAll);
rota.get("/:id", myController.GetById);
rota.delete("/:id", myController.Erase);
rota.put("/:id", myController.Update);
rota.post("/:usuario_id", myController.Create);

module.exports = rota;
