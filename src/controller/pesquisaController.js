const model = require("../model/pesquisaService");

const montarUrl = (req, caminho) => {
  if (!caminho) return null;
  return `${req.protocol}://${req.get("host")}${caminho}`;
};

const PesquisaController = {
  BuscarUsuarios: async (request, response) => {
    try {
      const termo = request.params.termo;

      if (!termo || !termo.trim()) {
        return response.status(400).send({ message: "Termo de pesquisa é obrigatório." });
      }

      const data = await model.BuscarUsuarios(termo.trim());

      const resultado = data.map(usuario => ({
        ...usuario,
        foto: montarUrl(request, usuario.foto)
      }));

      return response.status(200).json(resultado);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error.message);
      return response.status(500).send({ message: "Falha ao executar a ação!" });
    }
  },

  CriarHistoricoPesquisa: async (request, response) => {
    try {
      const { usuario_id, termo_pesquisa } = request.body;

      if (!usuario_id || !termo_pesquisa || !termo_pesquisa.trim()) {
        return response.status(400).send({ message: "usuario_id e termo_pesquisa são obrigatórios." });
      }

      const data = await model.CriarHistoricoPesquisa(usuario_id, termo_pesquisa.trim());
      return response.status(201).send(data);
    } catch (error) {
      console.error("Erro ao salvar histórico de pesquisa:", error.message);
      return response.status(500).send({ message: "Falha ao executar a ação!" });
    }
  },

  ListarHistoricoPesquisas: async (request, response) => {
    try {
      const usuario_id = request.params.usuario_id;
      const data = await model.ListarHistoricoPesquisas(usuario_id);
      return response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao listar histórico de pesquisas:", error.message);
      return response.status(500).send({ message: "Falha ao executar a ação!" });
    }
  },

  ExcluirHistoricoPesquisa: async (request, response) => {
    try {
      const usuario_id = request.params.usuario_id;
      const id = request.params.id;

      const data = await model.ExcluirHistoricoPesquisa(usuario_id, id);

      if (data.affectedRows === 0) {
        return response.status(404).send({ message: "Pesquisa não encontrada." });
      }

      return response.status(200).send({ message: "Pesquisa excluída com sucesso!" });
    } catch (error) {
      console.error("Erro ao excluir histórico de pesquisa:", error.message);
      return response.status(500).send({ message: "Falha ao executar a ação!" });
    }
  }
};

module.exports = PesquisaController;