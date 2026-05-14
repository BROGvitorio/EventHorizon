# EventHorizon API

## Estrutura funcional atualmente implementada

### Autenticação

* Cadastro de usuário
* Login
* Validação de credenciais
* Redirecionamento autenticado

### CRUD de usuários

### Interface Web

* Página de login
* Página de cadastro
* Dashboard administrativa

---

## Como executar o projeto

### 1. Clonar ou baixar o projeto

Clone o repositório:

```bash
git clone https://github.com/BROGvitorio/EventHorizon_API.git
```

Ou faça o download do arquivo `.zip` diretamente pelo GitHub e extraia o conteúdo.

---

### 2. Abrir a pasta do projeto

Após descompactar o projeto, abra um terminal dentro da pasta raiz do projeto.

---

### 3. Executar a aplicação

Execute o seguinte comando:

```bash
dotnet run
```

---

### 4. Acessar a aplicação

Após a execução, o terminal exibirá uma URL HTTP semelhante a:

```txt
http://localhost:xxxx
```

Abra essa URL no navegador.

---

## Fluxo de utilização

### Cadastro

Na página de cadastro é possível criar um novo usuário.

Os dados cadastrados são armazenados no banco MySQL local configurado no projeto.

---

### Login

Após o cadastro, o usuário pode realizar login utilizando as mesmas credenciais registradas no banco.

---

### Dashboard

Depois do login bem-sucedido, o sistema redireciona automaticamente para a dashboard.

Na dashboard é possível:

* Visualizar usuários cadastrados
* Criar novos usuários
* Editar usuários existentes
* Remover usuários

