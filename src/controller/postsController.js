const model = require("../model/postsService");

const PostsServiceController = {
  ListarPosts: async (request, response) => {
    try {
      const data = await model.ListarPosts();
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },
  ListarPostsPorUsuario: async (request, response) => {
    try {
      const userId = request.params.id;
      const data = await model.ListarPostsPorUsuario(userId);
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

CriarPost: async (request, response) => {
  try {
    const userId = request.body.user_id;
    const legenda = request.body.legenda || "";
    const imagem = request.file ? `http://localhost:4500/uploads/posts/${request.file.filename}` : null;

    if (!imagem) {
      return response.status(400).send({ message: "Imagem é obrigatória" });
    }

    const data = await model.CriarPost(userId, imagem, legenda);
    response.status(201).send(data); // ou data[0] se necessário
  } catch (error) {
    console.error("Erro ao criar post:", error.message);
    response.status(500).send({ message: "Erro interno ao criar post." });
  }
},


};

module.exports = PostsServiceController;
