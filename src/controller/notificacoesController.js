const model = require("../model/notificacoesService");

const NotificacoesController = {
	criarNotificacao: async (request, response) => {
		try {
			const { destinatario_id, remetente_id, tipo, post_id, comentario_id } = request.body;
			const data = await model.criarNotificacao({
				destinatario_id,
				remetente_id,
				tipo,
				post_id,
				comentario_id,
			});

			response.status(201).send(data);
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error.message);
			response.status(401).send({ message: "Falha ao executar a ação!" });
		}
	},

	listarPorDestinatario: async (request, response) => {
		try {
			const destinatarioId = request.params.destinatarioId;
			const data = await model.listarNotificacoesPorDestinatario(destinatarioId);

			const baseUrl = `${request.protocol}://${request.get("host")}`;
			const resultado = data.map((notificacao) => ({
				...notificacao,
				remetente_foto: notificacao.remetente_foto
					? baseUrl + notificacao.remetente_foto
					: null,
			}));

			response.status(200).send(resultado);
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error.message);
			response.status(401).send({ message: "Falha ao executar a ação!" });
		}
	},

	marcarComoLida: async (request, response) => {
		try {
			const idNotificacao = request.params.id;
			const destinatarioId =
				request.body?.destinatario_id ||
				request.user?.id ||
				request.user?.userId ||
				request.query?.destinatario_id;

			if (!destinatarioId) {
				return response.status(400).send({
					message: "Informe o destinatario_id no body/query ou envie um token valido.",
				});
			}

			const data = await model.marcarNotificacaoComoLida(idNotificacao, destinatarioId);

			if (!data.affectedRows) {
				return response.status(404).send({ message: "Notificacao nao encontrada." });
			}

			response.status(200).send({ message: "Notificacao marcada como lida." });
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	excluirNotificacao: async (request, response) => {
		try {
			const idNotificacao = request.params.id;
			const destinatarioId =
				request.body?.destinatario_id ||
				request.user?.id ||
				request.user?.userId ||
				request.query?.destinatario_id;

			if (!destinatarioId) {
				return response.status(400).send({
					message: "Informe o destinatario_id no body/query ou envie um token valido.",
				});
			}

			const data = await model.excluirNotificacao(idNotificacao, destinatarioId);

			if (!data.affectedRows) {
				return response.status(404).send({ message: "Notificacao nao encontrada." });
			}

			response.status(200).send({ message: "Notificacao excluida com sucesso." });
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	excluirTodasPorDestinatario: async (request, response) => {
		try {
			const destinatarioId = request.params.destinatarioId;

			if (!destinatarioId) {
				return response.status(400).send({
					message: "Informe o destinatarioId na rota.",
				});
			}

			const data = await model.excluirTodasNotificacoesPorDestinatario(destinatarioId);

			response.status(200).send({
				message: "Notificacoes excluidas com sucesso.",
				total_excluidas: data.affectedRows || 0,
			});
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},
};

module.exports = NotificacoesController;
