import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';
import Game from './Game'; // Le composant racine qui gère tout
//import Board from './Board'; // Affiche seulement le plateau, pas l’état complet

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>,
)