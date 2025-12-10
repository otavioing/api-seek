const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const { banco } = require("./database");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const {
  enviarEmailRecuperacao,
  enviaremailcriacao,
  enviaremailexclusao,
  enviaremaillogin,
} = require("../utils/emailService");

const GetAll = async () => {
  try {
    const data = await banco.query("SELECT * FROM usuarios");
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao buscar usuários");
  }
};

const GetById = async (id) => {
  try {
    const data = await banco.query("SELECT * FROM usuarios WHERE id=?", [id]);
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao buscar usuário");
  }
};

const Getbyidvarificarcaixa = async (id) => {
  try {
    const data = await banco.query(
      "SELECT cadastro_completo FROM usuarios WHERE id=?",
      [id]
    );
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error(
      "Erro ao buscar verificar status da caixa de completar cadastro"
    );
  }
};

const buscarusuariopornome = async (nome) => {
  try {
    const like = `%${nome}%`;
    const data = await banco.query(
      `SELECT u.id, u.nome, u.nome_de_usuario, u.foto FROM usuarios AS u JOIN preferencias_privacidade AS p ON p.id_user = u.id WHERE (u.nome LIKE ? OR u.nome_de_usuario LIKE ?) AND u.tipo = 1 AND p.nome_privacidade = 'exibir_na_busca' AND p.preferencia = 1;
`,
      [like, like]
    );
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao buscar usuário por nome");
  }
};


const verificartipo = async (id) => {
  try {
    const data = await banco.query("SELECT tipo FROM usuarios WHERE id = ?", [id]);
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao verificar tipo de usuário");
  }
};

const Erase = async (id) => {
  try {
    const data = await banco.query("DELETE FROM usuarios WHERE id=?", [id]);
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Falha ao executar a ação!");
  }
};

const getseguindoporusuario = async (id) => {
  try {
    const data = await banco.query("SELECT COUNT(*) FROM seguidores WHERE seguidor_id = ?", [id]);
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao buscar total de seguindo");
  }
};

const getseguidoresporusuario = async (id) => {
  try {
    const data = await banco.query("SELECT COUNT(*) FROM seguidores WHERE seguido_id = ?", [id]);
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao buscar total de seguidores");
  }
};

const getlistaseguindoporusuario = async (id) => {
  try {
    const data = await banco.query("SELECT u.id,u.nome, u.foto FROM seguidores s JOIN usuarios u ON u.id = s.seguido_id WHERE s.seguidor_id = ?", [id]);
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao buscar lista de seguindo");
  }
};

const getlistaseguidoresporusuario = async (id) => {
  try {
    const data = await banco.query("SELECT u.id,u.nome,u.foto FROM seguidores s JOIN usuarios u ON u.id = s.seguidor_id WHERE s.seguido_id = ?", [id]);
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao buscar lista de seguidores");
  }
};

const Seguirusuario = async (seguidorId, seguidoId) => {
  try {
    // Verifica se já existe o follow
    const [rows] = await banco.query(
      "SELECT id FROM seguidores WHERE seguidor_id = ? AND seguido_id = ? LIMIT 1",
      [seguidorId, seguidoId]
    );

    if (rows.length > 0) {
      // Já segue → então deixar de seguir
      await banco.query(
        "DELETE FROM seguidores WHERE seguidor_id = ? AND seguido_id = ?",
        [seguidorId, seguidoId]
      );
      console.log(`Follow removido: ${seguidorId} deixou de seguir ${seguidoId}`);
      return { message: "Deixou de seguir", seguindo: false };
    } else {
      // Não segue → então seguir
      const [result] = await banco.query(
        "INSERT INTO seguidores (seguidor_id, seguido_id) VALUES (?, ?)",
        [seguidorId, seguidoId]
      );
      console.log(`Agora segue: ${seguidorId} começou a seguir ${seguidoId}`);
      return { message: "Agora segue", seguindo: true, insertId: result.insertId };
    }
  } catch (err) {
    console.error("Erro ao alternar follow:", err.message);
    throw new Error("Erro interno");
  }
};

