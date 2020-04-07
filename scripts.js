const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const RANDOM_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

//GLOBAL VARIABLES
const searchButton = document.querySelector('#search');
const answer = document.querySelector('#blank');
const cocktailButton = document.querySelector('#cocktail-of-the-day');
//Searching for the 'section' 
const sectionElement = document.querySelector('SECTION');

//Recevies the input and calls the searchDrink funtion on it
function buzzRecipe() {
  let input = answer.value;
  searchDrinks(input);
  answer.value = '';
}

async function searchDrinks(name) {
  try {
    let searchDrink = name;
    const response = await axios.get(BASE_URL + searchDrink);
    displayResults(response.data.drinks);
  }
  catch (error) {
    console.log(`This is the error: ${error}`)
  }
}
//displaying the items
function displayResults(drinks) {
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
    displayImage(drinks[i].strDrinkThumb, drinks[i].strDrink)
    divDrink.append(displayImage(drinks[i].strDrinkThumb, drinks[i].strDrink));

    //Creating the button element
    const chosenButton = document.createElement('button');
    chosenButton.innerHTML = "Select Me";
    chosenButton.setAttribute('id', `${drinks[i].idDrink}`);
    chosenButton.addEventListener('click', function (e) {
      displayDrinkInfo(drinks[i]);
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


function displayDrinkInfo(drink) {
  console.log('in Display Drink Info')
  console.log(drink);
  console.log(drink.length);
  sectionElement.innerHTML = '';

  console.log(drink.strDrink);

  //create the name
  const name = document.createElement('h4');
  name.innerHTML = drink.strDrink;
  sectionElement.append(name);


  //Here create arrays for the ingredient list and measurements
  const ingredientList = getIngredients(drink);
  const measurementList = getMeasurments(drink);

  displayList(ingredientList, 'Ingredients');
  displayList(measurementList, 'Measurements');

  //Instructions
  const instructions = document.createElement('p');
  instructions.innerHTML = drink.strInstructions;
  sectionElement.append(instructions);

  sectionElement.append(displayImage(drink.strDrinkThumb, drink.strDrink, '200px', '200px'));

}
//This will display the list ingredients and measurment
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

/*This function will display the Image 
 creates a Imgae element and adds all its properties to this element.
 then it returns it.
*/
function displayImage(src, name, width, height) {
  const imageSrc = document.createElement('IMG');
  imageSrc.style.width = width;
  imageSrc.style.height = height;
  imageSrc.setAttribute('src', src + '/preview');
  imageSrc.setAttribute('alt', name);
  return imageSrc;
}

//Cocktail of the day function
async function cocktail() {

  try {
    let cocktail = await axios.get(RANDOM_URL);
    console.log(cocktail);
    displayDrinkInfo(cocktail.data.drinks[0]);
  }
  catch (error) {
    console.log(error);
  }
}

cocktailButton.addEventListener('click', cocktail)
searchButton.addEventListener('click', buzzRecipe);

