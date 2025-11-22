const model = require("../model/estatisticasService");


const EstatisticasController = {

    categoriasusadasporusuario: async (request, response) => {
        try {
            const idusuario = request.params.idusuario;
            const data = await model.categoriasusadasporusuario(idusuario);
            response.status(200).send(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

    medialikesporusuario: async (request, response) => {
        try {
            const idusuario = request.params.idusuario;
            const data = await model.medialikesporusuario(idusuario);
            response.status(200).send(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

};

module.exports = EstatisticasController;