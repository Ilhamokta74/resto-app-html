const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", this.window.scrollY > 120);
})

let menu = document.querySelector('#menu-icon');
let navList = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navList.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navList.classList.remove('active');
}