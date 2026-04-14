const crypto = require("crypto");
const { banco } = require("./database");

const AES_SECRET = process.env.CHAT_AES_KEY || process.env.JWT_SECRET || "seek_chat_default_key_change_me";
const AES_KEY = crypto.createHash("sha256").update(AES_SECRET).digest();
const ALGORITHM = "aes-256-gcm";

const criptografarMensagem = (texto) => {
	const iv = crypto.randomBytes(12);
	const cipher = crypto.createCipheriv(ALGORITHM, AES_KEY, iv);

	const encrypted = Buffer.concat([cipher.update(String(texto), "utf8"), cipher.final()]);
	const authTag = cipher.getAuthTag();

	return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted.toString("base64")}`;
};

const descriptografarMensagem = (payload) => {
	if (!payload) {
		return "";
	}

	const partes = String(payload).split(":");
	if (partes.length !== 3) {
		return "[mensagem indisponivel]";
	}

	const [ivBase64, tagBase64, encryptedBase64] = partes;

	try {
		const iv = Buffer.from(ivBase64, "base64");
		const authTag = Buffer.from(tagBase64, "base64");
		const encrypted = Buffer.from(encryptedBase64, "base64");

		const decipher = crypto.createDecipheriv(ALGORITHM, AES_KEY, iv);
		decipher.setAuthTag(authTag);

		const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
		return decrypted.toString("utf8");
	} catch (_error) {
		return "[mensagem indisponivel]";
	}
};

const usuarioParticipaDaConversa = async (conversaId, usuarioId) => {
	const [dados] = await banco.query(
		"SELECT 1 FROM conversa_participantes WHERE conversa_id = ? AND usuario_id = ? LIMIT 1;",
		[conversaId, usuarioId]
	);

	return dados.length > 0;
};

const criarConversa = async ({ foto = null, participantes = [] }) => {
	const participantesUnicos = [...new Set((participantes || []).map(Number))].filter((id) => !Number.isNaN(id));

	if (!participantesUnicos.length) {
		throw new Error("E_PARTICIPANTES_OBRIGATORIO");
	}

	const conexao = await banco.getConnection();

	try {
		await conexao.beginTransaction();

		const [conversaResult] = await conexao.query(
			"INSERT INTO conversas (foto) VALUES (?);",
			[foto]
		);

		const conversaId = conversaResult.insertId;
		const valores = participantesUnicos.map((usuarioId) => [conversaId, usuarioId]);

		await conexao.query(
			"INSERT INTO conversa_participantes (conversa_id, usuario_id) VALUES ?;",
			[valores]
		);

		await conexao.commit();

		return {
			id: conversaId,
			foto,
			participantes: participantesUnicos,
		};
	} catch (error) {
		await conexao.rollback();
		throw error;
	} finally {
		conexao.release();
	}
};

const atualizarFotoConversa = async ({ conversaId, foto }) => {
	const [resultado] = await banco.query(
		"UPDATE conversas SET foto = ? WHERE id = ?;",
		[foto, conversaId]
	);

	return resultado;
};

const listarConversasPorUsuario = async (usuarioId) => {
	const [dados] = await banco.query(
		`SELECT
			c.id,
			c.foto,
			c.criado_em,
			m.id AS ultima_mensagem_id,
			m.mensagem AS ultima_mensagem,
			m.criado_em AS ultima_mensagem_em,
			m.remetente_id AS ultima_mensagem_remetente_id,
			u.nome AS ultima_mensagem_remetente_nome
		FROM conversa_participantes cp
		JOIN conversas c ON c.id = cp.conversa_id
		LEFT JOIN mensagens m ON m.id = (
			SELECT m2.id
			FROM mensagens m2
			WHERE m2.conversa_id = c.id
			ORDER BY m2.criado_em DESC, m2.id DESC
			LIMIT 1
		)
		LEFT JOIN usuarios u ON u.id = m.remetente_id
		WHERE cp.usuario_id = ?
		ORDER BY COALESCE(m.criado_em, c.criado_em) DESC, c.id DESC;`,
		[usuarioId]
	);

	return dados.map((item) => ({
		...item,
		ultima_mensagem: item.ultima_mensagem ? descriptografarMensagem(item.ultima_mensagem) : null,
	}));
};

const criarMensagem = async ({ conversaId, remetenteId, mensagem }) => {
	const participa = await usuarioParticipaDaConversa(conversaId, remetenteId);

	if (!participa) {
		throw new Error("E_USUARIO_FORA_DA_CONVERSA");
	}

	const mensagemCriptografada = criptografarMensagem(mensagem);

	const [resultado] = await banco.query(
		"INSERT INTO mensagens (conversa_id, remetente_id, mensagem) VALUES (?, ?, ?);",
		[conversaId, remetenteId, mensagemCriptografada]
	);

	return {
		id: resultado.insertId,
		conversa_id: Number(conversaId),
		remetente_id: Number(remetenteId),
		mensagem,
	};
};

const listarMensagensPorConversa = async ({ conversaId, usuarioId }) => {
	const participa = await usuarioParticipaDaConversa(conversaId, usuarioId);

	if (!participa) {
		throw new Error("E_USUARIO_FORA_DA_CONVERSA");
	}

	const [dados] = await banco.query(
		`SELECT
			m.id,
			m.conversa_id,
			m.remetente_id,
			u.nome AS remetente_nome,
			m.mensagem,
			m.lida,
			m.criado_em
		FROM mensagens m
		JOIN usuarios u ON u.id = m.remetente_id
		WHERE m.conversa_id = ?
		ORDER BY m.criado_em ASC, m.id ASC;`,
		[conversaId]
	);

	return dados.map((item) => ({
		...item,
		mensagem: descriptografarMensagem(item.mensagem),
	}));
};

const adicionarParticipantes = async ({ conversaId, usuarioIds = [] }) => {
	const idsUnicos = [...new Set((usuarioIds || []).map(Number))].filter((id) => !Number.isNaN(id));

	if (!idsUnicos.length) {
		throw new Error("E_PARTICIPANTES_OBRIGATORIO");
	}

	const valores = idsUnicos.map((usuarioId) => [conversaId, usuarioId]);
	const [resultado] = await banco.query(
		"INSERT IGNORE INTO conversa_participantes (conversa_id, usuario_id) VALUES ?;",
		[valores]
	);

	return {
		conversa_id: Number(conversaId),
		adicionados: resultado.affectedRows || 0,
	};
};

const removerParticipante = async ({ conversaId, usuarioId }) => {
	const [resultado] = await banco.query(
		"DELETE FROM conversa_participantes WHERE conversa_id = ? AND usuario_id = ?;",
		[conversaId, usuarioId]
	);

	return resultado;
};

const marcarMensagensComoLidas = async ({ conversaId, usuarioId }) => {
	const participa = await usuarioParticipaDaConversa(conversaId, usuarioId);

	if (!participa) {
		throw new Error("E_USUARIO_FORA_DA_CONVERSA");
	}

	const [resultado] = await banco.query(
		"UPDATE mensagens SET lida = 1 WHERE conversa_id = ? AND remetente_id <> ? AND lida = 0;",
		[conversaId, usuarioId]
	);

	return {
		conversa_id: Number(conversaId),
		mensagens_marcadas: resultado.affectedRows || 0,
	};
};

const contarMensagensNaoLidas = async (usuarioId) => {
	const [dados] = await banco.query(
		`SELECT COUNT(*) AS total
		FROM mensagens m
		JOIN conversa_participantes cp ON cp.conversa_id = m.conversa_id
		WHERE cp.usuario_id = ?
		AND m.remetente_id <> ?
		AND m.lida = 0;`,
		[usuarioId, usuarioId]
	);

	return dados[0]?.total || 0;
};

module.exports = {
	criarConversa,
	atualizarFotoConversa,
	listarConversasPorUsuario,
	criarMensagem,
	listarMensagensPorConversa,
	adicionarParticipantes,
	removerParticipante,
	marcarMensagensComoLidas,
	contarMensagensNaoLidas,
};