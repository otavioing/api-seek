const model = require("../model/postsService");
// const { CriarPostvaga } = require("../model/postvagaService");

const PostsServiceController = {
  ListarPostsvaga: async (request, response) => {
    try {
      const data = await model.ListarPostsvaga();
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },
  ListarPostsvagaPorUsuario: async (request, response) => {
    try {
      const userId = request.params.id;
      const data = await model.ListarPostsvagaPorUsuario(userId);
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

CriarPostvaga: async (request, response) => {
  try {
    const userId = request.body.user_id;
    const titulo = request.body.titulo;
    const vaga = request.body.vaga;
    const descricao_vaga = request.body.descricao_vaga;
    const datapost_vaga = request.body.datapost_vaga;
    const tipovaga_post = request.body.tipovaga_post;
    const localizacao_vaga = request.body.localizacao_vaga;
    const imagem = request.file ? `/uploads/posts/${request.file.filename}` : null;

    if (!imagem) {
      return response.status(400).send({ message: "Imagem é obrigatória" });
    }

    const data = await model.CriarPostvaga(userId, imagem, titulo, vaga, descricao_vaga, datapost_vaga, tipovaga_post, localizacao_vaga);
    response.status(201).send(data); // ou data[0] se necessário
  } catch (error) {
    console.error("Erro ao criar post de vaga:", error.message);
    response.status(500).send({ message: "Erro interno ao criar post de vaga." });
  }
},


};

module.exports = PostsServiceController;
