/**
 * Write your challenge solution here
 */

const redButton = document.getElementById('redButton')
const greenButton = document.getElementById('greenButton')
const blueButton = document.getElementById('blueButton')
const purpleButton = document.getElementById('purpleButton')
const resetButton = document.getElementById('resetButton')
const mainHead = document.getElementById('mainHeading')

redButton.addEventListener('click', () =>{
    mainHead.style.color = '#e74c3c'
})

greenButton.addEventListener('click', () =>{
    mainHead.style.color = '#2ecc71'
})

blueButton.addEventListener('click', () =>{
    mainHead.style.color = '#3498db'
})

purpleButton.addEventListener('click', () =>{
    mainHead.style.color = '#9b59b6'
})

resetButton.addEventListener('click', () =>{
    mainHead.style.color = '#34495e'
})


