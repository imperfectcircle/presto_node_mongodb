const moblileMenuBtnElement = document.querySelector('#mobile-menu-btn');
const mobileMenuElement = document.querySelector('#mobile-menu');
const desktopMenuElement = document.querySelector('#main-header nav');

moblileMenuBtnElement.addEventListener('click', () => {
    mobileMenuElement.classList.toggle('open');
});
