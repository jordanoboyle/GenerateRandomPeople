//DOM Elements
const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleBtn = document.getElementById('double-money');
const showMillionairesBtn = document.getElementById('show-millionaires');
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

//Double the Money:
function doubleMoney() {
  data = data.map((person) => {
    return {...person, money: person.money * 2}; //Spread operator used here, 
  });
  updateDOM(); //This is actually doing something behind the seens
  //While it cannot be seen, it is mapping through the data displayed and updating the DOM with our information
}
console.log(doubleMoney(data));

//Show the Millionaires (using .filter()):
function showTheMillionaires() {
  data = data.filter(person => {
    if (person.money > 1000000) {
      return {...person};
    }
  })
  updateDOM();
  // let mills = data.filter(function(person) {
  //   if (person.money > 1000000) {
  //     return {...person};
  //   }
  // });
  // console.log(mills);
  
}



//Sort By Richest:
function sortByRichest() {
  data.sort((a, b) => {
    return b.money - a.money;
    //here we are sorting by the richest using sort()
    //In JS sort() is built on sorting strings. You need the compare function provided above to get
    //the results desire, comparing values to each other. 
  });
  updateDOM();
}

//Format the Money
function moneyFormat(number) {
  //Formula acquired from StackOverflow
  return '$' + (number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event Listeners:
//Adding a Random Person
addUserButton.addEventListener('click', (e) =>{
  getRandomPerson();
});
doubleBtn.addEventListener('click', (e) => {
  doubleMoney();
});
sortBtn.addEventListener('click', (e) => {
  sortByRichest();
});
showMillionairesBtn.addEventListener('click', (e) => {
  showTheMillionaires();
});

