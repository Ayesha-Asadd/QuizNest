const questions = [
    {
        question: "Which flower is the national flower of Pakistan?",
        answers: [
            { text: "Rose", correct: false },
            { text: "Jasmine", correct: true },
            { text: "Sunflower", correct: false },
            { text: "Lily", correct: false }
        ]
    },
    {
        question: "What is the traditional dress of Pakistan?",
        answers: [
            { text: "Kurta Pajama", correct: false },
            { text: "Shalwar Kameez", correct: true },
            { text: "Sherwani", correct: false },
            { text: "Sari", correct: false }
        ]
    },
    {
        question: "Which is a popular Pakistani folk dance from Punjab?",
        answers: [
            { text: "Bhangra", correct: true },
            { text: "Attan", correct: false },
            { text: "Kathak", correct: false },
            { text: "Bharatanatyam", correct: false }
        ]
    },
    {
        question: "What is 'Eid-ul-Fitr' celebrated for?",
        answers: [
            { text: "The end of Hajj", correct: false },
            { text: "Beginning of Ramadan", correct: false },
            { text: "End of Ramadan", correct: true },
            { text: "Start of Muharram", correct: false }
        ]
    },
    {
        question: "Which city is known as the cultural capital of Pakistan?",
        answers: [
            { text: "Karachi", correct: false },
            { text: "Lahore", correct: true },
            { text: "Islamabad", correct: false },
            { text: "Peshawar", correct: false }
        ]
    },
    {
        question: "What is the staple food in most Pakistani meals?",
        answers: [
            { text: "Rice", correct: false },
            { text: "Roti", correct: true },
            { text: "Pasta", correct: false },
            { text: "Bread", correct: false }
        ]
    },
    {
        question: "Who is known as the national poet of Pakistan?",
        answers: [
            { text: "Mirza Ghalib", correct: false },
            { text: "Allama Iqbal", correct: true },
            { text: "Faiz Ahmed Faiz", correct: false },
            { text: "Habib Jalib", correct: false }
        ]
    },
    {
        question: "Which province is famous for 'Sindhi Ajrak' and cap?",
        answers: [
            { text: "Punjab", correct: false },
            { text: "Khyber Pakhtunkhwa", correct: false },
            { text: "Sindh", correct: true },
            { text: "Balochistan", correct: false }
        ]
    },
    {
        question: "What is the famous truck art in Pakistan known for?",
        answers: [
            { text: "Minimalism", correct: false },
            { text: "Abstract shapes", correct: false },
            { text: "Bright colors and intricate designs", correct: true },
            { text: "Calligraphy only", correct: false }
        ]
    },
    {
        question: "Which Pakistani musician is known worldwide for Qawwali?",
        answers: [
            { text: "Nusrat Fateh Ali Khan", correct: true },
            { text: "Atif Aslam", correct: false },
            { text: "Ali Zafar", correct: false },
            { text: "Rahat Fateh Ali Khan", correct: false }
        ]
    }
];


// Get DOM elements
const startPage = document.getElementById('start-page');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizPage = document.getElementById('quiz-page');
const questionText = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreDisplay = document.getElementById('score-display');
const timerDisplay = document.getElementById('timer-display');
const resultPage = document.getElementById('result-page');
const finalScoreDisplay = document.getElementById('final-score');
const totalQuestionsDisplay = document.getElementById('total-questions');
const percentageScoreDisplay = document.getElementById('percentage-score');
const timeTakenDisplay = document.getElementById('time-taken-display');
const tryAgainBtn = document.getElementById('try-again-btn');

let shuffledQuestions, currentQuestionIndex;
let score = 0;
let timeLeft = 60; // Initial time in seconds
let timerInterval;
let quizStartTime;

// Event Listeners
startQuizBtn.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
tryAgainBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    startPage.classList.remove('active');
    quizPage.classList.add('active');
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timeLeft = 60; // Reset time
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    quizStartTime = Date.now(); // Record start time
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    setNextQuestion();
    startTimer();
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < shuffledQuestions.length) {
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    } else {
        endQuiz();
    }
}

function showQuestion(question) {
    questionText.textContent = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    if (isCorrect) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        selectedButton.classList.add('correct');
    } else {
        selectedButton.classList.add('wrong');
    }

    // Disable all buttons after selection
    Array.from(answerButtonsElement.children).forEach(button => {
        button.classList.add('disabled'); // Add disabled class for styling
        button.removeEventListener('click', selectAnswer); // Remove listener to prevent re-clicking
        if (button.dataset.correct === 'true') {
            button.classList.add('correct'); // Show correct answer even if wrong was chosen
        }
    });

    nextButton.classList.remove('hide');
}

function endQuiz() {
    clearInterval(timerInterval); // Stop the timer

    quizPage.classList.remove('active');
    resultPage.classList.add('active');

    const totalQuestions = shuffledQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    const timeTaken = (Date.now() - quizStartTime) / 1000; // Time in seconds

    finalScoreDisplay.textContent = score;
    totalQuestionsDisplay.textContent = totalQuestions;
    percentageScoreDisplay.textContent = `${percentage.toFixed(0)}%`;
    timeTakenDisplay.textContent = `Time taken: ${timeTaken.toFixed(1)}s`;
}

function restartQuiz() {
    resultPage.classList.remove('active');
    startPage.classList.add('active');
    // All other resets happen in startQuiz()
}