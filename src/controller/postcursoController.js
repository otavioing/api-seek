const model = require("../model/postcursoService");


const CursosServiceController = {
    Listarcursos: async (request, response) => {
        try {
            const data = await model.Listarcursos();
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

    Listarcursosporusuario: async (request, response) => {
        try {
            const userId = request.params.id;
            const data = await model.Listarcursosporusuario(userId);
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

    Listarcursosporid: async (request, response) => {
        try {
            const postId = request.params.id;
            const data = await model.Listarcursosporid(postId);
            response.status(200).json(data);
        } catch (error) {
            console.error("Erro ao conectar ao banco de dados:", error.message);
            response.status(401).send({ message: "Falha ao executar a ação!" });
        }
    },

    CriarPostcurso: async (request, response) => {
        try {
            const id_user = request.body.id_user;
            const nome_curso = request.body.nome_curso;
            const nivel_curso = request.body.nivel_curso;
            const valor_curso = request.body.valor_curso;
            const quantidade_vagas = request.body.quantidade_vagas;
            const id_categoria = request.body.id_categoria;
            const descricao_curso = request.body.descricao_curso;
            const imagem_curso = request.file ? `http://localhost:4500/uploads/capa_curso/${request.file.filename}` : null;
            const audio_curso = request.body.audio_curso;
            const legenda_curso = request.body.legenda_curso;
            if (!imagem_curso) {
                return response.status(400).send({ message: "Imagem do curso é obrigatória" });
            }
            const data = await model.CriarPostcurso(id_user, imagem_curso, nome_curso, nivel_curso, valor_curso, quantidade_vagas, audio_curso, legenda_curso, id_categoria, descricao_curso);
            response.status(201).send(data); // ou data[0] se necessário
        } catch (error) {
            console.error("Erro ao criar post de curso:", error.message);
            response.status(500).send({ message: "Erro interno ao criar post de curso." });
        }
    },

    ApagarPostcurso: async (request, response) => {
        try {
            const postId = request.params.id;
            const data = await model.ApagarPostcurso(postId);
            response.status(200).send({ message: "Postcurso apagado com sucesso", data: data });
        } catch (error) {
            console.error("Erro ao apagar postcurso:", error.message);
            response.status(500).send({ message: "Erro interno ao apagar postcurso." });
        }
    },
};

module.exports = CursosServiceController;