# TELEGRAM CHATBOT APP

Projeto que permite aos usuários interagirem com chats ou grupos do Telegram através de um bot do telegram via chat, usando Node.js e Vue com Composition API.

## O que se espera do App

- [x] - Cadastrar usuários com o seu respectivo token do bot do telegram
- [x] - Integrar o App à Api do Telegram
- [x] - Que possa receber mensagens dos usuários ou grupos que interagirem com o bot pelo App do Telegram em tempo real
- [x] - Que possa enviar respostas via chat para os usuários ou grupos do Telegram em tempo real

## Como rodar o projeto

```
git clone https://github.com/TdB27/telegram-chatbot.git
```

### Back-end

#### Passo a passo do DB

- Fazer uma copia do arquivo env_file e renomeá-lo para .env
- O banco utilizado para armazenar os logs é o PostgreSQL, então faz-se necessário criar um banco do PG com o mesmo nome descrito no campo 'database' no .env (Previamente o banco está com o nome de 'telegram_chatbot')
- No arquivo .env, os campos user e password devem ter as credenciais do seu de banco de dados

#### No terminal, rodar os seguintes comandos

- cd backend/
- npm install
- knex migrate:latest
- knex seed:run
- npm start
- Para acessar as tecnologias usadas no Back-end [acesse aqui](https://github.com/TdB27/telegram-chatbot/blob/main/backend/README.md)

### Front-end

- cd frontend/
- npm install
- npm run dev
- Na tela de login o usuário padrão é: admin@admin.com e a senha: 1234
- Para acessar as tecnologias usadas no Front-end [acesse aqui](https://github.com/TdB27/telegram-chatbot/blob/main/frontend/README.md)

## Futuras Features

- [ ] - Implementar testes automatizados
- [ ] - Buscar a imagem de perfil dos usuarios do bot
- [ ] - Permitir que o comportamento adequado de imagens (tais como fotos, gifs, stickers, emojis enviadas pelo usuário) possam ser interpretadas corretamente pelo App
- [ ] - Permitir que o sistema responda com imagens tais como descrita acima
- [ ] - Enviar mensagens personalizadas e automatizadas para bot
