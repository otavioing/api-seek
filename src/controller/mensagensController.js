const model = require("../model/mensagensService");

const normalizarParticipantes = (participantes) => {
	if (Array.isArray(participantes)) {
		return participantes;
	}

	if (typeof participantes === "string") {
		const texto = participantes.trim();
		if (!texto) {
			return [];
		}

		if (texto.startsWith("[")) {
			try {
				const valor = JSON.parse(texto);
				return Array.isArray(valor) ? valor : [];
			} catch (_error) {
				return [];
			}
		}

		if (texto.includes(",")) {
			return texto.split(",").map((item) => item.trim()).filter(Boolean);
		}

		return [texto];
	}

	if (participantes === undefined || participantes === null) {
		return [];
	}

	return [participantes];
};

const MensagensController = {
	criarConversa: async (request, response) => {
		try {
			const body = request.body || {};
			const fotoUpload = request.file ? `/uploads/conversas/${request.file.filename}` : null;
			const fotoBody = body.foto || null;
			const foto = fotoUpload || fotoBody;
			const participantes = normalizarParticipantes(body.participantes);
			const data = await model.criarConversa({ foto, participantes });

			response.status(201).send(data);
		} catch (error) {
			if (error.message === "E_PARTICIPANTES_OBRIGATORIO") {
				return response.status(400).send({ message: "Informe ao menos um participante valido." });
			}

			console.error("Erro ao criar conversa:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	atualizarFotoConversa: async (request, response) => {
		try {
			const conversaId = request.params.conversaId;

			if (!request.file) {
				return response.status(400).send({ message: "Envie um arquivo no campo foto." });
			}

			const caminhoFoto = `/uploads/conversas/${request.file.filename}`;
			const data = await model.atualizarFotoConversa({
				conversaId,
				foto: caminhoFoto,
			});

			if (!data.affectedRows) {
				return response.status(404).send({ message: "Conversa nao encontrada." });
			}

			const baseUrl = `${request.protocol}://${request.get("host")}`;
			response.status(200).send({
				message: "Foto da conversa atualizada com sucesso.",
				foto: baseUrl + caminhoFoto,
			});
		} catch (error) {
			console.error("Erro ao atualizar foto da conversa:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	listarConversasPorUsuario: async (request, response) => {
		try {
			const usuarioId = request.params.usuarioId;
			const data = await model.listarConversasPorUsuario(usuarioId);

			const baseUrl = `${request.protocol}://${request.get("host")}`;
			const resultado = data.map((conversa) => ({
				...conversa,
				foto: conversa.foto ? baseUrl + conversa.foto : null,
			}));

			response.status(200).send(resultado);
		} catch (error) {
			console.error("Erro ao listar conversas:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	criarMensagem: async (request, response) => {
		try {
			const conversaId = request.params.conversaId;
			const body = request.body || {};
			const { remetente_id, mensagem } = body;

			if (!mensagem) {
				return response.status(400).send({ message: "Campo mensagem e obrigatorio." });
			}

			const data = await model.criarMensagem({
				conversaId,
				remetenteId: remetente_id,
				mensagem,
			});

			response.status(201).send(data);
		} catch (error) {
			if (error.message === "E_USUARIO_FORA_DA_CONVERSA") {
				return response.status(403).send({ message: "Usuario nao participa da conversa." });
			}

			console.error("Erro ao criar mensagem:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	listarMensagensPorConversa: async (request, response) => {
		try {
			const conversaId = request.params.conversaId;
			const usuarioId = request.query.usuario_id;

			if (!usuarioId) {
				return response.status(400).send({ message: "Informe o usuario_id na query." });
			}

			const data = await model.listarMensagensPorConversa({
				conversaId,
				usuarioId,
			});

			response.status(200).send(data);
		} catch (error) {
			if (error.message === "E_USUARIO_FORA_DA_CONVERSA") {
				return response.status(403).send({ message: "Usuario nao participa da conversa." });
			}

			console.error("Erro ao listar mensagens:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	adicionarParticipantes: async (request, response) => {
		try {
			const conversaId = request.params.conversaId;
			const body = request.body || {};
			const { usuario_ids = [] } = body;

			const data = await model.adicionarParticipantes({
				conversaId,
				usuarioIds: usuario_ids,
			});

			response.status(200).send(data);
		} catch (error) {
			if (error.message === "E_PARTICIPANTES_OBRIGATORIO") {
				return response.status(400).send({ message: "Informe ao menos um usuario_id valido." });
			}

			console.error("Erro ao adicionar participantes:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	removerParticipante: async (request, response) => {
		try {
			const conversaId = request.params.conversaId;
			const usuarioId = request.params.usuarioId;

			const data = await model.removerParticipante({
				conversaId,
				usuarioId,
			});

			if (!data.affectedRows) {
				return response.status(404).send({ message: "Participante nao encontrado na conversa." });
			}

			response.status(200).send({ message: "Participante removido com sucesso." });
		} catch (error) {
			console.error("Erro ao remover participante:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	marcarMensagensComoLidas: async (request, response) => {
		try {
			const conversaId = request.params.conversaId;
			const body = request.body || {};
			const { usuario_id } = body;

			if (!usuario_id) {
				return response.status(400).send({ message: "Campo usuario_id e obrigatorio." });
			}

			const data = await model.marcarMensagensComoLidas({
				conversaId,
				usuarioId: usuario_id,
			});

			response.status(200).send(data);
		} catch (error) {
			if (error.message === "E_USUARIO_FORA_DA_CONVERSA") {
				return response.status(403).send({ message: "Usuario nao participa da conversa." });
			}

			console.error("Erro ao marcar mensagens como lidas:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},

	contarMensagensNaoLidas: async (request, response) => {
		try {
			const usuarioId = request.params.usuarioId;
			const total = await model.contarMensagensNaoLidas(usuarioId);

			response.status(200).send({ usuario_id: Number(usuarioId), total_nao_lidas: total });
		} catch (error) {
			console.error("Erro ao contar mensagens nao lidas:", error.message);
			response.status(500).send({ message: "Falha ao executar a acao!" });
		}
	},
};

module.exports = MensagensController;