const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'A computer cannot BOOT if it does not have the ',
    answers: [
      { text: 'Operating system', correct: true },
      { text: 'Compiler', correct: false }
    ]
  },
  {
    question: 'MS-Word is an example of',
    answers: [
      { text: 'An operating system', correct: false },
      { text: 'An input device', correct: false },
      { text: 'Application software', correct: true },
      { text: 'A processing device', correct: false }
    ]
  },
  {
    question: 'Junk e-mail is also called as',
    answers: [
      { text: 'Sniffer script', correct: false },
      { text: 'Spam', correct: true },
      { text: 'Spoof', correct: false },
      { text: 'Spool', correct: false }
    ]
  },
  {
    question: 'In MICR, C stands for',
    answers: [
      { text: 'Computer', correct: false },
      { text: 'Character', correct: true }
    ]
  },
  {
    question: 'Where is RAM located?',
    answers: [
      { text: 'Mother Board', correct: true },
      { text: 'External Drive', correct: false },
      { text: 'Expansion Board', correct: false }
    ]
  },
  {
    question: 'CD-ROM is a semiconductor memory',
    answers: [
      { text: 'FALSE', correct: false },
      { text: 'TRUE', correct: true }
    ]
  },
  {
    question: 'Which of the following software applications would be the most appropriate for performing numerical and statistical calculations?',
    answers: [
      { text: 'Database', correct: false },
      { text: 'Document Processor', correct: false },
      { text: 'Spread Sheet', correct: true },
      { text: 'Graphic Package', correct: false }
    ]
  }
]