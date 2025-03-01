
const inp = document.getElementById('inp')
const btn = document.getElementById('btn')
const container = document.getElementById('container')

btn.addEventListener('click', ()=>{
    let color = inp.value 
    if( !isValidColorCode(color)){
        return alert('not a valid input')
    }
    function buttonGenerator(color){
        return function (){
            let newButton = document.createElement('button')
            newButton.innerText = color
            newButton.addEventListener('click', ()=>{
                document.body.style.backgroundColor = color;
            })
            container.appendChild(newButton)
        }
    }
    let addButton = buttonGenerator(color)
    addButton();
})


function isValidColorCode(color) {
    const regex = /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})$/;
    return regex.test(color);
}