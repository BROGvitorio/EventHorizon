# EventHorizon

## 1. Descrição do Projeto
O EventHorizon é uma aplicação que simula um banco digital. Desenvolvido em uma arquitetura cliente-servidor, utiliza .NET, Entity Framework Core e MySQL no backend, combinados a React, TypeScript e Bootstrap no frontend. Com autenticação segura baseada em JWT e uma API documentada via Swagger, o sistema permite o cadastro de usuários e o controle completo de perfis de Pessoas Físicas (PF) e Jurídicas (PJ), além do gerenciamento de contas bancárias.

## 2. Tecnologias Utilizadas
* Linguagens: C#, HTML, CSS e Typescript
* Frameworks: .NET, Entity Framework Core e Bootstrap
* Banco de dados: Mysql
* Segurança: JSON Web Token (JWT)
* Documentação de API: Swagger

## 3. Instruções de Execução
Para rodar o projeto localmente, siga os passos abaixo:

> #### Pré-requisitos
> Antes de começar, certifique-se de ter instalado em sua máquina:
> * .NET SDK (compatível com a versão 10.0)
> * EF Core CLI
> * Node.js e npm

### 3.1. Clonar o repositório
Clone o projeto para o seu ambiente local utilizando o Git:
```bash
git clone https://github.com/BROGvitorio/EventHorizon.git
cd EventHorizon

```
> 💡 **Alternativa:** Se preferir, faça o download do arquivo .zip diretamente pela interface do GitHub e extraia o conteúdo na sua máquina.

### 3.2. Configurar e executar o Backend (API)
Abra um terminal na raiz do projeto e execute os comandos abaixo para aplicar as migrations do banco de dados e iniciar o servidor .NET:

```bash
cd EventHorizon_API
dotnet build
dotnet ef database update
dotnet run

```
*Nota: Mantenha este terminal aberto para acompanhar os logs da API.*

### 3.3. Configurar e executar o Frontend (Client)
Abra um outro terminal na raiz do projeto e execute os comandos para instalar as dependências e iniciar o servidor de desenvolvimento:

```bash
cd EventHorizon_Client
npm install
npm run dev

```

### 3.4. Acessar a aplicação
Assim que o comando do frontend for finalizado, o terminal do Client exibirá a URL local gerada, semelhante a:
```txt
http://localhost:5173

```
Basta abrir esse endereço no seu navegador para começar a usar o **EventHorizon**!

## 4. Endpoints da API
> Obs.: Todos os endpoints começam de `http://localhost:5042/`

#### Gerenciamento de usuários `/api/User`
* GET `/GetByEmail/{userEmail}` - Retorna um usuário pelo email
* POST - Adiciona um novo usuário

#### Gerenciamento de perfil PF `/api/Person`
* GET `/GetByUserId/{userId}` - Retorna um cadastro de pessoa física pelo ID de usuário
* GET `/GetByCpf/{personCpf}` - Retorna um cadastro de pessoa física pelo CPF do perfil
* POST - Adiciona um novo casdastro PF

#### Gerenciamento de perfil PJ `/api/Company`
* GET `/GetByUserId/{userId}` - Retorna um cadastro de pessoa jurídica pelo ID de usuário
* GET `/GetByCnpj/{companyCnpj}` - Retorna um cadastro de pessoa jurícica pelo CNPJ do perfil
* POST - Adiciona um novo casdastro PJ

#### Gerenciamento de contas bancárias `/api/BankAccount`
* GET `/GetByOwnerId/{ownerId}` - Retorna uma lista de contas bancárias pelo ID do perfil titular
* POST - Adiciona uma nova conta bancária

#### Gerenciamento de transações bancárias `/api/BankTransaction`
* POST - Adiciona uma nova transação bancária
