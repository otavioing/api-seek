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
      const titulo = request.body.titulo || "";
      const id_categoria = request.body.id_categoria || "";

      if (!imagem) {
        return response.status(400).send({ message: "Imagem é obrigatória" });
      }

      const data = await model.CriarPost(userId, imagem, legenda, titulo, id_categoria);
      response.status(201).send(data); // ou data[0] se necessário
    } catch (error) {
      console.error("Erro ao criar post:", error.message);
      response.status(500).send({ message: "Erro interno ao criar post." });
    }
  },

  insertlike: async (request, response) => {
    try {
      // aceita tanto userId quanto user_id (flexível)
      const userId = request.body.userId ?? request.body.user_id;
      const postId = request.body.postId ?? request.body.post_id;

      if (!userId || !postId) {
        return response.status(400).json({ message: "userId e postId são obrigatórios." });
      }

      // opcional: converter para número
      const uId = Number(userId);
      const pId = Number(postId);

      if (!Number.isInteger(uId) || !Number.isInteger(pId)) {
        return response.status(400).json({ message: "userId e postId devem ser inteiros." });
      }

      const data = await model.insertlike(uId, pId);
      // dependendo do model, pode retornar insertId ou objeto
      return response.status(201).json(data);
    } catch (error) {
      console.error("Erro ao inserir like:", error.message);
      return response.status(500).json({ message: "Erro interno ao inserir like." });
    }
  },

  ListarLikesPorPost: async (request, response) => {
    try {
      const postId = request.params.id;
      const data = await model.ListarLikesPorPost(postId);
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },
  verificalike: async (request, response) => {
    try {
      const userId = request.params.userId;
      const postId = request.params.postId;
      const data = await model.verificalike(userId, postId);
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
},

};

module.exports = PostsServiceController;
