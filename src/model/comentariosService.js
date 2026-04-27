const { banco } = require("./database");


const listarComentariosPorPost = async (idpost) => {
    try {
        const data = await banco.query(
            "SELECT c.id, c.post_id, c.user_id, c.comentario, c.comentario_pai_id, c.criado_em, u.nome, u.nome_de_usuario, u.foto FROM comentarios c JOIN usuarios u ON u.id = c.user_id WHERE c.post_id = ? ORDER BY c.criado_em ASC, c.id ASC;",
            [idpost]
        );

        const comentarios = data[0].map((comentario) => ({
            ...comentario,
            respostas: [],
        }));

        const comentariosPorId = new Map();
        const comentariosRaiz = [];

        for (const comentario of comentarios) {
            comentariosPorId.set(comentario.id, comentario);
        }

        for (const comentario of comentarios) {
            if (comentario.comentario_pai_id) {
                const comentarioPai = comentariosPorId.get(comentario.comentario_pai_id);

                if (comentarioPai) {
                    comentarioPai.respostas.push(comentario);
                    continue;
                }
            }

            comentariosRaiz.push(comentario);
        }

        return comentariosRaiz;
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

const adicionarComentario = async (idpost, idusuario, conteudo) => {
    try {
        const data = await banco.query(
            "INSERT INTO comentarios (post_id, user_id, comentario, comentario_pai_id) VALUES (?, ?, ?, NULL);",
            [idpost, idusuario, conteudo]
        );
        return data[0];
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

const responderComentario = async (idpost, idusuario, conteudo, comentarioPaiId) => {
    try {
        const data = await banco.query(
            "INSERT INTO comentarios (post_id, user_id, comentario, comentario_pai_id) VALUES (?, ?, ?, ?);",
            [idpost, idusuario, conteudo, comentarioPaiId]
        );
        return data[0];
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

module.exports = { listarComentariosPorPost, adicionarComentario, responderComentario }