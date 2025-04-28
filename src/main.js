// añadimos las tareas

const buttonToDo = document.getElementById('boton-todo') 
const todo = document.getElementById('to-do')


const buttonInProgress = document.getElementById('boton-progress') 
const inProgress = document.getElementById('in-progress')

const done = document.getElementById('done')


// Función para crear una nueva tarea
function createTask() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('tasks');
    //newDiv.setAttribute('draggable', 'true');

    const divheader = document.createElement('h3');
    divheader.textContent = "Tarea...";
    divheader.setAttribute('contentEditable', 'true');

    const divp = document.createElement('p');
    divp.textContent = "Descripción...";
    divp.setAttribute('contentEditable', 'true');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        newDiv.remove();
    });

    newDiv.append(divheader, divp, deleteButton);


    return newDiv;
}




buttonToDo.addEventListener('click', () => {
    const task = createTask();
    todo.append(task);
});

buttonInProgress.addEventListener('click', () => {
    const task = createTask();
    inProgress.append(task);
});
