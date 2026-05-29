const model = require("../model/postvagaService");

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
      const userId =
        request.user?.id ||
        request.user?.userId ||
        request.body.idUsuario ||
        request.body.id_usuario ||
        request.body.user_id;

      const idCategoria =
        request.body.idCategoria ||
        request.body.id_categoria ||
        request.body.categoria;

      const url = request.body.url || request.body.link_vaga || request.body.link;
      const descricao = request.body.descricao || request.body.descricao_vaga;

      if (!userId) {
        return response.status(400).send({ message: "Usuário não informado" });
      }

      if (!idCategoria) {
        return response.status(400).send({ message: "Categoria é obrigatória" });
      }

      if (!url) {
        return response.status(400).send({ message: "Link da vaga é obrigatório" });
      }

      const data = await model.CriarPostvaga(userId, idCategoria, url, descricao);
      response.status(201).send(data);
    } catch (error) {
      console.error("Erro ao criar vaga:", error.message);
      response.status(500).send({ message: "Erro interno ao criar vaga." });
    }
  },
  BuscarVagaLinkedin: async (request, response) => {
    try {
      const url = request.body.url || request.body.link_vaga || request.body.link;

      if (!url) {
        return response.status(400).send({
          message: "URL da vaga é obrigatória",
        });
      }

      const data = await model.BuscarVagaLinkedin(url);

      response.status(200).json(data);

    } catch (error) {
      console.error(
        "Erro ao buscar vaga:",
        error.message
      );

      response.status(500).send({
        message: "Falha ao executar a ação!",
      });
    }
  },

};

module.exports = PostsServiceController;
