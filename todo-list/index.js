// Contendrá a todas las tareas que luego serán mostradas en el to-do list.
let todoList = [];

// Elementos que serán manipulados.
const todoFormInput = document.querySelector('#todo-form__input');
const tasksUncompletedDiv = document.querySelector('#tasks-uncompleted');
const tasksCompletedDiv = document.querySelector('#tasks-completed');
const btnAdd = document.querySelector('.btn-add');
const contentModal = document.querySelector('.content-modal');
const btnAccept = document.querySelector('#btn-accept');
const btnCancel = document.querySelector('#btn-cancel');

/* Cada vez que se carge la página se obtendrán todos las tareas guardadas anteriormente
   en caso de existir alguna de renderizará el to-do list. */
window.addEventListener('load', () => {
    todoList = JSON.parse(localStorage.getItem('todoList'));
    render();
    todoFormInput.focus();
});

/* Permitirá el ingreso de tareas al pulsar Enter siempre que el input no esté vacío. */
todoFormInput.addEventListener('keyup', (e) => {
    let valueInput = e.target.value.trimStart();
    console.log(valueInput);
    if(valueInput && e.keyCode === 13) {
        addTodo(valueInput);
        save();
        render();
        e.target.value = '';
        e.focus;
    }
});

/* Permitirá el ingreso de tareas al pulsar el botón siempre que el input no esté vacío. */
btnAdd.addEventListener('click', () => {
    let valueInput = todoFormInput.value.trimStart();
    if(valueInput) {
        addTodo(valueInput);
        save();
        render();
        todoFormInput.value = '';
        todoFormInput.focus();
    }
});

/* Al pulsarlo estará confirmando que desea eliminar alguna tarea. */
btnAccept.addEventListener('click', (e) => {
    let taskItem = e.target.closest('.content-modal').dataset.item;
    deleteTodo(taskItem);
    contentModal.style.display = 'none';
    enableScroll();
    save();
    render();
});

/* Al pulsarlo cancela eliminar alguna tarea. */
btnCancel.addEventListener('click', () => {
    contentModal.style.display = 'none';
    enableScroll();
});

/* Bloque el scrool cuando se muestre el cuadro
   modal para eliminar alguna tarea. */
function disableScroll(){ 
    let x = window.scrollX;
    let y = window.scrollY; 
    window.onscroll = () => window.scrollTo(x, y);
}

/* Desbloque el scrool. */
function enableScroll(){  
    window.onscroll = null;
}

/* Añade un objeto de tarea a la lista */
function addTodo(text) {
    let todo = {
        id: Date.now(),
        text,
        checked: false
    };
    todoList.push(todo);
}

/* Filata los elementos que no cumplan con la condición, de esa
   forma eliminamos una tarea de la lista. */
function deleteTodo(id) {
    todoList = todoList.filter(item => item.id !== Number(id));
}

/* Se crea la estructura de las tareas para posteriormente renderizarlas. */
function createTodoItem(todo) {
    // Contenedor de las tareas.
    let task = document.createElement('div');

    // Checkbox de las tareas.
    let checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.checked = todo.checked;
    checkBox.classList.add('task__check');

    checkBox.addEventListener('change', (e) => {
        let taskItem = e.target.closest('.task').dataset.id;
        todoList.forEach(item => {
            if(item.id === Number(taskItem)) item.checked = !item.checked;
        });
        save();
        render();
    });

    // Span con el texto de las tareas.
    let span = document.createElement('span');
    span.classList.add('task__span');
    span.innerHTML = todo.text;

    // Botón para eliminar alguna tarea.
    let btnDelete = document.createElement('button');
    btnDelete.classList.add('btn-delete');
    btnDelete.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
        </svg>
    `;

    /* En caso de pulsar el botón eliminar se pide una confirmación
       por parte del usuario. */
    btnDelete.addEventListener('click', (e) => {
        contentModal.style.display = 'flex';
        disableScroll();
        
        let taskItem = e.target.closest('.task').dataset.id;
        contentModal.setAttribute('data-item', taskItem);
    });

    // Se une todos los elementos para formar la tarea.
    task.appendChild(checkBox);
    task.appendChild(span);
    task.appendChild(btnDelete);
    return task;
}

/* Guarda los elementos de la lista de tareas en el localStorage. */
function save() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

/* Renderiza todas las tareas que existan en la lista de tareas. */
function render() {
    // Vaciamos los contenedores de las tareas que están completadas y las que no.
    tasksUncompletedDiv.innerHTML = '';
    tasksCompletedDiv.innerHTML = '';

    // Separamos las tareas completadas y las no completadas.
    let tasksUncompleted = todoList.filter(item => item.checked === false);
    let tasksCompleted = todoList.filter(item => item.checked === true);

    // En caso de no existir tareas por completar se crea un elemento 
    // que mustre el mensaje de que no hay tareas que hacer. 
    if(tasksUncompleted.length === 0) {
        let empty = document.createElement('div');
        empty.classList.add('todo-list__empty');
        empty.style.display = 'flex';

        let emptySpan = document.createElement('span');
        emptySpan.innerHTML = 'There are no tasks to do...';

        empty.appendChild(emptySpan)
        tasksUncompletedDiv.appendChild(empty);

        if(todoList.length === 0) return;
    }

    // Se crean y añaden las tareas que no están completas.
    for(let task of tasksUncompleted) {
        let taskUncompletedItem = createTodoItem(task);
        taskUncompletedItem.classList.add('task', 'task-uncompleted');
        taskUncompletedItem.setAttribute('data-id', task.id);

        tasksUncompletedDiv.appendChild(taskUncompletedItem);
    }

    // En caso de que la lista de tareas no esté vacía se crea y añade el 
    // contador de tareas realizadas.
    if(todoList.length !== 0) {
        let tasksCounted = document.createElement('h2');
        tasksCounted.setAttribute('id', 'tasks-counted');
        tasksCounted.innerHTML = `Completed (${tasksCompleted.length}/${todoList.length})`;
        tasksCompletedDiv.appendChild(tasksCounted);
    }
    
    // Se crean y añaden las tareas que están completas.
    for(let task of tasksCompleted) {
        let taskCompletedItem = createTodoItem(task);
        taskCompletedItem.classList.add('task', 'task-completed');
        taskCompletedItem.setAttribute('data-id', task.id);

        tasksCompletedDiv.appendChild(taskCompletedItem);
    }
}
