/**
 * Write your challenge solution here
 */

const hourHand = document.querySelector(".hour")
const minuteHand = document.querySelector('.minute')
const secondHand = document.querySelector('.second')

const digitalClock = document.querySelector('.digital-clock');
const date = document.querySelector('.date')
console.log(digitalClock)
console.log(date);

function updateClock(){

    const currTime = new Date(); 
    console.log(currTime)

    const hours = currTime.getHours() % 12 || 12;
    const minutes = currTime.getMinutes() < 10 ? `0${currTime.getMinutes()}` : currTime.getMinutes(); 
    const seconds = currTime.getSeconds() < 10 ? `0${currTime.getSeconds()}` : currTime.getSeconds();
    const ampm = currTime.getHours() >= 12 ? "PM" : "AM";

    const hourRotation = 30 * hours + minutes / 2; 
    const minuteRotation = 6 * minutes;  
    const secondRotation = 6 * seconds;  

    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    secondHand.style.transform = `rotate(${secondRotation}deg)`;

    digitalClock.innerText = `${hours}:${minutes}:${seconds}:${ampm}`
    date.innerText = currTime.toDateString();
    const loc = currTime.toDateString()
    console.log(loc)
}

setInterval(updateClock, 1000);

updateClock()