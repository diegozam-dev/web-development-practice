const nav = document.querySelector('nav');

const stickyNav = (e) => {
    if(window.scrollY <= 80) {
        nav.style.removeProperty('position');
        nav.style.removeProperty('top');
        nav.style.removeProperty('background-color');
        return;
    }

    nav.style.position = 'sticky';
    nav.style.top = '0';
    nav.style.backgroundColor = '#1C3879';
}

window.addEventListener('scroll', stickyNav);