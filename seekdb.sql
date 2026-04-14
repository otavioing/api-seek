-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 14/04/2026 às 02:53
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
-- Estrutura para tabela `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `comentario_pai_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `comentarios`
--

INSERT INTO `comentarios` (`id`, `post_id`, `user_id`, `comentario`, `criado_em`, `comentario_pai_id`) VALUES
(1, 40, 9, 'primeiro comentario do seek', '2025-12-10 21:30:24', NULL),
(4, 35, 9, 'primeiro comentario', '2026-03-30 19:59:41', NULL),
(5, 42, 9, 'Teste', '2026-03-30 20:21:43', NULL),
(6, 38, 9, 'Ainda bem que esse cara faz faculdade pq se fosse viver do desenho não ia dar certo', '2026-03-30 20:24:53', NULL),
(7, 38, 9, 'Ainda bem que esse cara faz faculdade pq se fosse viver do desenho passaria fome', '2026-03-31 11:03:16', NULL),
(8, 41, 9, 'O cara da esquerda é paia', '2026-03-31 11:05:44', NULL),
(9, 42, 3, 'Ah', '2026-03-31 11:15:35', NULL),
(10, 42, 3, 'Ovo', '2026-03-31 13:26:20', NULL),
(11, 39, 3, 'Ovo', '2026-03-31 13:27:04', NULL),
(16, 42, 9, 'Obiii', '2026-03-31 14:06:00', NULL),
(17, 41, 9, 'top d+', '2026-04-08 23:19:06', NULL),
(18, 41, 9, 'top d+', '2026-04-08 23:19:51', 17),
(20, 42, 9, 'Teste de resposta de comentários', '2026-04-08 23:30:36', 5),
(21, 42, 9, 'Teste 2', '2026-04-08 23:30:48', 20),
(22, 22, 9, 'Esse mano é diferenciado', '2026-04-08 23:33:55', NULL),
(23, 42, 9, 'Teste de notificação', '2026-04-08 23:43:18', 21),
(24, 42, 9, 'Teste', '2026-04-08 23:44:14', 9),
(25, 42, 9, 'Teste de comentário com notificação', '2026-04-08 23:52:01', NULL),
(26, 42, 9, 'Segundo teste de comentário com notificação', '2026-04-08 23:53:48', NULL),
(27, 22, 9, 'teste de comentario ', '2026-04-12 14:45:44', NULL),
(29, 22, 9, 'teste de comentario ', '2026-04-12 14:48:12', 27),
(30, 32, 9, 'ai sim', '2026-04-12 14:51:34', NULL),
(31, 32, 3, 'oloco, melhor post do site', '2026-04-13 18:23:37', NULL),
(32, 32, 3, 'diferente dos pots do Caua', '2026-04-13 18:24:09', 31);

-- --------------------------------------------------------

--
-- Estrutura para tabela `conversas`
--

