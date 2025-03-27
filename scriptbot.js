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

// Обработка текстовых сообщений
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Добро пожаловать в Квест по безопасности! Нажмите /start для начала."
  );
});

// Обработка команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Выберите действие:", {
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Начать квест", url: "https://quest-cyber.vercel.app" }, // Замените на ваш URL
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
