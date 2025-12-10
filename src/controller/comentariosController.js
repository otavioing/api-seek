const model = require("../model/comentariosService");


const ComentariosController = {

    listarComentariosPorPost: async (request, response) => {
        try {
            const idpost = request.params.idpost;
            const data = await model.listarComentariosPorPost(idpost);
            response.status(200).send(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

    adicionarComentario: async (request, response) => {
        try {
            const idpost = request.params.idpost;
            const idusuario = request.body.idusuario;
            const conteudo = request.body.conteudo;
            const data = await model.adicionarComentario(idpost, idusuario, conteudo);
            response.status(200).send(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

};

module.exports = ComentariosController;