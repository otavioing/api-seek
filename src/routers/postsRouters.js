const { Router } = require('express');
const { CriarPost} = require("../model/postsService");
const myController = require("../controller/postsController");
const upload = require('../config/upload_foto_post');

const rota = Router();

rota.post("/", upload.single("arquivo"), myController.CriarPost);
rota.get("/", myController.ListarPosts);
rota.get("/usuario/:id", myController.ListarPostsPorUsuario);
rota.post("/like", myController.insertlike);
rota.get("/likes/:id", myController.ListarLikesPorPost);
rota.get("/verifica-like", myController.verificalike);

module.exports = rota;
