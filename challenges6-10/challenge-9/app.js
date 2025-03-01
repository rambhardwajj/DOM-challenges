/**
 * Write your challenge solution here
 */

const openButton = document.querySelector('.toggle-btn')
const panel = document.querySelector('.panel')
const closeBtn = document.querySelector(".close-btn");
const panelContent = document.querySelectorAll(".menu-item");


openButton.addEventListener('click', ()=>{
    panel.classList.toggle('active')
})

closeBtn.addEventListener('click', ()=>{
    panel.classList.toggle('active')
})

panelContent.forEach((item)=>{
    item.addEventListener('click',()=>{
        alert(`You are in ${item.textContent.toLowerCase()} page`)
    } )
})

