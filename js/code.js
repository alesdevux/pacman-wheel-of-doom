const addPerson = document.getElementById('add-person');
const addPersonBtn = document.getElementById('add-person-btn');
const active = document.getElementById('active');
const inactive = document.getElementById('inactive');
const reset = document.getElementById('reset');
const deleteBtn = document.getElementById('delete');
const interactivePacman = document.getElementById('interactive-pacman');
const interactiveName = document.getElementById("interactive-name");

let personsList = JSON.parse(localStorage.getItem('personsList'));
let deletePersonsList = JSON.parse(localStorage.getItem('deletePersonsList'));
let lastDeletePerson = JSON.parse(localStorage.getItem('lastDeletePerson'));

let state = localStorage.getItem('state');

function printList(array, onPrint) {
  if (array === null || array.length === 0) {
    onPrint.innerHTML = `<li>No ghosts ${onPrint.id}</li>`;
  }
  if (array !== null && array.length > 0) {
    onPrint.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
      onPrint.innerHTML += `<li>${array[i]}</li>`;
    }
  }
}

function printLastAdd() {
  if (personsList === null || personsList.length === 0) {
    interactiveName.innerHTML = 'No persons';
  }
  if (state === 'initial') {
    if (personsList !== null && personsList.length > 0) {
      let lastAdd = personsList[0];
      interactiveName.textContent = lastAdd;
    }
  }
  /* if (state === 'active') {
    interactiveName.textContent = lastDeletePerson;
  } */
}

function reloadAll() {
  printList(personsList, active);
  printList(deletePersonsList, inactive);
  printLastAdd();
}

function initialState() {
  state = 'initial';
  document.documentElement.setAttribute('data-state', state);
  localStorage.setItem('state', state);
  addPerson.disabled = false;
  addPersonBtn.disabled = false;
  if (personsList === null || personsList.length === 0) {
    deleteBtn.disabled = true;
  }
  if (personsList !== null && personsList.length > 0) {
    deleteBtn.disabled = false;
  }
  reset.disabled = true;
}

function activeState() {
  state = 'active';
  document.documentElement.setAttribute('data-state', state);
  localStorage.setItem('state', state);
  addPersonBtn.disabled = true;
  deleteBtn.disabled = false;
  reset.disabled = false;
  addPerson.disabled = true;
}

function addPersonToList() {
  let person = addPerson.value;
  if (personsList === null) {
    personsList = [];
  }
  if (person !== '') {
    deleteBtn.disabled = false;
    if (person.includes(',')) {
      let persons = person.split(',');
      for (let i = 0; i < persons.length; i++) {
        personsList.unshift(persons[i].trim());
      }
    } 
    if (!person.includes(',')) {
      personsList.unshift(person);
    }
    addPerson.value = '';
    localStorage.setItem('personsList', JSON.stringify(personsList));
    addPerson.value = null;
  }

  reloadAll();
}

function sendSomeoneToGlory(random, personsList) {
  let leftMove = 0;
  let screenWidth = document.documentElement.clientWidth;
  let timeInterval = 50;
  let movePercentage = screenWidth / 100;

  let move = setInterval(() => {
    leftMove += movePercentage;
    interactivePacman.style.left = leftMove + 'px';
    
    if (leftMove >= screenWidth) {
      leftMove = -100;
      let returnMove = setInterval(() => {
        leftMove += movePercentage;
        interactivePacman.style.left = leftMove + 'px';
        if (leftMove >= 0) {
          clearInterval(returnMove);
        }
      }, timeInterval);
      clearInterval(move);
    }
  }, timeInterval);
  setTimeout(() => {
    clearInterval(move);
    deletePerson = personsList[random];
    interactiveName.textContent = '';
    interactivePacman.classList.remove('eat');
    interactiveName.classList.remove('food');
    
    if (deletePersonsList === null) {
      deletePersonsList = [];
    }
    if (personsList.length > 0) {
      deletePersonsList.unshift(deletePerson);
      personsList.splice(random, 1);
    }
    if (personsList.length <= 0){
      deleteBtn.disabled = true;
    }
    // save to local storage
    localStorage.setItem('deletePersonsList', JSON.stringify(deletePersonsList));
    localStorage.setItem('personsList', JSON.stringify(personsList));
  
    reloadAll();
  } , 6500);
}

function printNameToEat(i, personsList) {
  interactiveName.textContent = personsList[i];
}

function eatPacman(random, personsList) {
  let fast = setInterval(() => {
    let newRandom = Math.floor(Math.random() * personsList.length);
    interactiveName.textContent = personsList[newRandom];
  }, 200);
  setTimeout(() => {
    interactiveName.classList.remove('rulete');
    interactivePacman.classList.add('eat');
    interactiveName.classList.add('food');
    interactiveName.textContent = personsList[random];
    clearInterval(fast);
    sendSomeoneToGlory(random, personsList);
  }, 3000);
}

function getRandom(personsList) {
  activeState();
  interactiveName.classList.add('rulete');
  let random = Math.floor(Math.random() * personsList.length);
  eatPacman(random, personsList);
}

function resetList() {
  personsList = [];
  deletePersonsList = [];
  localStorage.setItem('personsList', JSON.stringify(personsList));
  localStorage.setItem('deletePersonsList', JSON.stringify(deletePersonsList));

  initialState();
  
  reloadAll();
}

if (state === 'initial' || state === null) {
  initialState();
}
if (state === 'active') {
  activeState();
}

reloadAll();

deleteBtn.addEventListener('click', () => getRandom(personsList));
addPersonBtn.addEventListener('click', addPersonToList);
reset.addEventListener('click', resetList);
addPerson.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addPersonBtn.click();
  }
});
