/**
 * =================================================================================
 * game.js - Logica per il gioco "Snake"
 * =================================================================================
 *
 * Ciao! Questo file contiene tutto il codice per far funzionare il gioco Snake
 * che trovi nella pagina "game.html".
 *
 * Come funziona il gioco?
 * 1.  C'è un "serpente" che si muove su una griglia.
 * 2.  Il giocatore usa i tasti freccia per dirigerlo.
 * 3.  L'obiettivo è "mangiare" il cibo rosso che appare in posizioni casuali.
 * 4.  Ogni volta che il serpente mangia, diventa più lungo e il punteggio aumenta.
 * 5.  Il gioco finisce se il serpente tocca i bordi dell'area di gioco o se tocca
 *     se stesso.
 *
 * Il codice è organizzato per gestire queste diverse parti.
 * Anche qui, l'ascoltatore `DOMContentLoaded` assicura che il codice venga
 * eseguito solo dopo che la pagina HTML è completamente pronta.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- IMPOSTAZIONI INIZIALI ---

    // Trova l'elemento <canvas> nella pagina. Il canvas è come un foglio da disegno
    // su cui possiamo disegnare forme, immagini e animazioni con JavaScript.
    const canvas = document.getElementById('gameCanvas');

    // Se non siamo nella pagina del gioco, l'elemento #gameCanvas non esisterà.
    // In questo caso, interrompiamo subito lo script per non causare errori.
    if (!canvas) {
        return;
    }

    // "ctx" (abbreviazione di "context") è il nostro "pennello" per disegnare sul canvas.
    // Usiamo il contesto '2d' perché stiamo facendo un disegno bidimensionale.
    const ctx = canvas.getContext('2d');

    // --- STATO DEL GIOCO ---
    // Queste variabili contengono tutte le informazioni importanti sullo stato
    // attuale del gioco: la posizione del serpente, del cibo, il punteggio, etc.

    const box = 20; // La dimensione in pixel di ogni quadratino della griglia (e di ogni pezzo del serpente).

    // Il serpente è un "array" (una lista) di oggetti. Ogni oggetto ha coordinate x e y.
    // Inizialmente, il serpente è solo un quadratino (la testa) al centro dello schermo.
    let snake = [];
    snake[0] = { x: 10 * box, y: 10 * box };

    // Il cibo è un singolo oggetto con coordinate x e y.
    // La sua posizione iniziale è calcolata in modo casuale.
    let food = {
        x: Math.floor(Math.random() * 20) * box,
        y: Math.floor(Math.random() * 20) * box
    };

    let score = 0; // Il punteggio del giocatore.
    let currentDirection; // La direzione in cui si sta muovendo il serpente (UP, DOWN, LEFT, RIGHT).


    // --- GESTIONE INPUT UTENTE ---

    // Aggiungiamo un ascoltatore per i tasti premuti sulla tastiera.
    document.addEventListener('keydown', handleKeyPress);

    /**
     * Questa funzione viene chiamata ogni volta che un tasto viene premuto.
     * Controlla se il tasto è una delle frecce direzionali e aggiorna la
     * direzione del serpente.
     * @param {KeyboardEvent} event - L'oggetto che contiene le informazioni sul tasto premuto.
     */
    function handleKeyPress(event) {
        // "event.keyCode" è un numero che rappresenta il tasto premuto.
        // 37 = Freccia Sinistra, 38 = Freccia Su, 39 = Freccia Destra, 40 = Freccia Giù

        // Impedisce al serpente di fare un'inversione a U su se stesso.
        // Ad esempio, se si sta muovendo a destra, non può andare subito a sinistra.
        if (event.keyCode === 37 && currentDirection !== 'RIGHT') {
            currentDirection = 'LEFT';
        } else if (event.keyCode === 38 && currentDirection !== 'DOWN') {
            currentDirection = 'UP';
        } else if (event.keyCode === 39 && currentDirection !== 'LEFT') {
            currentDirection = 'RIGHT';
        } else if (event.keyCode === 40 && currentDirection !== 'UP') {
            currentDirection = 'DOWN';
        }
    }

    // --- FUNZIONI DI GIOCO ---

    /**
     * Controlla se la testa del serpente si è scontrata con una parte del suo corpo.
     * @param {Object} head - L'oggetto con le coordinate della testa del serpente.
     * @param {Array} array - L'array che rappresenta il corpo del serpente.
     * @returns {boolean} - Ritorna `true` se c'è una collisione, altrimenti `false`.
     */
    function checkCollision(head, array) {
        for (let i = 0; i < array.length; i++) {
            if (head.x === array[i].x && head.y === array[i].y) {
                return true;
            }
        }
        return false;
    }

    /**
     * --- IL "GAME LOOP" (CICLO DI GIOCO) ---
     * Questa è la funzione più importante. Viene eseguita ripetutamente
     * (grazie a `setInterval`) per creare l'animazione e aggiornare lo stato del gioco.
     */
    function gameLoop() {
        // Pulisce tutto il canvas. Se non lo facessimo, vedremmo la "scia" del serpente.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // --- Disegna il serpente ---
        for (let i = 0; i < snake.length; i++) {
            // La testa (i === 0) è verde, il resto del corpo è bianco.
            ctx.fillStyle = (i === 0) ? 'green' : 'white';
            ctx.fillRect(snake[i].x, snake[i].y, box, box);

            // Aggiunge un bordo rosso a ogni pezzo per renderlo più visibile.
            ctx.strokeStyle = 'red';
            ctx.strokeRect(snake[i].x, snake[i].y, box, box);
        }

        // --- Disegna il cibo ---
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x, food.y, box, box);

        // --- Logica di movimento ---
        // Prendiamo le coordinate attuali della testa del serpente.
        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        // Aggiorniamo le coordinate in base alla direzione attuale.
        if (currentDirection === 'LEFT') snakeX -= box;
        if (currentDirection === 'UP') snakeY -= box;
        if (currentDirection === 'RIGHT') snakeX += box;
        if (currentDirection === 'DOWN') snakeY += box;

        // --- Controlla se il serpente ha mangiato il cibo ---
        if (snakeX === food.x && snakeY === food.y) {
            score++;
            // Crea nuovo cibo in una posizione casuale.
            food = {
                x: Math.floor(Math.random() * 20) * box,
                y: Math.floor(Math.random() * 20) * box
            };
            // Se il serpente mangia, NON rimuoviamo la coda, facendolo così allungare.
        } else {
            // Se non ha mangiato, rimuoviamo l'ultimo pezzo della coda.
            // Questo dà l'illusione che il serpente si stia muovendo.
            snake.pop();
        }

        // Creiamo la nuova testa del serpente.
        let newHead = {
            x: snakeX,
            y: snakeY
        };

        // --- Controlla le condizioni di fine gioco ---
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height || checkCollision(newHead, snake)) {
            // Se una di queste condizioni è vera, il gioco finisce.
            clearInterval(gameInterval); // Ferma il ciclo di gioco.
            // Potremmo aggiungere qui un messaggio di "Game Over".
            ctx.fillStyle = 'black';
            ctx.font = '40px Arial';
            ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
        }

        // Aggiunge la nuova testa all'inizio dell'array del serpente.
        snake.unshift(newHead);

        // --- Disegna il punteggio ---
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        const urlParams = new URLSearchParams(window.location.search);
        let lang = urlParams.get('lang') || 'it';
        const scoreText = (lang === 'it') ? 'Punteggio: ' : 'Score: ';
        ctx.fillText(scoreText + score, box, box);
    }

    // --- AVVIO DEL GIOCO ---
    // `setInterval(gameLoop, 100)` dice al browser di eseguire la funzione `gameLoop`
    // ogni 100 millisecondi. Questo crea l'animazione.
    // Salviamo l'intervallo in una variabile per poterlo fermare quando il gioco finisce.
    let gameInterval = setInterval(gameLoop, 100);
});
