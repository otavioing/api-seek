const {Router} = require('express');
const {pergunta} = require("../model/apiOpeniaService");

const rota = Router()


rota.post("/ia", pergunta);

module.exports = rota;
