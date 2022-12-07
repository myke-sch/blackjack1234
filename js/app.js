let karten_deck = ["karo2","karo3","karo4","karo5","karo6" ,"karo7", "karo8","karo9","karo10", "karo11", "karo12", "karo13", "karo14",
    "kreuz2","kreuz3", "kreuz4", "kreuz5" ,"kreuz6", "kreuz7", "kreuz8", "kreuz9", "kreuz10", "kreuz11", "kreuz12", "kreuz13", "kreuz14", "herz2","herz3", "herz4", "herz5" , "herz6", "herz7", "herz8", "herz9", "herz10", "herz11",
    "herz12", "herz13", "herz14", "pik2","pik3", "pik4", "pik5" , "pik6", "pik7", "pik8", "pik9", "pik10", "pik11", "pik12", "pik13", "pik14"];

let spieler = 3
let deck = []
let spielerKarten = [
    [],
    [],
    [],
];
let actualPlayer;
let disabledPlayers = [];
let kartenWerte = []
let temp_summe;
let end_summe;
let spielerIndexVerloren = []
let spielerIndexGewonnen = []
let spielerIndexEinsatzZurueck = []

let kartenWerteDealer = 0;
let dealerKartenArr = []

let GuthabenSpieler1 = 500;
let GuthabenSpieler2 = 500;
let GuthabenSpieler3 = 500;

window.onload = function() {
    deck = deck.concat(karten_mischen(karten_deck));
    console.log(deck)
    eingabeÜberprüfen();
    actualPlayer = 1;
    document.getElementById("spieler0Guthaben").innerHTML = `Spieler 1 Guthaben: ${GuthabenSpieler1}€`
    document.getElementById("spieler1Guthaben").innerHTML = `Spieler 2 Guthaben: ${GuthabenSpieler2}€`
    document.getElementById("spieler2Guthaben").innerHTML = `Spieler 3 Guthaben: ${GuthabenSpieler3}€`


};

function eingabeÜberprüfen() {
        let btn1 = document.getElementById("btn1"); //Schwarz, //Höher, //Innerhalb
        btn1.addEventListener("click", () => {
                kartenVerteilen();
        });
        let btn2 = document.getElementById("btn2"); //hit
        btn2.addEventListener("click", () => {
            let neueKarte = document.createElement("img")
            neueKarte.src = `/img/${deck[0]}.png`
            document.getElementById("spielerKarten" + actualPlayer).appendChild(neueKarte)
            karteSpeichern();
            karteZiehen();
            //kartenWerteBerechnen(false);

        });

        let btn3 = document.getElementById("btn3"); //surrender
        btn3.addEventListener("click", () => {
            disabledPlayers.push(actualPlayer);
            actualPlayer++;
            document.getElementById("actualPlayer").innerHTML = `Spieler ${actualPlayer} ist an der Reihe`

            rundeBeenden();
        });

        let einsatzBtn = document.getElementById("submitEinsatz")
        einsatzBtn.addEventListener("click" ,() =>{
            let ausgewahlterSpieler = document.getElementById("spielerAuswahl").value
            let spielerGuthaben = parseInt(document.getElementById(`spieler${ausgewahlterSpieler - 1}Guthaben`).innerHTML.replace(/\D/g, '').slice(1,6))
            let einsatz = document.getElementById("einsatzSpieler").value
            document.getElementById(`spieler${ausgewahlterSpieler - 1}`).innerHTML = `Spieler ${ausgewahlterSpieler} Einsatz: ${einsatz}€`
            document.getElementById(`spieler${ausgewahlterSpieler - 1}Guthaben`).innerHTML = `Spieler ${ausgewahlterSpieler} Guthaben: ${spielerGuthaben - einsatz}€`
        })


}

function checkIfDisabled() {
    if(disabledPlayers.includes(actualPlayer) === false) {
        return true;
    }
    else {
        if(disabledPlayers.length >= spieler - 1) {
            console.log("Alle Spieler haben surrendered -> Karten werden gezählt");
            //kartenWerteBerechnen();
        }
        else {
            actualPlayer++;
        }
        return false;
    }
}



