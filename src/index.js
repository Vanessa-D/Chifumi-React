// Imports React + ReactDom from node_modules
import React from "react";
import ReactDOM from "react-dom";
// Import des composants from leur fichier respectif
import SelectStep from "./SelectStep";
import ScoreBoard from "./ScoreBoard";
import RoundResult from "./RoundResult";

// Export des constantes dont on se servira dans d'autres composants de l'app
export const PIERRE = "p";
export const FEUILLE = "f";
export const CISEAU = "c";

// Etats du jeu correspondant aux différents affichages du composant
export const GAME_STATES = {
    WAITING: 0,
    WIN: 1,
    LOSE: 2,
    TIE: 3,
    END_WIN: 4,
    END_LOSE: 5
}

// 1 manche gagnante = 3 coups gagnants
const MANCHES_VICTORIEUSES = 3;



// Fonction qui détermine qui gagne la manche en comparant les coups
// Le paramètre coup correspond à celui du joueur
function mancheGagnante(coup) {
    let coupOrdinateur;
    // 3 coups possibles
    // Math.floor --> retourne des entiers
    let hasard = Math.floor(Math.random() * 3);

    // Condition qui associe le math.random à un coup
    switch (hasard) {
        case 0:
            coupOrdinateur = PIERRE;
            break;
        case 1:
            coupOrdinateur = FEUILLE;
            break;
        case 2:
            coupOrdinateur = CISEAU;
            break;
    }

    if ((coup === FEUILLE && coupOrdinateur === PIERRE) ||
        (coup === CISEAU && coupOrdinateur === FEUILLE) ||
        (coup === PIERRE && coupOrdinateur === CISEAU)) {
       
        return true; // Si le joueur a gagné

    } else if (coup === coupOrdinateur) {
        return null; // Si égalité

    } else  {
        return false; // Si le joueur a perdu
    }
}

// Composant react --> const qui commence par une majuscule + fonction anonyme
//                 --> Fonction qui retourne du JSX à chaque fois que l'affichage est appelé
// Babel sert de traducteur JSX à JS pour que les navigateurs comprennent

const App = () => {

    // Utilisation de hooks --> états du composants App ( ex : SetScore permet de metre à jour score)

    // Initialisation d'un état envoyé à scoreJoueuse
    // A chaque modifications du score, setScoreJoueuse se met à jour et la renvoie à useState etc...

    const [scoreJoueuse, setScoreJoueuse] = React.useState(0);
    const [scoreOrdi, setScoreOrdi] = React.useState(0);
    const [gameState, setGameState] = React.useState(GAME_STATES.WAITING);
    const [partiesGagnantes, setPartiesGagnantes] = React.useState(0);

    console.log("Parties Gagnées par le joueur : " + partiesGagnantes);

    // Fonction qui réinitialise les scores + affichages du composant
    function resetRound () {
        if (gameState === GAME_STATES.END_LOSE
            || gameState === GAME_STATES.END_WIN) {
            setScoreJoueuse(0)
            setScoreOrdi(0)
        }

        // Pour ne pas rester bloqué sur l’affichage win ou loose
        if (gameState !== GAME_STATES.WAITING) {
            setGameState(GAME_STATES.WAITING);
        }
    }

    // Fonction qui détermine les actions du jeu
    function jouer(coup) {
        let resultatManche = mancheGagnante(coup);
        //console.log("Parties Gagnées : " + partiesGagnantes);
        if (resultatManche === true) {
            // la joueuse a gagné
            let nouveauScore = scoreJoueuse + 1;
            setScoreJoueuse(nouveauScore);
            if (nouveauScore === MANCHES_VICTORIEUSES) {
                setGameState(GAME_STATES.END_WIN)
                //MAJ de partiesGagnantes lorsqu'une partie est gagnée
                setPartiesGagnantes(partiesGagnantes + 1);
            } else {
                setGameState(GAME_STATES.WIN);
            }
        } else if (resultatManche === false) {
            // l'ordinateur a gagné
            let nouveauScore = scoreOrdi + 1;
            setScoreOrdi(nouveauScore);

            if (nouveauScore === MANCHES_VICTORIEUSES) {
                setGameState(GAME_STATES.END_LOSE)
            } else {
                setGameState(GAME_STATES.LOSE)
            }
        } else {
            setGameState(GAME_STATES.TIE)
        }
    }
    // Condition ternaire stockée dans une variable
    const blockGame = (gameState === GAME_STATES.WAITING) ?
        <SelectStep jouer={jouer} /> :
        <RoundResult gameState={gameState} partiesGagnantes={partiesGagnantes} />;

    // style jsx --> css pour JSX (pour les :hover par ex)    
    return (
        <div onClick={resetRound}>
            <style jsx>{`
                div {
                    background-color: #D3CFFF;
                    height: 100%;
                }
            `}
            </style>
            <ScoreBoard scoreJoueuse={scoreJoueuse} scoreOrdi={scoreOrdi} />
            {blockGame}
        </div>
    );
}
// Deux paramètres : le composant JSX et l'élément où s'affiche le composant
ReactDOM.render(<App/>, document.getElementById("react-app"));