const createTaskBtn     = document.getElementById('add-task-btn')
const createBoardBtn    = document.getElementById('add-board-btn')
const prompt            = document.querySelector('.prompt')
const overLay           = document.querySelector('.overlay')
const submitBtn         = document.getElementById('Submit')

const promptTitle       = document.getElementById('prompt-title')
const promptDesc        = document.getElementById('prompt-desc') 
const todoBoard         = document.getElementById('to-do')       
let buttonPriorityIcon  = '🟢';

let editingTask = null; 

createTaskBtn.addEventListener('click', ()=>{
    prompt.classList.add('active');
    overLay.classList.add('active')
})

submitBtn.addEventListener('click', ()=>{
    const currPromptTitle = promptTitle.value;       // console.log(currPromptTitle)
    const currPromptDesc  = promptDesc.value;        // console.log(currPromptDesc)
    
    if( currPromptDesc =='' || currPromptTitle ==''){
        alert('Please complete the form'); 
        return;
    }

    if( editingTask){
        console.log('editing')
        let titleDiv = editingTask.querySelector('#task-title-div');
        let descDiv = editingTask.querySelector('#task-desc-div');

        titleDiv.innerHTML = ''; // icon ko bhi hatane ke liye html ko ' ' banao
        titleDiv.innerText = currPromptTitle;

        let taskPriorityDiv = document.createElement('span')
        taskPriorityDiv.innerText = buttonPriorityIcon;
        titleDiv.appendChild(taskPriorityDiv);

        descDiv.innerText = currPromptDesc;
        editingTask = null;

    } else if( editingTask == null){
        // Creating anew task
        const taskDiv = document.createElement('div')
        taskDiv.classList.add('task')
    
        // Priority
        const taskPriorityDiv = document.createElement('span')
        taskPriorityDiv.innerText = buttonPriorityIcon
        // Title
        const taskTitleDiv = document.createElement('div')
        taskTitleDiv.innerText = currPromptTitle;
        taskTitleDiv.id = 'task-title-div'
        taskTitleDiv.appendChild(taskPriorityDiv)
        // Desc
        const taskDescDiv = document.createElement('div')
        taskDescDiv.innerText = currPromptDesc;
        taskDescDiv.id = 'task-desc-div'
    
        // task div mai add kro
        taskDiv.appendChild(taskTitleDiv)
        taskDiv.appendChild(taskDescDiv)
        taskDiv.draggable = true;
    
        attachDrag(taskDiv)
        addEditOption(taskDiv)
    
        todoBoard.appendChild(taskDiv)
    }
    cancelBtn()
})

const allBoards = document.querySelectorAll('.board')     
const allTasks  = document.querySelectorAll('.task')


allTasks.forEach((item)=> attachDrag(item))
allTasks.forEach((item)=> addEditOption(item))

// edit functionality 
function addEditOption(taskDiv){
    taskDiv.addEventListener('click', (event)=> updateTask(event.currentTarget))
}
function updateTask(taskDiv){
    console.log(taskDiv)
    editingTask = taskDiv;
    
    let currDesc = taskDiv.querySelector('#task-desc-div');
    let currTitle = taskDiv.querySelector('#task-title-div');

    prompt.classList.add('active');
    overLay.classList.add('active')
    
    promptTitle.value = currTitle.childNodes[0].textContent.trim();
    promptDesc.value = currDesc.innerText;
}

// Dragg functionality 
allBoards.forEach((board)=>{
    board.addEventListener('dragover', (event)=>{
        event.preventDefault();
        const flyingEl = document.querySelector('.flying')
        if (!flyingEl) return;
       
        board.appendChild(flyingEl)
    });
})
// add radio icons
function toggleRadio(buttonPriority){
    if( buttonPriority == 'low'){
        buttonPriorityIcon = '🟢'
    }else if(buttonPriority == 'med'){
        buttonPriorityIcon = '🔵'
    }else if( buttonPriority =='high'){
        buttonPriorityIcon = '❗'
    }else{
        buttonPriorityIcon = '💠';
    }
}
// remove prompt visiblity 
function cancelBtn(){
    prompt.classList.remove('active');
    overLay.classList.remove('active');
    promptTitle.value= ''
    promptDesc.value = ''

    buttonPriorityIcon  = '🟢'
}
function attachDrag(taskDiv){
    taskDiv.addEventListener('dragstart', () => {
        taskDiv.classList.add('flying')
    })
    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('flying')
    })
}