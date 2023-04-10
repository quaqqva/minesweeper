function generateRandoms(data) {
    const getRandomNumber = (max) => Math.floor(Math.random() * max);
    let petsCount = 3, result = [];
    for (let i = 0; i < petsCount; i++) {
        let petIndex = getRandomNumber(data.length);
        result.push(data[petIndex]);
        data.splice(petIndex);
    }
    return result;
}

function getCard(pet) {
    let cardNode = document.createElement('figure');
    cardNode.classList.add('pet');
    cardNode.innerHTML =
    `
        <img src="${pet.img}" alt="${pet.name} photo">
            <figcaption>
                <h4>${pet.name}</h4>
                <button>Learn more</button>
            </figcaption>
    `
    return cardNode;
}

const generateCards = (data) => data.map(pet => getCard(pet));
    

const setCards = (divs) => document.querySelector(".pets-wrapper").replaceChildren(...divs);

function slideLeft() {

}


let petsArr = pets;
let randomData = generateRandoms(structuredClone(petsArr));
console.log(randomData);
let previousTriple = generateCards(randomData);
setCards(previousTriple);

