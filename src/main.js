import {dragDrop} from './dragAndDrop.js';

// añadimos las tareas
const addTaskButton = document.querySelectorAll('.add-task')
const addColumns = document.querySelectorAll('li')

// Función para crear una nueva tarea
function createTask() {
    const newDiv = document.createElement('div');
    newDiv.classList.add('tasks');
    //añadir nuevo id a la tarea segun las tareas que haya
    newDiv.setAttribute('id', 'task' + (document.querySelectorAll('.tasks').length + 1));
    newDiv.setAttribute('draggable', 'true');
    // Añadir evento de arrastrar y soltar
    newDiv.addEventListener('dragstart', () => {
        newDiv.classList.add("dragging");
    });
    newDiv.addEventListener('dragend', () => {
        newDiv.classList.remove("dragging");
        saveTasks(); // Guardar tareas al mover una
    });

    // Crear los elementos de la tarea
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

// Añadir tarea
addTaskButton.forEach((button) => {
    button.addEventListener('click', () => {
        const task = createTask();
        const parentColumn = button.parentElement.parentElement; // Obtener el section padre de la tarea
        parentColumn.append(task); // Añadir la tarea a la columna correspondiente
        saveTasks(); // Guardar tareas al añadir una nueva
    });
});


// Guardar las tareas en el localStorage
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

// Cargar las tareas desde el localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const newTask = createTask();
            const taskparent = document.getElementById(task.parentId); // Obtener el div padre por id
            newTask.querySelector('h3').textContent = task.title;
            newTask.querySelector('p').textContent = task.description;
            taskparent.append(newTask); // Añadir la tarea al div padre

        });
    }
}

////////////////// funcion para crear una nueva columnas //////////////////////

function createColumn(colorClass) {
    // crear un nuevo section
    const newColumn = document.createElement('section')
    // darle un id
    newColumn.setAttribute('id', 'column' + (document.querySelectorAll('.column').length + 1));
    // darle las clases para el estilo y color
    newColumn.setAttribute('class', 'column')
    newColumn.setAttribute('class', colorClass)
    // darle su contenido 
   
    const columnheader = document.createElement('header')
    columnheader.setAttribute('class','encabezado')

    const delteColumn = deletebutton()
    
    const headerTextElement = headerText()
    
    const addTaskButton = addTasks()
    
    columnheader.appendChild(delteColumn);
    columnheader.appendChild(headerTextElement);
    columnheader.appendChild(addTaskButton);

    newColumn.appendChild(columnheader);
       
    console.log(delteColumn)
    console.log(headerTextElement)
    console.log(addTaskButton)

    return newColumn
}

//Boton para borrarr las columnas
function deletebutton() {
    const button = document.createElement('button')
    const buttonImg = document.createElement('img')
    buttonImg.setAttribute('src','./public/delete.svg')
    button.setAttribute('class','dlt-column')
    button.setAttribute('type','button')

    button.appendChild(buttonImg)

    button.addEventListener('click', (e) =>{
        const parentColumn = e.target.parentElement.parentElement
        parentColumn.remove()

    })
    console.log(button)

    return button

}


function headerText(){
    const text = document.createElement('h2')
    text.setAttribute('contentEditable', 'true');
    text.textContent = "COLUMNA"

    //text.addEventListener('input',saveColumn())

    return text
}

function addTasks(){
    const button = document.createElement('button')
    const buttonImg = document.createElement('img')
    buttonImg.setAttribute('src','./public/add.svg')
    //class="add-task" type="button">
    button.setAttribute('class','add-task')
    button.setAttribute('type','button')

    button.appendChild(buttonImg)
    
    button.addEventListener('click', (e) => {
        const task = createTask();
        const parentColumn = e.target.parentElement.parentElement; // Obtener el section padre de la tarea
        parentColumn.append(task); // Añadir la tarea a la columna correspondiente
        saveTasks(); // Guardar tareas al añadir una nueva
    });


    return button
}

///Funcion para crear una nueva columna

// Añadir tarea
addColumns.forEach((button) => {
    button.addEventListener('click', (e) => {

        const buttonClass = e.target.classList[0]; 
        const column = createColumn(buttonClass);
        const buttonParent = button.parentElement.parentElement.parentElement; // Obtener el padre hermano de main
        const main = buttonParent.nextElementSibling
        main.appendChild(column); // Aladir la columna

    });
});

dragDrop();



// Cargar tareas al cargar la página
window.addEventListener('DOMContentLoaded', loadTasks);