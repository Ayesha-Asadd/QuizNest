const questions = [
    {
        question: "Which ancient city of the Indus Valley Civilization is located in present-day Sindh, Pakistan?",
        answers: [
            { text: "Taxila", correct: false },
            { text: "Harappa", correct: false },
            { text: "Mohenjo-Daro", correct: true },
            { text: "Mehrgarh", correct: false }
        ]
    },
    {
        question: "In which year was Urdu declared the national language of Pakistan?",
        answers: [
            { text: "1948", correct: true },
            { text: "1956", correct: false },
            { text: "1973", correct: false },
            { text: "1962", correct: false }
        ]
    },
    {
        question: "Which Pakistani Sufi poet is known for his Sindhi poetry and the work 'Shah Jo Risalo'?",
        answers: [
            { text: "Bulleh Shah", correct: false },
            { text: "Shah Abdul Latif Bhittai", correct: true },
            { text: "Sachal Sarmast", correct: false },
            { text: "Rehman Baba", correct: false }
        ]
    },
    {
        question: "The iconic 'Minar-e-Pakistan' was completed in which year?",
        answers: [
            { text: "1947", correct: false },
            { text: "1968", correct: true },
            { text: "1951", correct: false },
            { text: "1971", correct: false }
        ]
    },
    {
        question: "Which traditional Pakistani musical instrument has strings and is widely used in classical music?",
        answers: [
            { text: "Bansuri", correct: false },
            { text: "Tabla", correct: false },
            { text: "Sitar", correct: true },
            { text: "Dhol", correct: false }
        ]
    },
    {
        question: "What is the original script used for writing Punjabi in Pakistan?",
        answers: [
            { text: "Devanagari", correct: false },
            { text: "Arabic script (Shahmukhi)", correct: true },
            { text: "Roman", correct: false },
            { text: "Gurmukhi", correct: false }
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
        question: "Which Pakistani monument features verses of the Quran in calligraphy and was designed by Vedat Dalokay?",
        answers: [
            { text: "Minar-e-Pakistan", correct: false },
            { text: "Mazar-e-Quaid", correct: false },
            { text: "Faisal Mosque", correct: true },
            { text: "Badshahi Mosque", correct: false }
        ]
    },
    {
        question: "Which UNESCO World Heritage site in Pakistan is a Mughal architectural masterpiece built in the 17th century?",
        answers: [
            { text: "Derawar Fort", correct: false },
            { text: "Rohtas Fort", correct: false },
            { text: "Shalimar Gardens", correct: true },
            { text: "Makli Necropolis", correct: false }
        ]
    },
    {
        question: "Which traditional food item is most commonly associated with Sehri in Punjab during Ramadan?",
        answers: [
            { text: "Siri Paye", correct: true },
            { text: "Haleem", correct: false },
            { text: "Nihari", correct: false },
            { text: "Chapli Kabab", correct: false }
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
let timeLeft = 100; // Initial time in seconds
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
    timeLeft = 100; // Reset time
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