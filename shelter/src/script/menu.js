function showMenu() {
    let menuHTML = 
`
    <div class = "menu-screen">
        <div class = "menu-wrapper">
        <nav class = "mobile-menu">
                <ul>
                    <li>
                        <span class="paragraph-mobile-menu initialized">
                            About the shelter
                        </span>
                    </li>
                    <li>
                        <a class="paragraph-mobile-menu" href="our-pets.html">
                            Our Pets
                        </a>
                    </li>
                    <li>
                        <a class="paragraph-mobile-menu" href="#help-items">Help the shelter</a>
                    </li>
                    <li>
                        <a class="paragraph-mobile-menu" href="#footer">Contacts</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
`;
    document.body.style.overflow = 'hidden';
    let menuScreen = document.createElement('div');
    document.body.prepend(menuScreen);
    menuScreen.outerHTML = menuHTML;

    //Привязка нового события
    burgerBtn.removeEventListener("click", this);
    document.querySelector(".burger-btn").addEventListener("click", hideMenu);
}

function hideMenu() {
    let menuScreen = document.querySelector(".menu-screen");
    document.body.removeChild(menuScreen);

    //Привязка нового события
    burgetBtn.removeEventListener("click", this);
    burgerBtn.addEventListener("click", showMenu);
}

let burgerBtn = document.querySelector(".burger-btn");
burgerBtn.addEventListener('click', showMenu);
