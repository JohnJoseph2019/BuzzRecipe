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

    //clearing the section element tag
    sectionElement.innerHTML = '';
    //styling the section elemetn tag
    sectionElement.style.display = 'flex';
    sectionElement.style.flexDirection = 'column';
    sectionElement.style.alignItems = 'center';
    sectionElement.style.marginTop = '30px';
    //Creating the Image tag with some style
    const errorImage = document.createElement('img');
    errorImage.setAttribute('src', 'images/errorImage.jpg')
    errorImage.style.width = '300px';
    errorImage.style.height = '180px;'
    errorImage.style.border = '1px solid black';
    sectionElement.append(errorImage);
    //Creating the error message to be appended to the screen
    const errorh2 = document.createElement('h2');
    errorh2.style.width = "200px";
    errorh2.innerHTML = 'Sorry! It seems we do not have that cocktail. Try another search';
    sectionElement.append(errorh2);
    console.log(`${error}`)
  }
}

//displaying the items
function displaySearchResults(drinks) {
  //fix the header view of the page so the content can be see closer to the top of the page
  fixHeaderview();
  //This will delete the previous search by deleting everything
  sectionElement.innerHTML = '';
  sectionElement.removeAttribute('style');

  //sectionElement.setAttribute('class', 'section-search-result');
  sectionElement.className = 'section-search-result';

  for (let i = 0; i < drinks.length; i++) {
    //Creating DIV for each resulted drink
    const divDrink = document.createElement('DIV');
    divDrink.style.display = 'flex';
    divDrink.style.flexDirection = 'column';

    //create the name
    const name = document.createElement('h3');
    name.style.fontFamily = 'Girassol, cursive';
    name.innerHTML = drinks[i].strDrink;
    console.log(name);
    divDrink.append(name);

    //Creating the image element and appending to the div
    divDrink.append(displayImage(drinks[i].strDrinkThumb, drinks[i].strDrink, drinks[i], 'imageResult'));

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
  //This is to fix the header view bringing the content to the top of the page
  fixHeaderview();
  sectionElement.innerHTML = '';
  sectionElement.setAttribute('class', 'section-chosen-cocktail');

  //create the name and added to the section element
  const name = document.createElement('h2');
  name.style.fontFamily = 'Girassol, cursive';
  name.innerHTML = drink.strDrink;
  sectionElement.append(name);

  //Making this div inside the section element to align this row in column box
  const div = document.createElement('DIV');
  div.setAttribute('id', 'section-div');
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';
  //Adding the image
  div.append(displayImage(drink.strDrinkThumb, drink.strDrink));
  //Here create arrays for the ingredient list and measurements
  const ingredientList = getIngredients(drink);
  const measurementList = getMeasurments(drink);

  const innerDiv = document.createElement('div');
  const listTile = document.createElement('h4');
  listTile.style.fontFamily = 'Girassol, cursive';
  listTile.style.textDecoration = 'underline';
  listTile.innerHTML = 'Ingredients';
  innerDiv.append(listTile);

  innerDiv.style.display = 'flex';
  innerDiv.style.flexDirection = 'column';
  innerDiv.style.justifyContent = 'center';

  innerDiv.setAttribute('id', 'innerDiv');
  const listDiv = document.createElement('div');
  listDiv.style.display = 'flex';
  listDiv.setAttribute('id', 'listDiv');
  listDiv.style.justifyContent = 'center';

  listDiv.append(displayList(ingredientList, 'Ingredients'));
  listDiv.append(displayList(measurementList, 'Measurements'));
  innerDiv.append(listDiv);

  //Instructions
  const instTitle = document.createElement('h4');
  instTitle.style.fontFamily = 'Girassol, cursive';
  instTitle.style.textDecoration = 'underline';

  instTitle.innerHTML = 'Instructions:';
  innerDiv.append(instTitle);

  const instructions = document.createElement('p');
  instructions.innerHTML = drink.strInstructions;
  innerDiv.append(instructions);

  div.append(innerDiv);
  sectionElement.append(div);

}

//This will display the list ingredients and measurment
function displayList(array, title) {

  const unOrderList = document.createElement('ul');
  array.forEach(item => {

    const liElement = document.createElement('li');
    liElement.innerHTML = item;
    liElement.setAttribute('id', title);
    unOrderList.append(liElement);
  })
  return unOrderList;
}

/*This function will display the Image 
 creates a Imgae element and adds all its properties to this element.
 then it returns it.
*/
function displayImage(src, name, drinkObject, classname = '') {
  const imageSrc = document.createElement('IMG');
  imageSrc.setAttribute('src', src);
  imageSrc.setAttribute('alt', name);
  if (classname !== '') {
    imageSrc.setAttribute('class', classname);
    //Adding event listener to for this image
    imageSrc.addEventListener('click', function (e) {
      displayDrinkInfo(drinkObject);
    })
  } else {
    imageSrc.setAttribute('class', 'static-photo');
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
  console.log(body);
  const h1 = document.querySelector('H1');
  h1.style.margin = '0';
  const hideImage = document.querySelector('#home-page-photo');
  hideImage.style.display = 'none';
}
cocktailButton.addEventListener('click', cocktail);
searchButton.addEventListener('click', buzzRecipe);