function rundeBeenden() {
    if(actualPlayer === spieler + 1) {
        console.log("Karten auszählen")
        endWerte();
        document.getElementById("actualPlayer").innerHTML = `Runde vorbei`
        gewinnerBerechnen();
        let reset = document.createElement("button")
        reset.innerHTML = "Zurücksetzen"
        document.getElementById("btns").appendChild(reset)
        reset.addEventListener("click", () => {
            for(let i = 0; i < 3; i++){
                let img = document.getElementsByTagName("img")
                let l = img.length
                for(let i = 0; i < l; i++) {
                    img[0].parentNode.removeChild(img[0])
                }
            }
            actualPlayer = 0;
            document.getElementById("actualPlayer").innerHTML = `Spieler ${actualPlayer} ist an der Reihe`
            spielerKarten = [
                [],
                [],
                []
            ]
            kartenWerte = []
            kartenWerteDealer = 0;
            deck = []
            spielerIndexGewonnen = []
            spielerIndexVerloren = []
            spielerIndexEinsatzZurueck = []
            deck = deck.concat(karten_mischen(karten_deck))
            document.getElementById("spieler0").innerHTML = "Spieler 1 Einsatz: €"
            document.getElementById("spieler1").innerHTML = "Spieler 2 Einsatz: €"
            document.getElementById("spieler2").innerHTML = "Spieler 3 Einsatz: €"
            reset.remove()
        })
    }
}

function kartenVerteilen() {
    for (let i = 0; i < spieler; i++){
        for (let n = 0; n < 1; n++){

            let karte1 = document.createElement("img")
            karte1.src = `/img/${deck[0]}.png`
            document.getElementById("spielerKarten" + (i + 1)).appendChild(karte1)
            spielerKarten[i].push(deck[0])
            karteZiehen()

            let karte2 = document.createElement("img")
            karte2.src = `/img/${deck[0]}.png`
            karte2.setAttribute("id", "spielerKarte"+i)
            document.getElementById("spielerKarten" + (i + 1)).appendChild(karte2)
            spielerKarten[i].push(deck[0])
            karteZiehen()
        }


    }
}

function karteSpeichern() {
    switch (actualPlayer){
        case 1:
            spielerKarten[actualPlayer - 1].push(deck[0]);
            break;
        case 2:
            spielerKarten[actualPlayer - 1].push(deck[0]);
            break;
        case 3:
            spielerKarten[actualPlayer - 1].push(deck[0]);
            break;
    }
}

function kartenWerteBerechnen(spielVorbei) {
    for(let i = 0; i < spielerKarten.length; i++) {
        temp_summe = 0;
        for (let n = 0; n < spielerKarten[i].length; n++) {
            if(parseInt(spielerKarten[i][n].match(/(\d+)/)) >= 10 && parseInt(spielerKarten[i][n].match(/(\d+)/)) <= 13) {
                temp_summe += 10;
                console.log("10")
            }
            else if (parseInt(spielerKarten[i][n].match(/(\d+)/)) >= 14) {
                if((temp_summe += parseInt(spielerKarten[i][n].match(/(\d+)/))) > 21){
                    temp_summe += 1;
                    console.log("1")
                }
                else {
                    temp_summe += 11;
                    console.log("11")
                }
            }
            else if (parseInt(spielerKarten[i][n].match(/(\d+)/)) < 10) {
                temp_summe += parseInt(spielerKarten[i][n].match(/(\d+)/));
                console.log(parseInt(spielerKarten[i][n].match(/(\d+)/)))
            }
        }
    }


}

function endWerte() {
    for(let i = 0; i < spielerKarten.length; i++) {
        end_summe = 0;
        console.log("End Summe: " + end_summe)
        for (let n = 0; n < spielerKarten[i].length; n++) {
            if(parseInt(spielerKarten[i][n].match(/(\d+)/)) >= 10 && parseInt(spielerKarten[i][n].match(/(\d+)/)) <= 13) {
                end_summe += 10;
                console.log("10")
            }
            else if (parseInt(spielerKarten[i][n].match(/(\d+)/)) === 14) {
                let end_summe_temp = end_summe + 11
                if(end_summe_temp > 21) {
                    end_summe += 1;
                    console.log("1")
                }
                else {
                    end_summe += 11;
                    console.log("11")
                }
            }
            else if (parseInt(spielerKarten[i][n].match(/(\d+)/)) < 10) {
                end_summe += parseInt(spielerKarten[i][n].match(/(\d+)/));
                console.log(parseInt(spielerKarten[i][n].match(/(\d+)/)))
            }
        }
        console.log(end_summe)
        kartenWerte.push(end_summe)
        console.log("Nächster Spieler")
    }
}

