export function createTask() {
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


// Guardar las tareas en el localStorage
export function saveTasks() {
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
export function loadTasks() {
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