const verificarsesegue = async (seguidorId, seguidoId) => {
  try {
    const [rows] = await banco.query("SELECT id FROM seguidores WHERE seguidor_id = ? AND seguido_id = ? LIMIT 1", [seguidorId, seguidoId]);
    return rows.length > 0;
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao verificar se segue");
  }
};

const verificarpreferencianotificacao = async (id_user) => {
  try{
    const data = await banco.query("SELECT nome_notificacao, preferencia FROM preferencias_notificacoes WHERE id_user = ?", [id_user]);
    return data[0];
  }catch(error){
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao verificar preferencia de notificação");
  }
}
const verificarpreferenciaprivacidade = async (id_user) => {
  try{
    const data = await banco.query("SELECT nome_privacidade, preferencia FROM preferencias_privacidade WHERE id_user = ?", [id_user]);
    return data[0];
  }catch(error){
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao verificar preferencia de privacidade");
  }
}

const verificarnotificacaologin = async (id_user) => {
  try{
    const data = await banco.query("SELECT preferencia FROM preferencias_notificacoes WHERE id_user = ? AND nome_notificacao = 'receber_login'", [id_user]);
    if(data[0][0].preferencia === 1){
      return true;
    }else{
      return false;
    }
  }catch(error){
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Erro ao verificar preferencia de notificação de login");
  }
}

const atualizarPreferencianotificacao = async (id_user, nome_notificacao, preferencia) => {

  if (!id_user || !nome_notificacao || preferencia === undefined) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  try {
    // Atualiza (ou cria caso não exista)
    const [result] = await banco.query(
      `INSERT INTO preferencias_notificacoes (id_user, nome_notificacao, preferencia)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE preferencia = VALUES(preferencia)`,
      [id_user, nome_notificacao, preferencia]
    );

    return { message: "Preferência atualizada com sucesso!" };
  } catch (error) {
    console.error("Erro ao atualizar preferência:", error);
    throw new Error("Erro interno no servidor");
  }
};
const atualizarPreferenciaprivacidade = async (id_user, nome_privacidade, preferencia) => {

  if (!id_user || !nome_privacidade || preferencia === undefined) {
    return res.status(400).json({ message: "Dados incompletos" });
  }

  try {
    // Atualiza (ou cria caso não exista)
    const [result] = await banco.query(
      `INSERT INTO preferencias_privacidade (id_user, nome_privacidade, preferencia)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE preferencia = VALUES(preferencia)`,
      [id_user, nome_privacidade, preferencia]
    );

    return { message: "Preferência atualizada com sucesso!" };
  } catch (error) {
    console.error("Erro ao atualizar preferência:", error);
    throw new Error("Erro interno no servidor");
  }
};


const SolicitarCriacao = async (request, response) => {
  try {
    const { nome, email, senha } = request.body;

    const codigo = Math.floor(100000 + Math.random() * 900000);

    await enviaremailcriacao(email, nome, codigo);

    // Retorna o código (se estiver em dev/teste)
    response.status(200).send({
      message: "Código de verificação enviado para o email",
      codigo, // em produção, talvez você **não envie isso no response**
      dados: { nome, email, senha }, // temporário, ou salva em cache
    });
  } catch (error) {
    console.error("Erro ao enviar código:", error.message);
    response
      .status(500)
      .send({ message: "Erro ao solicitar criação de conta" });
  }
};

const Solicitarexclusao = async (request, response) => {
  try {
    const { nome, email, senha } = request.body;
    const foto = request.file ? `/uploads/${request.file.filename}` : null;

    const codigo = Math.floor(100000 + Math.random() * 900000);

    await enviaremailexclusao(email, nome, codigo);

    // Retorna o código (se estiver em dev/teste)
    response.status(200).send({
      message: "Código de verificação enviado para o email",
      codigo, // em produção, talvez você **não envie isso no response**
      dados: { nome, email, senha, foto }, // temporário, ou salva em cache
    });
  } catch (error) {
    console.error("Erro ao enviar código:", error.message);
    response
      .status(500)
      .send({ message: "Erro ao solicitar exclusão de conta" });
  }
};

const Create = async (nome, email, senhaHash) => {
  try {
    const data = await banco.query(
      "INSERT INTO usuarios (nome, email, senha) VALUES ( ?, ?, ?)",
      [nome, email, senhaHash] // aqui usamos a senha já criptografada
    );

    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    throw new Error("Falha ao executar a ação!");
  }
};