CREATE TABLE `conversas` (
  `id` int(11) NOT NULL,
  `foto` varchar(255) NOT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `conversas`
--

INSERT INTO `conversas` (`id`, `foto`, `criado_em`) VALUES
(3, '/uploads/conversas/4f2f9ae3-8824-4d1a-86af-a0a100daff8d.png', '2026-04-14 00:50:15');

-- --------------------------------------------------------

--
-- Estrutura para tabela `conversa_participantes`
--

CREATE TABLE `conversa_participantes` (
  `id` int(11) NOT NULL,
  `conversa_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `conversa_participantes`
--

INSERT INTO `conversa_participantes` (`id`, `conversa_id`, `usuario_id`) VALUES
(4, 3, 3),
(5, 3, 9);

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
(4, 9, '/uploads/capa_curso/8ecd61b4-0142-49b4-a3a1-6f76f97df3a4.png', 'dfgh', 'Intermediário', 'gratuito', 5, 'Português', 'Português', 6, 'frgtfh'),
(5, 9, '/uploads/capa_curso/55eafd18-a06e-40a3-aca3-57ca51e87e73.png', 'efrgtr', 'Iniciante', 'gratuito', 5, 'Inglês', 'Inglês', 5, 'dewfrtg'),
(6, 28, '/uploads/capa_curso/94401e91-8923-4ab9-b13c-02a69bcd93c5.png', 'aaaaaaaaaaaaaaaaaaa', 'Iniciante', 'gratuito', 30, 'Português', 'Português', 1, 'aaaaaaaaaaaaaaaaaaa'),
(7, 28, '/uploads/capa_curso/229f992e-2aa0-4351-a189-cda9f0d576f7.png', 'teste', 'Iniciante', 'gratuito', 77, 'Português', 'Português', 1, 'teste'),
(8, 28, '/uploads/capa_curso/3246dc6e-e935-4b75-8e5e-b34b89a10fa4.png', 'teste2', 'Iniciante', 'gratuito', 222, 'Português', 'Inglês', 1, 'teste2'),
(9, 33, '/uploads/capa_curso/737f4f05-81b3-40cd-935c-da50a2fbdbc0.jpg', 'Curso de teste', 'Iniciante', 'pago', 5, 'Português', 'Espanhol', 1, 'Curso de teste.');

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
(104, 29, 32, '2025-11-22 17:14:34', 0),
(105, 9, 40, '2025-12-10 21:30:08', 0),
(112, 9, 41, '2026-03-30 23:07:25', 0),
(113, 9, 32, '2026-03-30 23:09:31', 0),
(121, 3, 39, '2026-03-31 13:27:12', 0),
(122, 9, 37, '2026-04-05 19:11:58', 0),
(126, 9, 38, '2026-04-08 23:50:35', 0),
(129, 9, 20, '2026-04-12 14:40:09', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `mensagens`
--

CREATE TABLE `mensagens` (
  `id` int(11) NOT NULL,
  `conversa_id` int(11) NOT NULL,
  `remetente_id` int(11) NOT NULL,
  `mensagem` text NOT NULL,
  `lida` tinyint(1) DEFAULT 0,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `mensagens`
--

INSERT INTO `mensagens` (`id`, `conversa_id`, `remetente_id`, `mensagem`, `lida`, `criado_em`) VALUES
(1, 3, 3, 'P3Owt9/bmqLEcZfs:i+Q8SJv1oAhoiLcmz0XS3Q==:VOkCQ0/nV3n24cDEOE/5Oan5LXIZPVBMSasdPL+SRMan0G+cQQD/iCAB8Ik=', 0, '2026-04-14 00:51:20'),
(2, 3, 9, 'jmf9CgxlWQbQRA0Y:OTrLCrrIlu6bQy1HDS/0Kg==:ZeoEneCpVKsab+CuQQeyj9udMA+SjoGiatyvWkOhTZscTajTfvV567pUvws=', 0, '2026-04-14 00:52:06');

-- --------------------------------------------------------

--
-- Estrutura para tabela `notificacoes`
--

CREATE TABLE `notificacoes` (
  `id` int(11) NOT NULL,
  `destinatario_id` int(11) NOT NULL,
  `remetente_id` int(11) NOT NULL,
  `tipo` enum('like','comentario','seguindo') NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `comentario_id` int(11) DEFAULT NULL,
  `lida` tinyint(1) DEFAULT 0,
  `criada_em` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `notificacoes`
--

INSERT INTO `notificacoes` (`id`, `destinatario_id`, `remetente_id`, `tipo`, `post_id`, `comentario_id`, `lida`, `criada_em`) VALUES
(1, 3, 9, 'comentario', 42, 9, 1, '2026-04-08 23:44:14'),
(2, 33, 9, 'seguindo', NULL, NULL, 0, '2026-04-08 23:50:02'),
(3, 28, 9, 'like', 38, NULL, 0, '2026-04-08 23:50:35'),
(4, 33, 9, 'comentario', 42, 26, 0, '2026-04-08 23:53:48'),
(5, 33, 9, 'like', 42, NULL, 0, '2026-04-08 23:54:04'),
(6, 28, 9, 'like', 20, NULL, 0, '2026-04-12 14:39:11'),
(7, 28, 9, 'like', 20, NULL, 0, '2026-04-12 14:40:09'),
(8, 29, 9, 'comentario', 22, 27, 0, '2026-04-12 14:45:44'),
(9, 33, 9, 'like', 42, NULL, 0, '2026-04-12 14:51:07'),
(10, 9, 3, 'comentario', 32, 31, 1, '2026-04-13 18:23:37');

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

--
-- Despejando dados para a tabela `perfis_empresa`
--

INSERT INTO `perfis_empresa` (`usuario_id`, `razao_social`, `nome_fantasia`, `cnpj`, `telefone_comercial`, `categoria_negocio`, `numero_funcionarios`, `endereco_completo`, `descricao`) VALUES
(33, 'Thais Enterprise', '', '', '', '', 0, 'teste', 'Isso é um teste.');

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
  `legenda` text DEFAULT NULL,
  `criado_em` timestamp NOT NULL DEFAULT current_timestamp(),
  `titulo` varchar(100) NOT NULL,
  `id_categoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `legenda`, `criado_em`, `titulo`, `id_categoria`) VALUES
(19, 28, 'Stella', '2025-10-30 19:29:08', 'Oloko', 2),
(20, 28, 'aaaaaaaa', '2025-10-30 20:02:51', 'Projeto teste', 2),
(22, 29, '', '2025-11-08 21:02:56', '', NULL),
(23, 29, '', '2025-11-08 21:03:06', '', NULL),
(24, 29, '', '2025-11-08 21:03:12', '', NULL),
(25, 29, '', '2025-11-08 21:03:17', '', NULL),
(26, 29, '', '2025-11-08 21:03:26', '', NULL),
(27, 29, '', '2025-11-08 21:03:33', '', NULL),
(28, 29, '', '2025-11-08 21:03:40', '', NULL),
(29, 29, '', '2025-11-08 21:03:47', '', NULL),
(30, 29, '', '2025-11-08 21:03:52', '', NULL),
(31, 29, '', '2025-11-08 21:03:55', '', NULL),
(32, 9, '', '2025-11-10 01:41:45', 'eee', 4),
(35, 9, '', '2025-11-10 01:49:39', '...', 2),
(37, 9, '', '2025-11-10 01:52:13', 'fff', 1),
(38, 28, 'aaaaaaaaaaaaaaaaa', '2025-11-23 00:12:38', 'aaaaaaaaaaaaaaaaaaa', 1),
(39, 30, 'testeapenas', '2025-11-23 19:56:16', 'testeapenas', 5),
(40, 9, 'teste', '2025-11-24 16:19:56', 'teste222', 3),
(41, 9, 'amor é lindo', '2025-11-24 18:04:07', 'minha vida', 6),
(42, 33, 'dfghjklç~çl,mnbvbnm,.;ASD', '2026-03-03 11:39:52', 'Imagem que não consigo excluir', 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `post_imagens`
--

CREATE TABLE `post_imagens` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `imagem` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `post_imagens`
--

INSERT INTO `post_imagens` (`id`, `post_id`, `imagem`) VALUES
(1, 19, '/uploads/posts/1761830948440-82_Sem_Titulo_20201120124526.png'),
(2, 20, '/uploads/posts/1761832971318-376_Sem_Titulo_20230124235253.png'),
(3, 22, '/uploads/posts/1762614080266-WIN_20251107_08_47_31_Pro.jpg'),
(4, 23, '/uploads/posts/1762614090205-WIN_20250626_11_50_21_Pro.jpg'),
(5, 24, '/uploads/posts/1762614096438-WIN_20250626_11_09_04_Pro.jpg'),
(6, 25, '/uploads/posts/1762614101151-WIN_20250626_10_58_50_Pro.jpg'),
(7, 26, '/uploads/posts/1762614110552-WIN_20250626_10_58_04_Pro.jpg'),
(8, 27, '/uploads/posts/1762614116858-WIN_20250626_10_10_43_Pro.jpg'),
(9, 28, '/uploads/posts/1762614124306-WIN_20250626_10_02_55_Pro.jpg'),
(10, 29, '/uploads/posts/1762614130792-WIN_20250626_09_51_39_Pro.jpg'),
(11, 30, '/uploads/posts/1762614135764-WIN_20250626_09_37_13_Pro.jpg'),
(12, 31, '/uploads/posts/1762614139519-WIN_20250626_08_42_13_Pro.jpg'),
(13, 32, '/uploads/posts/1762717188556-Captura de tela 2025-07-06 122421.png'),
(14, 35, '/uploads/posts/1761598125649-CatÃ¡logo (7).png'),
(15, 37, '/uploads/posts/1764177518537-hqdefault.jpg'),
(16, 38, '/uploads/posts/1763845767626-Colapse_omenagi_pos_sombreado2.png'),
(17, 39, '/uploads/posts/1763916783362-Captura de tela 2025-11-23 113445.png'),
(18, 40, '/uploads/posts/1763990293424-WIN_20251107_08_47_31_Pro.jpg'),
(19, 41, '/uploads/posts/1763996543214-WIN_20251107_08_47_44_Pro.jpg'),
(20, 42, '/uploads/posts/1772537992746-cliente2.png');

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
(86, 9, 'exibir_no_feed', 0),
(93, 9, 'exibir_likes', 0),
(160, 33, 'receber_login', 1),
(161, 33, 'receber_seguidores', 1),
(162, 33, 'receber_comentarios', 1),
(163, 33, 'receber_likes', 1),
(260, 3, 'receber_login', 1),
(261, 3, 'receber_seguidores', 1),
(262, 3, 'receber_comentarios', 1),
(263, 3, 'receber_likes', 1),
(280, 40, 'receber_login', 1),
(281, 40, 'receber_seguidores', 1),
(282, 40, 'receber_comentarios', 1),
(283, 40, 'receber_likes', 1);

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
(4, 9, 'exibir_likes', 0),
(14, 9, 'receber_comentarios', 0),
(82, 33, 'exibir_na_busca', 1),
(83, 33, 'exibir_no_feed', 1),
(84, 33, 'exibir_cursos_no_feed', 1),
(85, 33, 'exibir_likes', 1),
(182, 3, 'exibir_na_busca', 1),
(183, 3, 'exibir_no_feed', 1),
(184, 3, 'exibir_cursos_no_feed', 1),
(185, 3, 'exibir_likes', 1),
(202, 40, 'exibir_na_busca', 1),
(203, 40, 'exibir_no_feed', 1),
(204, 40, 'exibir_cursos_no_feed', 1),
(205, 40, 'exibir_likes', 1);

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
(19, 13, 9, '2025-12-07 18:12:32'),
(21, 9, 33, '2026-04-08 23:50:02');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(191) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT '/uploads/fotopadraousuario.png',
  `banner` varchar(255) DEFAULT NULL,
  `tema` varchar(50) DEFAULT 'claro',
  `cargo` varchar(255) DEFAULT NULL,
  `nome_de_usuario` varchar(255) DEFAULT NULL,
  `descricao` varchar(300) DEFAULT 'este usuário não possui descrição',
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

INSERT INTO `usuarios` (`id`, `nome`, `email`, `senha`, `foto`, `banner`, `tema`, `cargo`, `nome_de_usuario`, `descricao`, `acessibilidade_ativa`, `data_de_criacao`, `cadastro_completo`, `ultimo_login`, `status`, `tipo`, `permissao`, `codigo_recuperacao`, `expira_em`) VALUES
(3, 'who.jxao', 'joaojfpessoal@gmail.com', '$2b$10$fJwhob.w51UdYqGq8GV76uC7r6wE6dJw.cufVIJxvWwxdwXa7M9vK', '/uploads/fotopadraousuario.png', '/uploads/banners/1750949495134-WIN_20250626_11_50_21_Pro.jpg', 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-05-05 16:39:11', 1, '2026-04-13 15:23:11', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(4, 'João da Silva', 'joao.silva@example.com', 'novaSenha123', '/uploads/fotopadraousuario.png', 'https://meusite.com/banners/banner1.jpg', 'escuro', NULL, NULL, NULL, 1, '2025-05-06 22:39:09', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(7, 'João Silva Atualizado', 'fewfwfw@hbrhbv atualizado', 'senha1234', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-17 20:06:16', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(9, 'Otávio', 'tectonicroom356@gmail.com', '$2b$10$EHAWkhmwv8MyWtnBfG/6yujRyiSJGZOM7TciIFNvkAasnFSikFgoq', '/uploads/foto_perfil/1759968055964-asteroid.png', '/uploads/banners/1763990447336-WIN_20251107_08_47_31_Pro.jpg', 'escuro', NULL, NULL, 'este usuário não possui descrição', 0, '2025-06-26 01:21:52', 1, '2026-04-13 15:24:22', 'Ativo', 'padrao', 'Admin', '563887', '2026-03-31 10:56:23'),
(10, 'testE', '3rwfrgtrhytjuyi@gmail.com', '$2b$10$GZsIzdtonQlQ0AycbW4UkerdIKgDHtFIIKawevfQG7SUOFEijFua2', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 01:27:17', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(11, 'felipe', 'fellipe@mail.com', '$2b$10$VT.ofVWpRSlLxWiN01L9dulNuWwrpNs9yeiCTF1De.CWEIGy7UBC.', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 17:19:10', 1, NULL, 'Ativo', 'padrao', 'Padrão', '959579', '2025-11-01 18:26:48'),
(12, 'Luiz Gustavo', 'luiz@gmail.com', '$2b$10$KozHbUufQSQVaKo4oq1P3eb.wHaaBTqRJjWjA.CHbCfVE8Tc2ZDbW', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 17:31:54', 1, NULL, 'Ativo', 'padrao', 'Padrão', '245296', '2025-11-01 18:32:21'),
(13, 'Bianca Dias', 'bianca.dias@gmaill.com', '$2b$10$6nYUU98o7IlbK0g/psMdXut/ehMvqfusnruoO6kje90nM3t1H94.W', '/uploads/fotopadraousuario.png', NULL, 'escuro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 17:38:14', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(14, 'Anderson', 'andersonjcmendess@gmail.com', '$2b$10$b7IArVBonbYm2sBj3YPYUegntK1/k5.uoADI9MNeH17OCM7bBRm9y', '/uploads/fotopadraousuario.png', NULL, 'escuro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 18:05:16', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(16, 'Camilly', 'camilly@gmail.com', '$2b$10$hDnOKyaIV/9DkKQ8zkbyC.W997oEB0c7x/dBA6.h7drKT0.wxjQ4q', '/uploads/fotopadraousuario.png', NULL, 'escuro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 18:22:00', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(17, 'Miguel', 'miguel@gmail.com', '$2b$10$YV7631bamR8nC.XGBAKzUeFq/bJ.JPsKwfUI30X862euMG8s1oyMC', '/uploads/fotopadraousuario.png', '/uploads/banners/1750941128600-Captura de tela 2025-05-05 153003.png', 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 18:30:12', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(18, 'jose', 'jose@gmail.com', '$2b$10$5VVHEqBqrfSqVXJawVmn3.NqbteTLstbwWYgbAWK22RZ/anz3Qjja', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 18:50:47', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(19, 'Lucas', 'Velodux@gmail.com', '$2b$10$8ii9Nffm4jA7UKQMgrqJke6xbWA/Z0tOCwF/OoZnuFpmPRogWMuGu', '/uploads/fotopadraousuario.png', NULL, 'escuro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 18:59:54', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(20, 'Luiz Felipe', 'luizfelipe@gmail.com', '$2b$10$zVO/lppbdYssfaRVcRYbJeX.Hg.NUQoEKJ/Vu4v6.LMn56jH71UL6', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 19:10:09', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(21, 'Ricardo Sartor', 'ricardo.sartor@fatec.sp.gov.br', '$2b$10$Mbn6Q3zdOkWF8l/665bNEOj0skGDKHo9DuJAiuzDgnSYpdNf7XbU2', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 19:17:48', 1, NULL, 'Banido', 'padrao', 'Padrão', NULL, NULL),
(22, 'thais', 'thais@email.com', '$2b$10$A6m13mXEZg6S8KO182PIR.c0WubG8z0zh4cbdEFMgwfQ8gSAnd3Fu', '/uploads/fotopadraousuario.png', NULL, 'escuro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-06-26 20:08:26', 1, NULL, 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(26, 'João Silvad', 'fewfwfw@hbrhbv4', '$2b$10$2vtR0w9FZmFetb6KWnAPOuyXHefNXsZ0SKoMf9K52NCqSIZbK3n6.', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-07-12 21:33:19', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(27, 'João Silvad', 'fewfwfw@hbrhbvS4', '$2b$10$DdjxQFLX28PT5H8ccvfIg.IXsmobUlC41z8FntiN1/1Pln9g7I5Da', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-10-08 16:49:44', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(28, 'CautelaDev', 'Caua.teste.dev@gmail.com', '$2b$10$SwsVtq1xThGMg4VfEu2NG.bi8Qd7yROR/wZd7hcgpOuTRGFfwQ6x2', '/uploads/foto_perfil/1761689598376-376_Sem_Titulo_20230124235253.png', '/uploads/banners/1761689877791-Colapse_omenagi_pos_sombreado.png', 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-10-29 02:48:58', 1, '2025-10-28 18:33:33', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(29, 'Fatec', 'feira.fatec@gmail.com', '$2b$10$EHAWkhmwv8MyWtnBfG/6yujRyiSJGZOM7TciIFNvkAasnFSikFgoq', '/uploads/foto_perfil/1762614061580-5b086da164407.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-11-08 20:52:55', 1, '2025-11-08 11:57:51', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(30, 'Cautelaaa', 'caaa@gmail.com', '$2b$10$2FkuHJulouWOgy9R7howiuMlr.rN1AXYEGjRnFD1SYK1svy2MS6fu', '/uploads/foto_perfil/1763916724042-Captura de tela 2025-11-23 113445.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2025-11-23 19:54:31', 1, '2025-11-23 13:54:40', 'Ativo', 'padrao', 'Padrão', NULL, NULL),
(31, 'gregegherhe', 'tectonicroom3556@gmail.com', '$2b$10$IBdOHKR82p/Jok6pRlhpcOyJ7H1pRZJsWdwpuxenNXN1WPxS4kFwS', '/uploads/fotopadraousuario.svg', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-02-24 13:40:48', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(32, 'Testemobile', 'Heveh@gmail.com', '$2b$10$tmgrTuDYhA/tfn3ffWYKVOp/a3PhDykY4h1GqY7Gz3hpJ9w62LZQq', '/uploads/fotopadraousuario.svg', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-02-24 13:43:21', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(33, 'Thais Casagrande', 'Thais.casagrande@fatectq.edu.br', '$2b$10$8uW1rFfd8Bej8mB.eFg74.ecQjxI1GZus3C5aAlcsYZ/273COA1iW', '/uploads/foto_perfil/1772537411104-cliente3.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-03-03 11:11:21', 1, '2026-03-03 08:27:55', 'Ativo', 'empresa', 'Padrão', NULL, NULL),
(34, 'testeapi2.0', 'fnileneinf@gmail.com', '$2b$10$zl6ezUc3AoIXE8nA8Q1.aeKG2zLTXQv06hT9vmQhEgW344mIsrzJm', '/uploads/foto_perfil/1773744747578-Background+Border-1.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-03-11 15:49:03', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(35, 'otavio', 'fwefcwefcwe@gmail.com', '$2b$10$tYV201tyFBQyk4mDo9kDQOGXQ/NiJltrv1hT8f1x6L7w/cE3aIwcC', '/uploads/fotopadraousuario.svg', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-03-11 15:52:26', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(36, 'otavio', 'dfwescdvf@gmail.com', '$2b$10$0KZWA4gnGwLqLK1oWKH7b.e4CzJqJysGh5A2d4kTcvwZUwyGTjTnO', '/uploads/fotopadraousuario.svg', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-03-11 15:53:27', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(37, 'testefront', 'fervfdvsd@gmail.com', '$2b$10$YTCYYiyQ12z5.8TWwLIexe.ijwiTWuJA7OZG5BCJMEzMKH3fTYKHW', '/uploads/fotopadraousuario.svg', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-03-11 15:59:26', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(38, 'desfcsecs', 'eefdbg@gmail.com', '$2b$10$x5P5Rwh9AswP3bOvVfA.d.YoG/1j/X23Yo7No4mJfP8Ou7jx39Rlu', '/uploads/fotopadraousuario.svg', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-03-11 16:00:08', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(39, 'testeapi2.0', 'fnilenesinf@gmail.com', '$2b$10$w/MSeXycM0u5BAeXdwG1heQ/oTGChz/FDNDJi1e.PznNgb..g.aP.', '/uploads/fotopadraousuario.svg', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-03-11 16:01:09', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL),
(40, 'Teste de cadastro mobile', 'Otaviodominguessilva@gmail.com', '$2b$10$ALU/SmgpBlaoN3vyDCBV.ef93QLF1XWTUY4E9cT2tVrrQGxxaf4UC', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-04-05 19:13:20', 0, '2026-04-05 16:14:14', 'Ativo', NULL, 'Padrão', NULL, NULL),
(41, 'teste de criação no site novo', 'tectonicroddom356@gmail.com', '$2b$10$wKgLcCOiXcYxxBM6oC6Go.pgA.T07jHMnK2b7st4fHfgKtlYHKhTu', '/uploads/fotopadraousuario.png', NULL, 'claro', NULL, NULL, 'este usuário não possui descrição', 1, '2026-04-12 14:06:14', 0, NULL, 'Ativo', NULL, 'Padrão', NULL, NULL);

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
-- Índices de tabela `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comentario_post` (`post_id`),
  ADD KEY `fk_comentario_user` (`user_id`),
  ADD KEY `comentario_pai_id` (`comentario_pai_id`);

--
-- Índices de tabela `conversas`
--
ALTER TABLE `conversas`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `conversa_participantes`
--
ALTER TABLE `conversa_participantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `conversa_id` (`conversa_id`,`usuario_id`),
  ADD KEY `usuario_id` (`usuario_id`);

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
-- Índices de tabela `mensagens`
--
ALTER TABLE `mensagens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `conversa_id` (`conversa_id`),
  ADD KEY `remetente_id` (`remetente_id`);

--
-- Índices de tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `destinatario_id` (`destinatario_id`),
  ADD KEY `remetente_id` (`remetente_id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `comentario_id` (`comentario_id`);

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
-- Índices de tabela `post_imagens`
--
ALTER TABLE `post_imagens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`);

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
-- AUTO_INCREMENT de tabela `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de tabela `conversas`
--
ALTER TABLE `conversas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `conversa_participantes`
--
ALTER TABLE `conversa_participantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `likes_posts`
--
ALTER TABLE `likes_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT de tabela `mensagens`
--
ALTER TABLE `mensagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `notificacoes`
--
ALTER TABLE `notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT de tabela `post_imagens`
--
ALTER TABLE `post_imagens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de tabela `preferencias_notificacoes`
--
ALTER TABLE `preferencias_notificacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=364;

--
-- AUTO_INCREMENT de tabela `preferencias_privacidade`
--
ALTER TABLE `preferencias_privacidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=286;

--
-- AUTO_INCREMENT de tabela `seguidores`
--
ALTER TABLE `seguidores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`comentario_pai_id`) REFERENCES `comentarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comentario_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_comentario_user` FOREIGN KEY (`user_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `conversa_participantes`
--
ALTER TABLE `conversa_participantes`
  ADD CONSTRAINT `conversa_participantes_ibfk_1` FOREIGN KEY (`conversa_id`) REFERENCES `conversas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `conversa_participantes_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

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
-- Restrições para tabelas `mensagens`
--
ALTER TABLE `mensagens`
  ADD CONSTRAINT `mensagens_ibfk_1` FOREIGN KEY (`conversa_id`) REFERENCES `conversas` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `mensagens_ibfk_2` FOREIGN KEY (`remetente_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;

--
-- Restrições para tabelas `notificacoes`
--
ALTER TABLE `notificacoes`
  ADD CONSTRAINT `notificacoes_ibfk_1` FOREIGN KEY (`destinatario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificacoes_ibfk_2` FOREIGN KEY (`remetente_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificacoes_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notificacoes_ibfk_4` FOREIGN KEY (`comentario_id`) REFERENCES `comentarios` (`id`) ON DELETE CASCADE;

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
-- Restrições para tabelas `post_imagens`
--
ALTER TABLE `post_imagens`
  ADD CONSTRAINT `post_imagens_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE;

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
