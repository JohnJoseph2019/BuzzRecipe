const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchButton = document.querySelector('#search');
const answer = document.querySelector('#blank');

function barAndDrinks(e) {
  let input = answer.value;
  //console.log('Inside barAndDrinks')
  //console.log('I search for:', input)
  searchDrinks(input);
  //answer.value = '';


}

async function searchDrinks(name) {
  console.log('Inside searchDrinks');
  let searchDrink = name;
  const response = await axios.get(BASE_URL + searchDrink);
  //console.log(response);
  //console.log(response.data);
  displayTheInfo(response.data.drinks);
}
//displaying the items
function displayTheInfo(drinks) {
  console.log('Inside displayTheInfo:');
  console.log(drinks);
  const sectionElement = document.querySelector('SECTION');
  console.log(sectionElement);
  //This will delete the previous search by deleting everything
  sectionElement.innerHTML = '';

  for (let i = 0; i < drinks.length; i++) {
    console.log('Name:', drinks[i].strDrink);
    console.log('Ingredients:');
    const divDrink = document.createElement('DIV');

    const name = document.createElement('h4');
    name.innerHTML = drinks[i].strDrink;
    divDrink.append(name);

    //Here create arrays for the ingredient list and measurements
    const ingredientList = getIngredients(drinks[i]);
    const measurementList = getMeasurments(drinks[i]);
    ingredientList.forEach((ingredient, idx) => {
      console.log(`Ingredient ${idx + 1}: ${ingredient} Measurements ${idx + 1}: ${measurementList[idx]}`);

    })


    console.log('Instructions:', drinks[i].strInstructions);

    console.log('Image:', drinks[i].strDrinkThumb);

    const imageSrc = document.createElement('img');
    imageSrc.setAttribute('src', drinks[i].strDrinkThumb + '/preview');
    imageSrc.setAttribute('alt', drinks[i].strDrink);
    console.log(imageSrc);
    divDrink.append(imageSrc);

    const choosenButton = document.createElement('button');
    choosenButton.innerHTML = "This one";
    divDrink.append(choosenButton);

    //Adding the divDrank to the section - this will appened to the page
    sectionElement.appendChild(divDrink);

  }
}
//To get list of ingredients
function getIngredients(drinkObject) {
  console.log('Inside getIngredients:');
  console.log(drinkObject);
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
  console.log('Inside getMeasurments:');
  console.log(drinkObject);
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
searchButton.addEventListener('click', barAndDrinks);