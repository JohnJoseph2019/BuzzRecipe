const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const RANDOM_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

//GLOBAL VARIABLES
const searchButton = document.querySelector('#search');
const answer = document.querySelector('#blank');
const cocktailButton = document.querySelector('#cocktail-of-the-day');

//Searching for the 'section' element
const sectionElement = document.querySelector('SECTION');

//Recevies the input and calls the searchDrink funtion on it
function buzzRecipe() {
  let input = answer.value;
  searchDrink(input);
  answer.value = '';
}

async function searchDrink(name) {
  try {
    let searchDrink = name;
    const response = await axios.get(BASE_URL + searchDrink);
    displaySearchResults(response.data.drinks);
  }
  catch (error) {
    console.log(`This is the error: ${error}`)
  }
}

//displaying the items
function displaySearchResults(drinks) {
  //This will delete the previous search by deleting everything
  sectionElement.innerHTML = '';
  //fix the header view of the page
  fixHeaderview();

  for (let i = 0; i < drinks.length; i++) {
    //Creating DIV for each resulted drink
    const divDrink = document.createElement('DIV');
    divDrink.style.display = 'flex';
    divDrink.style.flexDirection = 'column';

    //create the name
    const name = document.createElement('h4');
    name.innerHTML = drinks[i].strDrink;
    console.log(name);
    divDrink.append(name);

    //Creating the image element and appending to the div
    divDrink.append(displayImage(drinks[i].strDrinkThumb, drinks[i].strDrink, '200px', '200px', drinks[i], 'imageResult'));

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
  fixHeaderview();
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
function displayImage(src, name, width, height, drinkObject, classname = '') {
  const imageSrc = document.createElement('IMG');
  imageSrc.style.width = width;
  imageSrc.style.height = height;
  imageSrc.setAttribute('src', src);
  imageSrc.setAttribute('alt', name);
  if (classname !== '') {
    imageSrc.setAttribute('class', classname);
    //Adding event listener to for this image
    imageSrc.addEventListener('click', function (e) {
      displayDrinkInfo(drinkObject);
    })
  }
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
//Fix the body element to bring the content closer to the top Also alter h1 alittle to bring it closer to the top of the page
function fixHeaderview() {
  const body = document.querySelector('BODY');
  // body.style.marginTop = '0';
  // body.style.padding = '0';
  console.log(body);
  const h1 = document.querySelector('H1');
  h1.style.margin = '0';
  const hideImage = document.querySelector('#home-page-photo');
  hideImage.style.display = 'none';
}

// function setStyleToResultDiv() {

// }

cocktailButton.addEventListener('click', cocktail)
searchButton.addEventListener('click', buzzRecipe);

