const express = require("express");

const { banco } = require("./database");


const listarComentariosPorPost = async (idpost) => {
    try {
        const data = await banco.query("SELECT c.*, u.nome, u.nome_de_usuario, u.foto FROM comentarios c JOIN usuarios u ON u.id = c.user_id WHERE c.post_id = ? ORDER BY c.criado_em ASC;", [idpost]);
        return data[0];
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

module.exports = { listarComentariosPorPost, adicionarComentario }