const express = require("express");

const OpenAI = require("openai");

// Configura cliente OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const pergunta = async (req, res) => {
     try {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: "Pergunta não enviada" });
    }

    const resposta = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você será o assistente de um site chamado seek que ajuda os usuários a encontrar informações. vou dar algumas informações sobre o site. o site permite que o usuario poste seus desenhos na plataforma e serve como um portifolio para empresas contratarem artistas. outra função é que o usuario pode fazer cursos criados por outros usuarios e tembem pode criar seus propios cursos. caso não saiba responder a pergunta, diga que não sabe e fale para o usuario que ele pode entrar em contato com o suporte por email seek.arts.ink@gmail.com" },
        { role: "user", content: pergunta }
      ]
    });

    res.json({ resposta: resposta.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao conversar com a IA" });
  }
}

module.exports ={ pergunta }