const Update = async (request, response) => {
  try {
    const id = request.params.id;

    // Campos vindos do body
    const {
      nome,
      email,
      senha,
      tema,
      cidade_pais,
      cargo,
      nome_de_usuario,
      descricao,
      banner,
      acessibilidade_ativa,
      cadastro_completo,
      ultimo_login,
      status,
      tipo,
      permissao
    } = request.body;

    // Se o usuário enviou uma nova foto
    const foto = request.file
      ? `/uploads/foto_perfil/${request.file.filename}`
      : undefined;

    // Objeto com todos os possíveis campos atualizáveis
    const campos = {
      nome,
      email,
      senha,
      foto,
      tema,
      cidade_pais,
      cargo,
      nome_de_usuario,
      descricao,
      banner,
      acessibilidade_ativa,
      cadastro_completo,
      ultimo_login,
      status,
      tipo,
      permissao
    };

    // Filtra apenas os campos que foram realmente enviados
    const chaves = Object.keys(campos).filter(
      (key) => campos[key] !== undefined && campos[key] !== null
    );

    // Se não tiver nada pra atualizar
    if (chaves.length === 0) {
      return response.status(400).send({ message: "Nenhum campo enviado para atualização!" });
    }

    // Monta a query dinamicamente (ex: "nome=?, email=?, tema=?")
    const setClause = chaves.map((key) => `${key}=?`).join(", ");
    const values = chaves.map((key) => campos[key]);

    // Adiciona o ID no final
    values.push(id);

    // Executa o UPDATE
    const sql = `UPDATE usuarios SET ${setClause} WHERE id=?`;
    const [result] = await banco.query(sql, values);

    response.status(200).send({
      message: "Usuário atualizado com sucesso!",
      alterados: chaves,
      resultado: result
    });

  } catch (error) {
    console.error("Erro ao atualizar usuário:", error.message);
    response.status(500).send({ message: "Erro ao atualizar usuário!" });
  }
};


