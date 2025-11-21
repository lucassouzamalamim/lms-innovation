# LMS Innovation 🎓

Sistema de Gestão de Aprendizagem (LMS) moderno com gamificação, quizzes inteligentes e integração de pagamentos.

## 🚀 Tecnologias

### Backend
- **Java 18**
- **Spring Boot 3.3.5**
- **PostgreSQL**
- **Spring Security + JWT**
- **Hibernate/JPA**
- **Lombok**

### Frontend
- **React 18**
- **TypeScript**
- **Vite**
- **TailwindCSS**
- **Axios**
- **React Router**

## 📋 Funcionalidades

- ✅ Autenticação JWT (Stateless)
- ✅ Gestão de Cursos, Módulos e Aulas
- ✅ Sistema de Gamificação (XP, Níveis, Badges)
- ✅ Quizzes com IA
- ✅ Rastreamento de Progresso
- 🔄 Integração Hotmart (em desenvolvimento)
- 🔄 Chat em tempo real (WebSocket)

## 🛠️ Configuração

### Pré-requisitos
- Java 17 ou superior
- Node.js 18+
- PostgreSQL 14+

### Backend

```bash
cd lms-innovation

# Configure o banco de dados em src/main/resources/application.properties
# Altere a secret JWT para produção!

# Compile e execute
./mvnw spring-boot:run
```

### Frontend

```bash
cd lms-frontend

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

## 🗄️ Modelo de Dados

O sistema possui 13 entidades principais:

- **Core**: User, Course, Enrollment, Module, Lesson
- **Tracking**: LessonProgress
- **Gamificação**: Badge, UserBadge
- **Avaliação**: Quiz, Question, Option

## 🔐 Segurança

- Autenticação JWT com tokens de 2 horas
- Senhas criptografadas com BCrypt
- Controle de acesso baseado em roles (ADMIN, PROFESSOR, ALUNO)

## 📝 Licença

Este projeto está sob a licença MIT.

## 👨‍💻 Autor

Desenvolvido com ❤️ para revolucionar o ensino online.
