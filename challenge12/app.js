const addTaskBtn = document.getElementById('add-task-btn')
const todoBoard = document.getElementById('todo-board')

function attachDrag(target){
    target.addEventListener('dragstart', ()=>{
        target.classList.add('flying')
    })
    target.addEventListener('dragend', ()=>{
        target.classList.remove('flying')
    })
}
addTaskBtn.addEventListener('click', ()=>{
    const input = prompt('What is the task')
    if( !input) return 
    
    const taskCard = document.createElement('p')
    taskCard.classList.add('item')
    taskCard.innerText = input;
    taskCard.draggable = true;
    // taskCard.setAttribute(draggable, true)
    
    attachDrag(taskCard)

    todoBoard.appendChild(taskCard)
    
})


const  allBoards = document.querySelectorAll('.board')
const allItems = document.querySelectorAll('.item')


allItems.forEach( (item)=> attachDrag(item))


allBoards.forEach((board) => {
    board.addEventListener('dragover', ()=> {
        const flyingElement = document.querySelector('.flying')
        console.log(board, 'Kuch toh gya mere uper se', flyingElement)
        board.appendChild(flyingElement)
    })
});