const Updatefoto = async (request, response) => {
  try {
    const id = request.params.id;
    const foto = request.file
      ? `http://localhost:4500/uploads/foto_perfil/${request.file.filename}`
      : null;
    const data = await banco.query("UPDATE usuarios SET foto=? WHERE id=?", [
      foto,
      id,
    ]);
    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};
const Updatefotobanner = async (request, response) => {
  try {
    const id = request.params.id;
    const foto = request.file
      ? `http://localhost:4500/uploads/banners/${request.file.filename}`
      : null;
    const data = await banco.query("UPDATE usuarios SET banner=? WHERE id=?", [
      foto,
      id,
    ]);
    response.status(200).send(data[0]);
    console.log("Banner atualizado com sucesso!");
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const updatecompletarcadastropadrao = async (request, response) => {
  try {
    const { usuario_id, nome_de_usuario, profissao, descricao } = request.body;

    const data = await banco.query(
      "INSERT INTO perfis_padrao (nome_de_usuario, profissao, descricao, usuario_id) VALUES (?, ?, ?, ?)",
      [nome_de_usuario, profissao, descricao, usuario_id]
    );

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const updatecompletarcadastroempresa = async (request, response) => {
  try {
    const {
      usuario_id,
      razao_social,
      nome_fantasia,
      cnpj,
      telefone_comercial,
      categoria_negocio,
      numero_funcionarios,
      endereco_completo,
      descricao,
    } = request.body;

    const data = await banco.query(
      "INSERT INTO perfis_empresa (usuario_id, razao_social, nome_fantasia, cnpj, telefone_comercial, categoria_negocio, numero_funcionarios, endereco_completo, descricao) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        usuario_id,
        razao_social,
        nome_fantasia,
        cnpj,
        telefone_comercial,
        categoria_negocio,
        numero_funcionarios,
        endereco_completo,
        descricao,
      ]
    );

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const completarcadastro = async (request, response) => {
  try {
    const id = request.params.id;

    const data = await banco.query(
      "UPDATE usuarios SET cadastro_completo=1 WHERE id=?",
      [id]
    );

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const EnviarfotoPerfil = async (request, response) => {
  try {
    const id = request.params.id;
    const foto = request.file
      ? `http://localhost:4500/uploads/foto_perfil/${request.file.filename}`
      : null;

    const data = await banco.query("UPDATE usuarios SET foto=? WHERE id=?", [
      foto,
      id,
    ]);

    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};


const Login = async (request, response) => {
  const { email, senha } = request.body;

  try {
    const [rows] = await banco.query("SELECT id, email, senha, nome, status, tema FROM usuarios WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return response.status(401).send({ message: "Email ou senha inválidos" });
    }

    const usuario = rows[0];

    // Compara senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return response.status(401).send({ message: "Email ou senha inválidos" });
    }


    await banco.query("UPDATE usuarios SET ultimo_login = NOW() WHERE id = ?", [
      usuario.id,
    ]);
    usuario.ultimo_login = new Date(); // adiciona no objeto

    await aplicarPreferenciasnotificacoesSeNaoExistirem(usuario.id);
    await aplicarPreferenciasprivacidadeSeNaoExistirem(usuario.id);


    await verificarnotificacaologin(usuario.id);

    if(await verificarnotificacaologin(usuario.id)){
      await enviaremaillogin(usuario.email, usuario.nome);
      console.log("Email de login enviado.");
    }else{
      console.log("Usuário optou por não receber email de login.");
    }

    // Remove senha da resposta
    delete usuario.senha;

    // Gera o token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, // payload
      process.env.JWT_SECRET,                  // chave secreta
      { expiresIn: process.env.JWT_EXPIRES } // tempo de expiração
    );

    // Retorna o usuário e o token
    response.status(200).send({ usuario, token });

  } catch (error) {
    console.error("Erro ao verificar login:", error.message);
    response.status(500).send({ message: "Erro interno no servidor" });
  }
};

async function aplicarPreferenciasnotificacoesSeNaoExistirem(userId) {
    const preferenciasPadrao = [
        'receber_login',
        'receber_seguidores',
        'receber_comentarios',
        'receber_likes',
    ];

    for (const pref of preferenciasPadrao) {
        await banco.execute(   // CORRIGIDO AQUI
            `INSERT IGNORE INTO preferencias_notificacoes 
             (id_user, nome_notificacao, preferencia)
             VALUES (?, ?, 1)`,
            [userId, pref]
        );
    }
}
async function aplicarPreferenciasprivacidadeSeNaoExistirem(userId) {
    const preferenciasPadrao = [
        'exibir_na_busca',
        'exibir_no_feed',
        'exibir_cursos_no_feed',
        'exibir_likes',
    ];

    for (const pref of preferenciasPadrao) {
        await banco.execute(   // CORRIGIDO AQUI
            `INSERT IGNORE INTO preferencias_privacidade 
             (id_user, nome_privacidade, preferencia)
             VALUES (?, ?, 1)`,
            [userId, pref]
        );
    }
}





const CriarCodigoVerificacao = async (req, res) => {
  const { email } = req.body;

  try {
    const [result] = await banco.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).send({ message: "Email não encontrado" });
    }

    // Gera um código aleatório de 6 dígitos
    const codigo = Math.floor(100000 + Math.random() * 900000);

    // Define expiração para 10 minutos a partir de agora
    const expiraEm = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    // Salva o código e o tempo de expiração no banco
    await banco.query(
      "UPDATE usuarios SET codigo_recuperacao = ?, expira_em = ? WHERE email = ?",
      [codigo, expiraEm, email]
    );

    // Envia o email com o código
    await enviarEmailRecuperacao(email, result[0].nome, codigo);

    res.status(200).send({ message: "Código de recuperação enviado para o email." });

  } catch (err) {
    console.error("Erro ao recuperar senha:", err.message);
    res.status(500).send({ message: "Erro interno" });
  }
};


const AtualizarSenha = async (req, res) => {
  const { email, codigo, novaSenha } = req.body;

  try {
    const [result] = await banco.query(
      "SELECT codigo_recuperacao, expira_em FROM usuarios WHERE email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(404).send({ message: "Email não encontrado" });
    }

    const usuario = result[0];
    const agora = new Date();

    if (!usuario.codigo_recuperacao || !usuario.expira_em) {
      return res.status(400).send({ message: "Nenhum código foi solicitado." });
    }

    if (agora > new Date(usuario.expira_em)) {
      return res.status(400).send({ message: "O código expirou. Solicite um novo." });
    }

    if (usuario.codigo_recuperacao !== codigo) {
      return res.status(400).send({ message: "Código incorreto." });
    }

    // Criptografa a nova senha antes de salvar
    const hash = await bcrypt.hash(novaSenha, 10);

    // Atualiza a senha e limpa o código de recuperação
    await banco.query(
      "UPDATE usuarios SET senha = ?, codigo_recuperacao = NULL, expira_em = NULL WHERE email = ?",
      [hash, email]
    );

    res.status(200).send({ message: "Senha atualizada com sucesso!" });

  } catch (err) {
    console.error("Erro ao atualizar senha:", err.message);
    res.status(500).send({ message: "Erro interno" });
  }
};


const Atualizartema = async (req, res) => {
  const { id, tema } = req.body;

  try {
    await banco.query("UPDATE usuarios SET tema = ? WHERE id = ?", [tema, id]);

    res.status(200).send({ message: "Tema atualizado com sucesso!" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Erro ao atualizar tema.", error: err.message });
  }
};

const Atualizaracessibilidade = async (req, res) => {
  const { id, acessibilidade_ativa } = req.body;

  try {
    await banco.query(
      "UPDATE usuarios SET acessibilidade_ativa = ? WHERE id = ?",
      [acessibilidade_ativa, id]
    );

    res.status(200).send({ message: "acessibilidade atualizada com sucesso!" });
  } catch (err) {
    res.status(500).send({
      message: "Erro ao atualizar acessibilidade.",
      error: err.message,
    });
  }

  console.log("acessibilidade atualizado com sucesso!");
};

const definirtipo = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;
  try {
    await banco.query("UPDATE usuarios SET tipo = ? WHERE id = ?", [tipo, id]);
    res.status(200).send({ message: "tipo definido com sucesso!" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Erro ao definir tipo.", error: err.message });
  }
};

const GetAllbyidPadrao = async (request, response) => {
  try {
    const id = request.params.id;
    const data = await banco.query(
      "SELECT u.foto, u.banner, u.nome, u.nome_de_usuario, pp.descricao,(SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS total_posts,(SELECT COUNT(*) FROM seguidores WHERE seguido_id = u.id) AS total_seguidores,(SELECT COUNT(*) FROM seguidores WHERE seguidor_id = u.id) AS total_seguindo FROM usuarios AS u INNER JOIN perfis_padrao AS pp ON u.id = pp.usuario_id WHERE u.id = ?;",
      [id]
    );
    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const GetAllbyidEmpresas = async (request, response) => {
  try {
    const id = request.params.id;
    const data = await banco.query(
      "SELECT u.foto, u.banner, u.nome, u.nome_de_usuario, pe.descricao,(SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS total_posts,(SELECT COUNT(*) FROM seguidores WHERE seguido_id = u.id) AS total_seguidores,(SELECT COUNT(*) FROM seguidores WHERE seguidor_id = u.id) AS total_seguindo FROM usuarios AS u INNER JOIN perfis_empresa AS pe ON u.id = pe.usuario_id WHERE u.id = ?;",
      [id]
    );
    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};




module.exports = {
  GetAll,
  GetById,
  Erase,
  Create,
  Update,
  Login,
  CriarCodigoVerificacao,
  AtualizarSenha,
  SolicitarCriacao,
  Solicitarexclusao,
  Atualizartema,
  Atualizaracessibilidade,
  updatecompletarcadastropadrao,
  Getbyidvarificarcaixa,
  buscarusuariopornome,
  definirtipo,
  verificartipo,
  completarcadastro,
  updatecompletarcadastroempresa,
  EnviarfotoPerfil,
  GetAllbyidPadrao,
  GetAllbyidEmpresas,
  Updatefoto,
  Updatefotobanner,
  getseguindoporusuario,
  getseguidoresporusuario,
  Seguirusuario,
  verificarsesegue,
  getlistaseguindoporusuario,
  getlistaseguidoresporusuario,
  verificarpreferencianotificacao,
  verificarpreferenciaprivacidade,
  atualizarPreferencianotificacao,
  atualizarPreferenciaprivacidade,
};
