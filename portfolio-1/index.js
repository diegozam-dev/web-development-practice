const navPrincipal = document.querySelector('#nav-principal');
const navPrincipalBtnMenu = document.querySelector('#nav-principal__btn-menu');
const navPrincipalMenu = document.querySelector('.nav-principal__menu');

const openAndCloseMenu = () => {
    navPrincipalBtnMenu.classList.toggle('btn-menu-open');
    navPrincipalMenu.classList.toggle('menu-open');
    document.body.classList.toggle('scroll-block');
}

const resetNavMenu = () => {
    navPrincipalBtnMenu.classList.remove('btn-menu-open');
    navPrincipalMenu.classList.remove('menu-open');
    document.body.classList.remove('scroll-block');
}

const stickNavAtTop = () => {
    if(window.scrollY > 49) {
        navPrincipal.style.position = 'sticky';
        navPrincipal.style.top = '0';
        navPrincipal.style.backgroundColor = 'var(--color-primary-900)';
        return;
    }

    navPrincipal.style.removeProperty('position');
    navPrincipal.style.removeProperty('top');
    navPrincipal.style.removeProperty('background-color');
}

navPrincipalBtnMenu.addEventListener('click', openAndCloseMenu);

window.addEventListener('scroll', stickNavAtTop);

window.addEventListener('resize', (e) => {
    if(document.documentElement.scrollWidth >= 767) {
        resetNavMenu();
    }
})


