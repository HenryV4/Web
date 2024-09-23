const burgerMenu = document.getElementById('burger-menu');
const navList = document.getElementById('nav-list');
const header = document.querySelector('header');
const closeMenu = document.getElementById('close-menu');


burgerMenu.addEventListener('click', function() {
    burgerMenu.classList.toggle('active');
    navList.classList.toggle('active');
    header.classList.toggle('active');
});


closeMenu.addEventListener('click', function() {
    burgerMenu.classList.remove('active');
    navList.classList.remove('active');
    header.classList.remove('active');


});

document.getElementById("flipCard").addEventListener("click", function () {
    this.classList.toggle("flipped");
});