const nav = document.querySelector('nav');
const navBtnMenu = document.querySelector('.nav__btn-menu');

navBtnMenu.addEventListener('click', () => {
    navBtnMenu.classList.toggle('menu--open');
});

window.addEventListener('scroll', (e) => {
    if(window.scrollY > 49) {
        nav.style.position = 'sticky';
        nav.style.top = '0';
        nav.style.backgroundColor = 'var(--color-primary-900)';
        return;
    }

    nav.style.removeProperty('position');
    nav.style.removeProperty('top');
    nav.style.removeProperty('background-color');
})