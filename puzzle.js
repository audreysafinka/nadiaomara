var rows = 3;
var columns = 3;

var currTile;
var otherTile; // Tile kosong

var turns = 0;

var imgOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];

function startGame() {
    document.getElementById("startSound").play(); // Memutar suara
    document.getElementById("envelope").style.display = 'none'; // Sembunyikan amplop
    document.getElementById("paper-container").style.display = 'flex'; // Tampilkan kertas dan tombol NEXT
}

function goToPuzzle() {
    document.getElementById("paper-container").style.display = 'none'; // Sembunyikan kertas
    document.getElementById("gameContainer").style.display = 'block'; // Tampilkan konten permainan
    createPuzzle(); // Buat puzzle setelah klik NEXT
}

function createPuzzle() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = imgOrder.shift() + ".jpg";

            // DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            document.getElementById("board").append(tile);
        }
    }
}

window.onload = function() {
    // Memastikan amplop terlihat saat load
    document.getElementById("envelope").style.display = 'flex';
}

function dragStart() {
    currTile = this; // this refers to the img tile being dragged
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
    otherTile = this; // this refers to the img tile being dropped on
}

function dragEnd() {
    if (!otherTile.src.includes("3.jpg")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c - 1;
    let moveRight = r == r2 && c2 == c + 1;

    let moveUp = c == c2 && r2 == r - 1;
    let moveDown = c == c2 && r2 == r + 1;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        turns += 1;
        document.getElementById("turns").innerText = turns;
    }
}