//DOM Elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleBtn = document.getElementById('double-money');
const showMillionairesBtn = document.getElementById('show-millaires');
const sortBtn = document.getElementById('sort-people');
const calculateWeatlthBtn = document.getElementById('calculate-wealth');


let data = [];

//Fetch from generate random user from API
// "https://randomuser.me/"


async function getRandomPerson() {
  try {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const person = data.results[0];
    
    const newPerson = {
      name:  `${person.name.first} ${person.name.last}`,
      money: Math.floor(Math.random() * 1000000)
    };
    //Add new person to the data array:
    addData(newPerson);
  } catch (error) {
    console.error('Error Fetching data', error);
  } 
}

getRandomPerson();
getRandomPerson();
getRandomPerson();

//addData to the data array above:
function addData(personData) {
  data.push(personData);

  updateDOM();
}
// Testing
console.log(data);


//Update the DOM:
function updateDOM(providedData = data) {
  //Clear main DIV tag
  main.innerHTML = '<h2><strong>Personal</strong> Wealth</h2>';
  console.log(main.innerHTML);

  providedData.forEach(person => {
    const element = document.createElement('div');  //creates an element within our html
    element.classList.add('person');  //creates a class within the element/tag created above
    element.innerHTML = `<strong> ${person.name} </strong> ${moneyFormat(person.money)}`; //creates the innerHTML of the element created above.
    
    main.appendChild(element);
  });
}

//Format the Money
function moneyFormat(number) {
  return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}