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
      ? `/uploads/foto_perfil/${request.file.filename}`
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
      ? `/uploads/banners/${request.file.filename}`
      : null;
    const data = await banco.query("UPDATE usuarios SET banner=? WHERE id=?", [
      foto,
      id,
    ]);
    response.status(200).send(data[0]);
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
      ? `/uploads/foto_perfil/${request.file.filename}`
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

    // Remove senha da resposta
    delete usuario.senha;

    // Gera o token
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, // payload
      process.env.JWT_SECRET,                  // chave secreta
      { expiresIn: process.env.JWT_EXPIRES || "1d" } // tempo de expiração
    );

    // Retorna o usuário e o token
    response.status(200).send({ usuario, token });

  } catch (error) {
    console.error("Erro ao verificar login:", error.message);
    response.status(500).send({ message: "Erro interno no servidor" });
  }
};


// const Login = async (request, response) => {
//   const { email, senha } = request.body;

//   try {
//     const [rows] = await banco.query("SELECT * FROM usuarios WHERE email = ?", [
//       email,
//     ]);

//     if (rows.length === 0) {
//       return response.status(401).send({ message: "Email ou senha inválidos" });
//     }

//     const usuario = rows[0];

//     // Aqui compara a senha digitada com a criptografada
//     const senhaValida = await bcrypt.compare(senha, usuario.senha);

//     if (!senhaValida) {
//       return response.status(401).send({ message: "Email ou senha inválidos" });
//     }

//     // Login OK, pode retornar os dados (sem a senha de preferência)
//     delete usuario.senha; // remove a senha da resposta
//     response.status(200).send({ usuario });
//   } catch (error) {
//     console.error("Erro ao verificar login:", error.message);
//     response.status(500).send({ message: "Erro interno no servidor" });
//   }
// };

const RecuperarSenha = async (req, res) => {
  const { email } = req.body;
  try {
    const [result] = await banco.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    if (result.length === 0) {
      return res.status(404).send({ message: "Email não encontrado" });
    }
    const codigo = Math.floor(100000 + Math.random() * 900000); // Ex: 654321
    // Aqui você pode salvar esse código temporariamente no banco ou só validar depois (simples)
    await enviarEmailRecuperacao(email, result[0].nome, codigo);
    // Envia o código também no response (só enquanto você não tiver banco ou cache pra ele)
    res.status(200).send({ message: "Código enviado para o email", codigo });
  } catch (err) {
    console.error("Erro ao recuperar senha:", err.message);
    res.status(500).send({ message: "Erro interno" });
  }
};

const AtualizarSenha = async (req, res) => {
  const { email, novaSenha } = req.body;

  try {
    const hashed = await bcrypt.hash(novaSenha, 10);
    await banco.query("UPDATE usuarios SET senha = ? WHERE email = ?", [
      hashed,
      email,
    ]);

    res.status(200).send({ message: "Senha atualizada com sucesso!" });
  } catch (err) {
    res.status(500).send({ message: "Erro ao atualizar senha." });
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
      "SELECT u.foto, u.banner, u.nome, u.nome_de_usuario, pp.descricao, (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS total_posts FROM usuarios AS u INNER JOIN perfis_padrao AS pp ON u.id = pp.usuario_id WHERE u.id = ?;",
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
      "SELECT u.foto, u.banner, u.nome, u.nome_de_usuario, pe.descricao, (SELECT COUNT(*) FROM posts WHERE user_id = u.id) AS total_posts FROM usuarios AS u INNER JOIN perfis_empresa AS pe ON u.id = pe.usuario_id WHERE u.id = ?;",
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
  RecuperarSenha,
  AtualizarSenha,
  SolicitarCriacao,
  Solicitarexclusao,
  Atualizartema,
  Atualizaracessibilidade,
  updatecompletarcadastropadrao,
  Getbyidvarificarcaixa,
  definirtipo,
  verificartipo,
  completarcadastro,
  updatecompletarcadastroempresa,
  EnviarfotoPerfil,
  GetAllbyidPadrao,
  GetAllbyidEmpresas,
  Updatefoto,
  Updatefotobanner,
};
