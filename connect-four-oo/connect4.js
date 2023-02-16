/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
// Creates a color property instance for each player
const currentPlayer = document.getElementById("current-player");
const board = document.getElementById("board");

class Player {
  constructor(color) {
    this.color = color;
  }
}

class Game {
  constructor(height, width) {
    currentPlayer.innerHTML = "";
    // Throw an error when there is no color selected
    let p1Color = document.getElementById("player1").value;
    let p2Color = document.getElementById("player2").value;
    if (p1Color === "" || p2Color === "") {
      throw new Error("Please select a color for both players");
    }
    // Throw an error if the player color is the same
    if (p1Color === p2Color) {
      throw new Error("Player 1 and Player 2 cannot have the same color");
    }
    this.height = height;
    this.width = width;
    // array of rows, each row is array of cells (board[y][x])
    this.board = [];
    // array of players
    this.players = [];
    // current player on the array of players
    this.currPlayer = null;
    this.startNewGame();
    this.handleClick = this.handleClick.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
    this.makeBoard();
    this.makeHtmlBoard();
    this.removeEventListener = this.removeEventListener.bind(this);
  }
  // Initializes the game and assigning the color properties of the players
  startNewGame() {
    let player1 = document.getElementById("player1").value;
    let player2 = document.getElementById("player2").value;
    this.players.push(new Player(player1));
    this.players.push(new Player(player2));
    this.currPlayer = this.players[0];
    currentPlayer.innerHTML = `Player ${this.currPlayer.color.toUpperCase()}'s Turn `;
    currentPlayer.style.color = this.currPlayer.color;
  }
  /* makeBoard: create in-JS board structure:
     board = array of rows, each row is array of cells (board[y][x]) */
  makeBoard() {
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }
  /** makeHtmlBoard: make HTML table and row of column tops. */
  makeHtmlBoard() {
    // make column tops (clickable area for adding a piece to that column)
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", this.handleClick);

    for (let x = 0; x < this.width; x++) {
      const headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    board.append(top);

    // make main part of board
    for (let y = 0; y < this.height; y++) {
      const row = document.createElement("tr");

      for (let x = 0; x < this.width; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }
  /** findSpotForCol: given column x, return top empty y (null if filled) */
  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  /** placeInTable: update DOM to place piece into HTML table of board */
  placeInTable(y, x) {
    const piece = document.createElement("div");
    piece.classList.add("piece");
    piece.style.top = -50 * (y + 2);
    piece.style.backgroundColor = this.currPlayer.color;

    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  /** endGame: announce game end */
  endGame(msg) {
    alert(msg);
  }
  /** handleClick: handle click of column top to play piece */
  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;
    // get next spot in column (if none, ignore click)
    const y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }
    // place piece in board and add to HTML table
    this.board[y][x] = this.currPlayer.color;
    this.placeInTable(y, x);
    // =====================================================================
    if (this.checkForWin()) {
      let winMessage = document.createElement("div");
      winMessage.setAttribute("id", "win-message");
      winMessage.innerHTML = `Player <span style="border: 1px solid ${
        this.currPlayer.color
      }; padding: 2px; color: ${
        this.currPlayer.color
      }">${this.currPlayer.color.toUpperCase()}</span> won!`;
      document.body.appendChild(winMessage);
      setTimeout(() => {
        this.removeEventListener();
      }, 100);
      return;
    }
    // check for tie
    if (this.board.every((row) => row.every((cell) => cell))) {
      setTimeout(() => {
        this.removeEventListener();
        return endGame("It's a Tie!");
      }, 100);
    }
    //=====================================================================
    // switch players
    this.currPlayer =
      this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
    currentPlayer.innerHTML = `Player ${this.currPlayer.color.toUpperCase()}'s Turn `;
    currentPlayer.style.color = this.currPlayer.color;
  }

  _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer.color
    );
  }
  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  checkForWin() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [
          [y, x],
          [y, x + 1],
          [y, x + 2],
          [y, x + 3],
        ];
        const vert = [
          [y, x],
          [y + 1, x],
          [y + 2, x],
          [y + 3, x],
        ];
        const diagDR = [
          [y, x],
          [y + 1, x + 1],
          [y + 2, x + 2],
          [y + 3, x + 3],
        ];
        const diagDL = [
          [y, x],
          [y + 1, x - 1],
          [y + 2, x - 2],
          [y + 3, x - 3],
        ];
        // find winner (only checking each win-possibility as needed)
        if (
          this._win(horiz) ||
          this._win(vert) ||
          this._win(diagDR) ||
          this._win(diagDL)
        ) {
          return true;
        }
      }
    }
  }
  // Removes handleClick event listener when the game is over
  removeEventListener() {
    const top = document.getElementById("column-top");
    top.removeEventListener("click", this.handleClick);
  }
}
/* =====================================  End of Class ====================================== */
// Starts a new game when the new game button is clicked
let newGameButton = document.getElementById("newGame");
newGameButton.addEventListener("click", (event) => {
  event.preventDefault();
  document.getElementById("board").innerHTML = "";
  // Get a reference to the win message element
  let winMessage = document.getElementById("win-message");
  // If the element exists, remove it from the document
  if (winMessage) {
    winMessage.parentNode.removeChild(winMessage);
  }
  new Game(6, 7);
  // Reset the players color
  document.getElementById("player1").value = "";
  document.getElementById("player2").value = "";
});
