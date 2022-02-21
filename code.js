const deleteBtn = document.getElementById('delete');

let defaulPersonsList = [
  'Jess',
  'Daniel',
  'Ales',
  'Àlex',
  'Scarlet',
  'Albert',
  'Liviu',
  'Abde',
  'Ingrid',
  'Uri',
  'Sergi',
  'Yeray',
  'Guillermo',
];
let deletePersonsList = [];

deleteBtn.addEventListener('click', () => {
  deleteRandomPerson();
});

function deleteRandomPerson() {
  console.log('Before delete: ' + defaulPersonsList);

  let randomPerson = defaulPersonsList[Math.floor(Math.random() * defaulPersonsList.length)];
  defaulPersonsList.splice(defaulPersonsList.indexOf(randomPerson), 1);

  deletePersonsList.push(randomPerson);

  console.log('Delete person: ' + randomPerson);
  console.log('After delete: ' + deletePersonsList);
  // save to local storage
  localStorage.setItem('deletePersonsList', JSON.stringify(deletePersonsList));
  localStorage.setItem('defaulPersonsList', JSON.stringify(defaulPersonsList));
}