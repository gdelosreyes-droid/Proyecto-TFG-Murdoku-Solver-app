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
