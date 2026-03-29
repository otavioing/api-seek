const model = require("../model/tendenciasService");

const montarUrl = (req, caminho) => {
    if (!caminho) return null;
    return `${req.protocol}://${req.get("host")}${caminho}`;
};

const TendenciasServiceController = {

    verificarTendencias: async (request, response) => {
        try {
            const tendencias = await model.verificarTendencias();
            response.json(tendencias);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    },

listarpostscategoria: async (request, response) => {
  try {
    const id_categoria = request.params.id_categoria;
    const data = await model.listarpostscategoria(id_categoria);

    const baseUrl = `${request.protocol}://${request.get("host")}`;

    const posts = [];

    data.forEach(row => {
      let post = posts.find(p => p.id === row.id);

      if (!post) {
        post = {
          id: row.id,
          titulo: row.titulo,
          legenda: row.legenda,
          criado_em: row.criado_em,
          nome_categoria: row.nome_categoria,

          user: {
            id: row.user_id,
            nome: row.nome_usuario,
            foto: row.foto_perfil
              ? baseUrl + row.foto_perfil
              : null
          },

          total_likes: row.total_likes || 0,
          imagens: []
        };

        posts.push(post);
      }

      if (row.imagem) {
        post.imagens.push(baseUrl + row.imagem);
      }
    });

    response.json(posts);

  } catch (error) {
    response.status(500).json({ error: error.message });
  }
}


};

module.exports = TendenciasServiceController;