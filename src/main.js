import {dragDrop} from './dragAndDrop.js';

// añadimos las tareas
const addTaskButton = document.querySelectorAll('.add-task')

// Función para crear una nueva tarea
function createTask() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('tasks');
    //añadir nuevo id a la tarea segun las tareas que haya
    newDiv.setAttribute('id', 'task' + (document.querySelectorAll('.tasks').length + 1));
    newDiv.setAttribute('draggable', 'true');

    const divheader = document.createElement('h3');
    divheader.textContent = "Tarea...";
    divheader.setAttribute('contentEditable', 'true');

    const divp = document.createElement('p');
    divp.textContent = "Descripción...";
    divp.setAttribute('contentEditable', 'true');

    // Botón para eliminar la tarea
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        newDiv.remove(); 
        saveTasks(); 

        
    });

    //Guardamos el texto de la tarea al cambiarlo
    divheader.addEventListener('input', saveTasks);
    divp.addEventListener('input', saveTasks);

    newDiv.append(divheader, divp, deleteButton);

    return newDiv;
}

// Función para guardar las tareas en el localStorage
function saveTasks() {
    const tasks = document.querySelectorAll('.tasks');
    const tasksArray = Array.from(tasks).map(task => {
        return {
            title: task.querySelector('h3').textContent,
            description: task.querySelector('p').textContent,
            parentId: task.parentElement.id // Guardar el id del div padre
        };
    });
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

// Función para cargar las tareas desde el localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const newTask = createTask();
            const parentDiv = document.getElementById(task.parentId); // Obtener el div padre por id
            newTask.querySelector('h3').textContent = task.title;
            newTask.querySelector('p').textContent = task.description;
            parentDiv.append(newTask); // Añadir la tarea al div padre

        });
    }
}

// Añadir evento a cada botón de añadir tarea
addTaskButton.forEach((button) => {
    button.addEventListener('click', () => {
        const task = createTask();
        const parentDiv = button.parentElement.parentElement; // Obtener el section padre de la tarea
        parentDiv.append(task); // Añadir la tarea al div padre
        saveTasks(); // Guardar tareas al añadir una nueva
    });
});

dragDrop();

// Cargar tareas al cargar la página
window.addEventListener('DOMContentLoaded', loadTasks);