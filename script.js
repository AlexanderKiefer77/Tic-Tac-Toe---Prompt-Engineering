// for fields
let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentShape = 'circle'; // Startspieler

const winPatterns = [
    [0, 1, 2], // Zeile 1
    [3, 4, 5], // Zeile 2
    [6, 7, 8], // Zeile 3
    [0, 3, 6], // Spalte 1
    [1, 4, 7], // Spalte 2
    [2, 5, 8], // Spalte 3
    [0, 4, 8], // Diagonale \
    [2, 4, 6]  // Diagonale /
];

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById("content");
    let tableHtml = "<table>";

    for (let i = 0; i < 3; i++) {
        tableHtml += "<tr>";
        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            let symbol = '';
            if (fields[index] === 'circle') {
                symbol = generateCircleSVG();
            } else if (symbol[index] === 'cross') {
                symbol = generateCrossSVG();
            }

            tableHtml += `<td onclick="handleClick(this, ${index})">${symbol}</td>`;
        }
        tableHtml += "</tr>";
    }
    tableHtml += "</table>";
    contentDiv.innerHTML = tableHtml;
}


function handleClick(cell, index) {
    if (fields[index] === null) {
        fields[index] = currentShape;
        cell.innerHTML = currentShape === 'circle' ? generateCircleSVG() : generateCrossSVG();
        cell.onclick = null;
        currentShape = currentShape === 'circle' ? 'cross' : 'circle';

        if (isGameFinished()) {
            const winningPattern = getWinningPattern();
            drawWinningLine(winningPattern);
        }
    }
}

function isGameFinished() {
    return getWinningPattern() !== null || fields.every(field => field !== null);
}

function getWinningPattern() {
    for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (fields[a] === fields[b] && fields[b] === fields[c] && fields[a] !== null) {
            return winPatterns[i];
        }
    }
    return null;
}

function drawWinningLine(pattern) {
    const lineColor = '#FFFFFF'; // Weiß
    const lineWidth = 6; // 6px breit

    const cells = document.querySelectorAll('td');
    const startCell = cells[pattern[0]];
    const endCell = cells[pattern[2]];

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    // Mittelpunkt der Start- und Endzelle berechnen
    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    const deltaX = endX - startX;
    const deltaY = endY - startY;

    const lineLength = Math.hypot(deltaX, deltaY);
    const angleDeg = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.width = `${lineLength}px`;
    line.style.height = `${lineWidth}px`;
    line.style.backgroundColor = lineColor;
    line.style.left = `${startX}px`;
    line.style.top = `${startY - lineWidth / 2}px`; // Vertikal zentrieren
    line.style.transform = `rotate(${angleDeg}deg)`;
    line.style.transformOrigin = '0 50%';
    line.style.zIndex = 10;
    line.style.transition = 'width 0.3s ease';
    line.classList.add('winning-line');
    document.body.appendChild(line); // besser als in #content
}

function restartGame() {
    // 1. Felder leeren
    fields = Array(9).fill(null);

    // 2. Spieler zurücksetzen
    currentShape = 'circle';

    // 3. SVG-Gewinnerlinie(n) entfernen (wenn du sie im <body> hinzugefügt hast)
    const lines = document.querySelectorAll('.winning-line');
    lines.forEach(line => line.remove());
   
    // 4. Tabelle neu rendern
    render();
}
