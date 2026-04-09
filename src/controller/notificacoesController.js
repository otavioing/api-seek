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
			const destinatarioId = request.body.destinatario_id;
			const data = await model.marcarNotificacaoComoLida(idNotificacao, destinatarioId);
			response.status(200).send(data);
		} catch (error) {
			console.error("Erro ao conectar ao banco de dados:", error.message);
			response.status(401).send({ message: "Falha ao executar a ação!" });
		}
	},
};

module.exports = NotificacoesController;
