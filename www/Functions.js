function showInfo(id) {
    let page = document.querySelectorAll(".page");

    for (let i = 0; i < page.length; i++) {
        page[i].classList.add("hidden");
    }

    document.getElementById(id).classList.remove("hidden");
}

// Function to add animation to the elements of the second page

let boton = document.getElementById("button-page1");

boton.addEventListener('click', () => {

    let title = document.querySelector(".page2 h1");
    let paragraph = document.querySelectorAll(".page2 p");
    let list = document.querySelector(".page2 ol");

    title.classList.add('animation');
    paragraph.forEach((p) => p.classList.add('animation'));
    list.classList.add('animation');
});
