const model = require("../model/usuariosService");
const bcrypt = require("bcrypt");


const UsuariosController = {
  GetAll: async (request, response) => {
    try {
      const data = await model.GetAll();
      response.status(200).json(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

  GetById: async (request, response) => {
    try {
      const id = request.params.id;
      const data = await model.GetById(id);
      response.status(200).send(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

  Getbyidvarificarcaixa: async (request, response) => {
    try {
      const id = request.params.id;
      const data = await model.Getbyidvarificarcaixa(id);
      response.status(200).send(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

  verificartipo: async (request, response) => {
    try {
      const id = request.params.id;
      const data = await model.verificartipo(id);
      response.status(200).send(data);
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(401).send({ message: "Falha ao executar a ação!" });
    }
  },

  Erase: async (request, response) => {
    try {
      const id = request.params.id;
      await model.Erase(id);
      response.status(200).send({ message: "Usuário excluído com sucesso!" });
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(500).send({ message: "Falha ao excluir usuário!" });
    }
  },

  Create: async (request, response) => {
    try {
      const { nome, email, senha } = request.body;
      // gera o hash da senha
      const saltRounds = 10;
      const senhaHash = await bcrypt.hash(senha, saltRounds);
      await model.Create(nome, email, senhaHash);
      response.status(201).send({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      console.error("Erro ao conectar ao banco de dados:", error.message);
      response.status(500).send({ message: "Falha ao criar usuário!" });
    }
  },


};

module.exports = UsuariosController;
