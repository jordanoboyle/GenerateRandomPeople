//DOM Elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleBtn = document.getElementById('double-money');
const showMillionairesBtn = document.getElementById('show-millaires');
const sortBtn = document.getElementById('sort-people');
const calculateWeatlthBtn = document.getElementById('calculate-wealth');


let data = [];
getRandomPerson();
getRandomPerson();
getRandomPerson();

//Fetch from generate random user from API
// "https://randomuser.me/"


async function getRandomPerson() {
  const response = await fetch('https://randomuser.me/api');
  const data = await response.json();

  const person = data.results[0];
  
  const newPerson = {
    name:  `${person.name.first} ${person.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  //Add new person to the data array:
  addData(newPerson);
  
}

//addData to the data array above:
function addData(personData) {
  data.push(personData);
}
// Testing
console.log(data);

//Update the DOM:
