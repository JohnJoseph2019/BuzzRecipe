const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const searchButton = document.querySelector('#search');
const answer = document.querySelector('#blank');

function barAndDrinks(e) {
  let drink = answer.value;
  console.log('We in the searchDrinks function')
  console.log('I search for: ', drink)
  searchDrinks(drink);
}

async function searchDrinks(name) {
  let searchDrink = name;
  const response = await axios.get(BASE_URL + searchDrink);
  console(response);
  console(response.data);
  console(response.data.drinks);
  displayTheInfo(response.data.drinks);
}


searchButton.addEventListener('click', barAndDrinks);