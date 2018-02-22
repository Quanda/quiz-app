'use strict';

/* TODO
    
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
        $('.quiz').html(returnQuestion());
    })
}
// Returns the question form, dependent on which question the user is on
function returnQuestion() {
    return `
    <div class="scoreboard">
        <ul>
            <li>Score: ${score}</li>
            <li>Question: ${questionCount + 1} / ${DATA.length} </li>
        </ul>
    </div>
    <form>
        <fieldset>
        <legend class="question">${DATA[questionCount].question}</legend>
        <div role="radiogroup">
            <label class="answerOption" for="answer0">
            <input type="radio" id="answer0" value="${DATA[questionCount].answers[0]}" name="answer">
                <span>${DATA[questionCount].answers[0]}</span>
            </label>
            <label class="answerOption" for="answer1">
            <input type="radio" id="answer1" value="${DATA[questionCount].answers[1]}" name="answer">
                <span>${DATA[questionCount].answers[1]}</span>
            </label>
            <label class="answerOption" for="answer2">
            <input type="radio" id="answer2" value="${DATA[questionCount].answers[2]}" name="answer">
                <span>${DATA[questionCount].answers[2]}</span>
            </label>
            <label class="answerOption" for="answer3">
            <input type="radio" id="answer3" value="${DATA[questionCount].answers[3]}" name="answer">
                <span>${DATA[questionCount].answers[3]}</span>
            </label>
        </div>
            <p class="warning"></p>
            <button type="submit" id="submitAnswer">Submit</button>
        </fieldset>
    </form>`
    
}

// When user Submits answer, first check if a radio was selected
// if one was, check if it was the correct answer
// if correct, call userAnswerCorrect, else call userAnswerWrong
// if there are more questions, proceed to next. otherwise, render the results page
function userSubmitAnswer() {
    $('.quiz').on('click', '#submitAnswer', function(event) {
        event.preventDefault();
        if($('input[name=answer]:checked').length <= 0) {
            $('.warning').addClass('warning').text('Please select an answer');
        }
        else {
            let userChoice = $('input[name=answer]:checked');
            let answer = userChoice.val();
            let correctAnswer = `${DATA[questionCount].correctAnswer}`

            // if the user chose the correct answer
            if (answer === correctAnswer) {
                userAnswerCorrect();
            } else {
                userAnswerWrong(correctAnswer);
            }

            incrementQuestion();
            nextQuestion();
        }
    })
}
// returns correct answer view
function returnCorrectFeedback() {
    return `<div class="feedback correct">
                <h2>Correct!</h2>
                <button type="button" class="nextQuestion">Next</button>          
            </div>`
}
// returns wrong answer view
function returnWrongFeedback(correctAnswer) {
    return `<div class="feedback wrong">
                <h2>Wrong</h2>
                <h5>Correct answer: <span>${correctAnswer}</span></h5>
                <button type="button" class="nextQuestion">Next</button>          
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
function incrementQuestion() {
    questionCount++;
}
// uses event delegation to attach click event to .nextQuestion
// onclick, populate the 
function nextQuestion() {
    $('.quiz').on('click', '.nextQuestion', function() {
        if(questionCount === DATA.length) {
            renderFeedback(returnResults());
        } else {
            renderFeedback(returnQuestion());
        }
    })
}
// returns final page view
function returnResults() {
    let grade;
    let resultsTitle;
    let resultsDescription;
    
    // perfect score
    if (score === questionCount) {
        grade = `A`;
        resultsTitle = `Perfect!`;
        resultsDescription = `You must have a pet bald eagle...`;
    }
    // score is greater than 75% but not perfect
    else if(score >= (questionCount * .75) && (score < questionCount) ) {
        grade = `B`;
        resultsTitle = `A true Patriot!`;
        resultsDescription = `I salute you`;
    }
    // score is greater than 50% but less than 75%
    else if(score > (questionCount * .50) && (score < questionCount * .75) ) {
        grade = `C`;
        resultsTitle = `Good job!`;
        resultsDescription = `But I think you can do better`;
    }
    // score is less than 50%
    else {
        grade = `F`;
        resultsTitle = `Do you even America?`;
        resultsDescription = `Benjamin Franklin is rolling over in his grave`;
    }
    return `<div class="feedback results ${grade}">
                <h2>${resultsTitle}</h2>
                <p>You scored ${score} / ${questionCount}</p><br>
                <p>${resultsDescription}</p>
                <button type="button" class="restart-quiz">Restart Quiz</button>          
            </div>
            <footer>
            </footer>`
}
// reset score and questionCount and render the question form
function restartQuiz() {
    $('.quiz').on('click', '.restart-quiz', function() {
        score = 0;
        questionCount = 0;
        renderFeedback(returnQuestion());
    });
}

// run event listener functions
function createQuiz () {
    handleStartQuiz();
    userSubmitAnswer();
    restartQuiz();
}
$(createQuiz);
