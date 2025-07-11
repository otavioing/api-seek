const express = require("express");

const { banco } = require("./database");

const GetAll = async () => {
  try {
    const querySelect = "SELECT * FROM perfis_empresa";
    const data = await banco.query(querySelect);
    return data[0];
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const GetById = async (id) => {
  try {
    const data = await banco.query(
      "SELECT * FROM perfis_empresa WHERE usuario_id=?",
      [id]
    );
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const Erase = async (id) => {
  try {
    const data = await banco.query(
      "DELETE FROM perfis_empresa WHERE usuario_id=?",
      [id]
    );
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

// Assumindo que 'banco' é sua conexão ou pool de banco de dados
const Update = async (
  usuario_id,
  razao_social,
  nome_fantasia,
  cnpj,
  telefone_comercial,
  categoria_negocio,
  numero_funcionarios,
  endereco_completo,
  descricao
) => {
  try {
    const data = await banco.query(
      "UPDATE perfis_empresa SET razao_social = ?, nome_fantasia = ?, cnpj = ?, telefone_comercial = ?, categoria_negocio = ?, numero_funcionarios = ?, endereco_completo = ?, descricao = ? WHERE usuario_id = ?",
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
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const Create = async (
  usuario_id,
  razao_social,
  nome_fantasia,
  cnpj,
  telefone_comercial,
  categoria_negocio,
  numero_funcionarios,
  endereco_completo,
  descricao
) => {
  try {
    const data = await banco.query(
      "INSERT INTO perfis_empresa (usuario_id, razao_social, nome_fantasia, cnpj, telefone_comercial, categoria_negocio, numero_funcionarios, endereco_completo, descricao) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)",
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
    return data[0];
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

module.exports = { GetAll, GetById, Erase, Create, Update };
