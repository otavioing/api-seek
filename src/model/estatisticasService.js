const express = require("express");

const { banco } = require("./database");


const categoriasusadasporusuario = async (idusuario) => {
    try {
        const data = await banco.query("SELECT cp.nome_categoria, COUNT(p.id) AS total_usos FROM categorias_posts cp LEFT JOIN posts p ON p.id_categoria = cp.id_categoria AND p.user_id = ? GROUP BY cp.id_categoria, cp.nome_categoria ORDER BY total_usos DESC;", [idusuario]);
        return data[0];
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

const medialikesporusuario = async (idusuario) => {
    try {
        const data = await banco.query("SELECT u.id AS usuario_id, u.nome, COUNT(DISTINCT p.id) AS total_posts, COUNT(lp.id) AS total_likes, COUNT(lp.id) / COUNT(DISTINCT p.id) AS media_likes_por_post FROM usuarios u LEFT JOIN posts p ON p.user_id = u.id LEFT JOIN likes_posts lp ON lp.post_id = p.id WHERE u.id = ? GROUP BY u.id, u.nome;", [idusuario]);
        return data[0];
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        throw new Error("Falha ao executar a ação!");
    }
}

module.exports = { categoriasusadasporusuario, medialikesporusuario }