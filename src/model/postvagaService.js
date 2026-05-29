const { banco } = require("./database");
const axios = require("axios");
const cheerio = require("cheerio");


const limparTexto = (texto) => {
  return texto
    ?.replace(/\n/g, " ") // remove quebras de linha
    .replace(/\s+/g, " ") // remove espaços duplicados
    .replace(/Show more/gi, "") // remove textos do linkedin
    .replace(/Show less/gi, "")
    .replace(
      /Be among the first \d+ applicants/gi,
      ""
    )
    .trim() || null;
};

const extrairIdVagaLinkedin = (url) => {
  let jobId = null;

  const matchView = url?.match(/view\/(\d+)/);

  if (matchView) {
    jobId = matchView[1];
  }

  if (!jobId && url) {
    const urlObj = new URL(url);
    jobId = urlObj.searchParams.get("currentJobId");
  }

  return jobId;
};

const CriarPostvaga = async (idUsuario, idCategoria, url, descricao) => {
  try {
    if (!idUsuario) {
      throw new Error("Usuário não informado");
    }

    if (!idCategoria) {
      throw new Error("Categoria não informada");
    }

    if (!url) {
      throw new Error("Link da vaga não informado");
    }

    const vagaLinkedin = await BuscarVagaLinkedin(url);
    const descricaoFinal = descricao?.trim() || vagaLinkedin.descricao;
    const idVagaExterna = String(vagaLinkedin.id_vaga_externa || "").trim();

    if (!idVagaExterna) {
      throw new Error("Não foi possível identificar o ID da vaga");
    }

    const [posts] = await banco.query(
      `INSERT INTO vagas
        (id_usuario, id_categoria, id_vaga_externa, titulo, empresa, localizacao, descricao, link_original, link_guest)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        idUsuario,
        idCategoria,
        idVagaExterna,
        vagaLinkedin.titulo || "Título não encontrado",
        vagaLinkedin.empresa || "Empresa não encontrada",
        vagaLinkedin.localizacao,
        descricaoFinal,
        vagaLinkedin.link_original,
        vagaLinkedin.link_guest,
      ]
    );

    console.log("Vaga criada com sucesso");
    return {
      id: posts.insertId,
      message: "Vaga criada com sucesso",
      vaga: {
        id_usuario: idUsuario,
        id_categoria: idCategoria,
        id_vaga_externa: idVagaExterna,
        titulo: vagaLinkedin.titulo || "Título não encontrado",
        empresa: vagaLinkedin.empresa || "Empresa não encontrada",
        localizacao: vagaLinkedin.localizacao,
        descricao: descricaoFinal,
        link_original: vagaLinkedin.link_original,
        link_guest: vagaLinkedin.link_guest,
      },
    };
  } catch (err) {
    console.error("Erro ao criar vaga:", err.message);
    throw new Error("Erro interno");
  }
};

const ListarPostsvaga = async () => {
  try {
    const [posts] = await banco.query(`
            SELECT vagas.*, usuarios.nome, usuarios.foto AS foto_perfil, categorias_cursos.nome_categoria
            FROM vagas
            JOIN usuarios ON vagas.id_usuario = usuarios.id
            LEFT JOIN categorias_cursos ON vagas.id_categoria = categorias_cursos.id_categoria
            ORDER BY vagas.criado_em DESC
        `);
    return posts;
  } catch (err) {
    console.error("Erro ao buscar vagas:", err.message);
    throw new Error("Erro interno");
  }
};

const ListarPostsvagaPorUsuario = async (userId) => {
  try {
    const [posts] = await banco.query(
      `
            SELECT vagas.*, usuarios.nome, usuarios.foto AS foto_perfil, categorias_cursos.nome_categoria
            FROM vagas
            JOIN usuarios ON vagas.id_usuario = usuarios.id
            LEFT JOIN categorias_cursos ON vagas.id_categoria = categorias_cursos.id_categoria
            WHERE vagas.id_usuario = ?
            ORDER BY vagas.criado_em DESC
        `,
      [userId]
    );
    return posts;
  } catch (err) {
    console.error("Erro ao buscar vagas:", err.message);
    throw new Error("Erro interno");
  }
};



const BuscarVagaLinkedin = async (url) => {
  try {
    let jobId = null;

    try {
      jobId = extrairIdVagaLinkedin(url);
    } catch {
      throw new Error("URL do LinkedIn inválida");
    }

    if (!jobId) {
      throw new Error(
        "Não foi possível encontrar o ID da vaga"
      );
    }

    const guestUrl = `https://www.linkedin.com/jobs-guest/jobs/view/${jobId}`;

    console.log(
      "Buscando vaga no LinkedIn:",
      guestUrl
    );

    const { data } = await axios.get(
      guestUrl,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept:
            "text/html,application/xhtml+xml",
        },
      }
    );

    const $ = cheerio.load(data);

    const vaga = {
      id_vaga_externa: jobId,

      titulo: limparTexto(
        $(".top-card-layout__title").text()
      ),

      empresa: limparTexto(
        $(".topcard__org-name-link").text() ||
        $(".topcard__flavor").first().text()
      ),

      localizacao: limparTexto(
        $(".topcard__flavor--bullet").text()
      ),

      descricao: limparTexto(
        $(".description__text").text()
      ),

      link_original: url,

      link_guest: guestUrl,
    };

    return vaga;

  } catch (err) {
    console.error(
      "Erro ao buscar vaga do LinkedIn:",
      err.message
    );

    throw new Error(err.message || "Erro interno");
  }
};

module.exports = { CriarPostvaga, ListarPostsvaga, ListarPostsvagaPorUsuario, BuscarVagaLinkedin };
