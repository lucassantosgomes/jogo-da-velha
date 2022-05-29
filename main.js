const numberColor = document.getElementById('setColor')
const panelPointsX = document.getElementById('pointsX')
const panelPointsO = document.getElementById('pointsO')
const playerCurrent = document.getElementById('player-current')
const wrapper = document.getElementById('wrapper')
const board = document.getElementById('board')
const line = document.getElementById('line')
const game = {
  playerRound: 'X',
  playerCurrent: this.playerRound || 'X',
  lineBoardX: [0, 0, 0, 0, 0, 0, 0, 0],
  lineBoardO: [0, 0, 0, 0, 0, 0, 0, 0],
  winner: 'undefned',
  pointsX: 0,
  pointsO: 0,
  gameOver: 0,
  updatePlayerRound() {
    this.playerRound === 'X'
      ? (this.playerRound = 'O')
      : (this.playerRound = 'X')
  },
  updatePlayerCurrent() {
    this.playerCurrent === 'X'
      ? (this.playerCurrent = 'O')
      : (this.playerCurrent = 'X')
  },
  checkVictory() {
    if (this.lineBoardX.includes(3)) {
      this.pointsX++
      this.winner = 'X'
      return true
    } else if (this.lineBoardO.includes(3)) {
      this.pointsO++
      this.winner = 'O'
      return true
    }
    return false
  },
  checkGameOver() {
    return this.gameOver === 9
  },
  clearLineArr() {
    this.lineBoardX.fill(0)
    this.lineBoardO.fill(0)
  },
  clearPoints() {
    this.pointsX = 0
    this.pointsO = 0
  },
  addPlayedLine(square) {
    if (this.playerCurrent === 'X')
      switch (square) {
        case '0':
          this.lineBoardX[0]++
          this.lineBoardX[3]++
          this.lineBoardX[6]++
          break
        case '1':
          this.lineBoardX[0]++
          this.lineBoardX[4]++
          break
        case '2':
          this.lineBoardX[0]++
          this.lineBoardX[5]++
          this.lineBoardX[7]++
          break
        case '3':
          this.lineBoardX[1]++
          this.lineBoardX[3]++
          break
        case '4':
          this.lineBoardX[1]++
          this.lineBoardX[4]++
          this.lineBoardX[6]++
          this.lineBoardX[7]++
          break
        case '5':
          this.lineBoardX[1]++
          this.lineBoardX[5]++
          break
        case '6':
          this.lineBoardX[2]++
          this.lineBoardX[3]++
          this.lineBoardX[7]++
          break
        case '7':
          this.lineBoardX[2]++
          this.lineBoardX[4]++
          break
        case '8':
          this.lineBoardX[2]++
          this.lineBoardX[5]++
          this.lineBoardX[6]++
          break
        default:
          break
      }
    else
      switch (square) {
        case '0':
          this.lineBoardO[0]++
          this.lineBoardO[3]++
          this.lineBoardO[6]++
          break
        case '1':
          this.lineBoardO[0]++
          this.lineBoardO[4]++
          break
        case '2':
          this.lineBoardO[0]++
          this.lineBoardO[5]++
          this.lineBoardO[7]++
          break
        case '3':
          this.lineBoardO[1]++
          this.lineBoardO[3]++
          break
        case '4':
          this.lineBoardO[1]++
          this.lineBoardO[4]++
          this.lineBoardO[6]++
          this.lineBoardO[7]++
          break
        case '5':
          this.lineBoardO[1]++
          this.lineBoardO[5]++
          break
        case '6':
          this.lineBoardO[2]++
          this.lineBoardO[3]++
          this.lineBoardO[7]++
          break
        case '7':
          this.lineBoardO[2]++
          this.lineBoardO[4]++
          break
        case '8':
          this.lineBoardO[2]++
          this.lineBoardO[5]++
          this.lineBoardO[6]++
          break
        default:
          break
      }
  }
}

function colorStorage() {
  const colorNumberStorage = localStorage.getItem('cor-jogo-da-velha-lsg')
  if (colorNumberStorage) {
    color(colorNumberStorage)
    numberColor.value = colorNumberStorage
  }
}
colorStorage()

board.addEventListener(
  'click',
  e => {
    const squareClicked = e.target
    const squareClickedId = squareClicked.id
    if (isNaN(squareClickedId)) return // if nessesaria pq as veses retorna o board
    if (!haveContent(squareClicked))
      squareClicked.textContent = game.playerCurrent
    else return
    game.gameOver++
    game.addPlayedLine(squareClickedId)
    if (game.checkVictory()) {
      updatePanel()
      addLine()
      game.winner === 'X'
        ? displayGameOver('jogador X venceu')
        : displayGameOver('jogador O venceu')
    } else if (game.checkGameOver()) displayGameOver('fim de jogo')
    game.updatePlayerCurrent()
    updatePanel()
  },
  false
)

numberColor.addEventListener('change', function(){color(numberColor.value)})

function color(cor) {
  document.body.style.setProperty('--hue', cor)
  localStorage.setItem('cor-jogo-da-velha-lsg', cor)
}

function haveContent(element) {
  return element.textContent === '' ? false : true
}
function updatePanel() {
  panelPointsX.textContent = game.pointsX
  panelPointsO.textContent = game.pointsO
  playerCurrent.textContent = game.playerCurrent
}
function clearBoard() {
  document.querySelectorAll('.board span').forEach(item => {
    item.textContent = ''
  })
}
function displayGameOver(text) {
  const section = document.createElement('section')
  section.className = 'game-over'
  const textEnd = document.createElement('p')
  textEnd.textContent = text
  section.appendChild(textEnd)
  section.appendChild(bntContinuar(section))
  section.appendChild(bntReiniciar(section))
  wrapper.appendChild(section)
}

function bntContinuar(displayOver) {
  const bnt = document.createElement('button')
  bnt.className = 'game-over__bnt'
  bnt.textContent = 'CONTINUAR'
  bnt.addEventListener('click', () => {
    wrapper.removeChild(displayOver)
    clearBoard()
    game.updatePlayerRound()
    game.playerCurrent = game.playerRound
    updatePanel()
    game.gameOver = 0
    game.clearLineArr()
    removeLine()
  })
  return bnt
}
function bntReiniciar(displayOver) {
  const bnt = document.createElement('button')
  bnt.className = 'game-over__bnt'
  bnt.textContent = 'REINICIAR'
  bnt.addEventListener('click', () => {
    wrapper.removeChild(displayOver)
    clearBoard()
    game.playerRound = 'X'
    game.playerCurrent = game.playerRound
    game.gameOver = 0
    game.clearLineArr()
    game.clearPoints()
    updatePanel()
    removeLine()
  })
  return bnt
}
function addLine() {
  let number
  game.winner === 'X'
    ? (number = game.lineBoardX.indexOf(3))
    : (number = game.lineBoardO.indexOf(3))
  line.classList.add(`line${number}`)
}
function removeLine() {
  line.className = 'line'
}
