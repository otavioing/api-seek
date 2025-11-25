const express = require('express');
const { checkConnection } = require("./src/model/database");
const cors = require('cors');
const path = require('path');
const app = express();
const rotasUsuarios = require("./src/routers/usuariosRouters");
const rotasPosts = require("./src/routers/postsRouters");
const rotasTendencias = require("./src/routers/tendenciasRouters");
const rotasPostsvagas = require("./src/routers/postvagaRouters");
const rotasPostscursos = require("./src/routers/postcursoRouters");
const rotasperfilspadrao = require("./src/routers/perfils_padraoRouters");
const rotasperfilsempresa = require("./src/routers/perfils_empresaRouters");
const rotasEstatisticas = require("./src/routers/estatisticasRouters");
const rotasapiopenia = require("./src/routers/apiOpeniaRouters");
const dotenv = require("dotenv");
dotenv.config();
const Port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (request, response) => {
    response.send({ "message:": "Servidor rodando!" });
});

app.use("/usuarios", rotasUsuarios);
app.use("/posts", rotasPosts);
app.use("/tendencias", rotasTendencias);
app.use("/postsvagas", rotasPostsvagas);
app.use("/postscursos", rotasPostscursos);
app.use("/padrao", rotasperfilspadrao);
app.use("/empresa", rotasperfilsempresa);
app.use("/estatisticas", rotasEstatisticas);
app.use("/openai", rotasapiopenia);

app.listen(Port, () => {
    console.log(`Servidor rodando na porta: ${Port}`);
});
