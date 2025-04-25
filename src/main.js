// añadimo el div al todo

const buttonToDo = document.getElementById('boton-todo') 
const todo = document.getElementById('to-do')


const buttonInProgress = document.getElementById('boton-progress') 
const inProgress = document.getElementById('in-progress')


buttonToDo.addEventListener('click', () =>{
    const newDiv = document.createElement('div')
    const headerDiv = document.createElement('h3')
    headerDiv.textContent = "Tarea..."
    newDiv.classList.add('tasks')
    newDiv.append(headerDiv)

    
    todo.append(newDiv)
})

buttonInProgress.addEventListener('click', () =>{
    const newDiv = document.createElement('div')
    const headerDiv = document.createElement('h3')
    headerDiv.textContent = "Tarea..."
    newDiv.classList.add('tasks')
    newDiv.append(headerDiv)

    
    inProgress.append(newDiv)
})