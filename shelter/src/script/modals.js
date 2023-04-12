function openModal(event) {
    let modalElement = document.createElement('div');
    modalElement.classList.add('menu-screen');
    modalElement.style.justifyContent = 'center';
    modalElement.style.alignItems = 'center';

    let petName = event.currentTarget.querySelector('h4').innerHTML,
        pet = pets.filter(pet => pet.name === petName)[0];
    let modalHTML = 
    `
        <div class = 'modal-wrapper'>
            <button class = 'button-round'>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3511 0.649012L11.3511 0.648987C11.1525 0.450413 10.8306 0.450413 10.632 0.648987L6.35353 4.92749L5.99998 5.28105L5.64642 4.92749L1.36793 0.64893C1.36793 0.648929 1.36793 0.648929 1.36793 0.648928C1.16936 0.450365 0.847488 0.450357 0.648913 0.648905C0.648905 0.648913 0.648896 0.648922 0.648888 0.64893M11.3511 0.649012L0.648888 0.64893M11.3511 0.649012C11.5496 0.84751 11.5497 1.16944 11.3511 1.36803L7.07263 5.64648L6.71908 6.00003L7.07263 6.35358L11.3511 10.632C11.5496 10.8306 11.5496 11.1525 11.3511 11.3511C11.1525 11.5497 10.8306 11.5496 10.6321 11.3511L10.632 11.3511L6.35353 7.07257L5.99998 6.71901L5.64642 7.07257L1.36793 11.3511C1.16935 11.5496 0.847461 11.5496 0.648888 11.3511C0.450385 11.1526 0.450348 10.8306 0.648913 10.632L4.92739 6.35352L5.28094 5.99997M11.3511 0.649012L5.28094 5.99997M0.648888 0.64893C0.450349 0.847525 0.450393 1.16947 0.648886 1.36797M0.648888 0.64893L0.648886 1.36797M0.648886 1.36797C0.648887 1.36797 0.648887 1.36797 0.648888 1.36797M0.648886 1.36797L0.648888 1.36797M0.648888 1.36797L4.92738 5.64642M0.648888 1.36797L4.92738 5.64642M5.28094 5.99997L4.92738 5.64642M5.28094 5.99997L4.92738 5.64642" fill="#292929" stroke="black"/>
                </svg>
            </button>
            <div class = 'modal'>
                <img src="${pet.img}" alt="${pet.name} photo">
                <div class = 'text-wrapper'>
                    <div class = 'header'>
                        <h3>${pet.name}</h3>
                        <h4>${pet.type} - ${pet.breed}</h4>
                    </div>
                    <h5>${pet.description}</h5>
                    <ul>
                        <li><span class="h5-modal-window">Age</span><span class="modal-list-item">${pet.age}</span></li> 
                        <li><span class="h5-modal-window">Inoculations</span><span class="modal-list-item">${pet.inoculations}</span></li>
                        <li><span class="h5-modal-window">Diseases</span><span class="modal-list-item">${pet.diseases}</span></li>
                        <li><span class="h5-modal-window">Parasites</span><span class="modal-list-item">${pet.parasites}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    modalElement.innerHTML = modalHTML;
    modalElement.querySelector('.modal-wrapper').style.top = '-100%';

    document.body.prepend(modalElement);
    setTimeout(() => {
        modalElement.classList.toggle('show-menu-screen');
        modalElement.querySelector('.modal-wrapper').style.top = '0';
        document.body.style.overflow = 'hidden';
    }, 5);
    
    modalElement.querySelector('button').addEventListener('click', cancelModal);
    modalElement.addEventListener('click', (event) => {
        if (event.currentTarget === event.target)
            cancelModal();
    });
}

function cancelModal() {
    let modalElement = document.querySelector('.menu-screen');
    modalElement.querySelector('.modal-wrapper').style.top = '-100%';
    modalElement.classList.toggle('show-menu-screen');
    setTimeout(() => {
        modalElement.remove();
        document.body.style.overflow = '';
    }, 1000);
}