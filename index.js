'use strict';

/* TODO
    make radio input required
    
*/ 

// keeps track of which question the user is on
let questionCount = 0;
// keeps track of user score
let score = 0;


// triggers when 'Take Quiz' button is clicked.
// Removes the intro class and adds the quiz class with the first question form
function handleStartQuiz() {
    $('.takeQuiz').on('click', function() {
        // remove intro
        $('.intro').remove();
        
        // proceed to the first question
        $('.quiz').prepend(populateNextQuestionForm);
    })
}

// Returns the question form, dependent on which question the user is on
function populateNextQuestionForm() {
    return `
    <div class="scoreboard">
        <ul>
            <li>Score: ${score}</li>
            <li>Question: ${questionCount + 1} / ${DATA.length} </li>
        </ul>
    </div>
    <h2 class="question">${DATA[questionCount].question}</h2>
    <form>
        <fieldset>
            <label class="answerOption">
            <input type="radio" value="${DATA[questionCount].answers[0]}" name="answer" required>
                <span>${DATA[questionCount].answers[0]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${DATA[questionCount].answers[1]}" name="answer">
                <span>${DATA[questionCount].answers[1]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${DATA[questionCount].answers[2]}" name="answer">
                <span>${DATA[questionCount].answers[2]}</span>
            </label>
            <label class="answerOption">
            <input type="radio" value="${DATA[questionCount].answers[3]}" name="answer">
                <span>${DATA[questionCount].answers[3]}</span>
            </label>
            <button type="submit" id="submitAnswer">Submit</button>
        </fieldset>
    </form>`
}

// When user Submits answer, check if it was correct
// if correct, call userAnswerCorrect, else call userAnswerWrong
// if there are more questions, proceed to next
function userSubmitAnswer() {
    $('.quiz').on('click', '#submitAnswer', function(event) {
        event.preventDefault();
        let userChoice = $('input[name=answer]:checked');
        let answer = userChoice.val();
        let correctAnswer = `${DATA[questionCount].correctAnswer}`
        // if the user chose the correct answer
        if (answer === correctAnswer) {
            userAnswerCorrect();
        }
        else {
            userAnswerWrong(correctAnswer);
        }
        questionCount++;
        if(questionCount !== DATA.length) {
            proceedToNextQuestion();
        }
        else {
            renderResults();
        }
    })
}

function returnCorrectFeedback() {
    return `<div class="feedback correct">
                <h2>Correct!</h2>
                <button type="button" class="nextQuestion">Next Question</button>          
            </div>`
}
function returnWrongFeedback(correctAnswer) {
    return `<div class="feedback wrong">
                <h2>Wrong</h2>
                <h5>The correct answer is: ${correctAnswer}</h5>
                <button type="button" class="nextQuestion">Next Question</button>          
            </div>`
}
function renderFeedback(feedback) {
    let correctAnswer = `${DATA[questionCount].correctAnswer}`
    $('.quiz').html(feedback)
}
// runs if the user submitted a correct answer
function userAnswerCorrect() {
    renderFeedback(returnCorrectFeedback());
    incrementScore();
}
function userAnswerWrong(correctAnswer) {
    renderFeedback(returnWrongFeedback(correctAnswer));
}

function incrementScore() {
    score++;
}

function proceedToNextQuestion() {
    $('.quiz').on('click', '.nextQuestion', function() {
        // populate the .quiz class with 
        $('.quiz').html(populateNextQuestionForm(questionCount));
    })
}

function renderResults() {
    $('.quiz').html(returnResults());
}

function returnResults() {
    // perfect score
    if (score === questionCount) {
        return `<div class="feedback results scoreA">
                    <h2>Perfect!</h2>
                    <p>You scored ${score} / ${questionCount}</p>
                    <p>You must have a pet bald eagle</p>
                </div>`
    }
    // score is greater than 75% but not perfect
    if(score > (questionCount * .75) && (score < questionCount) ) {
        return `<div class="feedback results scoreB">
                    <h2>Good Job, Patriot!</h2>
                    <p>You scored ${score} / ${questionCount}</p>
                    <p></p>
                </div>`
    }
    // score is greater than 50% but less than 75%
    else if(score > (questionCount * .50) && (score < questionCount * .75) ) {
        return `<div class="feedback results scoreC">
                    <h2>Not bad!</h2>
                    <p>You scored ${score} / ${questionCount}</p>
                    <p>You must have a pet bald eagle</p>
                </div>`
    }
    // score is less than 50%
    else if(score < (questionCount * .50) ) {
         return `<div class="feedback results scoreD">
                    <h2>Do you even America?</h2>
                    <p>You scored ${score} / ${questionCount}</p>
                    <p>Benjamin Franklin is rolling over in his grave</p>
                </div>`
    }
}


// run event listener functions
function createQuiz () {
    handleStartQuiz();
    userSubmitAnswer();
}

$(createQuiz);
