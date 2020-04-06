const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchButton = document.querySelector('#search');
const answer = document.querySelector('#blank');

function barAndDrinks(e) {
  let input = answer.value;
  //console.log('Inside barAndDrinks')
  //console.log('I search for:', input)
  searchDrinks(input);
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

  for (let i = 0; i < drinks.length; i++) {
    console.log('Name:', drinks[i].strDrink);
    console.log('Ingredients:');
    const ingredientList = getIngredients(drinks[i]);
    ingredientList.forEach(ingredient => {
      console.log(ingredient);
    })

  }
}
//To get the inngredients
function getIngredients(drinkObject) {
  console.log('Inside getIngredients:');
  console.log(drinkObject);
  let ingredientList = [];
  let counter = 1;
  for (key in drinkObject) {
    if (key === `strIngredient${counter}` && drinkObject[key] !== null) {
      ingredientList.push(drinkObject[key]);
      counter++;
    }
  }
  return ingredientList;
}
searchButton.addEventListener('click', barAndDrinks);