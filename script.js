// for fields
let fields = [
    null,
    'circle',
    null,
    null,
    null,
    null,
    'cross',
    null,
    null
];

function init() {
    render();
}


// Der Spielstand – leeres Feld = ""
let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

// Funktion zum Rendern des Spielfelds
function render() {
    const contentDiv = document.getElementById("content");

    let tableHtml = "<table>";

    for (let i = 0; i < 3; i++) { // Zeilen
        tableHtml += "<tr>";
        for (let j = 0; j < 3; j++) { // Spalten
            const index = i * 3 + j;
            let symbol = '';

            if (fields[index] === 'circle') {
                symbol = 'O';
            } else if (fields[index] === 'cross') {
                symbol = 'X';
            }
            tableHtml += `<td>${symbol}</td>`;
        }
        tableHtml += "</tr>";
    }
    tableHtml += "</table>";

    contentDiv.innerHTML = tableHtml;
}

// Beispiel-Click-Handler
let currentPlayer = "X";

function handleClick(row, col) {
    if (board[row][col] === "") {
        board[row][col] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        render();
    }
}

