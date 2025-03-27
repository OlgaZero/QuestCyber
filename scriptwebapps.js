/* интерфейс в Telegram для Mini Apps */
const TelegramBot = require("node-telegram-bot-api");
const express = require("express");
const app = express();

const token = process.env.BOT_TOKEN; // Используйте переменную среды для токена
const bot = new TelegramBot(token);

// Установка вебхука
app.use(express.json());
app.post(`/webhook/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Отправка сообщения с кнопкой для запуска Mini App
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Нажмите на кнопку, чтобы начать квест:", {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Начать квест",
            url: "https://questcyber.vercel.app", // Замените на ваш URL
          },
        ],
      ],
    },
  });
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
