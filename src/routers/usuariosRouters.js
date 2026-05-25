const { Router } = require('express');
const myController = require("../controller/usuariosController");
const { GetAll, GetById, Erase, Create, Update, Login, CriarCodigoVerificacao, SolicitarCriacao, Solicitarexclusao, Atualizartema, Atualizaracessibilidade, updatecompletarcadastropadrao, Getbyidvarificarcaixa, definirtipo, verificartipo, completarcadastro, updatecompletarcadastroempresa, EnviarfotoPerfil, GetAllbyidPadrao, GetAllbyidEmpresas, Updatefoto, Updatefotobanner } = require("../model/usuariosService");
const autenticarJWT = require("../utils/authMiddleware");
const uploadfotoperfil = require('../config/upload_foto_perfil');
const uploadfotobanner = require('../config/upload_foto_banner');
const uploadFotoBannerUpdate = require('../config/upload_foto_banner_update');



const rota = Router()

rota.get(/^\/cnpj\/(.+)$/, myController.consultarCnpj);
rota.get("/", myController.GetAll);
rota.get("/:id", myController.GetById);
// rota.get("/:id", myController.GetById);
rota.get("/verificarcaixa/:id", myController.Getbyidvarificarcaixa);
rota.get("/buscar-usuario-por-nome/:nome", myController.buscarusuariopornome);
rota.get("/verificartipo/:id", myController.verificartipo);
rota.get("/seguindo/:id", myController.getseguindoporusuario);
rota.get("/basico/:id", myController.GetBasic);
rota.get("/seguidores/:id", myController.getseguidoresporusuario);
rota.get("/verificarsesegue/:seguidorId/:seguidoId", myController.verificarsesegue);
rota.get("/lista-seguindo/:id", myController.getlistaseguindoporusuario);
rota.get("/lista-seguidores/:id", myController.getlistaseguidoresporusuario);
rota.get("/preferencias-notificacoes/:id_user", myController.verificarpreferencianotificacao);
rota.get("/preferencias-privacidade/:id_user", myController.verificarpreferenciaprivacidade);
rota.get("/foto-perfil/:id", myController.selectfoto);
rota.get("/foto-banner/:id", myController.selectbanner);

rota.get("/numero-posts-seguidores-likes/:id", myController.numerodepostseguidreselikes);

rota.put("/:id", uploadFotoBannerUpdate.fields([
	{ name: "foto", maxCount: 1 },
	{ name: "banner", maxCount: 1 }
]), myController.Update)
rota.put("/atualizar-tipo/:id", definirtipo);
rota.put("/completarcoluna-cadastro/:id", completarcadastro)
rota.put("/preferencias-notificacoes/:id_user", myController.atualizarPreferencianotificacao);
rota.put("/preferencias-privacidade/:id_user", myController.atualizarPreferenciaprivacidade);
rota.put("/update-foto/:id", uploadfotoperfil.single("foto"), Updatefoto);
rota.put("/update-fotobanner/:id", uploadfotobanner.single("foto"), Updatefotobanner);
rota.post("/", myController.Create);
rota.post("/", uploadfotoperfil.single("foto"), Create);
rota.post("/criar-conta-empresa", myController.CreateEmpresa);
rota.post("/completar-cadastro-padrao", updatecompletarcadastropadrao);
rota.post("/login", Login)
rota.post("/criar-codigo-verificacao", CriarCodigoVerificacao);
rota.post("/verificar-codigo-recuperacao", myController.VerificarCodigoRecuperacao);
rota.post("/atualizar-senha", myController.AtualizarSenha);
rota.post("/solicitar-criacao", SolicitarCriacao);
rota.post("/solicitar-exclusao", Solicitarexclusao);
rota.post("/atualizar-tema", Atualizartema);
rota.post("/atualizar-acessibilidade", Atualizaracessibilidade);
rota.post("/completar-cadastro-empresa", updatecompletarcadastroempresa);
rota.post("/enviar-foto-perfil/:id", uploadfotoperfil.single("foto"), EnviarfotoPerfil);
rota.get("/perfil/:id", myController.GetAllbyidPerfil);
rota.post("/seguir-usuario/:seguidorId/:seguidoId", myController.Seguirusuario);
rota.delete("/:id", myController.Erase);



module.exports = rota;