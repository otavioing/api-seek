const { banco } = require("./database");

const BuscarUsuarios = async (termo) => {
  try {
    const like = `%${termo}%`;
    const [rows] = await banco.query(
      `SELECT 
    u.id, 
    u.nome, 
    u.foto
FROM usuarios AS u
JOIN preferencias_privacidade AS p 
    ON p.id_user = u.id
WHERE (u.nome LIKE ? OR u.nome_de_usuario LIKE ?)
  AND p.nome_privacidade = 'exibir_na_busca'
  AND p.preferencia = 1
ORDER BY u.nome ASC;`,
      [like, like]
    );

    return rows;
  } catch (error) {
    console.error("Erro ao buscar usuários:", error.message);
    throw new Error("Erro ao buscar usuários");
  }
};

const CriarHistoricoPesquisa = async (usuarioId, termoPesquisa) => {
  const connection = await banco.getConnection();

  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      "INSERT INTO historico_pesquisas (usuario_id, termo_pesquisa) VALUES (?, ?)",
      [usuarioId, termoPesquisa]
    );

    await connection.query(
      `DELETE FROM historico_pesquisas
       WHERE usuario_id = ?
         AND id NOT IN (
           SELECT id FROM (
             SELECT id
             FROM historico_pesquisas
             WHERE usuario_id = ?
             ORDER BY criado_em DESC, id DESC
             LIMIT 4
           ) AS ultimas_pesquisas
         )`,
      [usuarioId, usuarioId]
    );

    await connection.commit();

    return {
      message: "Pesquisa salva com sucesso!",
      insertId: result.insertId
    };
  } catch (error) {
    await connection.rollback();
    console.error("Erro ao salvar histórico de pesquisa:", error.message);
    throw new Error("Erro ao salvar histórico de pesquisa");
  } finally {
    connection.release();
  }
};

const ListarHistoricoPesquisas = async (usuarioId) => {
  try {
    const [rows] = await banco.query(
      `SELECT id, usuario_id, termo_pesquisa, criado_em
       FROM historico_pesquisas
       WHERE usuario_id = ?
       ORDER BY criado_em DESC, id DESC`,
      [usuarioId]
    );

    return rows;
  } catch (error) {
    console.error("Erro ao listar histórico de pesquisas:", error.message);
    throw new Error("Erro ao listar histórico de pesquisas");
  }
};

const ExcluirHistoricoPesquisa = async (usuarioId, id) => {
  try {
    const [result] = await banco.query(
      "DELETE FROM historico_pesquisas WHERE id = ? AND usuario_id = ?",
      [id, usuarioId]
    );

    return result;
  } catch (error) {
    console.error("Erro ao excluir histórico de pesquisa:", error.message);
    throw new Error("Erro ao excluir histórico de pesquisa");
  }
};

module.exports = {
  BuscarUsuarios,
  CriarHistoricoPesquisa,
  ListarHistoricoPesquisas,
  ExcluirHistoricoPesquisa
};