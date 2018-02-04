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
        $('.quiz').prepend(populateForm);
    })
}

// Returns the question form, dependent on which question the user is on
function populateForm() {
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
            <input type="radio" value="${DATA[questionCount].answers[0]}" name="answer">
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
        if($('input[name=answer]:checked').length <= 0) {
            alert('Please select an answer');
        }
        else {
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
                nextQuestion();
            }
            else {
                renderFeedback(returnResults());
            } 
        }
    })
}
// returns correct answer view
function returnCorrectFeedback() {
    return `<div class="feedback correct">
                <h2>Correct!</h2>
                <button type="button" class="nextQuestion">Next Question</button>          
            </div>`
}
// returns wrong answer view
function returnWrongFeedback(correctAnswer) {
    return `<div class="feedback wrong">
                <h2>Wrong</h2>
                <h5>The correct answer is: ${correctAnswer}</h5>
                <button type="button" class="nextQuestion">Next Question</button>          
            </div>`
}
// render the .quiz view
function renderFeedback(feedback) {
    $('.quiz').html(feedback)
}
// updates the DOM with the "correct feedback" view
// increments the score
function userAnswerCorrect() {
    renderFeedback(returnCorrectFeedback());
    incrementScore();
}
// updates the DOM with the "wrong feedback" view 
function userAnswerWrong(correctAnswer) {
    renderFeedback(returnWrongFeedback(correctAnswer));
}
function incrementScore() {
    score++;
}
// uses event delegation to attach click event to .nextQuestion
// onclick, populate the 
function nextQuestion() {
    $('.quiz').on('click', '.nextQuestion', function() {
        // populate the .quiz class with next question form
        renderFeedback(populateForm(questionCount));
    })
}
// returns final page view
function returnResults() {
    let resultsTitle;
    let resultsDescription;
    
    // perfect score
    if (score === questionCount) {
        resultsTitle = `Perfect!`;
        resultsDescription = `You must have a pet bald eagle`;
    }
    // score is greater than 75% but not perfect
    if(score > (questionCount * .75) && (score < questionCount) ) {
        resultsTitle = `Good job, Patriot!`;
        resultsDescription = ``;
    }
    // score is greater than 50% but less than 75%
    else if(score > (questionCount * .50) && (score < questionCount * .75) ) {
        resultsTitle = `Not bad!`;
        resultsDescription = ``;
    }
    // score is less than 50%
    else {
        resultsTitle = `Do you even America?`;
        resultsDescription = `Benjamin Franklin is rolling over in his grave`;
    }
    return `<div class="feedback results scoreD">
                <h2>${resultsTitle}</h2>
                <p>You scored ${score} / ${questionCount}</p>
                <p>${resultsDescription}</p>
            </div>`
}

// run event listener functions
function createQuiz () {
    handleStartQuiz();
    userSubmitAnswer();
}
$(createQuiz);
