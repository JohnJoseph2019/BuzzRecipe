const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchButton = document.querySelector('#search');
const answer = document.querySelector('#blank');
//Searching for the 'section' 
const sectionElement = document.querySelector('SECTION');


function buzzRecipe(e) {
  let input = answer.value;
  searchDrinks(input);
  //answer.value = '';


}

async function searchDrinks(name) {
  let searchDrink = name;
  const response = await axios.get(BASE_URL + searchDrink);
  displayTheInfo(response.data.drinks);
}
//displaying the items
function displayTheInfo(drinks) {
  //console.log('Inside displayTheInfo:');
  //console.log(drinks.length);
  //This will delete the previous search by deleting everything
  sectionElement.innerHTML = '';

  for (let i = 0; i < drinks.length; i++) {
    //Creating DIV for each resulted drink
    const divDrink = document.createElement('DIV');

    //create the name
    const name = document.createElement('h4');
    name.innerHTML = drinks[i].strDrink;
    divDrink.append(name);

    //Creating the image element
    const imageSrc = document.createElement('img');
    imageSrc.setAttribute('src', drinks[i].strDrinkThumb + '/preview');
    imageSrc.setAttribute('alt', drinks[i].strDrink);
    divDrink.append(imageSrc);

    //Creating the button element
    const chosenButton = document.createElement('button');
    chosenButton.innerHTML = "This one";
    chosenButton.setAttribute('id', `${drinks[i].idDrink}`);
    chosenButton.addEventListener('click', function (e) {
      chosenDrink(drinks[i]);
    })
    divDrink.append(chosenButton);

    //Adding the divDrank to the section - this will appened to the page
    sectionElement.appendChild(divDrink);

  }
}
//To get list of ingredients
function getIngredients(drinkObject) {
  let ingredientList = [];
  let counter = 1;
  for (ingredient in drinkObject) {
    if (ingredient === `strIngredient${counter}` && drinkObject[ingredient] !== null) {
      ingredientList.push(drinkObject[ingredient]);
      counter++;
    }
  }
  return ingredientList;
}

//To get the list of Measurments:
function getMeasurments(drinkObject) {
  let measurementList = [];
  let counter = 1;
  for (measurement in drinkObject) {
    if (measurement === `strMeasure${counter}` && drinkObject[measurement] !== null) {
      measurementList.push(drinkObject[measurement]);
      counter++;
    }
  }
  return measurementList;
}


function chosenDrink(drink) {
  console.log(drink);
  sectionElement.innerHTML = '';

  //create the name
  const name = document.createElement('h4');
  name.innerHTML = drink.strDrink;
  sectionElement.append(name);


  //Here create arrays for the ingredient list and measurements
  const ingredientList = getIngredients(drink);
  const measurementList = getMeasurments(drink);

  displayList(ingredientList, 'Ingredients');
  displayList(measurementList, 'Measurements');

  // console.log('Instructions:', drink.strInstructions);
  // console.log('Image:', drink.strDrinkThumb);

}

function displayList(array, title) {

  const div = document.createElement('div');
  div.innerHTML = title;
  const unOrderList = document.createElement('ul');
  array.forEach(item => {

    const liElement = document.createElement('li');
    liElement.innerHTML = item;
    unOrderList.append(liElement);
  })
  div.append(unOrderList);
  sectionElement.append(div);

}
searchButton.addEventListener('click', buzzRecipe);