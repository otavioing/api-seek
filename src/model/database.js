const mysql = require('mysql2/promise');
const dotenv = require("dotenv");
dotenv.config();

const db_name = process.env.DB_NAME;
const db_user = process.env.DB_USER;
const db_password = process.env.DB_PASS;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

console.log("DB_NAME: ", db_name);

const banco = mysql.createPool({
    host: db_host,
    user: db_user,
    password: db_password,
    database: db_name,
    port: db_port,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
});

const checkConnection = async () => {
    try{
        const connection = await mysql.createConnection({
            host: db_host,
            user: db_user,
            password: db_password,
            database: db_name,
            port: db_port,
        });
        await connection.ping(); //testa se o banco está respondendo
        await connection.end(); //fecha a conexão
        return true;
    } catch (error){
        console.log("Erro ao conectar ao banco de dados: ", error.message);
        return false;
    }
};

const fs = require('fs');
const path = require('path');

/**
 * Inicializa o banco de dados: cria o database (se necessário)
 * e executa o arquivo seekdb.sql para criar tabelas.
 */
const initDatabase = async () => {
    try{
        // Conecta ao servidor sem selecionar database para garantir que o DB exista
        const tmpConn = await mysql.createConnection({
            host: db_host,
            user: db_user,
            password: db_password,
            port: db_port,
            multipleStatements: true,
        });

        if (db_name) {
            await tmpConn.query(`CREATE DATABASE IF NOT EXISTS \`${db_name}\`;`);
            await tmpConn.query(`USE \`${db_name}\`;`);
        }

        // Lê o arquivo seekdb.sql e executa seu conteúdo
        const sqlFile = path.resolve(__dirname, '../../seekdb.sql');
        if (fs.existsSync(sqlFile)) {
            const sql = fs.readFileSync(sqlFile, 'utf8');
            if (sql && sql.trim().length > 0) {
                await tmpConn.query(sql);
            }
        } else {
            console.log('seekdb.sql não encontrado em:', sqlFile);
        }

        await tmpConn.end();
        console.log('Inicialização do banco concluída.');
        return true;
    } catch (error) {
        console.log('Erro ao inicializar o banco de dados:', error.message);
        return false;
    }
};

module.exports = {checkConnection, banco, initDatabase};