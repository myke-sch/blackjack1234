const items = [
    "🍭",
    "❌",
    "⛄",
    "🦄",
    "🍌",
    "💩",
    "👻",
    "😻",
    "💵",
    "🤡",
    "🦖",
    "🍎",
    "jackpot"
];

let spielerGuthaben = 500
let gewinn;

window.onload = function() {
    eingabeÜberprüfen()
    document.getElementById("guthaben").innerHTML = `Guthaben: ${spielerGuthaben}€`
};


function gewinnPruefen(slot1,slot2,slot3) {
    gewinn = 0;
    let einsatz = parseFloat(document.getElementById("einsatz").value)
    if(einsatz < 0) {
        einsatz = einsatz * -1
    }
    spielerGuthaben = spielerGuthaben - einsatz
    let gewinnNachricht = document.getElementById("jackpot_h1")
    let spielerGuthabenText = document.getElementById("guthaben")
    //spielerGuthaben = (spielerGuthaben -= einsatz).toFixed(2)
    gewinnNachricht.style.visibility = "visible"
    if(slot1 === slot2  || slot1  === slot3){
        switch (slot1){
            case "🍭":
                gewinn = parseFloat(document.getElementById("einsatz").value) * 1.2;
                spielerGuthaben += gewinn
                gewinnNachricht.innerHTML = `Herzlichen Glückwunsch | Gewinn: ${einsatz * 1.2}`
                console.log(gewinn)
                document.getElementById("guthaben").innerHTML = `Guthaben: ${(spielerGuthaben.toFixed(2))}€`
                break;
            case "💵":
                gewinn = parseFloat(document.getElementById("einsatz").value) * 1.5
                spielerGuthaben += gewinn
                gewinnNachricht.innerHTML = `Herzlichen Glückwunsch | Gewinn: ${einsatz * 1.5}`
                spielerGuthaben += parseFloat(document.getElementById("einsatz").value) * 1.5
                document.getElementById("guthaben").innerHTML = `Guthaben: ${spielerGuthaben.toFixed(2)}€`
                break;
            case "🦖":
                gewinn = parseFloat(document.getElementById("einsatz").value) * 1.8
                spielerGuthaben += gewinn
                gewinnNachricht.innerHTML = `Herzlichen Glückwunsch | Gewinn: ${einsatz * 1.8}`
                spielerGuthaben += parseFloat(document.getElementById("einsatz").value) * 1.5
                document.getElementById("guthaben").innerHTML = `Guthaben: ${spielerGuthaben.toFixed(2)}€`
                break;

            default:
                gewinnNachricht.innerHTML = `Herzlichen Glückwunsch | Einsatz zurück: ${einsatz}`
                spielerGuthaben += einsatz
                spielerGuthaben += parseFloat(document.getElementById("einsatz").value)
                document.getElementById("guthaben").innerHTML = `Guthaben: ${spielerGuthaben.toFixed(2)}€`
                break;
        }
    }
    else {
        gewinnNachricht.innerHTML = `Leider kein Gewinn`
        document.getElementById("guthaben").innerHTML = `Guthaben: ${spielerGuthaben.toFixed(2)}€`
    }
}

function eingabeÜberprüfen() {

    let newSlot1 = "🍭"//items[Math.floor(Math.random() * 12)]
    let newSlot2 = "🍭"//items[Math.floor(Math.random() * 12)]
    let newSlot3 = "🍭" //items[Math.floor(Math.random() * 12)]
    let slot1symbol = document.getElementById("slot1Symbol")
    let slot2symbol = document.getElementById("slot2Symbol")
    let slot3symbol = document.getElementById("slot3Symbol")
    let slotcontaienr = document.getElementsByClassName("flex-child")
    let spinBtn = document.getElementById("spinButton")
    spinBtn.addEventListener("click", () => {
            gewinnPruefen(newSlot1, newSlot2, newSlot3);
            slot1symbol.style.transition = "0.2s"
            slot2symbol.style.transition = "0.2s"
            slot3symbol.style.transition = "0.2s"
            slot1symbol.style.top = "120px"
            slot2symbol.style.top = "120px"
            slot3symbol.style.top = "120px"
            setTimeout(() => {
                slot1symbol.style.transition = "0s"
                slot2symbol.style.transition = "0s"
                slot3symbol.style.transition = "0s"
                slot1symbol.style.top = "-110px"
                slot2symbol.style.top = "-110px"
                slot3symbol.style.top = "-110px"

                slot1symbol.innerHTML = items[newSlot1]
                slot2symbol.innerHTML = items[newSlot2]
                slot3symbol.innerHTML = items[newSlot3]
            }, "200")
            setTimeout(() => {
                slot1symbol.style.transition = "0.2s"
                slot2symbol.style.transition = "0.2s"
                slot3symbol.style.transition = "0.2s"
                slot1symbol.style.top = "0px"
                slot2symbol.style.top = "0px"
                slot3symbol.style.top = "0px"
                slot1symbol.innerHTML = items[Math.floor(Math.random() * 12)]
                slot2symbol.innerHTML = items[Math.floor(Math.random() * 12)]
                slot3symbol.innerHTML = items[Math.floor(Math.random() * 12)]
            }, "500")
    });
}

/*slot1symbol.style.paddingTop = "170px"
        slot2symbol.style.paddingTop = "170px"
        slot3symbol.style.paddingTop = "170px"
        setTimeout(() => {
            slot1symbol.style.paddingTop = "-170px"
            slot2symbol.style.paddingTop = "-170px"
            slot3symbol.style.paddingTop = "-170px"
            slot1symbol.innerHTML = items[Math.floor(Math.random() * 11)]
            slot2symbol.innerHTML = items[Math.floor(Math.random() * 11)]
            slot3symbol.innerHTML = items[Math.floor(Math.random() * 11)]
        }, 500);*/