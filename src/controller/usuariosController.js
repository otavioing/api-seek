const model = require("../model/usuariosService");

const UsuariosController = {
  GetAll: async (request, response) => {
    try {
      const data = await model.GetAll();
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

  GetById: async (request, response) => {
    try {
      const id = request.params.id;
      const data = await model.GetById(id);
      response.status(200).send(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },
};

module.exports = UsuariosController;
