const answerElement = document.getElementById("answer");
const senderElement = document.getElementById("sender");
const starterElement = document.getElementById("starter");
const formElement = document.getElementById("form");
const conditionElement = document.getElementById("condition");
const conditionsJSON = {
    "Суми заснували у 1652 році?":"так",
    "Воскресенська церква побудована 1703 року?":"ні",
    "Альтанка збудували там де шукали нафту?":"так",
    "Суми не мають зеленої зони?":"ні",
    "Павловський цукровий завод був найбільшим у Європі":"так"
};
const conditionsArray = Object.keys(conditionsJSON);
let score = 0;
let highScoreElement = document.getElementById("best");
const bestScore = localStorage.getItem("best") || 0;
highScoreElement.innerHTML = "Найкращий результат: " + bestScore;
let currentQuestion = "";
let currentAnswer = "";

starterElement.addEventListener("click", () => {
    formElement.classList.remove('hidden');
    starterElement.style.display = "none";
    loadNewQuestion();
});

senderElement.addEventListener("click", (e) => {
    e.preventDefault();

    let answer = answerElement.value.trim();

    if (answer === '') {
        alert("Ви не ввели дані");
        return;
    }

    if (answer.toLowerCase() === currentAnswer.toString()) {
        score++;
        alert("Правильно! Ваш рахунок: " + score);
    } else {
        alert("Неправильно! Наступного разу вийде краще)");
        window.location.href="check.html";
    }

    if (score > bestScore) {
        localStorage.setItem("best", score);
        highScoreElement.innerHTML = "Найкращий результат: " + score;
    }

    answerElement.value = '';
    loadNewQuestion();
});

function loadNewQuestion() {
    const randomIndex = Math.floor(Math.random() * conditionsArray.length);
    currentQuestion = conditionsArray[randomIndex];
    currentAnswer = conditionsJSON[currentQuestion];
    conditionElement.innerHTML = "Питання: " + currentQuestion;
}
