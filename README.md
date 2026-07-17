# Relogio-de-Ponto
Aplicação web para controle de ponto eletrônico, permitindo que funcionários registrem entrada e saída, consultem seus registros, e que administradores gerenciem usuários e consultem os pontos de todos os colaboradores.


## Tecnologias

**Backend**
- .NET 6
- ASP.NET Core Identity
- JWT (JSON Web Tokens)
- Entity Framework Core
- SQL Server

**Frontend**
- Angular 17+ (standalone components)
- Reactive Forms
- SweetAlert2

## Funcionalidades

- Autenticação via JWT com dois níveis de acesso: **Administrador** e **Comum**
- Cadastro de usuários com senha criptografada (ASP.NET Identity)
- Registro de entrada e saída de ponto (usuário vê apenas seus próprios registros)
- Consulta de ponto por Administrador, com filtro por nome e período (todos os funcionários)
- Alteração de senha
- Exportação de relatórios em CSV
- Layout responsivo (desktop e mobile)

## Como rodar o projeto localmente

### Pré-requisitos

- [.NET 6 SDK](https://dotnet.microsoft.com/download/dotnet/6.0)
- [Node.js](https://nodejs.org/) (18+) e npm
- [Angular CLI](https://angular.io/cli): `npm install -g @angular/cli`
- SQL Server (local ou instância remota)

### Backend

1. Entre na pasta do backend:
```bash
   cd backend/RegistroPonto
```

2. Configure a connection string no `appsettings.json`:
```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=SEU_SERVIDOR;Database=RegistroPonto;Trusted_Connection=True;TrustServerCertificate=True;"
   }
```

3. Configure a chave JWT (gere uma string aleatória de pelo menos 32 caracteres):
```json
   "Jwt": {
     "Key": "SUA_CHAVE_SECRETA_AQUI",
     "Issuer": "RegistroPonto",
     "Audience": "RegistroPontoAngular"
   }
```

4. Restaure os pacotes e rode as migrations:
```bash
   dotnet restore
   dotnet ef database update
```

5. Rode a API:
```bash
   dotnet run
```

   A API estará disponível em `https://localhost:7232` (confira a porta exata no `launchSettings.json` ou no console).

6. Acesse a documentação Swagger em `https://localhost:7232/swagger`.

### Frontend

1. Entre na pasta do frontend:
```bash
   cd frontend/registro-ponto-app
```

2. Instale as dependências:
```bash
   npm install
```

3. Confirme que a `apiUrl` em `src/app/core/data-access/base-http.service.ts` aponta para o mesmo endereço da API:
```typescript
   apiUrl = 'https://localhost:7232';
```

4. Rode o projeto:
```bash
   ng serve
```

5. Acesse `http://localhost:4200`.

### Certificado de desenvolvimento HTTPS

Se o navegador bloquear a chamada à API por certificado inválido, rode:
```bash
dotnet dev-certs https --clean
dotnet dev-certs https --trust
```

## Estrutura do Projeto

```text
sistema-ponto-eletronico/
│
├── backend/
│   └── RegistroPonto/
│       ├── Controllers/
│       │   ├── AuthController.cs
│       │   ├── UsuarioController.cs
│       │   └── RelogioPontoController.cs
│       │
│       ├── Models/
│       │   ├── UsuarioModel.cs
│       │   ├── RelogioPontoModel.cs
│       │   └── ServiceResponseModel.cs
│       │
│       ├── Dto/
│       │   ├── CadastroUsuarioDto.cs
│       │   ├── EditarUsuarioDto.cs
│       │   ├── AlterarSenhaDto.cs
│       │   └── UsuarioResponseDto.cs
│       │
│       ├── Enums/
│       │   └── DepartamentoEnum.cs
│       │
│       ├── Service/
│       │   ├── UsuarioService/
│       │   │   ├── UsuarioService.cs
│       │   │   ├── IUsuarioInterface.cs
│       │   │   └── Validators/
│       │   │       ├── IdentityErrorService.cs
│       │   │       └── UsuarioValidator.cs
│       │   │
│       │   ├── RelogioPontoService/
│       │   │   ├── RelogioPontoService.cs
│       │   │   └── IRelogioPontoInterface.cs
│       │   │
│       │   └── TokenService/
│       │       └── TokenService.cs
│       │
│       ├── DataContext/
│       │   └── ApplicationDdContext.cs
│       │
│       ├── Migrations/
│       │
│       ├── appsettings.json
│       ├── appsettings.Development.json    (fora do Git)
│       └── Program.cs
│
├── frontend/
│   └── registro-ponto-app/
│       └── src/
│           └── app/
│               ├── core/
│               │   ├── data-access/
│               │   │   └── base-http.service.ts
│               │   ├── guards/
│               │   │   ├── auth.guard.ts
│               │   │   └── role.guard.ts
│               │   ├── interceptors/
│               │   │   └── auth.interceptor.ts
│               │   ├── models/
│               │   │   ├── usuario.ts
│               │   │   └── login.ts
│               │   └── services/
│               │       ├── auth.service.ts
│               │       ├── usuario.service.ts
│               │       └── registro-ponto.service.ts
│               │
│               ├── features/
│               │   ├── auth/
│               │   │   ├── login/
│               │   │   │   ├── login.html
│               │   │   │   ├── login.scss
│               │   │   │   └── login.ts
│               │   │   ├── cadastro/
│               │   │   │   ├── cadastro.html
│               │   │   │   ├── cadastro.scss
│               │   │   │   └── cadastro.ts
│               │   │   └── auth.routes.ts
│               │   │
│               │   └── dashboard/
│               │       ├── components/
│               │       │   ├── dashboard-sidebar/
│               │       │   ├── dashboard-navbar/
│               │       │   ├── dashboard-table/
│               │       │   ├── dashboard-card-filter/
│               │       │   ├── dashboard-buttons/
│               │       │   ├── dashboard-input/
│               │       │   └── dashboard-select/
│               │       │
│               │       ├── pages/
│               │       │   ├── dashboard-home/
│               │       │   ├── dashboard-usuario/
│               │       │   ├── dashboard-consultar-pontos/
│               │       │   └── dashboard-configuracao/
│               │       │
│               │       ├── shared/
│               │       │   ├── config/
│               │       │   │   ├── sidebar-menu.config.ts
│               │       │   │   └── dashboard-table-headers.ts
│               │       │   └── service/
│               │       │       ├── sidebar.service.ts
│               │       │       └── theme.service.ts
│               │       │
│               │       ├── dashboard-layout/
│               │       │   ├── dashboard-layout.html
│               │       │   ├── dashboard-layout.scss
│               │       │   └── dashboard-layout.ts
│               │       │
│               │       └── dashboard.routes.ts
│               │
│               ├── shared/
│               │   ├── services/
│               │   │   └── form-validation.service.ts
│               │   ├── validators/
│               │   │   └── password.validator.ts
│               │   └── style/
│               │       └── dashboard-card.scss
│               │
│               ├── app.config.ts
│               └── app.routes.ts
│
├── .gitignore
└── README.md
```


Documentação completa e interativa disponível via Swagger em `/swagger` com a API rodando.

## Segurança implementada
- Senhas armazenadas com hash via ASP.NET Identity (nunca em texto puro)
- Autenticação via JWT com expiração de token
- Autorização por role (`Admin` / `Comum`) usando `[Authorize(Roles = "...")]`
- CORS configurado para aceitar apenas a origem do frontend Angular
- HTTPS obrigatório em desenvolvimento e produção
- Validação de modelo (`DataAnnotations`) nos DTOs de entrada
