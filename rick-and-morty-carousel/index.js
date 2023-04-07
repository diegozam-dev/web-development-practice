const URL = 'https://rickandmortyapi.com/api/character/[1,2,100,200,300,400,500,600,700,800]';

const listCharapter = [];

/* ------------------- HTML Elements ------------------- */
const btns = document.querySelectorAll('.btn');
const containerCards = document.querySelector('.container-cards');

/* ------------------- Program variables ------------------- */
const scrolling = 200 + 16;
let isDragStart = false;
let isDragging = false;
let dragStartingPoint;
let scrollStartPoint;
let dragLenght;
let scrollWidth;
let scrollPosition = 0;

/* ------------------- API connection ------------------- */
const apiRick = async () => {
    await fetch(URL)
        .then((response) => response.json())
        .then((characters) => {
            for(let character of characters) {
                listCharapter.push(character);
                render();
            }
        })
};

/* Mostrar y ocultar los botones de desplazamiento. */
const showHideBtns = () => {
    setTimeout(() => {
        scrollWidth = containerCards.scrollWidth - containerCards.clientWidth;
        containerCards.scrollLeft === 0 ? btns[0].style.display = 'none' : btns[0].style.display = 'flex';
        containerCards.scrollLeft === scrollWidth ? btns[1].style.display = 'none' : btns[1].style.display = 'flex';
    }, 350);
}

/* Mover carrusel con los botones de desplazamiento. */
const moveCarousel = (e) => {
    if(e.target.closest('.btn').id === 'btn-left' && scrollPosition !== 0) scrollPosition -= scrolling ;
    if(e.target.closest('.btn').id === 'btn-right' && scrollPosition !== scrollWidth) scrollPosition += scrolling;

    containerCards.scrollLeft = scrollPosition;

    showHideBtns();
};

/* Auto desplazamiento para que las cards queden centradas. */
const autoDrag = () => {
    // Si está al inicio o al final retorna.
    if(containerCards.scrollLeft === 0) return;
    if(containerCards.scrollLeft === (containerCards.scrollWidth - containerCards.clientWidth)) return;

    dragLenght = Math.abs(dragLenght);

    // Si el arrastre no es superior a la tercera parte de una card
    // vuelve a la posición inicial.
    if(dragLenght <= (scrolling / 3)) return containerCards.scrollLeft = scrollStartPoint;

    // Esta variable auxiliar ayuda a que el auto desplazamiento se 
    // pueda realizar aún si el arrastre es superior a una carta.
    let mult = (Math.abs(containerCards.scrollLeft - scrollStartPoint)) / scrolling;
    mult = Math.round(mult) - 1;
    mult = mult < 0 ? 0 : mult;

    scrollPosition = containerCards.scrollLeft;

    containerCards.scrollLeft > scrollStartPoint
        ? scrollPosition += (scrolling - dragLenght) + (scrolling * mult)
        : scrollPosition -= (scrolling - dragLenght) + (scrolling * mult);
    
    return containerCards.scrollLeft = scrollPosition;
}

/* Determina si el arrastre inició y guarda la posición inicial del 
   arrastre y del scroll.  */
const dragStart = (e) => {
    isDragStart = true;
    dragStartingPoint = e.pageX || Math.round(e.touches[0].pageX);
    scrollStartPoint = containerCards.scrollLeft;
}

/* Determina si el arrastre a finalizado. */
const dragEnd = () => {
    containerCards.style.scrollBehavior = 'smooth';
    
    if(!isDragging) return;
    
    autoDrag();
    isDragStart = false;
    isDragging = false;
    showHideBtns();
}

/* Modifica la posición del scroll según el arrastre. */
const dragging = (e) => {
    if(!isDragStart) return;

    e.preventDefault();
    isDragging = true;
    containerCards.style.scrollBehavior = 'auto';

    dragLenght = (e.pageX || Math.round(e.touches[0].pageX)) - dragStartingPoint;
    containerCards.scrollLeft = scrollStartPoint - dragLenght;
}

/* Crea las cards del Carrusel. */
const createCard = (character) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');

    const img = document.createElement('img');
    img.setAttribute('src', `${character.image}`);
    img.setAttribute('alt', `${character.name}`);
    img.setAttribute('draggable', 'false');

    const span = document.createElement('span');
    span.innerText = `${character.name}`;

    cardDiv.appendChild(img);
    cardDiv.appendChild(span);

    return cardDiv;
};

/* Renderiza los elementos en la página. */
const render = () => {
    containerCards.innerHTML = '';

    for(let character of listCharapter) {
        let cardCharapter = createCard(character);
        containerCards.appendChild(cardCharapter);
    }
    
    showHideBtns();
};

/* Realiza la llamada a la api */
window.addEventListener('load', () => {
    apiRick();
});

/* Añade el evento a los botones de desplazamiento. */
btns.forEach(btn => {
    btn.addEventListener('click', moveCarousel);
});

/* Añade los eventos de mouse y touch. */
containerCards.addEventListener('mousedown', dragStart);
containerCards.addEventListener('mouseup', dragEnd);
containerCards.addEventListener('mousemove', dragging);
containerCards.addEventListener('mouseleave', dragEnd);
containerCards.addEventListener('touchstart', dragStart);
containerCards.addEventListener('touchend', dragEnd);
containerCards.addEventListener('touchmove', dragging);
containerCards.addEventListener('touchleave', dragEnd);
