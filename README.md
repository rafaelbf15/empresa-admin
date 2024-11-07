
# Projeto EmpresaAdmin (CRUD - Funcionários)

Este projeto é composto por uma API construída em .NET 8, um frontend em Next.js e um banco de dados MySQL. Abaixo, você encontrará as instruções para configurar e executar o projeto localmente e via Docker Compose.

## Tecnologias Utilizadas

- **API**: .NET 8
- **Frontend**: Next.js
- **Banco de Dados**: MySQL

---

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Docker](https://docs.docker.com/get-docker/)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [MySQL](https://dev.mysql.com/downloads/installer/) (se for rodar localmente sem Docker)

## Estrutura do Projeto

- `EmpresaAdminAPI`: Contém o código-fonte da API em .NET 8.
- `empresa-admin-ui`: Contém o código-fonte do frontend em Next.js.
- `docker-compose.yml`: Arquivo para execução dos serviços via Docker Compose.
- `.env`: Arquivo com variáveis de ambiente para configuração.

---

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto empresa-admin-ui com o seguinte conteúdo:

```env
# Configurações do Next.js
NEXT_API_URL=http://localhost:5274/api
NEXT_PUBLIC_API_URL=http://localhost:5274/api
NEXTAUTH_SECRET=103dafd3e7aca046211434a4da2fe03f
NEXTAUTH_URL=http://localhost:3000
```

---

## Executando o Projeto Localmente

### 1. Banco de Dados MySQL

Se você está rodando o MySQL localmente (fora do Docker), siga estas instruções:

1. Inicie o serviço MySQL e crie um banco de dados com o nome configurado no `appsettings.Development`.
2. Crie um usuário com permissões para acessar o banco de dados.

### 2. Executando a API

1. Abra um terminal e navegue até a pasta `EmpresaAdminAPI`:
   ```bash
   cd EmpresaAdminAPI
   ```

2. Instale as dependências:
   ```bash
   dotnet restore
   ```

3. Configure as variáveis de ambiente conforme especificado no `.env` ou `appsettings.Development.json`.

4. Execute as migrações do banco de dados:
   ```bash
   dotnet ef database update
   ```

5. Inicie a API:
   ```bash
   dotnet run
   ```

   A API estará disponível em `http://localhost:5274`.

### 3. Executando o Frontend

1. Abra um novo terminal e navegue até a pasta `empresa-admin-ui`:
   ```bash
   cd empresa-admin-ui
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Inicie o servidor Next.js:
   ```bash
   npm run dev
   ```

   O frontend estará disponível em `http://localhost:3000`.

---

## Executando o Projeto com Docker Compose

O Docker Compose facilita a configuração, construção e execução do ambiente completo, incluindo o banco de dados, a API e o frontend.

### Passo 1: Construir e Executar os Contêineres

Na raiz do projeto (onde está o arquivo `docker-compose.yml`), execute o seguinte comando:

```bash
docker-compose up --build
```

Este comando irá:

- Construir a imagem do MySQL e iniciar o contêiner.
- Construir a imagem da API e iniciar o contêiner.
- Construir a imagem do frontend e iniciar o contêiner.

### Passo 2: Acessar os Serviços

- **API**: Acesse em `http://localhost:5274/swagger`.
- **Frontend**: Acesse em `http://localhost:3000`.

Para verificar se os serviços estão em execução, utilize o comando:

```bash
docker ps
```

### Passo 3: Parar os Contêineres

Para parar e remover todos os contêineres, execute:

```bash
docker-compose down
```

---

## Executando Testes de Integração

Os testes de integração dependem de um contêiner MySQL para rodar em um ambiente isolado. 

1. Navegue até o projeto de testes na pasta da API:
   ```bash
   cd EmpresaAdminAPI.Tests
   ```

2. Execute os testes:
   ```bash
   dotnet test
   ```

Os testes criarão e usarão um contêiner MySQL temporário, e ao final da execução dos testes, ele será encerrado automaticamente.

---

## Considerações Finais

Esse projeto utiliza `docker-compose` para simplificar o ambiente de desenvolvimento, mas você também pode rodá-lo manualmente conforme a necessidade. Certifique-se de configurar corretamente o `.env` para que a aplicação funcione conforme esperado.
