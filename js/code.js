const addPerson = document.getElementById('add-person');
const addPersonBtn = document.getElementById('add-person-btn');
const active = document.getElementById('active');
const inactive = document.getElementById('inactive');
const reset = document.getElementById('reset');
const deleteBtn = document.getElementById('delete');
const interactiveNames = document.getElementById("interactive-name");

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
    interactiveNames.innerHTML = 'No persons';
  }
  if (personsList !== null && personsList.length > 0) {
    let lastAdd = personsList[0];
    interactiveNames.textContent = lastAdd;
  }
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
  deleteBtn.disabled = true;
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

function deleteRandomPerson() {
  activeState();
  let random = Math.floor(Math.random() * personsList.length);
  
  if (deletePersonsList === null) {
    deletePersonsList = [];
  }
  if (personsList.length > 0) {
    deletePersonsList.unshift(personsList[random]);
    personsList.splice(random, 1);
  }
  if (personsList.length <= 0){
    deleteBtn.disabled = true;
  }
  // save to local storage
  localStorage.setItem('deletePersonsList', JSON.stringify(deletePersonsList));
  localStorage.setItem('personsList', JSON.stringify(personsList));

  reloadAll();
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
reloadAll();

deleteBtn.addEventListener('click', deleteRandomPerson);
addPersonBtn.addEventListener('click', addPersonToList);
reset.addEventListener('click', resetList);
addPerson.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addPersonBtn.click();
  }
});
