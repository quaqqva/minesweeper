const mobileQuery = window.matchMedia("(max-width: 767px)"),
      tabletQuery = window.matchMedia("(min-width: 768px) and (max-width:1279px"),
      desktopQuery = window.matchMedia("(min-width:1280px)");
[mobileQuery, tabletQuery, desktopQuery].forEach(
    query => query.addEventListener("change", resetPages)
);

function generateRandoms(data, previousData, petsCount) {
    const getRandomNumber = (max) => Math.floor(Math.random() * max);
    let result = [];
    //Исключаем совпадения с прошлыми данными    
    //Выбираем новые
    for (let i = 0; i < petsCount; i++) {
        let petIndex = getRandomNumber(data.length);
        result.push(data[petIndex]);
        //Удаляем элемент, чтобы больше в рандоме его не встретить
        data.splice(petIndex, 1);
    }
    return result === previousData?generateRandoms(data , previousData, petsCount):result;
}

function generatePages(data) {
    console.log("Генерирую страницы...");
    let pagesCount = 6, elemsPerPages = 8, previousPage = null,
    result = new Array(pagesCount*elemsPerPages);
    for (let i = 0; i < pagesCount; i++) {
        let page = getCards(generateRandoms(structuredClone(data), previousPage, elemsPerPages));
        for (let j = 0; j < page.length; j++)
            result[i*elemsPerPages + j] = page[j];
        previousPage = page;
    }
    console.log("Страницы сгенерированы");
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

const getCards = (data) => data.map(pet => getCard(pet));

function resetPages() {
    pages = separatePages(cards);
    switchToPage(1);
    pageNum = 1;
}

function separatePages(pages) {
    let pageCount, elemPerPage, result = [];
    if (mobileQuery.matches)
        pageCount = 16;
    else if (tabletQuery.matches)
        pageCount = 8;
    else
        pageCount = 6;
    elemPerPage = pages.length / pageCount;
    console.log(pageCount);
    for (let i = 0; i < pageCount; i++) {
        let page = [];
        for (let j = 0; j < elemPerPage; j++) {
            page.push(pages[i*pageCount+j]);
        }
        result.push(page);
    }
    return result;
}

function switchToPage(pageNum) {
    let petsWrapper = document.querySelector(".pets-wrapper");
    petsWrapper.replaceChildren(...pages[pageNum-1]);

    pageDiv.innerHTML = pageNum;

    btnFirstPage.removeAttribute("disabled");
    btnPrevPage.removeAttribute("disabled");
    btnNextPage.removeAttribute("disabled");
        btnLastPage.removeAttribute("disabled");
    if (pageNum === 1) {
        btnFirstPage.setAttribute("disabled", "true");
        btnPrevPage.setAttribute("disabled", "true");
    }
    else if (pageNum === pages.length) {
        btnFirstPage.removeAttribute("disabled");
        btnPrevPage.removeAttribute("disabled");
        btnNextPage.setAttribute("disabled", "true");
        btnLastPage.setAttribute("disabled", "true");
    }
    else {
        btnFirstPage.removeAttribute("disabled");
        btnPrevPage.removeAttribute("disabled");
        btnNextPage.removeAttribute("disabled");
        btnLastPage.removeAttribute("disabled");
    }
}

let btnFirstPage = document.getElementById("btnFirstPage"),
    btnPrevPage = document.getElementById("btnPrevPage"),
    pageDiv = document.getElementById("pageNumber"),
    btnNextPage = document.getElementById("btnNextPage"),
    btnLastPage = document.getElementById("btnLastPage"),
    cards = getCards(generatePages(structuredClone(pets))),
    pages = separatePages(cards),
    pageNum = 1;

btnFirstPage.addEventListener('click', () => {
    switchToPage(1);
});
btnPrevPage.addEventListener('click', () => {
    switchToPage(--pageNum);
});
btnNextPage.addEventListener('click', () => {
    switchToPage(++pageNum);
});
btnLastPage.addEventListener('click', () => {
    switchToPage(pages.length);
})
