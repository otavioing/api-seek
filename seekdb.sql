-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 01/11/2025 às 22:30
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `seekdb`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfis_empresa`
--

CREATE TABLE `perfis_empresa` (
  `usuario_id` int(11) NOT NULL,
  `razao_social` varchar(255) NOT NULL,
  `nome_fantasia` varchar(255) DEFAULT NULL,
  `cnpj` varchar(18) NOT NULL,
  `telefone_comercial` varchar(20) DEFAULT NULL,
  `categoria_negocio` varchar(30) DEFAULT NULL,
  `numero_funcionarios` int(11) DEFAULT NULL,
  `endereco_completo` varchar(255) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `perfis_padrao`
--

CREATE TABLE `perfis_padrao` (
  `usuario_id` int(11) NOT NULL,
  `profissao` varchar(50) DEFAULT NULL,
  `nome_de_usuario` varchar(10) DEFAULT NULL,
  `descricao` varchar(200) DEFAULT NULL,
  `certificados` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `perfis_padrao`
--

INSERT INTO `perfis_padrao` (`usuario_id`, `profissao`, `nome_de_usuario`, `descricao`, `certificados`) VALUES
(3, 'developer ', 'lfywho', 'im a developer guy', 'teste'),
(9, 'desempregado', 'cakezin', '', 'teste'),
(11, 'analista de computaria', 'felipe', 'eu faço ciencia da computaria', 'teste'),
(12, 'Ti', 'Luiz', '', 'teste'),
(13, 'Ti', 'Bianca', '', 'teste'),
(14, 'Estudante', 'Anderson', '', 'teste'),
(16, 'Estudante', 'Camilly', 'linda ', 'teste'),
(17, 'Designer', 'Miguel', '', 'teste'),
(19, 'PJ', 'Lucas', 'Sou jogador de vôlei (ponteiro)', 'teste'),
(20, 'Estudante', 'LuizSaurin', 'Palmeirense', 'teste'),
(21, 'Professor', 'Ricardo', 'Teste de descrição', 'teste'),
(22, 'sofredora', 'Thais', 'Resolvi dar aula e vim parar aqui', 'teste'),
(28, 'Dev', 'CautelaDev', 'Dev', 'teste');

-- --------------------------------------------------------

--
-- Estrutura para tabela `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `imagem` varchar(255) NOT NULL,
  `legenda` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `titulo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `imagem`, `legenda`, `criado_em`, `titulo`) VALUES
(19, 28, 'http://localhost:4500/uploads/posts/1761830948440-82_Sem_Titulo_20201120124526.png', 'Stella', '2025-10-30 13:29:08', 'Oloko'),
(20, 28, 'http://localhost:4500/uploads/posts/1761832971318-376_Sem_Titulo_20230124235253.png', 'aaaaaaaa', '2025-10-30 14:02:51', 'Projeto teste');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT '/uploads/fotopadraousuario.svg',
  `tema` varchar(50) DEFAULT 'claro',
  `cidade_pais` varchar(255) DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  `nome_de_usuario` varchar(255) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT 'este usuário não possui descrição',
  `banner` varchar(255) DEFAULT NULL,
  `acessibilidade_ativa` tinyint(1) DEFAULT 1,
  `data_de_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `cadastro_completo` tinyint(1) DEFAULT 0,
  `ultimo_login` datetime DEFAULT NULL,
  `status` enum('Ativo','Banido','','') NOT NULL DEFAULT 'Ativo',
  `tipo` enum('padrao','empresa') DEFAULT NULL,
  `permissao` enum('Padrão','Admin','','') NOT NULL DEFAULT 'Padrão',
  `codigo_recuperacao` varchar(10) DEFAULT NULL,
  `expira_em` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `foto`, `tema`, `cidade_pais`, `cargo`, `nome_de_usuario`, `descricao`, `banner`, `acessibilidade_ativa`, `data_de_criacao`, `cadastro_completo`, `ultimo_login`, `status`, `tipo`, `permissao`, `codigo_recuperacao`, `expira_em`) VALUES
