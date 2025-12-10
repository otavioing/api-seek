-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 10/12/2025 às 18:57
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
-- Estrutura para tabela `categorias_cursos`
--

CREATE TABLE `categorias_cursos` (
  `id_categoria` int(11) NOT NULL,
  `nome_categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categorias_cursos`
--

INSERT INTO `categorias_cursos` (`id_categoria`, `nome_categoria`) VALUES
(1, 'Ilustração'),
(2, 'Design'),
(3, 'Foto'),
(4, 'Futurista'),
(5, 'Abstrato'),
(6, 'Identidade Visual');

-- --------------------------------------------------------

--
-- Estrutura para tabela `categorias_posts`
--

CREATE TABLE `categorias_posts` (
  `id_categoria` int(11) NOT NULL,
  `nome_categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categorias_posts`
--

INSERT INTO `categorias_posts` (`id_categoria`, `nome_categoria`) VALUES
(1, 'Ilustração'),
(2, 'Design'),
(3, 'Foto'),
(4, 'Futurista'),
(5, 'Abstrato'),
(6, 'Identidade Visual');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cursos`
--

CREATE TABLE `cursos` (
  `id` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `imagem_curso` varchar(150) DEFAULT NULL,
  `nome_curso` varchar(50) DEFAULT NULL,
  `nivel_curso` enum('Iniciante','Intermediário','Avançado') DEFAULT NULL,
  `valor_curso` varchar(20) DEFAULT NULL,
  `quantidade_vagas` int(11) DEFAULT NULL,
  `audio_curso` enum('Português','Inglês','Espanhol') DEFAULT NULL,
  `legenda_curso` enum('Português','Inglês','Espanhol') DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `descricao_curso` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cursos`
--

INSERT INTO `cursos` (`id`, `id_user`, `imagem_curso`, `nome_curso`, `nivel_curso`, `valor_curso`, `quantidade_vagas`, `audio_curso`, `legenda_curso`, `id_categoria`, `descricao_curso`) VALUES
(4, 9, 'http://localhost:4500/uploads/capa_curso/8ecd61b4-0142-49b4-a3a1-6f76f97df3a4.png', 'dfgh', 'Intermediário', 'gratuito', 5, 'Português', 'Português', 6, 'frgtfh'),
(5, 9, 'http://localhost:4500/uploads/capa_curso/55eafd18-a06e-40a3-aca3-57ca51e87e73.png', 'efrgtr', 'Iniciante', 'gratuito', 5, 'Inglês', 'Inglês', 5, 'dewfrtg'),
(6, 28, 'http://localhost:4500/uploads/capa_curso/94401e91-8923-4ab9-b13c-02a69bcd93c5.png', 'aaaaaaaaaaaaaaaaaaa', 'Iniciante', 'gratuito', 30, 'Português', 'Português', 1, 'aaaaaaaaaaaaaaaaaaa'),
(7, 28, 'http://localhost:4500/uploads/capa_curso/229f992e-2aa0-4351-a189-cda9f0d576f7.png', 'teste', 'Iniciante', 'gratuito', 77, 'Português', 'Português', 1, 'teste'),
(8, 28, 'http://localhost:4500/uploads/capa_curso/3246dc6e-e935-4b75-8e5e-b34b89a10fa4.png', 'teste2', 'Iniciante', 'gratuito', 222, 'Português', 'Inglês', 1, 'teste2');

-- --------------------------------------------------------

--
-- Estrutura para tabela `likes_posts`
--

CREATE TABLE `likes_posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `numero_likes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `likes_posts`
--

INSERT INTO `likes_posts` (`id`, `user_id`, `post_id`, `criado_em`, `numero_likes`) VALUES
(85, 9, 19, '2025-11-02 20:25:58', 0),
(86, 3, 32, '2025-11-22 17:14:34', 0),
(87, 4, 32, '2025-11-22 17:14:34', 0),
(88, 7, 32, '2025-11-22 17:14:34', 0),
(89, 10, 32, '2025-11-22 17:14:34', 0),
(90, 11, 32, '2025-11-22 17:14:34', 0),
(91, 12, 32, '2025-11-22 17:14:34', 0),
(92, 13, 32, '2025-11-22 17:14:34', 0),
(93, 14, 32, '2025-11-22 17:14:34', 0),
(94, 16, 32, '2025-11-22 17:14:34', 0),
(95, 17, 32, '2025-11-22 17:14:34', 0),
(96, 18, 32, '2025-11-22 17:14:34', 0),
(97, 19, 32, '2025-11-22 17:14:34', 0),
(98, 20, 32, '2025-11-22 17:14:34', 0),
(99, 21, 32, '2025-11-22 17:14:34', 0),
(100, 22, 32, '2025-11-22 17:14:34', 0),
(101, 26, 32, '2025-11-22 17:14:34', 0),
(102, 27, 32, '2025-11-22 17:14:34', 0),
(103, 28, 32, '2025-11-22 17:14:34', 0),
(104, 29, 32, '2025-11-22 17:14:34', 0);

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
(28, 'Dev', 'CautelaDev', 'Dev', 'teste'),
(29, '...', 'Fatec', '...', 'teste'),
(30, 'Dev', 'TesteDev', 'haaaaa', 'teste');

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
  `titulo` varchar(100) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `imagem`, `legenda`, `criado_em`, `titulo`, `id_categoria`) VALUES
(19, 28, 'http://localhost:4500/uploads/posts/1761830948440-82_Sem_Titulo_20201120124526.png', 'Stella', '2025-10-30 19:29:08', 'Oloko', 2),
(20, 28, 'http://localhost:4500/uploads/posts/1761832971318-376_Sem_Titulo_20230124235253.png', 'aaaaaaaa', '2025-10-30 20:02:51', 'Projeto teste', 2),
(22, 29, 'http://localhost:4500/uploads/posts/1762614080266-WIN_20251107_08_47_31_Pro.jpg', '', '2025-11-08 21:02:56', '', NULL),
(23, 29, 'http://localhost:4500/uploads/posts/1762614090205-WIN_20250626_11_50_21_Pro.jpg', '', '2025-11-08 21:03:06', '', NULL),
(24, 29, 'http://localhost:4500/uploads/posts/1762614096438-WIN_20250626_11_09_04_Pro.jpg', '', '2025-11-08 21:03:12', '', NULL),
(25, 29, 'http://localhost:4500/uploads/posts/1762614101151-WIN_20250626_10_58_50_Pro.jpg', '', '2025-11-08 21:03:17', '', NULL),
(26, 29, 'http://localhost:4500/uploads/posts/1762614110552-WIN_20250626_10_58_04_Pro.jpg', '', '2025-11-08 21:03:26', '', NULL),
(27, 29, 'http://localhost:4500/uploads/posts/1762614116858-WIN_20250626_10_10_43_Pro.jpg', '', '2025-11-08 21:03:33', '', NULL),
(28, 29, 'http://localhost:4500/uploads/posts/1762614124306-WIN_20250626_10_02_55_Pro.jpg', '', '2025-11-08 21:03:40', '', NULL),
(29, 29, 'http://localhost:4500/uploads/posts/1762614130792-WIN_20250626_09_51_39_Pro.jpg', '', '2025-11-08 21:03:47', '', NULL),
(30, 29, 'http://localhost:4500/uploads/posts/1762614135764-WIN_20250626_09_37_13_Pro.jpg', '', '2025-11-08 21:03:52', '', NULL),
(31, 29, 'http://localhost:4500/uploads/posts/1762614139519-WIN_20250626_08_42_13_Pro.jpg', '', '2025-11-08 21:03:55', '', NULL),
(32, 9, 'http://localhost:4500/uploads/posts/1762717188556-Captura de tela 2025-07-06 122421.png', '', '2025-11-10 01:41:45', '', 4),
(35, 9, 'http://localhost:4500/uploads/posts/1762717662548-Captura de tela 2025-06-30 202713.png', '', '2025-11-10 01:49:39', '...', 2),
(37, 9, 'http://localhost:4500/uploads/posts/1762717816779-Captura de tela 2025-06-25 220835.png', '', '2025-11-10 01:52:13', '', 1),
(38, 28, 'http://localhost:4500/uploads/posts/1763845767626-Colapse_omenagi_pos_sombreado2.png', 'aaaaaaaaaaaaaaaaa', '2025-11-23 00:12:38', 'aaaaaaaaaaaaaaaaaaa', 1),
(39, 30, 'http://localhost:4500/uploads/posts/1763916783362-Captura de tela 2025-11-23 113445.png', 'testeapenas', '2025-11-23 19:56:16', 'testeapenas', 5),
(40, 9, 'http://localhost:4500/uploads/posts/1763990293424-WIN_20251107_08_47_31_Pro.jpg', 'teste', '2025-11-24 16:19:56', 'teste222', 3),
(41, 9, 'http://localhost:4500/uploads/posts/1763996543214-WIN_20251107_08_47_44_Pro.jpg', 'amor é lindo', '2025-11-24 18:04:07', 'minha vida', 6);

-- --------------------------------------------------------

--
-- Estrutura para tabela `preferencias_notificacoes`
--

CREATE TABLE `preferencias_notificacoes` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nome_notificacao` varchar(50) NOT NULL,
  `preferencia` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `preferencias_notificacoes`
--

INSERT INTO `preferencias_notificacoes` (`id`, `id_user`, `nome_notificacao`, `preferencia`) VALUES
(1, 9, 'receber_login', 0),
(5, 9, 'receber_seguidores', 1),
(6, 9, 'receber_comentarios', 0),
(7, 9, 'receber_likes', 1),
(85, 9, 'exibir_na_busca', 0),
(86, 9, 'exibir_no_feed', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `preferencias_privacidade`
--

CREATE TABLE `preferencias_privacidade` (
  `id` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `nome_privacidade` varchar(50) NOT NULL,
  `preferencia` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `preferencias_privacidade`
--

INSERT INTO `preferencias_privacidade` (`id`, `id_user`, `nome_privacidade`, `preferencia`) VALUES
(1, 9, 'exibir_na_busca', 0),
(2, 9, 'exibir_no_feed', 0),
(3, 9, 'exibir_cursos_no_feed', 1),
(4, 9, 'exibir_likes', 1),
(14, 9, 'receber_comentarios', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `seguidores`
--

CREATE TABLE `seguidores` (
  `id` int(11) NOT NULL,
  `seguidor_id` int(11) NOT NULL,
  `seguido_id` int(11) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `seguidores`
--

INSERT INTO `seguidores` (`id`, `seguidor_id`, `seguido_id`, `criado_em`) VALUES
(9, 28, 9, '2025-12-07 13:16:42'),
(11, 9, 28, '2025-12-07 18:07:50'),
(12, 9, 29, '2025-12-07 18:10:51'),
(13, 3, 9, '2025-12-07 18:12:32'),
(14, 4, 9, '2025-12-07 18:12:32'),
(15, 7, 9, '2025-12-07 18:12:32'),
(16, 10, 9, '2025-12-07 18:12:32'),
(17, 11, 9, '2025-12-07 18:12:32'),
(18, 12, 9, '2025-12-07 18:12:32'),
(19, 13, 9, '2025-12-07 18:12:32');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(191) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT '/uploads/fotopadraousuario.svg',
  `tema` varchar(50) DEFAULT 'claro',
  `cargo` varchar(255) DEFAULT NULL,
  `nome_de_usuario` varchar(255) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT 'este usuário não possui descrição',
  `banner` varchar(255) DEFAULT NULL,
  `acessibilidade_ativa` tinyint(1) DEFAULT 1,
  `data_de_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `cadastro_completo` tinyint(1) DEFAULT 0,
  `ultimo_login` datetime DEFAULT NULL,
  `status` enum('Ativo','Banido') NOT NULL DEFAULT 'Ativo',
  `tipo` enum('padrao','empresa') DEFAULT NULL,
  `permissao` enum('Padrão','Admin') NOT NULL DEFAULT 'Padrão',
  `codigo_recuperacao` varchar(10) DEFAULT NULL,
  `expira_em` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `foto`, `tema`, `cargo`, `nome_de_usuario`, `descricao`, `banner`, `acessibilidade_ativa`, `data_de_criacao`, `cadastro_completo`, `ultimo_login`, `status`, `tipo`, `permissao`, `codigo_recuperacao`, `expira_em`) VALUES
