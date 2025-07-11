const { banco } = require("./database");

const CriarPost = async (userId, imagem, legenda) => {
  try {
    const [posts] = await banco.query(
      "INSERT INTO posts (user_id, imagem, legenda) VALUES (?, ?, ?)",
      [userId, imagem, legenda]
    );
    console.log("Post criado com sucesso");
    return posts;
  } catch (err) {
    console.error("Erro ao criar post:", err.message);
    throw new Error("Erro interno");
  }
};
// const CriarPost = async (req, res) => {
//     try {
//         const userId = req.body.user_id;
//         const legenda = req.body.legenda || '';
//         const imagem = req.file ? `/uploads/posts/${req.file.filename}` : null;

//         if (!imagem) {
//             return res.status(400).send({ message: "Imagem é obrigatória" });
//         }

//         await banco.query(
//             'INSERT INTO posts (user_id, imagem, legenda) VALUES (?, ?, ?)',
//             [userId, imagem, legenda]
//         );

//         res.status(201).send({ message: "Post criado com sucesso" });
//     } catch (err) {
//         console.error("Erro ao criar post:", err.message);
//         res.status(500).send({ message: "Erro interno" });
//     }
//     console.log(req.file)
// };

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

module.exports = { CriarPost, ListarPosts, ListarPostsPorUsuario };
