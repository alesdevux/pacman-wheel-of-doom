const addPerson = document.getElementById('add-person');
const addPersonBtn = document.getElementById('add-person-btn');
const active = document.getElementById('active');
const inactive = document.getElementById('inactive');
const reset = document.getElementById('reset');
const deleteBtn = document.getElementById('delete');

let personsList = JSON.parse(localStorage.getItem('personsList'));
let deletePersonsList = JSON.parse(localStorage.getItem('deletePersonsList'));

deleteBtn.addEventListener('click', deleteRandomPerson);
addPersonBtn.addEventListener('click', addPersonToList);
reset.addEventListener('click', resetList);
addPerson.addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    addPersonBtn.click();
  }
});

reloadAll();

function reloadAll() {
  // location.reload();

  if (personsList === null || personsList.length === 0) {
    active.innerHTML = `<li>No persons active</li>`;
  } else {
    active.innerHTML = '';
    for (let i = 0; i < personsList.length; i++) {
      active.innerHTML += `<li>${personsList[i]}</li>`;
    }
  }
  
  if (deletePersonsList === null || deletePersonsList.length === 0) {
    inactive.innerHTML = `<li>No persons deth</li>`;
  } else {
    inactive.innerHTML = '';
    for (let i = 0; i < deletePersonsList.length; i++) {
      inactive.innerHTML += `<li>${deletePersonsList[i]}</li>`;
    }
  }
}

function addPersonToList() {
  let person = addPerson.value;
  if (personsList === null) {
    personsList = [];
  }
  if (person !== '') {
    if (person.includes(',')) {
      let persons = person.split(',');
      for (let i = 0; i < persons.length; i++) {
        personsList.push(persons[i].trim());
      }
    } else {
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
  } else {
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
