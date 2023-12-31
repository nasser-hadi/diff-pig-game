'use strict';
var gameScores = [0, 0];
var roundScore = 0;
var activePlayer = 1;
var gameSet = 0;
let maxScore;

let inputValue = document.getElementById('end-score');
//  inputValue.defaultValue=50;

//The game isn't started => statue = 0
//The game is in progress => status = 1
//The game is over => status = 2

inputValue.value = 20;

let gameStatus = 0;

let dice_number = 0;

const img_dice = document.querySelector('#img_dice');
const btn_dice = document.querySelector('#btn_dice');
const btn_hold = document.querySelector('#btn_hold');

//When the Start button is pressed and the game starts
//or when New Game button is pressed between or end of the current game 
document.querySelector('#btn_start').addEventListener('click', function () {

    gameScores = [0, 0];
    roundScore = 0;
    activePlayer = 1;

    gameSet = 1;

    maxScore = inputValue.value;
    inputValue.disabled = true;

    calculationGameSet(gameSet);

    btn_dice.classList.remove('disabled');
    btn_dice.disabled = false;

    btn_hold.classList.add('disabled');
    btn_hold.disabled = false;

    //Set the image of the Dice element to 1
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

    //start game
    if (gameStatus == 0) {
        gameStatus = 1;
        this.innerHTML = 'New Game';
    }
    //new game
    else if (gameStatus == 1) {
    }
    //game over
    else if (gameStatus == 2) {
        gameStatus = 1;
    }
});

//When the Dice button is pressed
btn_dice.addEventListener('click', function () {

    btn_dice.classList.add('disabled');
    btn_dice.desabled = true;
    btn_hold.classList.add('disabled');
    btn_hold.desabled = true;

    img_dice.classList.add('spin');

    //This function works after 1000 mili seconds
    setTimeout(function () {
        //Call the rollingDice function and get a randome number between 1 ~ 6
        dice_number = rollingDice();

        //Set the image of the Dice element equal dice number
        img_dice.src = "assets/images/dice-" + dice_number + ".png";

        img_dice.classList.remove('spin');
        btn_dice.classList.remove('disabled');
        btn_dice.disabed = false;
        btn_hold.classList.remove('disabled');
        btn_hold.disabed = false;

        if (dice_number != 1) {

            //Add dice number to roundScore variable
            roundScore += dice_number;

            //Display round score to user in HTML element
            document.getElementById('set_score_' + activePlayer).innerHTML = roundScore;

            //Check the game score every time
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

//When the game is over
function gameOver() {
    gameStatus = 2;

    btn_dice.classList.add('disabled');
    btn_dice.desabled = true;

    inputValue.disabled = false;

    document.querySelector('#sec_5-1').classList.remove('active');
    document.querySelector('#sec_5-3').classList.remove('active');

    document.getElementById('turn_1').classList.add('hidden');
    document.getElementById('turn_2').classList.add('hidden');

    document.getElementById('won_' + activePlayer).classList.remove('hidden');
}

//When the Hold button is pressed.
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


//This function changes the current player. When the Hold button is pressed or the dice becomes 1.
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

    //When changePlayer function called by Hold button
    roundScore = 0;
    img_dice.src = "assets/images/dice-1.png";
}

//This function implement a real Dice and generate a random number between 1 ~ 6 
function rollingDice() {

    var rand = Math.floor(Math.random() * 6) + 1;

    return rand;
}

//Calculate Set number of game
function calculationGameSet(m) {
    let d_r = 0;// d_r = Division Remainder
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