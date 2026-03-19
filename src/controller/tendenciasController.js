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
            const posts = await model.listarpostscategoria(id_categoria);

            const resultado = posts.map(post => ({
                ...post,
                imagem: montarUrl(request, post.imagem)
            }));

            response.json(resultado);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }


};

module.exports = TendenciasServiceController;