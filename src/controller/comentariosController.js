const model = require("../model/comentariosService");
const notificacoesModel = require("../model/notificacoesService");

const adicionarBaseUrlNaFoto = (comentario, baseUrl) => {
    const respostas = Array.isArray(comentario.respostas)
        ? comentario.respostas.map((resposta) => adicionarBaseUrlNaFoto(resposta, baseUrl))
        : [];

    return {
        ...comentario,
        foto: comentario.foto ? baseUrl + comentario.foto : null,
        respostas,
    };
};

const ComentariosController = {

    listarComentariosPorPost: async (request, response) => {
        try {
            const idpost = request.params.idpost;
            const data = await model.listarComentariosPorPost(idpost);

            const baseUrl = `${request.protocol}://${request.get("host")}`;
            const resultado = data.map((comentario) => adicionarBaseUrlNaFoto(comentario, baseUrl));

            response.status(200).send(resultado);
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

            await notificacoesModel.criarNotificacaoComentarioPost({
                remetente_id: idusuario,
                post_id: idpost,
                comentario_id: data.insertId || null,
            });

            response.status(200).send(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

    responderComentario: async (request, response) => {
        try {
            const idpost = request.params.idpost;
            const idcomentariopai = request.params.idcomentariopai;
            const idusuario = request.body.idusuario;
            const conteudo = request.body.conteudo;
            const data = await model.responderComentario(idpost, idusuario, conteudo, idcomentariopai);

            await notificacoesModel.criarNotificacaoRespostaComentario({
                idcomentariopai,
                remetente_id: idusuario,
                post_id: idpost,
            });

            response.status(200).send(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

};

module.exports = ComentariosController;