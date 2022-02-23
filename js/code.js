const addPerson = document.getElementById('add-person');
const addPersonBtn = document.getElementById('add-person-btn');
const active = document.getElementById('active');
const inactive = document.getElementById('inactive');
const reset = document.getElementById('reset');
const deleteBtn = document.getElementById('delete');

let personsList = JSON.parse(localStorage.getItem('personsList'));
let deletePersonsList = JSON.parse(localStorage.getItem('deletePersonsList'));
let lastDeletePerson = JSON.parse(localStorage.getItem('lastDeletePerson'));

function printList(array, onPrint) {
  if (array === null || array.length === 0) {
    onPrint.innerHTML = `<li>No persons ${onPrint.id}</li>`;
  }
  if (array !== null && array.length > 0) {
    onPrint.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
      onPrint.innerHTML += `<li>${array[i]}</li>`;
    }
  }
}

function reloadAll() {
  printList(personsList, active);
  printList(deletePersonsList, inactive);
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
        personsList.push(persons[i].trim());
      }
    } 
    if (!person.includes(',')) {
      personsList.push(person);
    }
    addPerson.value = '';
    localStorage.setItem('personsList', JSON.stringify(personsList));
    addPerson.value = null;
    console.log('After add: ' + personsList);
  }

  reloadAll();
}

function deleteRandomPerson() {
  let random = Math.floor(Math.random() * personsList.length);
  
  if (deletePersonsList === null) {
    deletePersonsList = [];
  }
  if (personsList.length > 0) {
    deletePersonsList.push(personsList[random]);
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
  
  reloadAll();
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
