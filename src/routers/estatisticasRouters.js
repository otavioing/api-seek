const {Router} = require('express');
const {categoriasusadasporusuario} = require("../model/estatisticasService");
const myController = require("../controller/estatisticasController");
const autenticarJWT = require("../utils/authMiddleware");

const rota = Router()


rota.get("/categoriasusadasporusuario/:idusuario", myController.categoriasusadasporusuario);
rota.get("/medialikesporusuario/:idusuario", myController.medialikesporusuario);


module.exports = rota;