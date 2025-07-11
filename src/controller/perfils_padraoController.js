const model = require("../model/perfils_padrao");

const PerfilsPadraoController = {
  GetAll: async (request, response) => {
    try {
      const data = await model.GetAll();
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar todos os perfis:", error.message);
      response.status(500).send({ message: "Erro interno ao buscar perfis." });
    }
  },

GetById: async (request, response) => {
  try {
    const { usuario_id } = request.params;
    const data = await model.GetById(usuario_id);

    if (!data || data.length === 0) {
      return response.status(404).send({ message: "Perfil não encontrado." });
    }

    response.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar perfil por ID:", error.message);
    response.status(500).send({ message: "Erro interno ao buscar perfil." });
  }
},


  Erase: async (request, response) => {
    try {
      const { usuario_id } = request.params;
      const data = await model.Erase(usuario_id);

      if (data.affectedRows === 0) {
        return response.status(404).send({ message: "Perfil não encontrado para exclusão." });
      }

      response.status(204).send(); // 204: sucesso sem conteúdo
    } catch (error) {
      console.error("Erro ao excluir perfil:", error.message);
      response.status(500).send({ message: "Erro interno ao excluir perfil." });
    }
  },

  Update: async (request, response) => {
    try {
      const { usuario_id } = request.params;
      const { profissao, nome_de_usuario, descricao, certificados } = request.body;

      const data = await model.Update(
        profissao,
        nome_de_usuario,
        descricao,
        certificados,
        usuario_id
      );

      if (data.affectedRows === 0) {
        return response.status(404).send({ message: "Perfil não encontrado ou dados inalterados." });
      }

      response.status(202).send({ message: "Perfil atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error.message);
      response.status(500).send({ message: "Erro interno ao atualizar perfil." });
    }
  },

  Create: async (request, response) => {
    try {
      const { usuario_id } = request.params;
      const { profissao, nome_de_usuario, descricao, certificados } = request.body;

      const data = await model.Create(
        usuario_id,
        profissao,
        nome_de_usuario,
        descricao,
        certificados
      );

      response.status(201).send({ message: "Perfil criado com sucesso." });
    } catch (error) {
      console.error("Erro ao criar perfil:", error.message);
      response.status(500).send({ message: "Erro interno ao criar perfil." });
    }
  },
};


module.exports = PerfilsPadraoController;
