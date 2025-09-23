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

        const result = checkWinner();
        if (result) {
            drawWinningLine(result.pattern);
            showWinnerText(`${result.winner === 'circle' ? 'Kreis' : 'Kreuz'} gewinnt!`);
            disableAllClicks();
            return;
        }

        // Unentschieden prüfen
        if (fields.every(field => field !== null)) {
            showWinnerText("Unentschieden!");
        }

    }
}

function isGameFinished() {
    return getWinningPattern() !== null || fields.every(field => field !== null);
}

function disableAllClicks() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.onclick = null;
    });
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
    const extraLength = 40;
    const lineWidth = 6;

    const cells = document.querySelectorAll('td');
    const startCell = cells[pattern[0]];
    const endCell = cells[pattern[2]];

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const startX = startRect.left + startRect.width / 2;
    const startY = startRect.top + startRect.height / 2;
    const endX = endRect.left + endRect.width / 2;
    const endY = endRect.top + endRect.height / 2;

    const dx = endX - startX;
    const dy = endY - startY;
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = angleRad * (180 / Math.PI);

    const length = Math.hypot(dx, dy) + extraLength;

    const offsetX = Math.cos(angleRad) * (extraLength / 2);
    const offsetY = Math.sin(angleRad) * (extraLength / 2);
    const adjustedX = startX - offsetX;
    const adjustedY = startY - offsetY;

    // ⬅️ Hier wird mittig zentriert (sehr wichtig!)
    const wrapper = document.createElement('div');
    wrapper.classList.add('winning-line-wrapper');
    wrapper.style.position = 'absolute';
    wrapper.style.left = `${adjustedX}px`;
    wrapper.style.top = `${adjustedY}px`; // vertikal zentrieren
    wrapper.style.width = `${length}px`;
    wrapper.style.height = `${lineWidth}px`;
    wrapper.style.transform = `rotate(${angleDeg}deg)`;
    wrapper.style.transformOrigin = 'left center';
    wrapper.style.zIndex = 10;
    wrapper.style.pointerEvents = 'none';

    const line = document.createElement('div');
    line.classList.add('winning-line');
    line.style.width = '100%';
    line.style.height = '100%';

    wrapper.appendChild(line);
    document.body.appendChild(wrapper);
}

function checkWinner() {  
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (fields[a] && fields[a] === fields[b] && fields[b] === fields[c]) {
            return {
                winner: fields[a],  // 'circle' oder 'cross'
                pattern             // z. B. [0, 1, 2]
            };
        }
    }
    return null; // Kein Gewinner
}

function restartGame() {
    // 1. Felder leeren
    fields = Array(9).fill(null);

    // 2. Spieler zurücksetzen
    currentShape = 'circle';

    // 3. SVG-Gewinnerlinie(n) entfernen (wenn du sie im <body> hinzugefügt hast)
    const lines = document.querySelectorAll('.winning-line');
    lines.forEach(line => line.remove());

    // Gewinner-Text leeren
    showWinnerText('');

    // 4. Tabelle neu rendern
    render();
}

function showWinnerText(text) {
    const winnerDiv = document.getElementById("winner-text");
    winnerDiv.textContent = text;
}
