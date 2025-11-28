# ============================================
# Script PowerShell para Limpar e Popular o Banco
# ============================================

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  LMS Innovation - Database Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Configurações do PostgreSQL
$PGHOST = "localhost"
$PGPORT = "5432"
$PGDATABASE = "reverso"
$PGUSER = "postgres"
$PGPASSWORD = "admin"

# Definir variável de ambiente para senha
$env:PGPASSWORD = $PGPASSWORD

# Caminho para o psql (ajuste se necessário)
$PSQL_PATHS = @(
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe",
    "C:\Program Files\PostgreSQL\13\bin\psql.exe",
    "C:\PostgreSQL\bin\psql.exe"
)

# Encontrar psql
$PSQL = $null
foreach ($path in $PSQL_PATHS) {
    if (Test-Path $path) {
        $PSQL = $path
        break
    }
}

if (-not $PSQL) {
    Write-Host "❌ ERRO: psql não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o PostgreSQL ou adicione o psql ao PATH." -ForegroundColor Yellow
    Write-Host "Ou execute os scripts SQL manualmente usando pgAdmin ou DBeaver." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Arquivos SQL disponíveis em:" -ForegroundColor Cyan
    Write-Host "  - sql\01-clean-database.sql" -ForegroundColor White
    Write-Host "  - sql\02-populate-database.sql" -ForegroundColor White
    exit 1
}

Write-Host "✓ psql encontrado em: $PSQL" -ForegroundColor Green
Write-Host ""

# Menu
Write-Host "Escolha uma opção:" -ForegroundColor Yellow
Write-Host "  1 - Limpar banco de dados (DELETA TUDO!)" -ForegroundColor Red
Write-Host "  2 - Popular banco de dados com dados de teste" -ForegroundColor Green
Write-Host "  3 - Limpar E popular (Resetar completo)" -ForegroundColor Cyan
Write-Host "  0 - Sair" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "Digite sua escolha (0-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "⚠️  ATENÇÃO: Isso irá DELETAR TODOS os dados!" -ForegroundColor Red
        $confirm = Read-Host "Tem certeza? (digite 'SIM' para confirmar)"
        
        if ($confirm -eq "SIM") {
            Write-Host ""
            Write-Host "🗑️  Limpando banco de dados..." -ForegroundColor Yellow
            & $PSQL -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f "sql\01-clean-database.sql"
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Banco limpo com sucesso!" -ForegroundColor Green
            }
            else {
                Write-Host "❌ Erro ao limpar banco!" -ForegroundColor Red
            }
        }
        else {
            Write-Host "Operação cancelada." -ForegroundColor Yellow
        }
    }
    
    "2" {
        Write-Host ""
        Write-Host "📊 Populando banco de dados..." -ForegroundColor Cyan
        & $PSQL -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f "sql\02-populate-database.sql"
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host ""
            Write-Host "✓ Banco populado com sucesso!" -ForegroundColor Green
            Write-Host ""
            Write-Host "👥 Usuários disponíveis:" -ForegroundColor Cyan
            Write-Host "  - admin@lms.com (senha: senha123) - ADMIN" -ForegroundColor White
            Write-Host "  - joao@lms.com (senha: senha123) - PROFESSOR" -ForegroundColor White
            Write-Host "  - maria@lms.com (senha: senha123) - ALUNO" -ForegroundColor White
            Write-Host "  - pedro@lms.com (senha: senha123) - ALUNO" -ForegroundColor White
            Write-Host "  - ana@lms.com (senha: senha123) - ALUNO" -ForegroundColor White
        }
        else {
            Write-Host "❌ Erro ao popular banco!" -ForegroundColor Red
        }
    }
    
    "3" {
        Write-Host ""
        Write-Host "⚠️  ATENÇÃO: Isso irá DELETAR TODOS os dados e popular novamente!" -ForegroundColor Red
        $confirm = Read-Host "Tem certeza? (digite 'SIM' para confirmar)"
        
        if ($confirm -eq "SIM") {
            Write-Host ""
            Write-Host "🗑️  Limpando banco de dados..." -ForegroundColor Yellow
            & $PSQL -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f "sql\01-clean-database.sql"
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "✓ Banco limpo!" -ForegroundColor Green
                Write-Host ""
                Write-Host "📊 Populando banco de dados..." -ForegroundColor Cyan
                & $PSQL -h $PGHOST -p $PGPORT -U $PGUSER -d $PGDATABASE -f "sql\02-populate-database.sql"
                
                if ($LASTEXITCODE -eq 0) {
                    Write-Host ""
                    Write-Host "✓ Reset completo realizado com sucesso!" -ForegroundColor Green
                    Write-Host ""
                    Write-Host "👥 Usuários disponíveis:" -ForegroundColor Cyan
                    Write-Host "  - admin@lms.com (senha: senha123) - ADMIN" -ForegroundColor White
                    Write-Host "  - joao@lms.com (senha: senha123) - PROFESSOR" -ForegroundColor White
                    Write-Host "  - maria@lms.com (senha: senha123) - ALUNO" -ForegroundColor White
                    Write-Host "  - pedro@lms.com (senha: senha123) - ALUNO" -ForegroundColor White
                    Write-Host "  - ana@lms.com (senha: senha123) - ALUNO" -ForegroundColor White
                }
                else {
                    Write-Host "❌ Erro ao popular banco!" -ForegroundColor Red
                }
            }
            else {
                Write-Host "❌ Erro ao limpar banco!" -ForegroundColor Red
            }
        }
        else {
            Write-Host "Operação cancelada." -ForegroundColor Yellow
        }
    }
    
    "0" {
        Write-Host "Saindo..." -ForegroundColor Gray
    }
    
    default {
        Write-Host "Opção inválida!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Pressione qualquer tecla para sair..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')
