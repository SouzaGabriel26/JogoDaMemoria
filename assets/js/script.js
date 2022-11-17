// class names
const FRONT = 'card_front'
const BACK = 'card_back'
const CARD = 'card'
const ICON = 'icon'
let moves = 0
let timesPlayed = 1

startGame()

function startGame() {
  let contTimesPlayed = document.getElementById('timesPlayed')
  contTimesPlayed.innerHTML = `${timesPlayed}° jogo`
  timesPlayed++
  game.createCardsFromTechs()

  console.log(game.cards)
  initializeCards(game.cards)
}

function initializeCards(cards) {
  let gameBoard = document.getElementById('gameBoard')
  gameBoard.innerHTML = ''

  cards.forEach(card => {
    let cardElement = document.createElement('div')
    cardElement.id = card.id
    cardElement.classList.add(CARD)
    cardElement.dataset.icon = card.icon

    createCardContent(card, cardElement)

    cardElement.addEventListener('click', flipCard)
    gameBoard.appendChild(cardElement)
  })
}

function createCardContent(card, cardElement) {
  createCardFace(FRONT, card, cardElement)
  createCardFace(BACK, card, cardElement)
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div')
  cardElementFace.classList.add(face)

  if (face === FRONT) {
    let iconElement = document.createElement('img')
    iconElement.classList.add(ICON)
    iconElement.src = 'assets/images/' + card.icon + '.png'
    cardElementFace.appendChild(iconElement)
  } else {
    cardElementFace.innerHTML = '&lt/&gt'
  }

  element.appendChild(cardElementFace)
}

function flipCard() {
  if (game.setCard(this.id)) {
    this.classList.add('flip')

    if (game.secondCard) {
      if (game.checkMatch()) {
        game.clearCards()
        console.log('Acertou')

        if (game.checkGameOver()) {
          let gameOver = document.getElementById('gameOver')

          setTimeout(() => {
            gameOver.style.display = 'flex'
          }, 1000)
        }
      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id)
          let secondCardView = document.getElementById(game.secondCard.id)

          firstCardView.classList.remove('flip')
          secondCardView.classList.remove('flip')
          console.log('Errou')
          game.unflipCards()
        }, 1000)
      }
      moves++
      let movesLayout = document.getElementsByClassName('moves')[0]
      movesLayout.innerHTML = `${moves}`

      let movesLayoutGameOver = document.getElementsByClassName('moves')[1]
      movesLayoutGameOver.innerHTML = `${moves}`
    }
  }
}

function restart() {
  game.clearCards()
  startGame()
  let gameOver = document.getElementById('gameOver')
  gameOver.style.display = 'none'

  moves = 0

  let movesLayout = document.getElementsByClassName('moves')[0]
  movesLayout.innerHTML = `${moves}`

  let movesLayoutGameOver = document.getElementsByClassName('moves')[1]
  movesLayoutGameOver.innerHTML = `${moves}`
}
