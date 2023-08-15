
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
 }
 
 const body = document.querySelector('body');
 const btnStart = document.querySelector('[data-start]');
 const btnStop = document.querySelector('[data-stop]');
 const CHANGE_COLOR_INTERVAL = 1000;
 let intervalId = null;
 
 btnStart.addEventListener('click', onStart);
 
 function onStart() {
     btnStart.setAttribute('disabled', true);
     btnStop.removeAttribute('disabled');
 
     intervalId = setInterval(() => {
     body.style.backgroundColor = getRandomHexColor();
     }, CHANGE_COLOR_INTERVAL);
 } 
 
 btnStop.addEventListener('click', () => {
     clearInterval(intervalId);
     btnStop.setAttribute('disabled', true);
     btnStart.removeAttribute('disabled');
 });