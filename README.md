API do Site: Cadastro, Login e Posts de Usuários
Este repositório contém a API backend para o seu site, responsável por gerenciar o cadastro de usuários, o processo de login e a criação/visualização de posts.

Requisitos
Para rodar esta API, você precisará ter o seguinte software instalado em sua máquina:

Node.js: Certifique-se de ter o Node.js instalado. Você pode baixá-lo em nodejs.org.

XAMPP: Utilize o XAMPP para configurar o servidor Apache e o MySQL para o banco de dados. Baixe-o em apachefriends.org.

Como Ligar a API
Siga os passos abaixo para colocar a API em funcionamento:

1. Importar o Banco de Dados
Inicie o XAMPP e certifique-se de que o Apache e o MySQL estejam rodando.

Acesse o phpMyAdmin através do seu navegador (geralmente em http://localhost/phpmyadmin/).

Crie um novo banco de dados (o nome será configurado no código, mas um nome como seusite_db é um bom ponto de partida).

Importe o arquivo SQL do banco de dados (geralmente localizado na pasta do projeto da API) para o banco de dados que você acabou de criar.

2. Instalar as Dependências
Abra o terminal Bash (ou Prompt de Comando/PowerShell) na raiz do diretório do projeto da API.

Execute o seguinte comando para instalar todas as dependências do Node.js:

npm i

3. Iniciar o Projeto
Com as dependências instaladas, você pode iniciar a API executando o seguinte comando no terminal:

npm run start

Após executar este comando, a API estará rodando e pronta para ser utilizada pelo seu frontend!

Sinta-se à vontade para explorar os endpoints e integrar esta API com o seu projeto. Se tiver alguma dúvida, não hesite em abrir uma issue.
