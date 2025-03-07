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

let myBoards = []
let myTasks = []

document.addEventListener("DOMContentLoaded", () => {
    // isme local Storage mai render wali cheeze krni hai
    renderBoardFromLocal()
    renderTaskFromLocal()

});

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

    newBoard.id = Date.now()
    boardContainer.appendChild(newBoard)

    allBoards = document.querySelectorAll('.board')     
    attachDragOver()
    cancelBoardPrompt()
    updateTaskCount()
    addBoardtoLocal()
})
submitBtn.addEventListener('click', ()=>{
    const currPromptTitle = promptTitle.value;       // console.log(currPromptTitle)
    const currPromptDesc  = promptDesc.value;        // console.log(currPromptDesc)
    
    if( currPromptDesc =='' || currPromptTitle ==''){
        alert('Please complete the form'); 
        return;
    }

    if( editingTask){
        // console.log('editing')

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
        // console.log(timeDate)
    
        // task div mai add kro
        taskDiv.appendChild(taskTitleDiv)
        taskDiv.appendChild(taskDescDiv)
        taskDiv.appendChild(timeDate)
        taskDiv.draggable = true;

        taskDiv.id = Date.now()
        taskDiv.setAttribute('parId',todoBoard.id)
        // console.log(taskDiv.getAttribute('parId'))
    
        attachDrag(taskDiv)
        addEditOption(taskDiv)
    
        todoBoard.appendChild(taskDiv)
        updateTaskCount()
    }
    // saveTasksToLocal();
    updateTaskCount()
    cancelBtn()
    addTasktoLocal()
})

let allBoards = document.querySelectorAll('.board')     
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
    // console.log(taskDiv)
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
    // console.log("task attach drag maiaaya hai-", taskDiv.parentNode)
    taskDiv.addEventListener('dragstart', () => {
        taskDiv.classList.add('flying')
        taskDiv.classList.add("dragging");
        delTopBtn.classList.add('active')
    })
    taskDiv.addEventListener('dragend', () => {
        taskDiv.classList.remove('flying')
        delTopBtn.classList.remove('active')
        taskDiv.classList.remove("dragging");
        if(taskDiv.parentNode!=null){
            taskDiv.setAttribute('parId', taskDiv.parentNode.id)
            taskDiv.parId = taskDiv.parentNode.id;
        }
        // console.log(taskDiv.parId, ' in dragend')
        updateTaskCount()
        addTasktoLocal()
    })
}
// Dragged card catching functionality 
function attachDragOver(){
    allBoards.forEach((board)=>{
        // console.log('attachdragover -', board.title)
        board.addEventListener('dragover', (event)=>{
            event.preventDefault();
            const flyingEl = document.querySelector('.flying')
            if (!flyingEl) return;
            
            board.appendChild(flyingEl)
        });
    })
}
attachDragOver()
// update todo boardcount 
// function updateTodocount(count){
//     let todoCount = todoBoard.querySelector('#todo-count')
//     todoCount.innerText = count
// }

deleteBoardIcons.forEach((currIcon)=>{
    currIcon.addEventListener('click', ()=>{
        let parDiv = currIcon.parentNode
        if(confirm('Are you sure you want to delete the board')){
            parDiv.remove()
            addBoardtoLocal();
        }
        else{
            console.log('not deleted')
        }
    })
})

