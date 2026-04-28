const { banco } = require("./database");

// const CriarPost = async (userId, imagem, legenda, titulo, id_categoria) => {
//   try {
//     const [posts] = await banco.query(
//       "INSERT INTO posts (user_id, imagem, legenda, titulo, id_categoria) VALUES (?, ?, ?, ?, ?)",
//       [userId, imagem, legenda, titulo, id_categoria]
//     );
//     console.log("Post criado com sucesso");
//     return posts;
//   } catch (err) {
//     console.error("Erro ao criar post:", err.message);
//     throw new Error("Erro interno");
//   }
// };

const CriarPost = async (userId, imagens, legenda, titulo, id_categoria) => {
  try {
    // cria post
    const [postResult] = await banco.query(
      "INSERT INTO posts (user_id, legenda, titulo, id_categoria) VALUES (?, ?, ?, ?)",
      [userId, legenda, titulo, id_categoria]
    );

    const postId = postResult.insertId;

    // salva imagens (uma por vez)
    for (const file of imagens) {
      await banco.query(
        "INSERT INTO post_imagens (post_id, imagem) VALUES (?, ?)",
        [postId, `/uploads/posts/${file.filename}`]
      );
    }

    return { message: "Post criado com múltiplas imagens!" };

  } catch (err) {
    console.error("Erro ao criar post:", err.message);
    throw new Error("Erro interno");
  }
};

const ListarPosts = async () => {
  try {
    const [rows] = await banco.query(`
      SELECT 
        p.id,
        p.titulo,
        p.legenda,
        p.criado_em,
        p.user_id,
        u.nome,
        u.foto AS foto_perfil,
        COUNT(DISTINCT s.id) AS total_seguidores,
        pi.imagem
      FROM posts p
      JOIN usuarios u ON p.user_id = u.id
      LEFT JOIN seguidores s ON s.seguido_id = u.id
      LEFT JOIN post_imagens pi ON pi.post_id = p.id
      GROUP BY p.id, pi.imagem
      ORDER BY p.criado_em DESC
    `);

    return rows;

  } catch (err) {
    console.error("Erro ao buscar posts:", err.message);
    throw new Error("Erro interno");
  }
};



const ListarPostsPorUsuario = async (userId) => {
  try {
    const [rows] = await banco.query(`
      SELECT 
        p.id,
        p.titulo,
        p.legenda,
        p.criado_em,
        u.nome,
        u.foto AS foto_perfil,
        COUNT(DISTINCT l.id) AS total_likes,
        pi.imagem
      FROM posts p
      JOIN usuarios u ON p.user_id = u.id
      LEFT JOIN likes_posts l ON l.post_id = p.id
      LEFT JOIN post_imagens pi ON pi.post_id = p.id
      WHERE p.user_id = ?
      GROUP BY p.id, pi.imagem
      ORDER BY p.criado_em DESC
    `, [userId]);

    return rows;

  } catch (err) {
    console.error("Erro ao buscar posts:", err.message);
    throw new Error("Erro interno");
  }
};

const listarpostdequemousersegue = async (userId) => {
  try {
    const [rows] = await banco.query(`
      SELECT 
        p.id,
        p.titulo,
        p.legenda,
        p.criado_em,
        u.nome,
        u.foto AS foto_perfil,
        pi.imagem
      FROM posts p
      JOIN seguidores s ON p.user_id = s.seguido_id
      JOIN usuarios u ON p.user_id = u.id
      LEFT JOIN post_imagens pi ON pi.post_id = p.id
      WHERE s.seguidor_id = ?
      GROUP BY p.id, pi.imagem
      ORDER BY p.criado_em DESC
    `, [userId]);

    return rows;

  } catch (err) {
    console.error("Erro ao buscar posts:", err.message);
    throw new Error("Erro interno");
  }
};


const insertlike = async (userId, postId) => {
  try {
    // Verifica se já existe like desse usuário nesse post
    const [rows] = await banco.query(
      "SELECT id FROM likes_posts WHERE user_id = ? AND post_id = ? LIMIT 1",
      [userId, postId]
    );

    if (rows.length > 0) {
      // Se já existe, remove o like (toggle off)
      await banco.query(
        "DELETE FROM likes_posts WHERE user_id = ? AND post_id = ?",
        [userId, postId]
      );
      console.log(`Like removido: user ${userId}, post ${postId}`);
      return { message: "Like removido", liked: false };
    } else {
      // Se não existe, insere o like (toggle on)
      const [result] = await banco.query(
        "INSERT INTO likes_posts (user_id, post_id) VALUES (?, ?)",
        [userId, postId]
      );
      console.log(`Like inserido: user ${userId}, post ${postId}`);
      return { message: "Like adicionado", liked: true, insertId: result.insertId };
    }
  } catch (err) {
    console.error("Erro ao alternar like:", err.message);
    throw new Error("Erro interno");
  }
};


const ListarLikesPorPost = async (postId) => {
  try {
    const [likes] = await banco.query(
      "SELECT COUNT(*) AS total_likes FROM likes_posts WHERE post_id = ?",
      [postId]
    );
    return likes;
  } catch (err) {
    console.error("Erro ao listar likes por post:", err.message);
    throw new Error("Erro interno");
  }
};

const verificalike = async (userId, postId) => {
  try {
    const [rows] = await banco.query(
      "SELECT id FROM likes_posts WHERE user_id = ? AND post_id = ? LIMIT 1",
      [userId, postId]
    );
    return rows.length > 0;
  } catch (err) {
    console.error("Erro ao verificar like:", err.message);
    throw new Error("Erro interno");
  }
};


module.exports = { CriarPost, ListarPosts, ListarPostsPorUsuario, listarpostdequemousersegue, insertlike, ListarLikesPorPost, verificalike };
