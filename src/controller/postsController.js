const model = require("../model/postsService");
const notificacoesModel = require("../model/notificacoesService");

function agruparPosts(data, baseUrl) {
  const posts = [];

  data.forEach(row => {
    let post = posts.find(p => p.id === row.id);

    if (!post) {
      post = {
        id: row.id,
        titulo: row.titulo,
        legenda: row.legenda,
        criado_em: row.criado_em,
        user: {
          id: row.user_id,
          nome: row.nome,
          foto: row.foto_perfil
            ? baseUrl + row.foto_perfil
            : null
        },
        imagens: [],
        total_likes: row.total_likes || 0,
        total_seguidores: row.total_seguidores || 0
      };

      posts.push(post);
    }

    if (row.imagem) {
      post.imagens.push(baseUrl + row.imagem);
    }
  });

  return posts;
}

const PostsServiceController = {
  ListarPosts: async (request, response) => {
    try {
      const data = await model.ListarPosts();
      const baseUrl = `${request.protocol}://${request.get("host")}`;

      const resultado = agruparPosts(data, baseUrl);

      response.status(200).json(resultado);

    } catch (error) {
      console.error(error.message);
      response.status(500).send({ message: "Erro interno" });
    }
  },

  ListarPostsPorUsuario: async (request, response) => {
    try {
      const userId = request.params.id;
      const data = await model.ListarPostsPorUsuario(userId);

      const baseUrl = `${request.protocol}://${request.get("host")}`;

      const resultado = agruparPosts(data, baseUrl);

      response.status(200).json(resultado);

    } catch (error) {
      console.error(error.message);
      response.status(500).send({ message: "Erro interno" });
    }
  },


  CriarPost: async (request, response) => {
    try {
      const userId = request.body.user_id;
      const legenda = request.body.legenda || "";
      const titulo = request.body.titulo || "";
      const id_categoria = request.body.id_categoria || "";

      const imagens = request.files; // 👈 mudou aqui

      if (!imagens || imagens.length === 0) {
        return response.status(400).send({ message: "Pelo menos uma imagem é obrigatória" });
      }

      const data = await model.CriarPost(
        userId,
        imagens,
        legenda,
        titulo,
        id_categoria
      );
      response.status(201).send(data);

    } catch (error) {
      console.error("Erro ao criar post:", error.message);
      response.status(500).send({ message: "Erro interno ao criar post." });
    }
  },

  listarpostdequemousersegue: async (request, response) => {
    try {
      const userId = request.params.id;
      const data = await model.listarpostdequemousersegue(userId);

      const baseUrl = `${request.protocol}://${request.get("host")}`;

      const resultado = agruparPosts(data, baseUrl);

      response.status(200).json(resultado);

    } catch (error) {
      console.error(error.message);
      response.status(500).send({ message: "Erro interno" });
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

      if (data.liked === true) {
        await notificacoesModel.criarNotificacaoLikePost({
          remetente_id: uId,
          post_id: pId,
        });
      }

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
