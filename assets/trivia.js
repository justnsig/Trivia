$(document).ready(function () {


    $("#countDown").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);

})

var trivia = {
    correct: 0,
    incorrect: 0,
    noAnswer: 0,
    currentSet: 0,
    timer: 10,
    timerOn: false,
    timerId: '',

    questions: {
        question1: 'The beaver is the national emblem of which country?',
        question2: 'How many players are there in a baseball team?',
        question3: 'What is the name of Batman’s butler?',
        question4: 'Which US state is nearest to the old Soviet Union?'
    },
    options: {
        question1: ['Canada', 'USA', 'Columbia', 'Australia'],
        question2: ['9', '22', '25', 'Snorkel'],
        question3: ['Scott', 'Bill', 'Carls Jr', 'Alfred'],
        question4: ['Alaska', 'Sammy Davis Jr', 'Ariona', 'New York']
    },
    answers: {
        question1: 'Canada',
        question2: '25',
        question3: 'Alfred',
        question4: 'Alaska'
    },

    startGame: function () {
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.noAnswer = 0;
        clearInterval(trivia.timerId);

        $('#game').show();

        $('#result').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#countDown').show();

        trivia.nextQuestion();

    },

    nextQuestion: function () {

        trivia.timer = 10;
        $('#timer').removeClass('countDown');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },

    timerRunning: function () {
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 4) {
                $('#timer').addClass('countDown');
            }
        }
        else if (trivia.timer === -1) {
            trivia.noAnswer++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#results').html('<h3>Times Up! The answer is ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#result')
                .html('<h3>Thank you for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>no Answer: ' + trivia.noAnswer + '</p>' +
                    '<p>Please try again!</p>');

            $('#game').hide();

            $('#start').show();
        }

    },

    guessChecker: function () {

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');
            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#result').html('<h3>Correct Answer!</h3>');
        }

        else {
            $(this).addClass('btn-danger').removeClass('btn-info');
            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 1000);
            $('#result').html('<h3>Better luck next time! ' + currentAnswer + '</h3>');
        }

    },

    guessResult: function () {

        trivia.currentSet++;
        $('.option').remove();
        $('#result h3').remove();
        trivia.nextQuestion();

    }

}