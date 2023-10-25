# TELEGRAM CHATBOT APP

Projeto que permite aos usuários interagirem com chats ou grupos do Telegram através de um bot do telegram via chat, usando Node.js e Vue com Composition API.

## O que se espera do App

- [x] - Cadastrar usuários com o seu respectivo token do bot do telegram
- [x] - Integrar o App à Api do Telegram
- [x] - Que possa receber mensagens dos usuários ou grupos que interagirem com o bot pelo App do Telegram em tempo real
- [x] - Que possa enviar respostas via chat para os usuários ou grupos do Telegram em tempo real

## Como rodar o projeto

- git clone https://github.com/TdB27/clone-knowledge-app.git

### Back-end

- cd backend/
- npm install
- knex migrate:latest
- npm start
- Para acessar as tecnologias usadas no Back-end [acesse aqui](https://github.com/TdB27/telegram-chatbot/edit/main/backend/README.md)

### Front-end

- cd frontend/
- npm install
- npm run dev
- Para acessar as tecnologias usadas no Front-end [acesse aqui](https://github.com/TdB27/telegram-chatbot/edit/main/frontend/README.md)

## Futuras Features

- [ ] - Permitir que o comportamento adequado de imagens (tais como fotos, gifs, stickers, emojis enviadas pelo usuário) possam ser interpretadas corretamente pelo App
- [ ] - Permitir que o sistema responda com imagens tais como descrita acima