delTopBtn.addEventListener('dragover', ()=>{
    event.preventDefault();
    const currCard = document.querySelector('.task')
    // console.log(currCard)
})
delTopBtn.addEventListener("drop", (event) => {
    event.preventDefault(); 
    const currCard = document.querySelector(".task.dragging");
    if (currCard) {
        if(confirm('Are you sure you want to delete this task')){
            currCard.remove();
            // console.log("Card removed:", currCard); debugging
            addTasktoLocal(); 
            updateTaskCount();
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

// local Storage thingy 
// Save Boards to local Storage,
// Save Tasks to local Storage

// - Adding ids to the boards that are created dynamically  and that are default
// - adding  ids to  the task that are  created dynamically 
// - Adding ids of board to those task
// - storing  the boards on local  storage, 
// - storing tasks  to the local storage. 
// - when the page is   loaded check the container 
//     - Render the boards - if the boards with the ids are not present append those board with the container 
//     - Render t he tasks - render the task to the specific board



// saare task to traverse kro and har ek task ka obj banake taskLocal mai push krdo
function addTasktoLocal(){
    let tasksLocal = []
    document.querySelectorAll('.task').forEach((currTask)=>{
        // console.log("sfsf" ,currTask)
        let taskId = currTask.getAttribute('id'); 
        let parentId = currTask.getAttribute('parId');
        // console.log(parentId, "sdf")
        let taskTitle = currTask.querySelector('#task-title-div').innerText.trim();
        let taskDesc = currTask.querySelector('#task-desc-div').innerText.trim();
        let taskTime = currTask.querySelector('.time-date').innerText;
        let taskPriority = currTask.querySelector('#task-title-div span').innerText; 


        tasksLocal.push({
            id: taskId, 
            parentId: parentId, 
            title: taskTitle, 
            description: taskDesc, 
            time: taskTime, 
            priority: taskPriority 
        })
    })
    localStorage.setItem('localTasks',  JSON.stringify(tasksLocal))
}

function renderTaskFromLocal(){
    let taskData = JSON.parse(localStorage.getItem('localTasks')) ||  []
    // console.log(taskData)
    taskData.forEach((task)=>{
        let taskEl = createMyTask(task);
        let currBr = taskEl.querySelectorAll('br')
        if(currBr){
            // console.log('bug fix kr diya ')
            currBr.forEach((x)=> x.remove())
        }
        let boardId = task.parentId;
        let boardElement = document.getElementById(boardId)
        if(boardElement)
            boardElement.appendChild(taskEl)
    })
}
function createMyTask(taskObj){
    // task Obj ke sare key se el banao
    let newTask = document.createElement('div');
    newTask.classList.add('task');
    newTask.id = taskObj.id;
    newTask.setAttribute('parId', taskObj.parentId);

    let newTaskTitle = document.createElement('div')
    newTaskTitle.innerText = taskObj.title.slice(0,-2)
    newTaskTitle.id = 'task-title-div'

    let taskPriorityDiv = document.createElement("span");
    taskPriorityDiv.innerText = taskObj.priority.trim(); 
    newTaskTitle.appendChild(taskPriorityDiv, " PRIO ");

    let newTaskDesc = document.createElement('div');
    newTaskDesc.innerText = taskObj.description;
    newTaskDesc.id = 'task-desc-div';

    let timeDate = document.createElement("div");
    timeDate.innerText = taskObj.time;
    timeDate.classList.add("time-date");

    newTask.appendChild(newTaskTitle);
    newTask.appendChild(newTaskDesc);
    newTask.appendChild(timeDate);
    
    newTask.draggable = true;

    attachDrag(newTask);
    addEditOption(newTask);


    return newTask;
}

function addBoardtoLocal(){
    let boardsLocal = [];
    document.querySelectorAll('.board').forEach((currBoard) => {
        let boardId = currBoard.getAttribute('id');
        let boardTitle = currBoard.querySelector('.top-bar div:nth-child(2)').innerText 
        let boardColor = currBoard.querySelector('.circle').style.borderColor;
        let boardCount = currBoard.querySelector('.count').innerText.trim();
        console.log(boardCount)
        
        boardsLocal.push({
            id: boardId, 
            title: boardTitle, 
            color: boardColor, 
            count: boardCount
        })
    })
    localStorage.setItem('localBoards', JSON.stringify(boardsLocal) )
}

function renderBoardFromLocal(){
    let boardData = JSON.parse(localStorage.getItem('localBoards')) || []
    
    boardData.forEach((board)=> {
        if( document.getElementById(board.id)) return;
        // console.log(board)

        if( board.id == 'to-do' || board.id == 'in-progress' || board.id == 'done'){
            return ;
        }
        let boardEl = createMyBoard(board)
        document.querySelector('.boards').appendChild(boardEl)
    })
}
function createMyBoard(boardObj){
    // board data obj mai se saare key waalo ke liye unka element banao
    let newBoard = document.createElement('div'); 
    newBoard.classList.add('board')
    newBoard.id = boardObj.id;

    let newTopBar = document.createElement('div')
    newTopBar.classList.add('top-bar')

    let newCircle = document.createElement('div')
    newCircle.classList.add('circle')
    newCircle.style.border = `3px solid ${boardObj.color}`
    
    let newBoardTitle = document.createElement('div');
    newBoardTitle.innerText =boardObj.title;

    let newBoardCount = document.createElement('div')
    newBoardCount.innerText = boardObj.count;

    let newDelBtn = document.createElement('i');
    newDelBtn.innerText = '🗑️';
    newDelBtn.classList.add('delete-board-icon')

    newDelBtn.addEventListener('click', ()=>{
        if( confirm('Are you sure you need to delete this board')){
            newBoard.remove();
            addBoardtoLocal(); 
        }
    })

    newTopBar.appendChild(newCircle); 
    newTopBar.appendChild(newBoardTitle); 
    newTopBar.appendChild(newBoardCount)

    newBoard.append(newTopBar); newBoard.append(newDelBtn);
    newBoard.addEventListener('dragover', (event)=>{
        event.preventDefault();
        const flyingEl = document.querySelector('.flying')
        if (!flyingEl) return;
        
        newBoard.appendChild(flyingEl)
    });
    // attachDragOver()


    return newBoard;
}
