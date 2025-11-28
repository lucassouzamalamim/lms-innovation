# Script simples para resetar o banco de dados
# Execute: .\reset-db.ps1

$env:PGPASSWORD = "admin"

# Tente encontrar o psql
$psqlPaths = @(
    "C:\Program Files\PostgreSQL\16\bin\psql.exe",
    "C:\Program Files\PostgreSQL\15\bin\psql.exe",
    "C:\Program Files\PostgreSQL\14\bin\psql.exe",
    "C:\Program Files\PostgreSQL\13\bin\psql.exe"
)

$psql = $null
foreach ($path in $psqlPaths) {
    if (Test-Path $path) {
        $psql = $path
        break
    }
}

if (-not $psql) {
    Write-Host "ERRO: psql nao encontrado!" -ForegroundColor Red
    Write-Host "Execute os scripts manualmente no pgAdmin:" -ForegroundColor Yellow
    Write-Host "  1. sql\01-clean-database.sql" -ForegroundColor White
    Write-Host "  2. sql\02-populate-database.sql" -ForegroundColor White
    exit 1
}

Write-Host "Limpando banco..." -ForegroundColor Yellow
& $psql -h localhost -p 5432 -U postgres -d reverso -f "01-clean-database.sql"

Write-Host ""
Write-Host "Populando banco..." -ForegroundColor Cyan
& $psql -h localhost -p 5432 -U postgres -d reverso -f "02-populate-database.sql"

Write-Host ""
Write-Host "Concluido!" -ForegroundColor Green
Write-Host "Login: admin@lms.com | Senha: senha123" -ForegroundColor White
