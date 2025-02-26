/**
 * Write your challenge solution here
 */
const nameInput = document.getElementById('nameInput')
const jobInput = document.getElementById('jobInput')
const ageInput = document.getElementById('ageInput')
const bioInput = document.getElementById('bioInput')

const nameDisplay = document.getElementById('nameDisplay')
const jobDisplay = document.getElementById('jobDisplay')
const ageDisplay = document.getElementById('ageDisplay')
const bioDisplay = document.getElementById('bioDisplay')

nameInput.addEventListener('input', ()=>{
    nameDisplay.textContent = nameInput.value 
})
jobInput.addEventListener('input', ()=>{
    jobDisplay.textContent = jobInput.value 
})
ageInput.addEventListener('input', () => {
    ageDisplay.textContent = ageInput.value;
})
bioInput.addEventListener('input', () => {
    bioDisplay.textContent = bioInput.value;
});