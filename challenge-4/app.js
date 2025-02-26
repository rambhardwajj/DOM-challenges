/**
 * Write your challenge solution here
 */

const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addButton')
const taskList = document.getElementById('taskList')
const totalTasks = document.getElementById('totalTasks')
const completedTasks = document.getElementById('completedTasks')

const emptyTask = document.querySelector('.empty-list')


let total = 0;
let completed = 0;

addBtn.addEventListener('click', ()=>{
    let currTask = taskInput.value;
    console.log(currTask)
    if(currTask.trim() ==''){
        window.alert("Please add a Todo")
        return
    }

    let taskItem = document.createElement('li')
    taskItem.classList.add('task-item');

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.classList.add('complete-checkbox')
    taskItem.appendChild(checkBox);

    let taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.textContent = taskInput.value;
    taskItem.appendChild(taskText);
    
    let deleteTask = document.createElement('button');
    deleteTask.textContent = 'Delete';
    deleteTask.classList.add('delete-button');
    taskItem.appendChild(deleteTask);

    taskList.prepend(taskItem);
    total++;
    totalTasks.textContent = `Total tasks: ${total}`

    deleteTask.addEventListener('click', () => {
        total--;
        if(taskItem.classList.contains('completed')) {
            completed--;
        }
        taskItem.remove();

        totalTasks.textContent = `Total tasks: ${total}`;

        completedTasks.textContent = `Completed: ${completed}`;

        if(total == 0) {
            taskList.appendChild(emptyTask);
        }
    })

    checkBox.addEventListener('click', ()=>{
        if(taskItem.classList.contains('completed')){
            completed--;
            taskItem.classList.remove('completed')
        }
        else{
            taskItem.classList.add('completed')
            completed++;
        } 
            
        completedTasks.textContent = `Completed: ${completed}`
    })

    totalTasks.textContent = `Total tasks: ${total}`
    taskInput.value = ''

    emptyTask.remove()
    
})