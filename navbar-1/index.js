const navItems = document.querySelector('.nav__items');
const navBtnOpen = document.querySelector('#nav__btn-open');
const navBtnClose = document.querySelector('#nav__btn-close');

const showMenu = () => {
    navItems.style.right = '0';
    navBtnOpen.style.display = 'none';
    navBtnClose.style.display = 'flex';
}

const hideMenu = () => {
    navItems.style.right = '-100%';
    navBtnClose.style.display = 'none';
    navBtnOpen.style.display = 'flex';
}

const resetNavAndBtns = () => {
    if(window.innerWidth > 768) {
        navBtnOpen.style.removeProperty('display');
        navBtnClose.style.removeProperty('display');
        navItems.style.removeProperty('right');
    }
}

window.addEventListener('resize', resetNavAndBtns);
navBtnOpen.addEventListener('click', showMenu);
navBtnClose.addEventListener('click', hideMenu);