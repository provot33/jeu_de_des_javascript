let currentPlayer = "joueur1";

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

function evalueDe(de){
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


const dice = document.querySelector('.dice');
const rollBtn = document.querySelector('.rollDice');

const randomDice = () => {

    const random = Math.floor(Math.random() * (6) + 1);
    if (random >= 1 && random <= 6) {
        rollDice(random);
    }
    else {
        randomDice();
    }
}

const rollDice = random => {

    dice.style.animation = 'rolling 4s';

    setTimeout(() => {

        switch (random) {
            case 1:
                dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
                break;

            case 6:
                dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
                break;

            case 2:
                dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
                break;

            case 5:
                dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
                break;

            case 3:
                dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
                break;

            case 4:
                dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
                break;

            default:
                break;
        }

        dice.style.animation = 'none';
        evalueDe(random);

    }, 4050);
    
}

rollBtn.addEventListener('click', randomDice);