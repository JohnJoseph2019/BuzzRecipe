const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function searchDrinks(response) {
  let drinks = response.data.drinks;
  console.log('We in the searchDrinks function')
  console.log(drinks.length);
}

async function barAndDrinks() {
  let searchDrink = 'bloody mary';
  const response = await axios.get(BASE_URL + searchDrink);
  searchDrinks(response)
  console.log(response);
}

barAndDrinks();