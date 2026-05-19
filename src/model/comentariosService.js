const express = require("express");

const { banco } = require("./database");


const listarComentariosPorPost = async (idpost) => {
    try {
        const [rows] = await banco.query(
            "SELECT c.id, c.comentario, c.comentario_pai_id, c.criado_em, u.nome FROM comentarios c JOIN usuarios u ON u.id = c.user_id WHERE c.post_id = ? ORDER BY c.criado_em ASC, c.id ASC;",
            [idpost]
        );

        const comentariosPorId = new Map();
        const comentariosRaiz = [];

        for (const row of rows) {
            comentariosPorId.set(row.id, {
                id: row.id,
                nome: row.nome,
                comentario: row.comentario,
                respostas: []
            });
        }

        for (const row of rows) {
            const comentario = comentariosPorId.get(row.id);

            if (row.comentario_pai_id) {
                const comentarioPai = comentariosPorId.get(row.comentario_pai_id);

                if (comentarioPai) {
                    comentarioPai.respostas.push({
                        id: comentario.id,
                        nome: comentario.nome,
                        comentario: comentario.comentario
                    });
                }
            } else {
                comentariosRaiz.push({
                    id: comentario.id,
                    nome: comentario.nome,
                    comentario: comentario.comentario,
                    respostas: comentario.respostas
                });
            }
        }

        return comentariosRaiz;
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

const adicionarComentario = async (idpost, idusuario, conteudo) => {
    try {
        const data = await banco.query("INSERT INTO comentarios (post_id, user_id, comentario) VALUES (?, ?, ?);", [idpost, idusuario, conteudo]);
        return data[0];
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

const adicionarRespostaComentario = async (idpost, idusuario, conteudo, comentario_pai_id) => {
    try {
        const data = await banco.query(
            "INSERT INTO comentarios (post_id, user_id, comentario, comentario_pai_id) VALUES (?, ?, ?, ?);",
            [idpost, idusuario, conteudo, comentario_pai_id]
        );
        return data[0];
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

module.exports = { listarComentariosPorPost, adicionarComentario, adicionarRespostaComentario }