(3, 'who.jxao', 'joaojfpessoal@gmail.com', '$2b$10$fJwhob.w51UdYqGq8GV76uC7r6wE6dJw.cufVIJxvWwxdwXa7M9vK', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', '/uploads/banners/1750949495134-WIN_20250626_11_50_21_Pro.jpg', 1, '2025-05-05 16:39:11', 1, '2025-10-07 09:19:51', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(4, 'João da Silva', 'joao.silva@example.com', 'novaSenha123', 'http://localhost:4500/uploads/fotopadraousuario.png', 'escuro', NULL, NULL, NULL, 'https://meusite.com/banners/banner1.jpg', 1, '2025-05-06 22:39:09', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(7, 'João Silva Atualizado', 'fewfwfw@hbrhbv atualizado', 'senha1234', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-17 20:06:16', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(9, 'Otávio', 'tectonicroom356@gmail.com', '$2b$10$EHAWkhmwv8MyWtnBfG/6yujRyiSJGZOM7TciIFNvkAasnFSikFgoq', 'http://localhost:4500/uploads/foto_perfil/1759968055964-asteroid.png', 'escuro', NULL, NULL, 'este usuário não possui descrição', 'http://localhost:4500/uploads/banners/1763990447336-WIN_20251107_08_47_31_Pro.jpg', 0, '2025-06-26 01:21:52', 1, '2025-12-10 14:19:39', 'Ativo', 'padrao', 'Admin', '462250', '2025-11-01 18:26:11'),
(10, 'testE', '3rwfrgtrhytjuyi@gmail.com', '$2b$10$GZsIzdtonQlQ0AycbW4UkerdIKgDHtFIIKawevfQG7SUOFEijFua2', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 01:27:17', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(11, 'felipe', 'fellipe@mail.com', '$2b$10$VT.ofVWpRSlLxWiN01L9dulNuWwrpNs9yeiCTF1De.CWEIGy7UBC.', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 17:19:10', 1, NULL, 'Ativo', 'padrao', 'Padrão', '959579', '2025-11-01 18:26:48'),
(12, 'Luiz Gustavo', 'luiz@gmail.com', '$2b$10$KozHbUufQSQVaKo4oq1P3eb.wHaaBTqRJjWjA.CHbCfVE8Tc2ZDbW', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 17:31:54', 1, NULL, 'Ativo', 'padrao', 'Padrão', '245296', '2025-11-01 18:32:21'),
(13, 'Bianca Dias', 'bianca.dias@gmaill.com', '$2b$10$6nYUU98o7IlbK0g/psMdXut/ehMvqfusnruoO6kje90nM3t1H94.W', 'http://localhost:4500/uploads/fotopadraousuario.png', 'escuro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 17:38:14', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(14, 'Anderson', 'andersonjcmendess@gmail.com', '$2b$10$b7IArVBonbYm2sBj3YPYUegntK1/k5.uoADI9MNeH17OCM7bBRm9y', 'http://localhost:4500/uploads/fotopadraousuario.png', 'escuro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 18:05:16', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(16, 'Camilly', 'camilly@gmail.com', '$2b$10$hDnOKyaIV/9DkKQ8zkbyC.W997oEB0c7x/dBA6.h7drKT0.wxjQ4q', 'http://localhost:4500/uploads/fotopadraousuario.png', 'escuro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 18:22:00', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(17, 'Miguel', 'miguel@gmail.com', '$2b$10$YV7631bamR8nC.XGBAKzUeFq/bJ.JPsKwfUI30X862euMG8s1oyMC', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', '/uploads/banners/1750941128600-Captura de tela 2025-05-05 153003.png', 1, '2025-06-26 18:30:12', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(18, 'jose', 'jose@gmail.com', '$2b$10$5VVHEqBqrfSqVXJawVmn3.NqbteTLstbwWYgbAWK22RZ/anz3Qjja', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 18:50:47', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(19, 'Lucas', 'Velodux@gmail.com', '$2b$10$8ii9Nffm4jA7UKQMgrqJke6xbWA/Z0tOCwF/OoZnuFpmPRogWMuGu', 'http://localhost:4500/uploads/fotopadraousuario.png', 'escuro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 18:59:54', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(20, 'Luiz Felipe', 'luizfelipe@gmail.com', '$2b$10$zVO/lppbdYssfaRVcRYbJeX.Hg.NUQoEKJ/Vu4v6.LMn56jH71UL6', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 19:10:09', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(21, 'Ricardo Sartor', 'ricardo.sartor@fatec.sp.gov.br', '$2b$10$Mbn6Q3zdOkWF8l/665bNEOj0skGDKHo9DuJAiuzDgnSYpdNf7XbU2', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 19:17:48', 1, NULL, 'Banido', 'padrao', 'Padrão', NULL, NULL),
(22, 'thais', 'thais@email.com', '$2b$10$A6m13mXEZg6S8KO182PIR.c0WubG8z0zh4cbdEFMgwfQ8gSAnd3Fu', 'http://localhost:4500/uploads/fotopadraousuario.png', 'escuro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-06-26 20:08:26', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(26, 'João Silvad', 'fewfwfw@hbrhbv4', '$2b$10$2vtR0w9FZmFetb6KWnAPOuyXHefNXsZ0SKoMf9K52NCqSIZbK3n6.', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-07-12 21:33:19', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(27, 'João Silvad', 'fewfwfw@hbrhbvS4', '$2b$10$DdjxQFLX28PT5H8ccvfIg.IXsmobUlC41z8FntiN1/1Pln9g7I5Da', 'http://localhost:4500/uploads/fotopadraousuario.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-10-08 16:49:44', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(28, 'CautelaDev', 'Caua.teste.dev@gmail.com', '$2b$10$SwsVtq1xThGMg4VfEu2NG.bi8Qd7yROR/wZd7hcgpOuTRGFfwQ6x2', 'http://localhost:4500/uploads/foto_perfil/1761689598376-376_Sem_Titulo_20230124235253.png', 'claro', NULL, NULL, 'este usuário não possui descrição', 'http://localhost:4500/uploads/banners/1761689877791-Colapse_omenagi_pos_sombreado.png', 1, '2025-10-29 02:48:58', 1, '2025-10-28 18:33:33', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(29, 'Fatec', 'feira.fatec@gmail.com', '$2b$10$EHAWkhmwv8MyWtnBfG/6yujRyiSJGZOM7TciIFNvkAasnFSikFgoq', 'http://localhost:4500/uploads/foto_perfil/1762614061580-5b086da164407.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-11-08 20:52:55', 1, '2025-11-08 11:57:51', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(30, 'Cautelaaa', 'caaa@gmail.com', '$2b$10$2FkuHJulouWOgy9R7howiuMlr.rN1AXYEGjRnFD1SYK1svy2MS6fu', 'http://localhost:4500/uploads/foto_perfil/1763916724042-Captura de tela 2025-11-23 113445.png', 'claro', NULL, NULL, 'este usuário não possui descrição', NULL, 1, '2025-11-23 19:54:31', 1, '2025-11-23 13:54:40', 'Ativo', 'padrao', 'Padrão', NULL, NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categorias_cursos`
--
ALTER TABLE `categorias_cursos`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Índices de tabela `categorias_posts`
--
ALTER TABLE `categorias_posts`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Índices de tabela `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_categoria` (`id_categoria`);

--
-- Índices de tabela `likes_posts`
--
ALTER TABLE `likes_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_post_like` (`user_id`,`post_id`),
  ADD KEY `post_id` (`post_id`);

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
  ADD KEY `user_id` (`user_id`),
  ADD KEY `fk_posts_categoria` (`id_categoria`);

--
-- Índices de tabela `preferencias_notificacoes`
--
ALTER TABLE `preferencias_notificacoes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`,`nome_notificacao`);

--
-- Índices de tabela `preferencias_privacidade`
--
ALTER TABLE `preferencias_privacidade`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_user` (`id_user`,`nome_privacidade`),
  ADD KEY `fk_user_privacidade` (`id_user`);

--
-- Índices de tabela `seguidores`
--
ALTER TABLE `seguidores`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_seguidor_seguido` (`seguidor_id`,`seguido_id`),
  ADD KEY `seguidores_ibfk_2` (`seguido_id`);

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
-- AUTO_INCREMENT de tabela `categorias_cursos`
--
ALTER TABLE `categorias_cursos`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `categorias_posts`
--
ALTER TABLE `categorias_posts`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de tabela `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `likes_posts`
--
ALTER TABLE `likes_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=105;

--
-- AUTO_INCREMENT de tabela `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de tabela `preferencias_notificacoes`
--
ALTER TABLE `preferencias_notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

--
-- AUTO_INCREMENT de tabela `preferencias_privacidade`
--
ALTER TABLE `preferencias_privacidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de tabela `seguidores`
--
ALTER TABLE `seguidores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `cursos_ibfk_2` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_cursos` (`id_categoria`);

--
-- Restrições para tabelas `likes_posts`
--
ALTER TABLE `likes_posts`
  ADD CONSTRAINT `likes_posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `likes_posts_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`);

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
  ADD CONSTRAINT `fk_posts_categoria` FOREIGN KEY (`id_categoria`) REFERENCES `categorias_posts` (`id_categoria`),
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`);

--
-- Restrições para tabelas `preferencias_notificacoes`
--
ALTER TABLE `preferencias_notificacoes`
  ADD CONSTRAINT `preferencias_notificacoes_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `preferencias_privacidade`
--
ALTER TABLE `preferencias_privacidade`
  ADD CONSTRAINT `fk_user_privacidade` FOREIGN KEY (`id_user`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `seguidores`
--
ALTER TABLE `seguidores`
  ADD CONSTRAINT `seguidores_ibfk_1` FOREIGN KEY (`seguidor_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `seguidores_ibfk_2` FOREIGN KEY (`seguido_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
