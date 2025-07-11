const express = require("express");

const { banco } = require("./database");

const GetAll = async () => {
  try {
    const data = await banco.query("SELECT * FROM perfis_padrao");
    return data[0];
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  }
};

const GetById = async (usuario_id) => {
  try {
    const data = await banco.query(
      "SELECT * FROM perfis_padrao WHERE usuario_id=?",
      [usuario_id]
    );
    return data[0];
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  }
};

const Erase = async (usuario_id) => {
  try {
    const data = await banco.query(
      "DELETE FROM perfis_padrao WHERE usuario_id=?",
      [usuario_id]
    );
    return data[0];
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  }
};

const Create = async (
  usuario_id,
  profissao,
  nome_de_usuario,
  descricao,
  certificados
) => {
  try {
    const data = await banco.query(
      "INSERT INTO perfis_padrao (usuario_id, profissao, nome_de_usuario, descricao, certificados) VALUES (?, ?, ?, ?, ?)",
      [usuario_id, profissao, nome_de_usuario, descricao, certificados]
    );
    return data[0];
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  }
};

const Update = async (
  profissao,
  nome_de_usuario,
  descricao,
  certificados,
  usuario_id
) => {
  try {
    const data = await banco.query(
      "UPDATE perfis_padrao SET profissao = ?, nome_de_usuario = ?, descricao = ?, certificados = ? WHERE usuario_id = ?",
      [profissao, nome_de_usuario, descricao, certificados, usuario_id]
    );
    return data[0];
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error.message);
    throw error;
  }
};


module.exports = { GetAll, GetById, Erase, Create, Update };
