import flatpickr from "flatpickr"; // импорт из библиотеки (календарь)
import "flatpickr/dist/flatpickr.min.css"; //импорт css файлов

const buttonStart = document.querySelector('[data-start]');
const input = document.querySelector('#datetime-picker');
const INTERVAL = 1000;
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
let startTime = 0;
buttonStart.setAttribute('disabled', true);

const options = {
  enableTime: true,             //включает выбор времени(по умолчанию false)
  time_24hr: true,              //отображает время в формате 24 часов
  defaultDate: new Date(),      //устанавливает начальную дату(текущая дата)
  minuteIncrement: 1,           //регулирует шаг ввода минут
  onClose(selectedDates) {      //функция при закрытии календаря
    console.log(selectedDates[0]);   
    startTime = selectedDates[0].getTime();
    console.log(startTime);
    console.log(new Date().getTime());
    buttonStart.removeAttribute('disabled');

    if ((startTime - new Date().getTime()) <= 0) {
      buttonStart.setAttribute('disabled', true);
      alert("Please, choose a date in the future");
      return;
    };
  },
};

flatpickr("#datetime-picker", options);

buttonStart.addEventListener('click', start);

function start() {
  buttonStart.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  let isActive = false;

  let intervalId = setInterval(() => {
    const currentTime = Date.now();
    let delta = startTime - currentTime;
    if (delta <= 0) {
      isActive = true;
      return;
    };

    let partialtDate = convertMs(delta);
    console.log(partialtDate);

    days.textContent = partialtDate.days;
    hours.textContent = partialtDate.hours;
    minutes.textContent = partialtDate.minutes;
    seconds.textContent = partialtDate.seconds;   
  }, INTERVAL);

  if (isActive) {
    clearInterval(intervalId);
  };
};
    
function convertMs(ms) { //ms - разница между конечной и текущей датой
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};

function pad(value) {
    return String(value).padStart(2, '0');
};

 