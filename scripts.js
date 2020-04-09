//Creating Global variables for my API links
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const RANDOM_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

//GLOBAL VARIABLES to be used by all fucntions
const searchButton = document.querySelector('#search');
const answer = document.querySelector('#blank');
const cocktailButton = document.querySelector('#cocktail-of-the-day');
const sectionElement = document.querySelector('SECTION');

/*BuzzRecipe
* This is the start if my page basically here just retrieve the input
* of the users search drink(word).
* Here it will call another function and delete whatever has been search from the textbox
*/
function buzzRecipe() {
  let input = answer.value;
  searchDrink(input);
  answer.value = '';
}
/* async function searchDrink
* Here it will take the input drink search and use this to start the API call to get that data
* if something goes wrong through the process of getting the data and 
* rendering tot the screen it will post catch error message to the console 
* as well as to the screen for the user can see.
*/
async function searchDrink(name) {
  try {
    let searchDrink = name;
    const response = await axios.get(BASE_URL + searchDrink);
    displaySearchResults(response.data.drinks);
  }
  catch (error) {
    //Calling this function to append the error
    errorMessage();
    console.log(`${error}`)
  }
}
/* errorMessage
* This function will display an Error message when the search came back unsuccessful.
* Will create to tag elements a H2 and IMG.
* H2 - will display the error message
* IMG - wil display and image
*/
function errorMessage() {
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
}
/* displaySearchResults(drinks)
* This function will display all the results that the API has on the drink the user search for
* params: drinks - this is the array of all results
* It will traverse to the array and display the name of the drink and the image of it
*/
function displaySearchResults(drinks) {
  //fix the header view of the page so the content can be see closer to the top of the page
  fixHeaderview();
  //This will delete the previous search by deleting everything
  sectionElement.innerHTML = '';
  sectionElement.removeAttribute('style');
  sectionElement.className = 'section-search-result';

  for (let i = 0; i < drinks.length; i++) {
    //Creating DIV for each resulted drink and image
    const divDrink = document.createElement('DIV');
    divDrink.style.display = 'flex';
    divDrink.style.flexDirection = 'column';

    //create h3 tag for the title of the drink
    const name = document.createElement('h3');
    name.style.fontFamily = 'Girassol, cursive';
    name.innerHTML = drinks[i].strDrink;
    divDrink.append(name);

    //Creating the image element and appending to the div
    divDrink.append(displayImage(drinks[i].strDrinkThumb, drinks[i].strDrink, drinks[i], 'imageResult'));

    //Adding the divDrank to the section - this will append it to the page
    sectionElement.appendChild(divDrink);

  }
}
/* getIngredients(drinkObject)
* This function will return an array of ingredients
* params = drinkObject - this is the object of the chosen drink
* traverse to the object for properties that have ingredients and push that to an array
*/
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
/* getMeasurments(drinkObject)
* This function will return an array of measurement
* params = drinkObject - this is the object of the chosen drink
* traverse to the object for properties that have measurements and push that to an array
*/
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
/* displayDrinkInfo(drink)
* This will display the chosen drinks info
* params = drink - this is the chose drink's object
* Here it will use DOM/Javascript to display correctly the info like:
* title / image / ingredients / measurements / instructions
*/
function displayDrinkInfo(drink) {
  //This is to fix the header view bringing the content to the top of the page
  fixHeaderview();
  sectionElement.innerHTML = '';
  sectionElement.setAttribute('class', 'section-chosen-cocktail');

  //Creating H2 tag for the title
  const name = document.createElement('h2');
  name.style.fontFamily = 'Girassol, cursive';
  name.innerHTML = drink.strDrink;
  sectionElement.append(name);

  //Creating a div that will have the image/ingredient/Measurements/instructions as a child
  const div = document.createElement('DIV');
  div.setAttribute('id', 'section-div');
  div.style.display = 'flex';
  div.style.alignItems = 'center';
  div.style.justifyContent = 'center';


  //Adding the image to the div
  div.append(displayImage(drink.strDrinkThumb, drink.strDrink));

  //Here retrieving ingredients and measurments as an array
  const ingredientList = getIngredients(drink);
  const measurementList = getMeasurments(drink);

  //Creating innderDiv to have a section just for ingredients/measurments/instructions
  const innerDiv = document.createElement('div');
  innerDiv.style.display = 'flex';
  innerDiv.style.flexDirection = 'column';
  innerDiv.style.justifyContent = 'center';
  innerDiv.setAttribute('id', 'innerDiv');

  //Creating listTile tag for a title
  const listTile = document.createElement('h4');
  listTile.style.fontFamily = 'Girassol, cursive';
  listTile.style.textDecoration = 'underline';
  listTile.innerHTML = 'Ingredients';
  innerDiv.append(listTile);

  //Creating a lisDiv to box out ingredients / measurements
  const listDiv = document.createElement('div');
  listDiv.setAttribute('id', 'listDiv');
  listDiv.style.display = 'flex';
  listDiv.style.justifyContent = 'center';

  listDiv.append(displayList(ingredientList, 'Ingredients'));
  listDiv.append(displayList(measurementList, 'Measurements'));
  innerDiv.append(listDiv);

  //Creating instTitle for the title of instuctions
  const instTitle = document.createElement('h4');
  instTitle.style.fontFamily = 'Girassol, cursive';
  instTitle.style.textDecoration = 'underline';
  instTitle.innerHTML = 'Instructions:';
  innerDiv.append(instTitle);

  //Creating P tag for the instruction info
  const instructions = document.createElement('p');
  instructions.innerHTML = drink.strInstructions;
  innerDiv.append(instructions);

  //innerDiv to the div tag
  div.append(innerDiv);
  //div will go to the section tag
  sectionElement.append(div);

}
/* displayList(array, title)
* This will turn the array argument into an underlist tag.
* return the ul tag element with the array elements as li
* params = array - array for what to display | title - the name of the array list for id attribute
*/
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

/* displayImage(src, alt, drinkObject, classname = '')
* This will create and IMG and add the image to it and return this element
* if the image is for the result page, that image will have an eventlistener for click that will
* display the info if chosen
* params = src: source | alt: alt-text of the photo
* params = dinkObject: this the object of the drink to make clickable image in certain cases
params = classname: this is to add a classname for styling purposes if it meets the criteria
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

/* async function cocktail()
* This async function will be use for the 'Random Buzz' button
* this will call the API that produces a call of get and give us 
* random drink from the database
*/
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
/* fixHeaderview()
* This function will basically just fix the top view of the page when
* it is not at the homepage
*/
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
//this event listener is add to the input tag which check if 'Enter' key was press then call buzzRecipe
answer.addEventListener('keyup', function (event) {
  if (event.keyCode === 13) {
    buzzRecipe();
  }
})