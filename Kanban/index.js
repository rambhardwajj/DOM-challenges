const createTaskBtn     = document.getElementById('add-task-btn')
const createBoardBtn    = document.getElementById('add-board-btn')
const prompt            = document.querySelector('.prompt')
const overLay           = document.querySelector('.overlay')
const submitBtn         = document.getElementById('Submit')

const promptTitle       = document.getElementById('prompt-title')
const promptName        = document.getElementById('prompt-name') 
const promptDesc        = document.getElementById('prompt-desc') 
const todoBoard         = document.getElementById('to-do')       
let buttonPriorityIcon  = '🟢';



createTaskBtn.addEventListener('click', ()=>{
    prompt.classList.add('active');
    overLay.classList.add('active')
})

submitBtn.addEventListener('click', ()=>{
    const currPromptTitle = promptTitle.value;       // console.log(currPromptTitle)
    const currPromptName  = promptName.value;        // console.log(currPromptName)
    const currPromptDesc  = promptDesc.value;        // console.log(currPromptDesc)
    
    if( currPromptDesc =='' || currPromptTitle ==''|| currPromptName==''){
        alert('Please complete the form')
        return;
    }
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

    todoBoard.appendChild(taskDiv)

    cancelBtn()
})


const allBoards = document.querySelectorAll('.board')     
const allTasks = document.querySelectorAll('.task')

function attachDrag(taskDiv){
    taskDiv.addEventListener('dragstart', () => {
        taskDiv.classList.add('flying')
    })
    taskDiv.addEventListener('dragend', () => {

        taskDiv.classList.remove('flying')
    })
}

allTasks.forEach((item)=> attachDrag(item))
allBoards.forEach((board)=>{
    board.addEventListener('dragover', (event)=>{
        event.preventDefault();
        const flyingEl = document.querySelector('.flying')
        if (!flyingEl) return;
       
        board.appendChild(flyingEl)
    });
})

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
function cancelBtn(){
    prompt.classList.remove('active');
    overLay.classList.remove('active');
    promptTitle.value= ''
    promptDesc.value = ''
    promptName.value = ''
}
