document.addEventListener("DOMContentLoaded", () => { /* Čia kaip ready funkcija jQuery, tam kad JS pradėtų veikti po HTML ir CSS */
    const cardArray = [
        {
            name: "bread",
            img: "img/bread.png"
        },
        {
            name: "bread",
            img: "img/bread.png"
        },
        {
            name: "chicken",
            img: "img/chicken.png"
        },
        {
            name: "chicken",
            img: "img/chicken.png"
        },
        {
            name: "milkshake",
            img: "img/milkshake.png"
        },
        {
            name: "milkshake",
            img: "img/milkshake.png"
        },
        {
            name: "muffins",
            img: "img/muffins.png"
        },
        {
            name: "muffins",
            img: "img/muffins.png"
        },
        {
            name: "salmon",
            img: "img/salmon.png"
        },
        {
            name: "salmon",
            img: "img/salmon.png"
        },
        {
            name: "soup",
            img: "img/soup.png"
        },
        {
            name: "soup",
            img: "img/soup.png"
        }
    ]

    cardArray.sort(() => 0.5 - Math.random()) /* sukuria random funkciją kortų sumaišime */

    const grid = document.querySelector(".grid")
    const resultDisplay = document.querySelector("#result")

    var cardsChosen = [] /* var galima keisti, mažiau restrictions, let griežtesnis taikymas. Var naudojame ten kur gal būt kažką keisime */
    var cardsChosenId = []
    var cardsWon = [] /* čia dedame kortas išimtas iš žaidimo ir skaičiuosime rezultatą bei žinosime kada žaidimas pasibaigia */

    function createBoard() {
        for(let i=0; i < cardArray.length; i++) {
            var card = document.createElement("img")
            card.setAttribute("src", "img/leaves.png") /* nuotraukų source (iš kur bus paimtos nuotraukos, užverstos nuotraukos) */
            card.setAttribute("data-id", i) /* i atspindės indekso skaičių - 1, 2 ir t.t. */
            card.addEventListener("click", flipCard) /* paspaudus kortą kažkas įvyksta (šiuo atveju atsidaro foto) */
            grid.appendChild(card)
        }
    }

    function flipCard() {
        var cardId = this.getAttribute("data-id") /* paema ID bloko (kortos) iš create board funkcijos */
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute("src", cardArray[cardId].img)

        if(cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500) /* į cards chosen masyvą norime įdėti dvi nuotraukas, ir jas lyginame, todėl if tikrina, ir uždedame pusės sekundės uždelsimą */
            
        }
    }

    function checkForMatch() {
        var cards = document.querySelectorAll("img")
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if(optionOneId == optionTwoId) {
            cards[optionOneId].setAttribute("src", "img/leaves.png")
            cards[optionTwoId].setAttribute("src", "img/leaves.png")
            alert("Pasirinkai tą patį bloką!")
        } else if (cardsChosen[0] === cardsChosen[1]) {
            alert("Teisingai!")
            cards[optionOneId].setAttribute("src", "img/blank.png")
            cards[optionTwoId].setAttribute("src", "img/blank.png")
            cards[optionOneId].style.pointerEvents = "none" /* jeigu vartotojas spaustų ant apverstos kortos (blank nuotraukos), atjungiame tą blokelį ir jo negalima paspausti */
            cards[optionTwoId].style.pointerEvents = "none" /* jeigu vartotojas spaustų ant apverstos kortos (blank nuotraukos), atjungiame tą blokelį ir jo negalima paspausti */
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute("src", "img/leaves.png")
            cards[optionTwoId].setAttribute("src", "img/leaves.png")
            alert("Neatspėjai! Bandyk dar kartą.")
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length /* spausdins rezultatą kiek teisingų yra spėjimų, pridės dvi kortas, kurias poto dalinsime iš dviejų */

        if(cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = "Sveikiname! Atspėjai visus blokus!"
            if(confirm("Žaisi dar kartą?")) {
                document.location.href = "" /* perkraus failą jeigu norime žaisti dar kartą */
            } else {
                resultDisplay.textContent = "Iki kito karto!"
            }
        }
    }

    createBoard() /* išsikviečiame funkciją čia */
})