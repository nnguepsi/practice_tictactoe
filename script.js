const gameBoard = document.querySelector("#gameboard")
const infoDisplay = document.querySelector("#info")
const startCells = [
    "","","",
    "","","",
    "","","",
]
infoDisplay.textContent = "Circle goes first"
let go = "circle"

function createBoard(){
    startCells.forEach((cell, index) =>{
        const cellElement = document.createElement("div")
        cellElement.classList.add("square")
        cellElement.id = index
        cellElement.addEventListener("click", addGo)
/*        const circleElement = document.createElement("div")
        circleElement.classList.add("cross")
        cellElement.append(circleElement) */
        gameBoard.appendChild(cellElement)
    })
}

createBoard()

function addGo(e){
    console.log("clicked", e.target)
    const goDisplay = document.createElement("div")
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    console.log(go)
    infoDisplay.textContent = "Now " + go + " turn!"
    e.target.removeEventListener("click", addGo)
    checkScore()

}

function checkScore(){
    const allSquares = document.querySelectorAll(".square")
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]
    ]

    winningCombos.forEach(array => {
        const circleWins = array.every(cell =>  allSquares[cell].firstChild?.classList.contains("circle"))
        if (circleWins) {
            infoDisplay.textContent = "Circles Win!"
            allSquares.forEach(square => square.replaceWith(square.cloneNode(true)))

        }
    })

    winningCombos.forEach(array => {
        const crossWins = array.every(cell =>  allSquares[cell].firstChild?.classList.contains("cross"))
        if (crossWins) {
            infoDisplay.textContent = "Crosses Win!"

        }
    })
}