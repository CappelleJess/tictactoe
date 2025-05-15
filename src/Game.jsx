import { useState } from "react";
import Board from "./Board";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]); // Historique des grilles
    const [currentMove, setCurrentMove] = useState(0); // Tour actuel
    const xIsNext = currentMove % 2 === 0; // X joue aux tours pairs
    const currentSquares = history[currentMove]; // Grille du tour en cours

    function handlePlay(nextSquares) {
        // Coupe l’historique au tour actuel (évite de garder des "futurs alternatifs")
        const nextHistory = history.slice(0, currentMove + 1);
        // Ajoute la nouvelle grille à l’historique
        setHistory([...nextHistory, nextSquares]);
        // Avance d’un tour
        setCurrentMove(nextHistory.length);
    }

    function jumpTo(move) {
        // Change l’état pour refléter le tour sélectionné
        setCurrentMove(move);
    }

    const moves = history.map((_, move) => {
        const description = move ? `Revenir au tour ${move}` : "Revenir au début";
        return (
        <li key={move}>
            <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
        );
    });

    return (
        <div className="game">
        <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>
        <div className="game-info">
            {/* Liste cliquable pour naviguer dans les coups */}
            <ol>{moves}</ol>
        </div>
        </div>
    );
}
