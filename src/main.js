import {dragDrop} from './dragAndDrop.js';
import {createTask, saveTasks, loadTasks} from './tasks.js';
import {darkMode} from './darkMode.js'

// añadimos las tareas
const addTaskButton = document.querySelectorAll('.add-task')
const addColumns = document.querySelectorAll('li')

//boton de moodo oscuro
const darkModeButton = document.getElementById("dark-mode")

// Añadir tarea a las columnas por defecto
addTaskButton.forEach((button) => {
    button.addEventListener('click', () => {
        const task = createTask();
        const parentColumn = button.parentElement.parentElement; // Obtener el section padre de la tarea
        parentColumn.append(task); // Añadir la tarea a la columna correspondiente
        saveTasks(); // Guardar tareas al añadir una nueva
    });
});



////////////////// funcion para crear una nueva columnas //////////////////////

function createColumn(colorClass) {
    // crear un nuevo section
    const newColumn = document.createElement('section')
    // darle un id
    newColumn.setAttribute('id', 'column' + (document.querySelectorAll('.column').length + 1));
    // darle las clases para el estilo y color
    newColumn.setAttribute('class', 'column' + ' ' + colorClass)
    // darle su contenido 
   
    const columnheader = addColumnHeader()
    newColumn.appendChild(columnheader);


    newColumn.addEventListener('dragover', (e) => {
        e.preventDefault();
        const bottomTask = insertAboverTask(newColumn, e.clientY);
        const draggingTask = document.querySelector('.dragging');
        if(!bottomTask){
            newColumn.appendChild(draggingTask);
        } else {
            bottomTask.parentNode.insertBefore(draggingTask, bottomTask);
        }
    });

    const insertAboverTask = (newColumn, y) => {
        const els = newColumn.querySelectorAll('.tasks:not(.dragging)');
        let closest = null;
        let closestOffset = Number.NEGATIVE_INFINITY;
        els.forEach((el) => {
            const { top } = el.getBoundingClientRect();
            const offset = y - top;
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closest = el;

            }
        });
        return closest;
    };


    return newColumn
}

//
function addColumnHeader(){
    const columnheader = document.createElement('header')
    columnheader.setAttribute('class','encabezado')

    const delteColumn = deletebutton()
    const headerTextElement = headerText()
    const addTaskButton = addTasks()
    
    columnheader.appendChild(delteColumn);
    columnheader.appendChild(headerTextElement);
    columnheader.appendChild(addTaskButton);

    return columnheader
}

//Boton para borrarr las columnas
function deletebutton() {
    const button = document.createElement('button')
    const buttonImg = document.createElement('img')
    buttonImg.setAttribute('src','/delete.svg')
    button.setAttribute('class','dlt-column')
    button.setAttribute('type','button')

    button.appendChild(buttonImg)

    button.addEventListener('click', () =>{
        const parentColumn = button.parentElement.parentElement
        parentColumn.remove()
        saveColumn()

    })

    return button

}


function headerText(){
    const text = document.createElement('h2')
    text.setAttribute('contentEditable', 'true');
    text.textContent = "COLUMNA"

    text.addEventListener('input',saveColumn)

    return text
}

// Guardar las tareas en el localStorage
function saveColumn() {
    const columns = document.querySelectorAll('section');
    const columnsArray = Array.from(columns).map(column => {
        return {
            title: column.querySelector('h2').textContent,
            Id: column.id,
            columnClass: column.classList[0],
            colorClass: column.classList[1]
        };
    });
    localStorage.setItem('columns', JSON.stringify(columnsArray));
}


// Cargar las tareas desde el localStorage
function loadColumn() {
    const columns = JSON.parse(localStorage.getItem('columns'));
    if (columns) {
        columns.forEach(column => {
            const newColumn = createColumn(column.colorClass);
            const main = document.querySelector('main')
            main.append(newColumn); 

        });
    }
}


function addTasks(){
    const button = document.createElement('button')
    const buttonImg = document.createElement('img')
    buttonImg.setAttribute('src','/add.svg')
    //class="add-task" type="button">
    button.setAttribute('class','add-task')
    button.setAttribute('type','button')

    button.appendChild(buttonImg)
    
    button.addEventListener('click', () => {
        const task = createTask();
        const parentColumn = button.parentElement.parentElement; // Obtener el section padre de la tarea
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
        const main = document.querySelector('main')
        main.appendChild(column); // Aladir la columna
        saveColumn()

    });
});

dragDrop();


darkModeButton.addEventListener('click',darkMode)



// Cargar tareas al cargar la página
window.addEventListener('DOMContentLoaded', loadColumn);
window.addEventListener('DOMContentLoaded', loadTasks);
