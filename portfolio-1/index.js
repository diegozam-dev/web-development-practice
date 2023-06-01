const navPrincipal = document.querySelector('#nav-principal');
const navPrincipalBtnMenu = document.querySelector('#nav-principal__btn-menu');
const navPrincipalMenu = document.querySelector('.nav-principal__menu');
const navFooter = document.querySelector('#nav-footer');
const footer = document.querySelector('footer');

navPrincipalBtnMenu.addEventListener('click', () => {
    navPrincipalBtnMenu.classList.toggle('btn-menu-open');
    navPrincipalMenu.classList.toggle('menu-open')
});

window.addEventListener('scroll', (e) => {    
    let posNavFooter = navFooter.getBoundingClientRect().height;
    let posFooter = footer.getBoundingClientRect().height;
    
    if(window.scrollY > 49 && window.scrollY < document.body.clientHeight - 617 - posNavFooter - posFooter) {
        navPrincipal.style.position = 'sticky';
        navPrincipal.style.top = '0';
        navPrincipal.style.backgroundColor = 'var(--color-primary-900)';
        return;
    }

    navPrincipal.style.removeProperty('position');
    navPrincipal.style.removeProperty('top');
    navPrincipal.style.removeProperty('background-color');
});



