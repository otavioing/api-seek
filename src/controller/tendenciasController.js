const model = require("../model/tendenciasService");

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
            response.json(posts);
        } catch (error) {
            response.status(500).json({ error: error.message });
        }
    }


};

module.exports = TendenciasServiceController;