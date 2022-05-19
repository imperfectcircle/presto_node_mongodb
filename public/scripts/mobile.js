const moblileMenuBtnElement = document.querySelector('#mobile-menu-btn');
const mobileMenuElement = document.querySelector('#mobile-menu');

moblileMenuBtnElement.addEventListener('click', () => {
    mobileMenuElement.classList.toggle('open');
});
