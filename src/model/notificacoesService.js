const { banco } = require("./database");

const criarNotificacao = async ({ destinatario_id, remetente_id, tipo, post_id = null, comentario_id = null }) => {
	try {
		const [resultado] = await banco.query(
			"INSERT INTO notificacoes (destinatario_id, remetente_id, tipo, post_id, comentario_id) VALUES (?, ?, ?, ?, ?);",
			[destinatario_id, remetente_id, tipo, post_id, comentario_id]
		);

		return {
			id: resultado.insertId,
			destinatario_id,
			remetente_id,
			tipo,
			post_id,
			comentario_id,
		};
	} catch (error) {
		console.error("Erro ao criar notificacao:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const listarNotificacoesPorDestinatario = async (destinatarioId) => {
	try {
		const [dados] = await banco.query(
			"SELECT n.*, u.nome AS remetente_nome, u.foto AS remetente_foto FROM notificacoes n JOIN usuarios u ON u.id = n.remetente_id WHERE n.destinatario_id = ? ORDER BY n.criada_em DESC, n.id DESC;",
			[destinatarioId]
		);

		return dados;
	} catch (error) {
		console.error("Erro ao listar notificacoes:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const marcarNotificacaoComoLida = async (idNotificacao, destinatarioId) => {
	try {
		const [resultado] = await banco.query(
			"UPDATE notificacoes SET lida = 1 WHERE id = ? AND destinatario_id = ?;",
			[idNotificacao, destinatarioId]
		);

		return resultado;
	} catch (error) {
		console.error("Erro ao atualizar notificacao:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const excluirNotificacao = async (idNotificacao, destinatarioId) => {
	try {
		const [resultado] = await banco.query(
			"DELETE FROM notificacoes WHERE id = ? AND destinatario_id = ?;",
			[idNotificacao, destinatarioId]
		);

		return resultado;
	} catch (error) {
		console.error("Erro ao excluir notificacao:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const excluirTodasNotificacoesPorDestinatario = async (destinatarioId) => {
	try {
		const [resultado] = await banco.query(
			"DELETE FROM notificacoes WHERE destinatario_id = ?;",
			[destinatarioId]
		);

		return resultado;
	} catch (error) {
		console.error("Erro ao excluir notificacoes do destinatario:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const criarNotificacaoRespostaComentario = async ({ idcomentariopai, remetente_id, post_id }) => {
	try {
		const [comentarios] = await banco.query(
			"SELECT user_id FROM comentarios WHERE id = ? LIMIT 1;",
			[idcomentariopai]
		);

		if (!comentarios.length) {
			return null;
		}

		const destinatario_id = comentarios[0].user_id;

		if (Number(destinatario_id) === Number(remetente_id)) {
			return null;
		}

		return await criarNotificacao({
			destinatario_id,
			remetente_id,
			tipo: "comentario",
			post_id,
			comentario_id: idcomentariopai,
		});
	} catch (error) {
		console.error("Erro ao criar notificacao de resposta:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const criarNotificacaoComentarioPost = async ({ remetente_id, post_id, comentario_id = null }) => {
	try {
		const [posts] = await banco.query(
			"SELECT user_id FROM posts WHERE id = ? LIMIT 1;",
			[post_id]
		);

		if (!posts.length) {
			return null;
		}

		const destinatario_id = posts[0].user_id;

		if (Number(destinatario_id) === Number(remetente_id)) {
			return null;
		}

		return await criarNotificacao({
			destinatario_id,
			remetente_id,
			tipo: "comentario",
			post_id,
			comentario_id,
		});
	} catch (error) {
		console.error("Erro ao criar notificacao de comentario:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const criarNotificacaoSeguindo = async ({ remetente_id, destinatario_id }) => {
	try {
		if (Number(remetente_id) === Number(destinatario_id)) {
			return null;
		}

		return await criarNotificacao({
			destinatario_id,
			remetente_id,
			tipo: "seguindo",
			post_id: null,
			comentario_id: null,
		});
	} catch (error) {
		console.error("Erro ao criar notificacao de seguindo:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

const criarNotificacaoLikePost = async ({ remetente_id, post_id }) => {
	try {
		const [posts] = await banco.query(
			"SELECT user_id FROM posts WHERE id = ? LIMIT 1;",
			[post_id]
		);

		if (!posts.length) {
			return null;
		}

		const destinatario_id = posts[0].user_id;

		if (Number(remetente_id) === Number(destinatario_id)) {
			return null;
		}

		return await criarNotificacao({
			destinatario_id,
			remetente_id,
			tipo: "like",
			post_id,
			comentario_id: null,
		});
	} catch (error) {
		console.error("Erro ao criar notificacao de like:", error.message);
		throw new Error("Falha ao executar a ação!");
	}
};

module.exports = {
	criarNotificacao,
	listarNotificacoesPorDestinatario,
	marcarNotificacaoComoLida,
	excluirNotificacao,
	excluirTodasNotificacoesPorDestinatario,
	criarNotificacaoRespostaComentario,
	criarNotificacaoComentarioPost,
	criarNotificacaoSeguindo,
	criarNotificacaoLikePost,
};
