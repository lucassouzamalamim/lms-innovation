-- ============================================
-- Script para LIMPAR todos os dados do banco
-- ============================================
-- ATENÇÃO: Este script irá DELETAR TODOS os dados!
-- Execute com cuidado!

-- Desabilitar verificação de chaves estrangeiras temporariamente
SET session_replication_role = 'replica';

-- Deletar dados de todas as tabelas (ordem inversa das dependências)
DELETE FROM tb_user_badges;
DELETE FROM tb_lesson_progress;
DELETE FROM tb_enrollments;
DELETE FROM tb_options;
DELETE FROM tb_questions;
DELETE FROM tb_quizzes;
DELETE FROM tb_lessons;
DELETE FROM tb_modules;
DELETE FROM tb_courses;
DELETE FROM tb_badges;
DELETE FROM tb_users;

-- Reabilitar verificação de chaves estrangeiras
SET session_replication_role = 'origin';

-- Resetar as sequences (auto-increment)
ALTER SEQUENCE IF EXISTS tb_users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_courses_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_modules_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_lessons_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_quizzes_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_questions_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_options_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_enrollments_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_lesson_progress_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_badges_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS tb_user_badges_id_seq RESTART WITH 1;

-- Mensagem de confirmação
SELECT 'Banco de dados limpo com sucesso!' as status;