(3, 'who.jxao', 'joaojfpessoal@gmail.com', '$2b$10$fJwhob.w51UdYqGq8GV76uC7r6wE6dJw.cufVIJxvWwxdwXa7M9vK', '/uploads/foto_perfil/1750941401708-(,,_ï¹_,,).jpeg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', '/uploads/banners/1750949495134-WIN_20250626_11_50_21_Pro.jpg', 1, '2025-05-05 10:39:11', 1, '2025-10-07 09:19:51', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(4, 'João da Silva', 'joao.silva@example.com', 'novaSenha123', '/uploads/fotopadraousuario.svg', 'escuro', 'São Paulo, Brasil', NULL, NULL, NULL, 'https://meusite.com/banners/banner1.jpg', 1, '2025-05-06 16:39:09', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(7, 'João Silva Atualizado', 'fewfwfw@hbrhbv atualizado', 'senha1234', '/uploads/fotopadraousuario.svg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-17 14:06:16', 1, NULL, 'Ativo', 'empresa', 'Padrão', NULL, NULL),
(9, 'Otávio', 'tectonicroom356@gmail.com', '$2b$10$EHAWkhmwv8MyWtnBfG/6yujRyiSJGZOM7TciIFNvkAasnFSikFgoq', '/uploads/foto_perfil/1759968055964-asteroid.png', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', '/uploads/banners/1750880103909-mr-robot.jpeg', 0, '2025-06-25 19:21:52', 1, '2025-11-01 16:42:45', 'Ativo', 'empresa', 'Admin', '462250', '2025-11-01 18:26:11'),
(10, 'testE', '3rwfrgtrhytjuyi@gmail.com', '$2b$10$GZsIzdtonQlQ0AycbW4UkerdIKgDHtFIIKawevfQG7SUOFEijFua2', '/uploads/fotopadraousuario.svg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-25 19:27:17', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(11, 'felipe', 'fellipe@mail.com', '$2b$10$VT.ofVWpRSlLxWiN01L9dulNuWwrpNs9yeiCTF1De.CWEIGy7UBC.', '/uploads/foto_perfil/1750936872115-Sem tÃ­tulo-1.png', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 11:19:10', 1, NULL, 'Ativo', 'padrao', 'Padrão', '959579', '2025-11-01 18:26:48'),
(12, 'Luiz Gustavo', 'luiz@gmail.com', '$2b$10$KozHbUufQSQVaKo4oq1P3eb.wHaaBTqRJjWjA.CHbCfVE8Tc2ZDbW', '/uploads/foto_perfil/1750937601688-Sem tÃ­tulo-1.png', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 11:31:54', 1, NULL, 'Ativo', 'padrao', 'Padrão', '245296', '2025-11-01 18:32:21'),
(13, 'Bianca Dias', 'bianca.dias@gmaill.com', '$2b$10$6nYUU98o7IlbK0g/psMdXut/ehMvqfusnruoO6kje90nM3t1H94.W', '/uploads/foto_perfil/1750938145392-WIN_20250626_08_42_13_Pro.jpg', 'escuro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 11:38:14', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(14, 'Anderson', 'andersonjcmendess@gmail.com', '$2b$10$b7IArVBonbYm2sBj3YPYUegntK1/k5.uoADI9MNeH17OCM7bBRm9y', '/uploads/fotopadraousuario.svg', 'escuro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 12:05:16', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(16, 'Camilly', 'camilly@gmail.com', '$2b$10$hDnOKyaIV/9DkKQ8zkbyC.W997oEB0c7x/dBA6.h7drKT0.wxjQ4q', '/uploads/foto_perfil/1750940620181-foto Camilly (1).png', 'escuro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 12:22:00', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(17, 'Miguel', 'miguel@gmail.com', '$2b$10$YV7631bamR8nC.XGBAKzUeFq/bJ.JPsKwfUI30X862euMG8s1oyMC', '/uploads/foto_perfil/1750941101623-gustavodelvechio.webp', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', '/uploads/banners/1750941128600-Captura de tela 2025-05-05 153003.png', 1, '2025-06-26 12:30:12', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(18, 'jose', 'jose@gmail.com', '$2b$10$5VVHEqBqrfSqVXJawVmn3.NqbteTLstbwWYgbAWK22RZ/anz3Qjja', '/uploads/foto_perfil/1750942309466-WIN_20250626_09_51_39_Pro.jpg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 12:50:47', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(19, 'Lucas', 'Velodux@gmail.com', '$2b$10$8ii9Nffm4jA7UKQMgrqJke6xbWA/Z0tOCwF/OoZnuFpmPRogWMuGu', '/uploads/foto_perfil/1750943016791-WIN_20250626_10_02_55_Pro.jpg', 'escuro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 12:59:54', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(20, 'Luiz Felipe', 'luizfelipe@gmail.com', '$2b$10$zVO/lppbdYssfaRVcRYbJeX.Hg.NUQoEKJ/Vu4v6.LMn56jH71UL6', '/uploads/foto_perfil/1750943472633-WIN_20250626_10_10_43_Pro.jpg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 13:10:09', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(21, 'Ricardo Sartor', 'ricardo.sartor@fatec.sp.gov.br', '$2b$10$Mbn6Q3zdOkWF8l/665bNEOj0skGDKHo9DuJAiuzDgnSYpdNf7XbU2', '/uploads/foto_perfil/1750944235988-WIN_20250626_10_10_43_Pro.jpg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 13:17:48', 1, NULL, 'Banido', 'padrao', 'Padrão', NULL, NULL),
(22, 'thais', 'thais@email.com', '$2b$10$A6m13mXEZg6S8KO182PIR.c0WubG8z0zh4cbdEFMgwfQ8gSAnd3Fu', '/uploads/foto_perfil/1750946983105-WIN_20250626_11_09_04_Pro.jpg', 'escuro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 14:08:26', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(26, 'João Silvad', 'fewfwfw@hbrhbv4', '$2b$10$2vtR0w9FZmFetb6KWnAPOuyXHefNXsZ0SKoMf9K52NCqSIZbK3n6.', '/uploads/fotopadraousuario.svg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-07-12 15:33:19', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(27, 'João Silvad', 'fewfwfw@hbrhbvS4', '$2b$10$DdjxQFLX28PT5H8ccvfIg.IXsmobUlC41z8FntiN1/1Pln9g7I5Da', '/uploads/fotopadraousuario.svg', 'claro', NULL, NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-10-08 10:49:44', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(28, 'CautelaDev', 'Caua.teste.dev@gmail.com', '$2b$10$SwsVtq1xThGMg4VfEu2NG.bi8Qd7yROR/wZd7hcgpOuTRGFfwQ6x2', 'http://localhost:4500/uploads/foto_perfil/1761689598376-376_Sem_Titulo_20230124235253.png', 'escuro', NULL, NULL, NULL, 'este usuário não possui descrição', 'http://localhost:4500/uploads/banners/1761689877791-Colapse_omenagi_pos_sombreado.png', 1, '2025-10-28 20:48:58', 1, '2025-10-28 18:33:33', 'Ativo', 'padrao', 'Padrão', NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `perfis_empresa`
--
ALTER TABLE `perfis_empresa`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `cnpj` (`cnpj`);

--
-- Índices de tabela `perfis_padrao`
--
ALTER TABLE `perfis_padrao`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `nome_de_usuario` (`nome_de_usuario`);

--
-- Índices de tabela `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `perfis_empresa`
--
ALTER TABLE `perfis_empresa`
  ADD CONSTRAINT `perfis_empresa_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `perfis_padrao`
--
ALTER TABLE `perfis_padrao`
  ADD CONSTRAINT `perfis_padrao_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
