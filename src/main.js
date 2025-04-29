// añadimos las tareas

const addTaskButton = document.querySelectorAll('.add-task')

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



addTaskButton.forEach((button) => {
    button.addEventListener('click', () => {
        const task = createTask();
        const parentDiv = button.parentElement.parentElement; // Obtener el div padre del botón
        parentDiv.append(task); // Añadir la tarea al div padre
    });
});