function gewinnerBerechnen() {
    dealerKarten()
    for(let i = 0; i < kartenWerte.length; i++) {
        if(kartenWerte[i] > 21 || kartenWerte[i] < kartenWerteDealer && kartenWerteDealer <= 21) {
            spielerIndexVerloren.push(i);
            document.getElementById(`spieler${i}`).innerHTML = `Spieler ${i + 1}: ${0}€`
        }
        if(kartenWerte[i] < 21 && kartenWerte[i] > kartenWerteDealer || kartenWerte[i] < 21 && kartenWerteDealer > 21 || kartenWerte[i] === kartenWerteDealer) {
            spielerIndexEinsatzZurueck.push(i);
            let spielerGuthaben = parseInt(document.getElementById(`spieler${i}Guthaben`).innerHTML.replace(/\D/g, '').slice(1,6))
            let einsatz = parseInt(document.getElementById(`spieler${i}`).innerHTML.replace(/\D/g, '').slice(1,6))
            document.getElementById(`spieler${i}`).innerHTML = `Spieler ${i + 1} Einsatz: ${einsatz}€`
            document.getElementById(`spieler${i}Guthaben`).innerHTML = `Spieler ${i +1 } Guthaben: ${spielerGuthaben + einsatz}€`
        }
        if(kartenWerte[i] === 21) {
            spielerIndexGewonnen.push(i)
            let spielerGuthaben = parseInt(document.getElementById(`spieler${i}Guthaben`).innerHTML.replace(/\D/g, '').slice(1,6))
            let einsatz = parseInt(document.getElementById(`spieler${i}`).innerHTML.replace(/\D/g, '').slice(1,6))
            document.getElementById(`spieler${i}`).innerHTML = `Spieler ${i + 1} Einsatz: ${einsatz * 2}€`
            document.getElementById(`spieler${i}Guthaben`).innerHTML = `Spieler ${i +1 } Guthaben: ${spielerGuthaben + (einsatz * 2)}€` //einsatz auf gel addieren
        }
    }
}


function dealerKarten() {
    kartenWerteDealer = 0;
    while (kartenWerteDealer < 17){
        dealerKartenArr.push(deck[0])
        if(parseInt(deck[0].match(/(\d+)/)) >= 10 && parseInt(deck[0].match(/(\d+)/)) <= 13) {
            kartenWerteDealer += 10;
        }
        if (parseInt(deck[0].match(/(\d+)/)) === 14) {
            let kartenWerteDealer_temp = kartenWerteDealer + 11
            if(kartenWerteDealer_temp > 21) {
                kartenWerteDealer += 1;
            }
            else {
                kartenWerteDealer += 11;
            }
        }
        if(parseInt(deck[0].match(/(\d+)/)) < 10) {
            kartenWerteDealer += parseInt(deck[0].match(/(\d+)/));
        }
        let dealerKarten = document.createElement("img")
        dealerKarten.src = `/img/${deck[0]}.png`
        document.getElementById("dealerCards").appendChild(dealerKarten)
        karteZiehen();

    }
}


function karteZiehen(){//1. Karte aus deck entfernen
    if (deck.length > 0) {
        deck.shift();
    }
    else {
        console.log("Deck leer - neu mischen");
    }
}

function karten_mischen(deck1) {  //Fisher-Yates-Verfahren
    let deck_size_counter = deck1.length;

    while (deck_size_counter > 0){
        let karte = Math.floor(Math.random() * deck_size_counter);

        deck_size_counter--;

        let temp = deck1[deck_size_counter];
        deck1[deck_size_counter] = deck1[karte]
        deck1[karte] = temp;
    }

    return deck1;
}