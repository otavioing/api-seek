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
    const [rows] = await banco.query(`
      SELECT 
        p.id,
        p.titulo,
        p.legenda,
        p.criado_em,
        p.user_id,
        c.nome_categoria,
        
        u.nome AS nome_usuario,
        u.foto AS foto_perfil,

        COUNT(DISTINCT lp.id) AS total_likes,
        pi.imagem

      FROM posts p

      JOIN categorias_posts c
        ON c.id_categoria = p.id_categoria

      JOIN usuarios u
        ON u.id = p.user_id

      LEFT JOIN likes_posts lp
        ON lp.post_id = p.id

      LEFT JOIN post_imagens pi
        ON pi.post_id = p.id

      WHERE p.id_categoria = ?

      GROUP BY 
        p.id,
        pi.imagem

      ORDER BY p.criado_em DESC;
    `, [id_categoria]);

    return rows;

  } catch (err) {
    console.error("Erro ao listar posts por categoria:", err.message);
    throw new Error("Erro interno");
  }
};


module.exports = { verificarTendencias, listarpostscategoria };