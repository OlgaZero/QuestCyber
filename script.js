const questions = [
  // Этап 1: Парольная защита
  [
    {
      question: "Какой из следующих паролей является самым надежным?",
      answers: ["123456", "password", "P@ssw0rd!2023"],
      correct: 2,
    },
    {
      question: "Какой из следующих методов помогает создать надежный пароль?",
      answers: [
        "Использовать дату рождения",
        "Смешивать буквы, цифры и специальные символы",
        "Использовать одно слово из словаря",
      ],
      correct: 1,
    },
    {
      question: "Как часто рекомендуется менять пароли?",
      answers: [
        "Раз в 5 лет",
        "Каждые 3-6 месяцев",
        "Никогда, если он надежный",
      ],
      correct: 1,
    },
  ],
  // Этап 2: Фишинг-ловушка
  [
    {
      question:
        "Какой из следующих признаков указывает на фишинговое сообщение?",
      answers: [
        "Сообщение содержит много грамматических ошибок",
        "Сообщение пришло от знакомого человека",
        "Сообщение предлагает выиграть приз за выполнение простого задания",
      ],
      correct: 0,
    },
    {
      question: "Какой из следующих способов поможет избежать фишинга?",
      answers: [
        "Игнорировать подозрительные сообщения",
        "Кликать на все ссылки в сообщениях",
        "Использовать один и тот же пароль для всех аккаунтов",
      ],
      correct: 0,
    },
    {
      question:
        "Если вы получили сообщение с просьбой подтвердить личные данные, что вы должны сделать?",
      answers: [
        "Немедленно ответить на сообщение",
        "Перейти на официальный сайт компании и проверить информацию",
        "Игнорировать сообщение, если оно пришло от незнакомца",
      ],
      correct: 1,
    },
  ],
  // Этап 3: Безопасный интернет
  [
    {
      question:
        "Какое из следующих действий является безопасным при использовании общественного Wi-Fi?",
      answers: [
        "Проверка банковского счета",
        "Использование VPN",
        "Вход в личные аккаунты",
      ],
      correct: 1,
    },
    {
      question:
        "Какой из следующих способов поможет защитить ваши данные в общественном Wi-Fi?",
      answers: [
        "Использовать открытые сети без пароля",
        "Включить двухфакторную аутентификацию",
        "Отключить антивирус",
      ],
      correct: 1,
    },
    {
      question: "Какой из следующих браузеров считается более безопасным?",
      answers: [
        "Браузер с минимальными обновлениями",
        "Браузер с встроенной защитой от трекеров",
        "Браузер, который не поддерживает расширения",
      ],
      correct: 1,
    },
  ],
  // Этап 4: Киберугрозы
  [
    {
      question: "Какой из следующих типов угроз является вирусом?",
      answers: ["Троянская программа", "Спам", "Фишинг"],
      correct: 0,
    },
    {
      question:
        "Какой из следующих типов вредоносного ПО может шифровать ваши файлы и требовать выкуп?",
      answers: ["Вирус", "Шпионское ПО", "Рансомваре"],
      correct: 2,
    },
    {
      question:
        "Какой из следующих способов поможет защитить ваш компьютер от вредоносных программ?",
      answers: [
        "Игнорировать обновления системы",
        "Установить антивирусное программное обеспечение",
        "Скачивать программы из непроверенных источников",
      ],
      correct: 1,
    },
  ],
  // Этап 5: Защита личных данных
  [
    {
      question:
        "Какой из следующих способов является лучшим для защиты личной информации в социальных сетях?",
      answers: [
        "Открыто делиться своим местоположением",
        "Настроить параметры конфиденциальности",
        "Принимать всех в друзья",
      ],
      correct: 1,
    },
    {
      question:
        "Какой из следующих типов информации не следует публиковать в социальных сетях?",
      answers: ["Ваше имя и фамилия", "Адрес вашего дома", "Ваши увлечения"],
      correct: 1,
    },
    {
      question:
        "Какой из следующих методов поможет защитить ваши аккаунты в социальных сетях?",
      answers: [
        "Использовать один и тот же пароль для всех аккаунтов",
        "Включить двухфакторную аутентификацию",
        "Делать свои аккаунты открытыми для всех",
      ],
      correct: 1,
    },
  ],
];

let currentStage = 0;
let currentQuestion = 0;
let score = 0;

function loadQuestion() {
  const questionData = questions[currentStage][currentQuestion];
  document.getElementById("questionText").textContent = questionData.question;
  document.getElementById("stageTitle").textContent = `Этап ${
    currentStage + 1
  }: ${getStageTitle(currentStage)}`;
  const form = document.getElementById("questionForm");
  form.innerHTML = ""; // Очистить предыдущие ответы

  questionData.answers.forEach((answer, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="answer" value="${index}"> ${answer}`; // Индекс ответа
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  });

  document.getElementById("result").textContent = "";
  document.querySelector(".continue-button").style.display = "none";
}

function getStageTitle(stage) {
  const titles = [
    "Парольная защита",
    "Фишинг-ловушка",
    "Безопасный интернет",
    "Киберугрозы",
    "Защита личных данных",
  ];
  return titles[stage];
}

function checkAnswer() {
  const form = document.getElementById("questionForm");
  const selectedAnswer = form.answer ? form.answer.value : null; // Получаем значение выбранного ответа
  const resultText = document.getElementById("result");

  if (selectedAnswer !== null) {
    // Проверяем, выбран ли ответ
    if (
      parseInt(selectedAnswer) ===
      questions[currentStage][currentQuestion].correct
    ) {
      // Сравниваем с правильным ответом
      resultText.textContent = "Правильно!";
      resultText.style.color = "green";
      score++;
    } else {
      resultText.textContent =
        "Неправильно. Правильный ответ: " +
        questions[currentStage][currentQuestion].answers[
          questions[currentStage][currentQuestion].correct
        ];
      resultText.style.color = "red";
    }
    document.querySelector(".continue-button").style.display = "block"; // Показать кнопку "Продолжить"
  } else {
    resultText.textContent = "Пожалуйста, выберите ответ.";
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions[currentStage].length) {
    loadQuestion();
  } else {
    currentStage++;
    currentQuestion = 0;
    if (currentStage < questions.length) {
      loadQuestion();
    } else {
      // Завершение квеста
      document.querySelector(".question-container").innerHTML = `
                <h2>Поздравляем! Вы завершили квест!</h2>
                <p>Ваш результат: ${score} из ${questions.length * 3}</p>
                <button onclick="window.location.href='index.html'">Вернуться в меню</button>
            `;
    }
  }
}

// Загрузка первого вопроса при загрузке страницы
loadQuestion();
