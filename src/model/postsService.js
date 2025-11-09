const { banco } = require("./database");

const CriarPost = async (userId, imagem, legenda, titulo, categoria) => {
  try {
    const [posts] = await banco.query(
      "INSERT INTO posts (user_id, imagem, legenda, titulo, categoria) VALUES (?, ?, ?, ?, ?)",
      [userId, imagem, legenda, titulo, categoria]
    );
    console.log("Post criado com sucesso");
    return posts;
  } catch (err) {
    console.error("Erro ao criar post:", err.message);
    throw new Error("Erro interno");
  }
};

const ListarPosts = async () => {
  try {
    const [posts] = await banco.query(`
            SELECT posts.*, usuarios.nome, usuarios.foto AS foto_perfil
            FROM posts
            JOIN usuarios ON posts.user_id = usuarios.id
            ORDER BY RAND() 
        `);
    return posts;
  } catch (err) {
    console.error("Erro ao buscar posts:", err.message);
    throw new Error("Erro interno");
  }
};

const ListarPostsPorUsuario = async (userId) => {
  try {
    const [posts] = await banco.query(
      `
            SELECT posts.*, usuarios.nome, usuarios.foto AS foto_perfil
            FROM posts
            JOIN usuarios ON posts.user_id = usuarios.id
            WHERE posts.user_id = ?
            ORDER BY posts.criado_em DESC
        `,
      [userId]
    );
    return posts;
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


module.exports = { CriarPost, ListarPosts, ListarPostsPorUsuario, insertlike, ListarLikesPorPost, verificalike };
