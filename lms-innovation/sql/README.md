# Scripts SQL - LMS Innovation

Este diretório contém scripts SQL para gerenciar os dados do banco de dados.

## 📋 Scripts Disponíveis

### 1. `01-clean-database.sql`
**Limpa TODOS os dados do banco de dados**

- Deleta todos os registros de todas as tabelas
- Reseta as sequences (auto-increment) para começar do 1
- ⚠️ **ATENÇÃO**: Este script é DESTRUTIVO! Use com cuidado!

### 2. `02-populate-database.sql`
**Popula o banco com dados de teste completos**

Cria dados de exemplo incluindo:
- **5 usuários** (admin, professor, 3 alunos)
- **3 cursos** completos (React, Spring Boot, TypeScript)
- **11 módulos** distribuídos entre os cursos
- **24 aulas** com vídeos do YouTube
- **5 matrículas** de alunos em cursos
- **21 registros de progresso** de aulas
- **5 badges** (conquistas)
- **10 badges conquistadas** pelos usuários

## 🚀 Como Usar

### Opção 1: Via pgAdmin ou DBeaver

1. Conecte-se ao banco de dados `reverso`
2. Abra o script desejado
3. Execute o script

### Opção 2: Via Terminal (psql)

```bash
# Navegar até o diretório do projeto
cd c:\Reverso\lms-innovation

# 1. Limpar o banco (CUIDADO!)
psql -U postgres -d reverso -f sql/01-clean-database.sql

# 2. Popular com dados de teste
psql -U postgres -d reverso -f sql/02-populate-database.sql
```

### Opção 3: Via PowerShell (Windows)

```powershell
# Definir senha do PostgreSQL (se necessário)
$env:PGPASSWORD="admin"

# 1. Limpar o banco
psql -U postgres -d reverso -f .\sql\01-clean-database.sql

# 2. Popular com dados de teste
psql -U postgres -d reverso -f .\sql\02-populate-database.sql
```

## 👥 Usuários de Teste

Após executar o script de população, você terá os seguintes usuários:

| Nome | Email | Senha | Role |
|------|-------|-------|------|
| Admin Sistema | admin@lms.com | senha123 | ADMIN |
| Professor João Silva | joao@lms.com | senha123 | PROFESSOR |
| Maria Santos | maria@lms.com | senha123 | ALUNO |
| Pedro Oliveira | pedro@lms.com | senha123 | ALUNO |
| Ana Costa | ana@lms.com | senha123 | ALUNO |

## 📚 Cursos Disponíveis

1. **React do Zero ao Avançado** (ID: 1)
   - 4 módulos
   - 10 aulas
   
2. **Spring Boot Completo** (ID: 2)
   - 4 módulos
   - 8 aulas
   
3. **TypeScript na Prática** (ID: 3)
   - 3 módulos
   - 6 aulas

## 🎯 Testando a Aplicação

Após popular o banco:

1. **Faça login** com qualquer usuário (senha: `senha123`)
2. **Acesse um curso**: `http://localhost:5173/course/1`
3. **Veja o progresso** dos alunos no dashboard

## ⚠️ Observações Importantes

- Os vídeos usam URLs do YouTube como exemplo
- As senhas estão em hash BCrypt (senha original: `senha123`)
- Os dados de progresso incluem datas retroativas para simular uso real
- As imagens de avatar usam o serviço pravatar.cc
- As imagens de banner usam Unsplash

## 🔄 Workflow Recomendado

Para resetar e começar do zero:

```bash
# 1. Limpar tudo
psql -U postgres -d reverso -f sql/01-clean-database.sql

# 2. Popular novamente
psql -U postgres -d reverso -f sql/02-populate-database.sql

# 3. Reiniciar o backend (se necessário)
```

---

**Dica**: Mantenha estes scripts atualizados conforme o schema do banco evolui!
