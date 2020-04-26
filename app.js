/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying

init()

var previousDice

document.querySelector('.btn-roll').addEventListener('click', buttonRoll)


document.querySelector('.btn-hold').addEventListener('click', function(){
    if (gamePlaying) {
        // Add current score to global score

        scores[activePlayer] += roundScore

        // update ui

        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer]

        // check if player won the game
        var winningScore = document.getElementById('inp').value
        if (winningScore) {
            winningScore=winningScore
        }
        else {
            winningScore = 100
        }
        if (scores[activePlayer] >= winningScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!'
            document.querySelector('.dice').style.display = 'none'
            document.querySelector('#dice2').style.display = 'none'
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
            gamePlaying = false
            
        }
        else {
            // next player

            nextPLayer()
        }
    }

})

document.querySelector('.btn-new').addEventListener('click', function () {
    init()

})

function nextPLayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0
    roundScore = 0

    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'

    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')
    document.querySelector('.dice').style.display = 'none'
    document.querySelector('#dice2').style.display = 'none'
}



function init() {
    scores = [0, 0]
    activePlayer = 0
    roundScore = 0
    gamePlaying=true

    document.querySelector('.dice').style.display = 'none'
    document.querySelector('#dice2').style.display = 'none'
    document.getElementById('score-0').textContent = '0'
    document.getElementById('score-1').textContent = '0'
    document.getElementById('current-0').textContent = '0'
    document.getElementById('current-1').textContent = '0'
    document.getElementById(`name-0`).textContent = 'PLAYER 1'
    document.getElementById(`name-1`).textContent = 'PLAYER 2'
    document.querySelector(`.player-0-panel`).classList.remove('winner')
    document.querySelector(`.player-1-panel`).classList.remove('winner')
    document.querySelector(`.player-0-panel`).classList.remove('active')
    document.querySelector(`.player-1-panel`).classList.remove('active')
    document.querySelector(`.player-0-panel`).classList.add('active')
}

function buttonRoll() {
    if (gamePlaying) {
        // random number
        var dice = Math.floor(Math.random() * 6 + 1)
        var dice2 = Math.floor(Math.random() * 6 + 1)

        // Display the result
        document.querySelector('.dice').style.display = 'block'
        document.querySelector('#dice2').style.display = 'block'
        document.querySelector('.dice').src=`dice-${dice}.png`
        document.querySelector('#dice2').src=`dice-${dice2}.png`


        // Update score
        if (dice === 6 && previousDice === 6) {
            scores[activePlayer] = 0
            document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer]
            nextPLayer()
        }

        if (dice !== 1 && dice2!==1) {
            roundScore += dice+dice2
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore
        } else {
            // next player

            nextPLayer()
        }
        previousDice = dice
    }
}


