// Imports React from node_modules
import React from "react";
// Import de la  constante GAME_STATES
import { GAME_STATES } from "./index";

// Composant qui gère les messages du jeu selon son état
const RoundResult = (props) => {
    const {gameState, partiesGagnantes}  = props;

    let textMessage = "";
    let partiesGagnées = "";
    let color = "";
    if (gameState === GAME_STATES.WIN) {
        textMessage = "Gagné !"
        color = "#2818DF";
    } else if (gameState === GAME_STATES.LOSE) {
        textMessage = "Perdu !"
        color = "#DA1717"
    } else if (gameState === GAME_STATES.END_WIN) {
        textMessage = "Bravo ! Partie gagnée."
        partiesGagnées = "Et de " + partiesGagnantes + " !"
        color = "#2818DF";
    } else if (gameState === GAME_STATES.END_LOSE) {
        textMessage = "Désolé ! Partie perdue."
        color = "#DA1717"
    } else {
        textMessage = "Égalité !"
        color = "#333333"
    }

    let headingStyle = {
        fontSize: "69.0380px",
        fontWeight: 700,
        textTransform: "uppercase",
        color: color,
    };

    const containerStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }

    return <div style={containerStyle}>
        <h1 style={headingStyle}>{textMessage}</h1>
        <h2 style={headingStyle}>{partiesGagnées}</h2>
    </div>
};

export default RoundResult;