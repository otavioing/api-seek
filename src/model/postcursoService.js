const { banco } = require("./database");


const Listarcursos = async () => {
    try {
        const [posts] = await banco.query(`
            select c.id, c.imagem_curso, c.nome_curso, c.valor_curso, c.descricao_curso, u.nome as nome_usuario
            from cursos c
            join usuarios u ON c.id_user = u.id
            ORDER BY RAND() 
        `);
        return posts;
    } catch (err) {
        console.error("Erro ao criar postvaga:", err.message);
        throw new Error("Erro interno");
    }
};


const Listarcursosporusuario = async (userId) => {
    try {
        const [posts] = await banco.query(`
            select c.imagem_curso, c.nome_curso, c.valor_curso, c.descricao_curso, u.nome as nome_usuario
            from cursos c
            join usuarios u ON c.id_user = u.id
            where c.id_user = ?
        `, [userId]);
        return posts;
    } catch (err) {
        console.error("Erro ao criar postvaga:", err.message);
        throw new Error("Erro interno");
    }
};

const Listarcursosporid = async (postId) => {
    try {
        const [posts] = await banco.query(`
            select c.*, u.nome as nome_usuario, u.email as email_usuario
            from cursos c
            join usuarios u ON c.id_user = u.id
            where c.id = ?
        `, [postId]);
        return posts;
    } catch (err) {
        console.error("Erro ao criar postvaga:", err.message);
        throw new Error("Erro interno");
    }
};

const CriarPostcurso = async (id_user, imagem_curso, nome_curso, nivel_curso, valor_curso, quantidade_vagas, audio_curso, legenda_curso, id_categoria, descricao_curso) => {
    try {
        const [posts] = await banco.query(`
            insert into cursos (id_user, imagem_curso, nome_curso, nivel_curso, valor_curso, quantidade_vagas, audio_curso, legenda_curso, id_categoria, descricao_curso)
            values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [id_user, imagem_curso, nome_curso, nivel_curso, valor_curso, quantidade_vagas, audio_curso, legenda_curso, id_categoria, descricao_curso]);
        console.log("Postcurso criado com sucesso");
        return posts;
    } catch (err) {
        console.error("Erro ao criar postcurso:", err.message);
        throw new Error("Erro interno");
    }
};

const ApagarPostcurso = async (postId) => {
    try {
        const [result] = await banco.query("DELETE FROM cursos WHERE id = ?", [postId]);
        return result;
    } catch (err) {
        console.error("Erro ao apagar postcurso:", err.message);
        throw new Error("Erro interno");
    }
};

const listarporcategoria = async (categoriaId) => {
    try {
        const [posts] = await banco.query(`SELECT c.*, cc.nome_categoria FROM cursos c JOIN categorias_cursos cc ON c.id_categoria = cc.id_categoria WHERE c.id_categoria = ?;`, [categoriaId]);
        return posts;
    } catch (err) {
        console.error("Erro ao listar por categoria:", err.message);
        throw new Error("Erro interno");
    };
};


const listarporidioma = async (idioma) => {
    try {
        const [posts] = await banco.query(`SELECT * FROM cursos WHERE audio_curso = ?;`, [idioma]);
        return posts;
    } catch (err) {
        console.error("Erro ao listar por idioma:", err.message);
        throw new Error("Erro interno");
    };
};

const listarPorPagamento = async (status) => {
    try {
        const [posts] = await banco.query(`SELECT * FROM cursos WHERE valor_curso = ?;`, [status]);
        return posts;
    } catch (err) {
        console.error("Erro ao listar por status:", err.message);
        throw new Error("Erro interno");
    };
};



module.exports = { Listarcursos, Listarcursosporusuario, CriarPostcurso, ApagarPostcurso, Listarcursosporid, listarporcategoria, listarporidioma, listarPorPagamento};