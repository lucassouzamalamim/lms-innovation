-- ============================================
-- Script para POPULAR o banco com dados de teste
-- ============================================

-- ============================================
-- 1. USUÁRIOS
-- ============================================
-- Senha para todos: "senha123" (hash BCrypt)
-- Para gerar novos hashes: use BCryptPasswordEncoder no Java ou online em https://bcrypt-generator.com/

INSERT INTO tb_users (id, nome, email, senha, role, xp_total, nivel_atual, avatar_url) VALUES
(1, 'Admin Sistema', 'admin@lms.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', 5000, 5, 'https://i.pravatar.cc/150?img=1'),
(2, 'Professor João Silva', 'joao@lms.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'PROFESSOR', 3000, 3, 'https://i.pravatar.cc/150?img=12'),
(3, 'Maria Santos', 'maria@lms.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ALUNO', 1500, 2, 'https://i.pravatar.cc/150?img=5'),
(4, 'Pedro Oliveira', 'pedro@lms.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ALUNO', 800, 1, 'https://i.pravatar.cc/150?img=8'),
(5, 'Ana Costa', 'ana@lms.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ALUNO', 2200, 3, 'https://i.pravatar.cc/150?img=9');

-- ============================================
-- 2. CURSOS
-- ============================================
INSERT INTO tb_courses (id, titulo, slug, descricao, banner_url, professor_id, data_criacao) VALUES
(1, 'React do Zero ao Avançado', 'react-zero-avancado', 
 'Aprenda React.js desde os fundamentos até conceitos avançados. Construa aplicações modernas e escaláveis com a biblioteca mais popular do mercado.', 
 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop', 
 2, NOW()),

(2, 'Spring Boot Completo', 'spring-boot-completo', 
 'Domine o desenvolvimento backend com Spring Boot. Aprenda a criar APIs RESTful, trabalhar com bancos de dados e implementar segurança.', 
 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=400&fit=crop', 
 2, NOW()),

(3, 'TypeScript na Prática', 'typescript-pratica', 
 'Aprenda TypeScript e leve suas habilidades JavaScript para o próximo nível com tipagem estática e recursos avançados.', 
 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop', 
 1, NOW());

-- ============================================
-- 3. MÓDULOS
-- ============================================
-- Curso 1: React do Zero ao Avançado
INSERT INTO tb_modules (id, titulo, ordem, course_id) VALUES
(1, 'Fundamentos do React', 1, 1),
(2, 'Hooks e Estado', 2, 1),
(3, 'Roteamento e Navegação', 3, 1),
(4, 'Gerenciamento de Estado Avançado', 4, 1);

-- Curso 2: Spring Boot Completo
INSERT INTO tb_modules (id, titulo, ordem, course_id) VALUES
(5, 'Introdução ao Spring Boot', 1, 2),
(6, 'APIs RESTful', 2, 2),
(7, 'Banco de Dados e JPA', 3, 2),
(8, 'Segurança com Spring Security', 4, 2);

-- Curso 3: TypeScript na Prática
INSERT INTO tb_modules (id, titulo, ordem, course_id) VALUES
(9, 'Primeiros Passos com TypeScript', 1, 3),
(10, 'Tipos Avançados', 2, 3),
(11, 'TypeScript com React', 3, 3);

-- ============================================
-- 4. AULAS (LESSONS)
-- ============================================
-- Módulo 1: Fundamentos do React
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(1, 'O que é React?', 'Introdução ao React e seus conceitos fundamentais', 
 'https://www.youtube.com/embed/Ke90Tje7VS0', 420, 1, 1, 'https://react.dev/learn'),
(2, 'Criando seu primeiro componente', 'Aprenda a criar componentes React do zero', 
 'https://www.youtube.com/embed/SqcY0GlETPk', 540, 2, 1, null),
(3, 'JSX e Props', 'Entenda como funciona JSX e como passar dados com props', 
 'https://www.youtube.com/embed/7iLfJA2VIqk', 600, 3, 1, null);

-- Módulo 2: Hooks e Estado
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(4, 'useState - Gerenciando Estado', 'Aprenda a usar o hook useState', 
 'https://www.youtube.com/embed/O6P86uwfdR0', 720, 1, 2, null),
(5, 'useEffect - Efeitos Colaterais', 'Entenda como funciona o useEffect', 
 'https://www.youtube.com/embed/0ZJgIjIuY7U', 840, 2, 2, null),
(6, 'useContext - Compartilhando Estado', 'Compartilhe estado entre componentes', 
 'https://www.youtube.com/embed/5LrDIWkK_Bc', 660, 3, 2, null);

-- Módulo 3: Roteamento e Navegação
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(7, 'Instalando React Router', 'Configure o React Router no seu projeto', 
 'https://www.youtube.com/embed/Law7wfdg_ls', 480, 1, 3, null),
(8, 'Rotas e Navegação', 'Criando rotas e navegando entre páginas', 
 'https://www.youtube.com/embed/Ul3y1LXxzdU', 720, 2, 3, null);

-- Módulo 4: Gerenciamento de Estado Avançado
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(9, 'Introdução ao Redux', 'Conceitos básicos do Redux', 
 'https://www.youtube.com/embed/CVpUuw9XSjY', 900, 1, 4, null),
(10, 'Redux Toolkit', 'Simplifique seu Redux com Redux Toolkit', 
 'https://www.youtube.com/embed/9zySeP5vH9c', 1020, 2, 4, null);

-- Módulo 5: Introdução ao Spring Boot
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(11, 'O que é Spring Boot?', 'Introdução ao framework Spring Boot', 
 'https://www.youtube.com/embed/vtPkZShrvXQ', 600, 1, 5, null),
(12, 'Criando seu primeiro projeto', 'Configure e crie seu primeiro projeto Spring Boot', 
 'https://www.youtube.com/embed/LXRU-Z36GEU', 780, 2, 5, null);

-- Módulo 6: APIs RESTful
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(13, 'Criando Controllers REST', 'Aprenda a criar endpoints REST', 
 'https://www.youtube.com/embed/8SGI_XS5OSM', 840, 1, 6, null),
(14, 'Verbos HTTP e Status Codes', 'Entenda GET, POST, PUT, DELETE e códigos de status', 
 'https://www.youtube.com/embed/iYM2zFP3Zn0', 720, 2, 6, null);

-- Módulo 7: Banco de Dados e JPA
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(15, 'Configurando JPA e Hibernate', 'Configure o acesso a banco de dados', 
 'https://www.youtube.com/embed/eR7JFw9qPaI', 900, 1, 7, null),
(16, 'Criando Entidades e Repositories', 'Mapeie suas entidades e crie repositories', 
 'https://www.youtube.com/embed/cP8CJv2hKME', 960, 2, 7, null);

-- Módulo 8: Segurança com Spring Security
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(17, 'Introdução ao Spring Security', 'Conceitos de autenticação e autorização', 
 'https://www.youtube.com/embed/t6prPki7daU', 720, 1, 8, null),
(18, 'JWT - JSON Web Tokens', 'Implementando autenticação com JWT', 
 'https://www.youtube.com/embed/VVn9OG9nfH0', 1080, 2, 8, null);

-- Módulo 9: Primeiros Passos com TypeScript
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(19, 'O que é TypeScript?', 'Introdução ao TypeScript', 
 'https://www.youtube.com/embed/ahCwqrYpIuM', 480, 1, 9, null),
(20, 'Tipos Básicos', 'Aprenda sobre tipos primitivos', 
 'https://www.youtube.com/embed/wyO8RWl1ges', 600, 2, 9, null);

-- Módulo 10: Tipos Avançados
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(21, 'Interfaces e Types', 'Criando contratos com interfaces', 
 'https://www.youtube.com/embed/16lhueqbmhg', 720, 1, 10, null),
(22, 'Generics', 'Criando código reutilizável com generics', 
 'https://www.youtube.com/embed/nViEqpgwxHE', 840, 2, 10, null);

-- Módulo 11: TypeScript com React
INSERT INTO tb_lessons (id, titulo, descricao, video_embed_url, duracao_segundos, ordem, module_id, material_apoio_url) VALUES
(23, 'Configurando TypeScript no React', 'Setup inicial do projeto', 
 'https://www.youtube.com/embed/Z5iWr6Srsj8', 540, 1, 11, null),
(24, 'Tipando Componentes e Props', 'Adicione tipos aos seus componentes', 
 'https://www.youtube.com/embed/TiSGujM22OI', 660, 2, 11, null);

-- ============================================
-- 5. MATRÍCULAS (ENROLLMENTS)
-- ============================================
INSERT INTO tb_enrollments (id, user_id, course_id, status, data_inicio, progresso_percentual) VALUES
(1, 3, 1, 'ATIVO', NOW() - INTERVAL '10 days', 45.5),
(2, 3, 2, 'ATIVO', NOW() - INTERVAL '5 days', 20.0),
(3, 4, 1, 'ATIVO', NOW() - INTERVAL '15 days', 60.0),
(4, 5, 1, 'ATIVO', NOW() - INTERVAL '30 days', 100.0),
(5, 5, 3, 'ATIVO', NOW() - INTERVAL '2 days', 15.0);

-- ============================================
-- 6. PROGRESSO DAS AULAS
-- ============================================
-- Maria (user 3) - Curso React
INSERT INTO tb_lesson_progress (id, user_id, lesson_id, concluida, data_visualizacao) VALUES
(1, 3, 1, true, NOW() - INTERVAL '9 days'),
(2, 3, 2, true, NOW() - INTERVAL '8 days'),
(3, 3, 3, true, NOW() - INTERVAL '7 days'),
(4, 3, 4, true, NOW() - INTERVAL '5 days'),
(5, 3, 5, false, null);

-- Pedro (user 4) - Curso React
INSERT INTO tb_lesson_progress (id, user_id, lesson_id, concluida, data_visualizacao) VALUES
(6, 4, 1, true, NOW() - INTERVAL '14 days'),
(7, 4, 2, true, NOW() - INTERVAL '13 days'),
(8, 4, 3, true, NOW() - INTERVAL '12 days'),
(9, 4, 4, true, NOW() - INTERVAL '10 days'),
(10, 4, 5, true, NOW() - INTERVAL '8 days'),
(11, 4, 6, true, NOW() - INTERVAL '6 days');

-- Ana (user 5) - Curso React (Completo)
INSERT INTO tb_lesson_progress (id, user_id, lesson_id, concluida, data_visualizacao) VALUES
(12, 5, 1, true, NOW() - INTERVAL '29 days'),
(13, 5, 2, true, NOW() - INTERVAL '28 days'),
(14, 5, 3, true, NOW() - INTERVAL '27 days'),
(15, 5, 4, true, NOW() - INTERVAL '25 days'),
(16, 5, 5, true, NOW() - INTERVAL '23 days'),
(17, 5, 6, true, NOW() - INTERVAL '21 days'),
(18, 5, 7, true, NOW() - INTERVAL '18 days'),
(19, 5, 8, true, NOW() - INTERVAL '15 days'),
(20, 5, 9, true, NOW() - INTERVAL '10 days'),
(21, 5, 10, true, NOW() - INTERVAL '5 days');

-- ============================================
-- 7. BADGES (CONQUISTAS)
-- ============================================
INSERT INTO tb_badges (id, nome, descricao, icone_url, codigo_regra) VALUES
(1, 'Primeira Aula', 'Complete sua primeira aula', 'https://img.icons8.com/color/96/000000/trophy.png', 'PRIMEIRA_AULA'),
(2, 'Dedicado', 'Complete 10 aulas', 'https://img.icons8.com/color/96/000000/medal.png', 'DEZ_AULAS'),
(3, 'Mestre', 'Complete um curso inteiro', 'https://img.icons8.com/color/96/000000/graduation-cap.png', 'CURSO_COMPLETO'),
(4, 'Iniciante', 'Alcance 100 XP', 'https://img.icons8.com/color/96/000000/star.png', 'XP_100'),
(5, 'Intermediário', 'Alcance 1000 XP', 'https://img.icons8.com/color/96/000000/diamond.png', 'XP_1000');

-- ============================================
-- 8. BADGES DOS USUÁRIOS
-- ============================================
INSERT INTO tb_user_badges (id, user_id, badge_id, data_conquista) VALUES
(1, 3, 1, NOW() - INTERVAL '9 days'),
(2, 3, 4, NOW() - INTERVAL '7 days'),
(3, 4, 1, NOW() - INTERVAL '14 days'),
(4, 4, 2, NOW() - INTERVAL '6 days'),
(5, 4, 4, NOW() - INTERVAL '10 days'),
(6, 5, 1, NOW() - INTERVAL '29 days'),
(7, 5, 2, NOW() - INTERVAL '20 days'),
(8, 5, 3, NOW() - INTERVAL '5 days'),
(9, 5, 4, NOW() - INTERVAL '25 days'),
(10, 5, 5, NOW() - INTERVAL '10 days');

-- ============================================
-- Resetar sequences para continuar do último ID
-- ============================================
SELECT setval('tb_users_id_seq', (SELECT MAX(id) FROM tb_users));
SELECT setval('tb_courses_id_seq', (SELECT MAX(id) FROM tb_courses));
SELECT setval('tb_modules_id_seq', (SELECT MAX(id) FROM tb_modules));
SELECT setval('tb_lessons_id_seq', (SELECT MAX(id) FROM tb_lessons));
SELECT setval('tb_enrollments_id_seq', (SELECT MAX(id) FROM tb_enrollments));
SELECT setval('tb_lesson_progress_id_seq', (SELECT MAX(id) FROM tb_lesson_progress));
SELECT setval('tb_badges_id_seq', (SELECT MAX(id) FROM tb_badges));
SELECT setval('tb_user_badges_id_seq', (SELECT MAX(id) FROM tb_user_badges));

-- ============================================
-- Mensagem de confirmação
-- ============================================
SELECT 'Banco de dados populado com sucesso!' as status,
       (SELECT COUNT(*) FROM tb_users) as total_usuarios,
       (SELECT COUNT(*) FROM tb_courses) as total_cursos,
       (SELECT COUNT(*) FROM tb_modules) as total_modulos,
       (SELECT COUNT(*) FROM tb_lessons) as total_aulas;
