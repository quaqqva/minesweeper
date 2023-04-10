function generateRandoms(data, previousData) {
    const getRandomNumber = (max) => Math.floor(Math.random() * max);
    let petsCount = 3, result = [];
    //Исключаем совпадения с прошлыми данными
    if (previousData)
        for (let element of previousData) {
            data.splice(data.findIndex(pet => pet.name === element.querySelector('h4').innerHTML), 1);

        }
        
    //Выбираем новые
    for (let i = 0; i < petsCount; i++) {
        let petIndex = getRandomNumber(data.length);
        result.push(data[petIndex]);
        //Удаляем элемент, чтобы больше в рандоме его не встретить
        data.splice(petIndex, 1);
    }
    return result;
}
//Генерация карточки
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

function getNewWrapper(cards) {
    let wrapper = document.createElement('div');
    wrapper.classList.add('pets-wrapper');
    wrapper.append(...cards);
    return wrapper;
}

const getOppositeDirection = (direction) => direction === "left"?"right":"left";

function slide(event) {
    let direction = event.target.classList.value.split(' ')[1], 
        oldWrapper = document.querySelector(".pets-wrapper"),
        newWrapper = getNewWrapper(lastDirection !== direction && lastDirection !== ""?previousTriple:
        generateCards(generateRandoms(structuredClone(petsArr),oldWrapper.children)));
    //запоминаем предыдущие значения
    previousTriple = oldWrapper.children;
    lastDirection = direction;
    //вставляем 
    oldWrapper.after(newWrapper);
    //прошлый двигается в направлении слайдера
    oldWrapper.classList.toggle(`slider-slide-${direction}`);
    //новый начинает из противоположного
    newWrapper.classList.toggle(`slider-slide-${getOppositeDirection(direction)}`);
    newWrapper.classList.toggle('top-correct');
    newWrapper.classList.toggle(`slider-slide-${getOppositeDirection(direction)}`);
    
    setTimeout(() => {
        oldWrapper.remove();
        newWrapper.classList.toggle('top-correct');
    }, 2000);
}


let petsArr = pets;
let randomData = generateRandoms(structuredClone(petsArr), null);
let previousTriple = generateCards(randomData), lastDirection = "";
document.querySelector(".pets-wrapper").append(...previousTriple);

document.querySelector(".button-round.left").addEventListener('click', slide);
document.querySelector(".button-round.right").addEventListener('click', slide);

