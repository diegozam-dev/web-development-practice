const URL = 'https://rickandmortyapi.com/api/character/[1,2,100,200,300,400,500,600,700,800]';

const listCharapter = [];

const btns = document.querySelectorAll('.btn');
const containerCards = document.querySelector('.container-cards');

const scrolling = 200 + 16;
let isDragStart = false;
let isDragging = false;
let dragStartingPoint;
let scrollStartPoint;
let dragLenght;

const apiRick = async () => {
    await fetch(URL)
        .then((response) => response.json())
        .then((characters) => {
            for(let character of characters) {
                listCharapter.push(character);
            }
            render();
        })
};

const showHideBtns = () => {
    setTimeout(() => {
        let scrollWidth = containerCards.scrollWidth - containerCards.clientWidth;
        containerCards.scrollLeft === 0 ? btns[0].style.display = 'none' : btns[0].style.display = 'flex';
        containerCards.scrollLeft === scrollWidth ? btns[1].style.display = 'none' : btns[1].style.display = 'flex';
    }, 300);
}

const moveCarousel = (e) => {
    e.target.closest('.btn').id === 'btn-left' ? containerCards.scrollLeft -= scrolling : containerCards.scrollLeft += scrolling;
    showHideBtns();
};

const autoDrag = () => {
    if(containerCards.scrollLeft === 0) return;
    if(containerCards.scrollLeft === (containerCards.scrollWidth - containerCards.clientWidth)) return;

    dragLenght = Math.abs(dragLenght);

    if(dragLenght <= (scrolling / 3)) return containerCards.scrollLeft = scrollStartPoint;

    let mult = (Math.abs(containerCards.scrollLeft - scrollStartPoint)) / scrolling;
    mult = Math.round(mult) - 1;
    mult = mult < 0 ? 0 : mult;

    return containerCards.scrollLeft > scrollStartPoint
        ? containerCards.scrollLeft += (scrolling - dragLenght) + (scrolling * mult)
        : containerCards.scrollLeft -= (scrolling - dragLenght) + (scrolling * mult);
}

const dragStart = (e) => {
    isDragStart = true;
    dragStartingPoint = e.pageX || Math.round(e.touches[0].pageX);
    scrollStartPoint = containerCards.scrollLeft;
}

const dragEnd = () => {
    containerCards.style.scrollBehavior = 'smooth';
    
    if(!isDragging) return;
    
    autoDrag();
    
    isDragStart = false;
    isDragging = false;
}

const dragging = (e) => {
    if(!isDragStart) return;

    e.preventDefault();
    isDragging = true;
    containerCards.style.scrollBehavior = 'auto';

    dragLenght = (e.pageX || Math.round(e.touches[0].pageX)) - dragStartingPoint;
    containerCards.scrollLeft = scrollStartPoint - dragLenght;

    showHideBtns();
}

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

const render = () => {
    containerCards.innerHTML = '';

    for(let character of listCharapter) {
        let cardCharapter = createCard(character);
        containerCards.appendChild(cardCharapter);
    }
    
    showHideBtns();
};

window.addEventListener('load', () => {
    apiRick();
});

btns.forEach(btn => {
    btn.addEventListener('click', moveCarousel);
});

containerCards.addEventListener('mousedown', dragStart);
containerCards.addEventListener('mouseup', dragEnd);
containerCards.addEventListener('mousemove', dragging);
containerCards.addEventListener('mouseleave', dragEnd);
containerCards.addEventListener('touchstart', dragStart);
containerCards.addEventListener('touchend', dragEnd);
containerCards.addEventListener('touchmove', dragging);
containerCards.addEventListener('touchleave', dragEnd);
