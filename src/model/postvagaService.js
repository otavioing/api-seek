const { banco } = require("./database");

const CriarPostvaga = async (userId, imagem, titulo, descricao, datapost, tipovaga, localizacao) => {
  try {
    const [posts] = await banco.query(
      "INSERT INTO postsvagas (user_id, foto_vaga, titulo_vaga, descricao_vaga, datapost_vaga, tipovaga_post, localizacao_vaga) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [userId, imagem, titulo, descricao, datapost, tipovaga, localizacao]
    );
    console.log("Postvaga criado com sucesso");
    return posts;
  } catch (err) {
    console.error("Erro ao criar postvaga:", err.message);
    throw new Error("Erro interno");
  }
};

const ListarPostsvaga = async () => {
  try {
    const [posts] = await banco.query(`
            SELECT postsvagas.*, usuarios.nome, usuarios.foto AS foto_perfil
            FROM postsvagas
            JOIN usuarios ON postsvagas.user_id = usuarios.id
            ORDER BY RAND() 
        `);
    return posts;
  } catch (err) {
    console.error("Erro ao buscar postsvagas:", err.message);
    throw new Error("Erro interno");
  }
};

const ListarPostsvagaPorUsuario = async (userId) => {
  try {
    const [posts] = await banco.query(
      `
            SELECT postsvagas.*, usuarios.nome, usuarios.foto AS foto_perfil
            FROM postsvagas
            JOIN usuarios ON postsvagas.user_id = usuarios.id
            WHERE posts.user_id = ?
            ORDER BY posts.criado_em DESC
        `,
      [userId]
    );
    return posts;
  } catch (err) {
    console.error("Erro ao buscar postsvaga:", err.message);
    throw new Error("Erro interno");
  }
};

module.exports = { CriarPostvaga, ListarPostsvaga, ListarPostsvagaPorUsuario };
