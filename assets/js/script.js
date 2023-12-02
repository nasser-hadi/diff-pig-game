'use strict';
var gameScores = [0, 0];
var roundScore = 0;
var activePlayer = 1;
var gameSet = 0;
const maxScore = 100;

let gameStatus = 0;

let dice_number = 0;

const img_dice = document.querySelector('#img_dice');
const btn_dice = document.querySelector('#btn_dice');
const btn_hold = document.querySelector('#btn_hold');

document.querySelector('#btn_start').addEventListener('click', function () {

    gameScores = [0, 0];
    roundScore = 0;
    activePlayer = 1;

    gameSet = 1;

    calculationGameSet(gameSet);

    btn_dice.classList.remove('disabled');
    btn_dice.disabled = false;

    btn_hold.classList.add('disabled');
    btn_hold.disabled = false;

    img_dice.src = "assets/images/dice-1.png";

    document.querySelector('#sec_5-1').classList.add('active');
    document.querySelector('#sec_5-3').classList.remove('active');

    document.getElementById('turn_1').classList.remove('hidden');
    document.getElementById('turn_2').classList.add('hidden');

    document.getElementById('won_1').classList.add('hidden');
    document.getElementById('won_2').classList.add('hidden');

    document.getElementById('set_score_1').innerHTML = "0";
    document.getElementById('set_score_2').innerHTML = "0";

    document.getElementById('game_score_1').innerHTML = "0";
    document.getElementById('game_score_2').innerHTML = "0";

    if (gameStatus == 0) {
        gameStatus = 1;
        this.innerHTML = 'New Game';
    }
    else if (gameStatus == 1) {
    }
    else if (gameStatus == 2) {
        gameStatus = 1;
    }
});

btn_dice.addEventListener('click', function () {

    btn_dice.classList.add('disabled');
    btn_dice.desabled = true;
    btn_hold.classList.add('disabled');
    btn_hold.desabled = true;

    img_dice.classList.add('spin');

    setTimeout(function () {
        dice_number = rollingDice();

        img_dice.src = "assets/images/dice-" + dice_number + ".png";

        img_dice.classList.remove('spin');

        btn_dice.classList.remove('disabled');
        btn_dice.disabed = false;
        btn_hold.classList.remove('disabled');
        btn_hold.disabed = false;

        if (dice_number != 1) {

            roundScore += dice_number;

            document.getElementById('set_score_' + activePlayer).innerHTML = roundScore;

            if ((gameScores[activePlayer - 1] + roundScore) >= maxScore) {

                gameScores[activePlayer - 1] += roundScore;
                gameOver();
            }
        }
        else {
            roundScore = 0;
            changePlayer();
        }

    }, 1000);
});

function gameOver() {
    gameStatus = 2;

    btn_dice.classList.add('disabled');
    btn_dice.desabled = true;
    
    document.querySelector('#sec_5-1').classList.remove('active');
    document.querySelector('#sec_5-3').classList.remove('active');

    document.getElementById('turn_1').classList.add('hidden');
    document.getElementById('turn_2').classList.add('hidden');

    document.getElementById('won_' + activePlayer).classList.remove('hidden');
}

document.querySelector('#btn_hold').addEventListener('click', function () {
    if (gameStatus == 1) {
        changePlayer();
    }
    else if (gameStatus == 2) {
        btn_hold.classList.add('disabled');
        btn_hold.desabled = true;

        document.getElementById('game_score_' + activePlayer).innerHTML = gameScores[activePlayer - 1];
        document.getElementById('set_score_' + activePlayer).innerHTML = 0;
    }
});


function changePlayer() {

    gameScores[activePlayer - 1] += roundScore;

    document.getElementById('game_score_' + activePlayer).innerHTML = gameScores[activePlayer - 1];
    document.getElementById('set_score_' + activePlayer).innerHTML = 0;

    document.querySelector('#sec_5-1').classList.toggle('active');
    document.querySelector('#sec_5-3').classList.toggle('active');

    document.getElementById('turn_1').classList.toggle('hidden');
    document.getElementById('turn_2').classList.toggle('hidden');

    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;

    gameSet += 1;
    calculationGameSet(gameSet);

    btn_hold.classList.add('disabled');
    btn_hold.disabed = true;

    roundScore = 0;
    img_dice.src = "assets/images/dice-1.png";
}

function rollingDice() {

    var rand = Math.floor(Math.random() * 6) + 1;

    return rand;
}

function calculationGameSet(m) {    
    let d_r = 0;
    let setNumber = 0;

    d_r = (m % 2);
    if (d_r == 0) {
        setNumber = (m / 2);
    }
    else {
        setNumber = (m + 1) / 2;
    }

    document.getElementById('set_1').innerHTML = setNumber;
    document.getElementById('set_2').innerHTML = setNumber;

    return setNumber;
}