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

window.onload = function() {
    eingabeÜberprüfen()
};

function eingabeÜberprüfen() {
    let slot1symbol = document.getElementById("slot1Symbol")
    let slot2symbol = document.getElementById("slot2Symbol")
    let slot3symbol = document.getElementById("slot3Symbol")
    let slotcontaienr = document.getElementsByClassName("flex-child")
    let newSlot1 = items[Math.floor(Math.random() * 12)]
    let newSlot2 = items[Math.floor(Math.random() * 12)]
    let newSlot3 = items[Math.floor(Math.random() * 12)]
    let spinBtn = document.getElementById("spinButton")
    spinBtn.addEventListener("click", () => {
        for(let i = 0; i < 5; i++){
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
                slot1symbol.innerHTML = items[Math.floor(Math.random() * 12)]
                slot2symbol.innerHTML = items[Math.floor(Math.random() * 12)]
                slot3symbol.innerHTML = items[Math.floor(Math.random() * 12)]
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

        }





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