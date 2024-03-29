let scoreJoueur1;
let scoreJoueur2;
let de;
let currentPlayer;

function nouvellePartie(){
    alert("Nouvelle partie");
    document.getElementById("scoreTotalPlayerOne").innerHTML = "00";
    document.getElementById("scoreTotalPlayerTwo").innerHTML = "00";
    document.getElementById("decompteCurrentUn").innerHTML = "00";
    document.getElementById("decompteCurrentDeux").innerHTML = "00";
    document.getElementById("joueur1actif").style.display = "inline";
    document.getElementById("joueur2actif").style.display = "none";
    currentPlayer = "joueur1";
}

function lancerLeDe(){
    let de = Math.floor(Math.random() * (6) + 1);
    // alert("Dé lancé : " + de);
    if (currentPlayer == "joueur1") /* joueur 1 */ {
        if (de == 1) {
            // Il pert et passe la main
            document.getElementById("decompteCurrentUn").innerHTML = "00";
            currentPlayer = "joueur2";
            document.getElementById("joueur1actif").style.display = "none";
            document.getElementById("joueur2actif").style.display = "inline";
        } else {
            affecteScoreCourant(de, "decompteCurrentUn");
        }
    } else /* joueur 2 */{
        if (de == 1) {
            // Il pert et passe la main
            document.getElementById("decompteCurrentDeux").innerHTML = "00";
            currentPlayer = "joueur1";
            document.getElementById("joueur2actif").style.display = "none";
            document.getElementById("joueur1actif").style.display = "inline";
        } else {
            affecteScoreCourant(de, "decompteCurrentDeux");
        }
    }
}

function affecteScoreCourant(de, scoreJoueur){
    let scoreCourant = Number(document.getElementById(scoreJoueur).innerHTML);
    scoreCourant += de;
    document.getElementById(scoreJoueur).innerHTML = (scoreCourant<10?"0"+scoreCourant:scoreCourant);  
}

function garderScore(){
    // alert("Garde le score et passe la main");
    let victory = (currentPlayer == "joueur1"?
        affecteScoreGlobal("decompteCurrentUn", "scoreTotalPlayerOne"):
        affecteScoreGlobal("decompteCurrentDeux", "scoreTotalPlayerTwo")
    );
    if (victory) {
        alert("Félicitation " + currentPlayer +"\nVous avez gagné !");
        nouvellePartie();
    } else {
        if (currentPlayer == "joueur1") /* joueur 1 */{
            currentPlayer = "joueur2";
            document.getElementById("joueur1actif").style.display = "none";
            document.getElementById("joueur2actif").style.display = "inline";
        } else /* joueur 2 */ {
            currentPlayer = "joueur1";
            document.getElementById("joueur2actif").style.display = "none";
            document.getElementById("joueur1actif").style.display = "inline";
        }
    }
}

function affecteScoreGlobal(idScoreCourant, idScoreGlobal) {
    let scoreCourant = Number(document.getElementById(idScoreCourant).innerHTML);
    let scoreGlobal = Number(document.getElementById(idScoreGlobal).innerHTML);
    scoreGlobal += scoreCourant;
    document.getElementById(idScoreGlobal).innerHTML = (scoreGlobal<10?"0"+scoreGlobal:scoreGlobal);
    document.getElementById(idScoreCourant).innerHTML = "00";
    return scoreGlobal >= 100;
}