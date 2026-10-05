function showPage(id) {
    let pages = document.querySelectorAll(".screen");

    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.add("hidden");
    }

    document.getElementById(id).classList.remove("hidden");
}

// Function to add animation to the elements of the second page

let boton = document.getElementById("button-page1");

boton.addEventListener('click', () => {

    let title = document.querySelector(".page2 h1");
    let paragraph = document.querySelectorAll(".page2 p");
    let list = document.querySelector(".page2 ol");
    let button = document.querySelector(".page2 .button-page2");

    title.classList.add('animation');
    paragraph.forEach((p) => p.classList.add('animation'));
    list.classList.add('animation');
    button.classList.add('animationButton');
});

// Function to add animation to the elements of the third page

let boton2 = document.getElementById("button-pag2");

boton2.addEventListener('click', () => {

    let image = document.getElementById("app-image");
    let cargar = document.querySelector(".page3 div");
    let body = document.body;
    
    cargar.classList.remove('hidden');
    image.classList.add("hidden");

    setTimeout(() => {

        cargar.classList.add("hidden");
        image.classList.remove("hidden");
        body.classList.add('body-page3-transition');
    }, 2000);
});
