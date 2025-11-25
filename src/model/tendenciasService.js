const { banco } = require("./database");

const verificarTendencias = async () => {
    try {
        const [tendencias] = await banco.query(`
SELECT 
    c.id_categoria,
    c.nome_categoria,
    COUNT(p.id) AS total_posts
FROM categorias_posts c
LEFT JOIN posts p 
       ON p.id_categoria = c.id_categoria
GROUP BY c.id_categoria, c.nome_categoria
ORDER BY total_posts DESC;

        `);
        return tendencias;
    } catch (err) {
        console.error("Erro ao verificar tendências:", err.message);
        throw new Error("Erro interno");
    }
}

const listarpostscategoria = async (id_categoria) => {
    try {
        const [posts] = await banco.query(`
           SELECT 
    p.id,
    p.titulo,
    p.legenda,
    p.imagem,
    p.criado_em,
    p.user_id,
    c.nome_categoria
FROM posts p
JOIN categorias_posts c
      ON c.id_categoria = p.id_categoria
WHERE p.id_categoria = ?;
            
        `, [id_categoria]);
        return posts;
    } catch (err) {
        console.error("Erro ao listar posts por categoria de foto:", err.message);
        throw new Error("Erro interno");
    }
}


module.exports = { verificarTendencias, listarpostscategoria };