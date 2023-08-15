import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.delay');
const stepInput = document.querySelector('.step');
const amountInput = document.querySelector('.amount');

form.addEventListener('submit', onSubmit);
  
function createPromise(position, delay) {  
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  let delay = Number(delayInput.value);
  let amount = Number(amountInput.value);
  let step = Number(stepInput.value);

  for (let i = 1; i <= amount; i += 1){
    createPromise(i, delay)
      .then(forThen)
      .catch(forCatch);
    delay +=step;
   }
};

function forThen({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { timeout: 5000 },);
}

function forCatch({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { timeout: 2000 },);
}