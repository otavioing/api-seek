const model = require("../model/perfils_empresa");

const PerfilsempresaController = {
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
  Erase: async (request, response) => {
    try {
      const id = request.params.id;
      const data = await model.Erase(id);
      response.status(204).send(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

  Update: async (request, response) => {
    try {
      const usuario_id = request.params.id;
      const {
        razao_social,
        nome_fantasia,
        cnpj,
        telefone_comercial,
        categoria_negocio,
        numero_funcionarios,
        endereco_completo,
        descricao,
      } = request.body;
      const data = await model.Update(
        razao_social,
        nome_fantasia,
        cnpj,
        telefone_comercial,
        categoria_negocio,
        numero_funcionarios,
        endereco_completo,
        descricao,
        usuario_id
      );
      response.status(202).send(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

  Create: async (request, response) => {
    try {
      const { usuario_id } = request.params;
      const {
        razao_social,
        nome_fantasia,
        cnpj,
        telefone_comercial,
        categoria_negocio,
        numero_funcionarios,
        endereco_completo,
        descricao,
      } = request.body;
      const data = await model.Create(usuario_id, razao_social, nome_fantasia, cnpj, telefone_comercial, categoria_negocio, numero_funcionarios, endereco_completo, descricao);
      response.status(202).send(data[0]);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },
};

module.exports = PerfilsempresaController;
