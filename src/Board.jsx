import { useState } from "react";
import Square from "./Square";

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // Empêche de rejouer une case et vérifie si la partie est gagnée
    if(squares[i] || calculateWinner(squares)) return; 

    // Copie de l’état actuel (important pour ne pas modifier le tableau original)
    const nextSquares = squares.slice();

    // Insère X ou O selon le joueur courant
    nextSquares[i] = xIsNext ? 'X' : 'O';

    // Appelle la fonction passée par le parent pour notifier du nouveau coup joué
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = winner
  ? `${winner} a gagné` // Affiche le gagnant s’il y en a un
  : `Prochain tour : ${xIsNext ? "X" : "O"}`; // Sinon, affiche le joueur courant

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        {[0, 1, 2].map(i => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[3, 4, 5].map(i => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
      <div className="board-row">
        {[6, 7, 8].map(i => (
          <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // lignes
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colonnes
    [0, 4, 8], [2, 4, 6]             // diagonales
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  return null;
}

export default Board;