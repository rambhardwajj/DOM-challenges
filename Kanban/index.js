const delTopBtn         = document.getElementById('delTop')
const createTaskBtn     = document.getElementById('add-task-btn')
const createBoardBtn    = document.getElementById('add-board-btn')
const overLay           = document.querySelector('.overlay')

const prompt            = document.querySelector('.prompt')
const submitBtn         = document.getElementById('Submit')
const promptTitle       = document.getElementById('prompt-title')
const promptDesc        = document.getElementById('prompt-desc') 

const promptBoard       = document.querySelector('.board-prompt')
const submitBoardBtn    = document.getElementById('submit-board')
const promptBoardName   = document.getElementById('board-name')
const promptBoardColor  = document.getElementById('ring-color')
const deleteBoardIcons  = document.querySelectorAll('.delete-board-icon')

const todoBoard         = document.getElementById('to-do')   
const boardContainer    = document.querySelector('.boards')   
let buttonPriorityIcon  = '🟢';

let todoBoardCount = 0;
let editingTask = null; 

createTaskBtn.addEventListener('click', ()=>{
    prompt.classList.add('active');
    overLay.classList.add('active')
})
createBoardBtn.addEventListener('click', ()=>{
    promptBoard.classList.add('active');
    overLay.classList.add('active')
})

submitBoardBtn.addEventListener('click', ()=>{
    // retrieve filled values
    let currBoardPromptName = promptBoardName.value;
    let currBoardPromptColor = promptBoardColor.value;

    // creating new board
    let newBoard = document.createElement('div')
    newBoard.classList.add('board')
    let newTopBar = document.createElement('div')
    newTopBar.classList.add('top-bar')
    let newCircle = document.createElement('div') 
    newCircle.classList.add('circle')
    newCircle.style.border = `3px solid ${currBoardPromptColor}`
    let newBoardTitle = document.createElement('div')
    newBoardTitle.innerText  = currBoardPromptName;
    let newBoardCount = document.createElement('div')
    newBoardCount.innerText = 0;
    newBoardCount.classList.add('count')

    let newDelBtn = document.createElement('i')
    newDelBtn.innerText = '🗑️'
    newDelBtn.classList.add('delete-board-icon')
    attachDelFunctionality(newDelBtn)

    newTopBar.appendChild(newCircle); 
    newTopBar.appendChild(newBoardTitle); 
    newTopBar.appendChild(newBoardCount);

    newBoard.appendChild(newTopBar)
    newBoard.appendChild(newDelBtn)
    boardContainer.appendChild(newBoard)
    cancelBoardPrompt()
    updateTaskCount()
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
    }
    else if( editingTask == null){
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

        const timeDate = document.createElement('div')
        timeDate.innerText = new Date().toLocaleString(); 
        timeDate.classList.add('time-date')
        console.log(timeDate)
    
        // task div mai add kro
        taskDiv.appendChild(taskTitleDiv)
        taskDiv.appendChild(taskDescDiv)
        taskDiv.appendChild(timeDate)
        taskDiv.draggable = true;
    
        attachDrag(taskDiv)
        addEditOption(taskDiv)
    
        todoBoard.appendChild(taskDiv)
        updateTaskCount()
    }
    cancelBtn()
})

const allBoards = document.querySelectorAll('.board')     
// Attaching drag and edit listener to task cards
const allTasks  = document.querySelectorAll('.task')
allTasks.forEach((item)=> attachDrag(item))
allTasks.forEach((item)=> addEditOption(item))

// edit functionality 
function addEditOption(taskDiv){
    taskDiv.addEventListener('click', (event)=> updateTask(event.currentTarget))
}
// update prompt listener
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
function cancelBoardPrompt(){
    promptBoard.classList.remove('active');
    overLay.classList.remove('active');
    promptBoardName.value = ''
}
function attachDelFunctionality(delBtn){
    delBtn.addEventListener('click', ()=>{
        let parentDiv  = delBtn.parentNode;
        if(confirm('Are you sure you want to delete the board'))
            parentDiv.remove()
        else{
            console.log('not deleted')
        }
    })
}

// drag functionality
function attachDrag(taskDiv){
    taskDiv.addEventListener('dragstart', () => {
        taskDiv.classList.add('flying')
        taskDiv.classList.add("dragging");
        delTopBtn.classList.add('active')
    })
    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('flying')
        delTopBtn.classList.remove('active')
        taskDiv.classList.remove("dragging");
        updateTaskCount()
    })
}
// Dragged card catching functionality 
allBoards.forEach((board)=>{
    board.addEventListener('dragover', (event)=>{
        event.preventDefault();
        const flyingEl = document.querySelector('.flying')
        if (!flyingEl) return;
       
        board.appendChild(flyingEl)
    });
})
// update todo boardcount 
// function updateTodocount(count){
//     let todoCount = todoBoard.querySelector('#todo-count')
//     todoCount.innerText = count
// }

deleteBoardIcons.forEach((currIcon)=>{
    currIcon.addEventListener('click', ()=>{
        let parDiv = currIcon.parentNode
        if(confirm('Are you sure you want to delete the board'))
            parDiv.remove()
        else{
            console.log('not deleted')
        }
    })
})

delTopBtn.addEventListener('dragover', ()=>{
    event.preventDefault();
    const currCard = document.querySelector('.task')
    console.log(currCard)
})
delTopBtn.addEventListener("drop", (event) => {
    event.preventDefault(); 
    const currCard = document.querySelector(".task.dragging");
    if (currCard) {
        if(confirm('Are you sure you want to delete this task')){
            currCard.remove();
            // console.log("Card removed:", currCard); debugging
        }
    }
});

// thoda modular rehne ke liye
function updateTaskCount() {
    allBoards.forEach(board => {
        let countDiv = board.querySelector(".count");
        let taskCount = board.querySelectorAll(".task").length;
        countDiv.textContent = taskCount;
    });
}
updateTaskCount()