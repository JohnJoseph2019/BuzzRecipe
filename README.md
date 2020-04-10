# Project Overview

## Project Name

Buzz recipe

## Project Description

This project is a website/application where you can look up your favorite drink and get information on how to make it. You will get an image of the drink, a list of ingredients with measurements and instructions on how it should be made. I also have a button, called Buzz Random, which gives you a random drink for you to make for those who are undecided what to drink.

## API and Data Sample

[Cock tail DB](https://www.thecocktaildb.com/api.php)

```JSON 
{
    "drinks": [
        {
            "idDrink": "11001",
            "strDrink": "Old Fashioned",
            "strDrinkAlternate": null,
            "strDrinkES": null,
            "strDrinkDE": null,
            "strDrinkFR": null,
            "strDrinkZH-HANS": null,
            "strDrinkZH-HANT": null,
            "strTags": "IBA,Classic,Alcoholic,Expensive",
            "strVideo": null,
            "strCategory": "Cocktail",
            "strIBA": "Unforgettables",
            "strAlcoholic": "Alcoholic",
            "strGlass": "Old-fashioned glass",
            "strInstructions": "Place sugar cube in old fashioned glass and saturate with bitters, add a dash of plain water. Muddle until dissolved.\r\nFill the glass with ice cubes and add whiskey.\r\n\r\nGarnish with orange twist, and a cocktail cherry.",
            "strInstructionsES": null,
            "strInstructionsDE": "Zuckerwürfel in ein old fashioned Glas geben und mit Bitterstoff sättigen, einen Schuss Wasser hinzufügen. Vermischen, bis sie sich auflösen.",
            "strInstructionsFR": null,
            "strInstructionsZH-HANS": null,
            "strInstructionsZH-HANT": null,
            "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
            "strIngredient1": "Bourbon",
            "strIngredient2": "Angostura bitters",
            "strIngredient3": "Sugar",
            "strIngredient4": "Water",
            "strIngredient5": null,
            "strIngredient6": null,
            "strIngredient7": null,
            "strIngredient8": null,
            "strIngredient9": null,
            "strIngredient10": null,
            "strIngredient11": null,
            "strIngredient12": null,
            "strIngredient13": null,
            "strIngredient14": null,
            "strIngredient15": null,
            "strMeasure1": "4.5 cL",
            "strMeasure2": "2 dashes",
            "strMeasure3": "1 cube",
            "strMeasure4": "dash",
            "strMeasure5": null,
            "strMeasure6": null,
            "strMeasure7": null,
            "strMeasure8": null,
            "strMeasure9": null,
            "strMeasure10": null,
            "strMeasure11": null,
            "strMeasure12": null,
            "strMeasure13": null,
            "strMeasure14": null,
            "strMeasure15": null,
            "strCreativeCommonsConfirmed": "Yes",
            "dateModified": "2016-11-04 09:46:42"
        }
    ]
}
```

## Wireframes

[Wireframes](https://wireframe.cc/pro/pp/bdc896319330807)

## MVP

- Create the skeleton template of the project : HTML-CSS-JS
- Be able to use the appropiate API and use it correctly
- Render data on page 
- Allow user to search for there drink.
- Be able to randomonly suggest a cocktail to make.
- Able to use flex to align the content correctly.
- Be able to add images

## PostMVP 

- Style button with effects 
- Make the clickable images
- Change the input text with some effects
- Find a way using another API ( or not ) where users can find nearby bars as per user location.
- Implement this with a list showing the user at all times their location. It will be display at the bottom right corner.
- Able to implement a link to map version of it.


## Project Schedule

|  Day | Deliverable | Status
|---|---| ---|
|April 6th| Project Planning/Project Aproval - HTML and Basic CSS | Complete
|April 7th| Finish up with HTML and Basic CSS | Complete
|April 8th| Coding of javascript/DOM to get and append data | Complete
|April 9th| CSS Styling | Complete
|April 10th| Presentation | Complete

## Priority Matrix

![Priotity Matrix](https://i.imgur.com/stsKBoI.jpg)

## Timeframes

| Component | Priority | Estimated Time | Time Invested | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| HTML Structure | L | 3hrs| 1hr | 1hrs |
| CSS Style - Basic | M | 3hrs| 1hr | 1hr |
| DOM - Using Axios to acess to the API | H | 2hrs| 1hr | 1hrs |
| Javascript - Functions to get and manipulate the data to the console| H | 4hrs| 4hrs | 4hrs |
| DOM - Search button to display the results of the search drink| H | 3hrs| 3hr | 3hrs |
| DOM - Create a second button, select me, each result item| H | 3hrs| 3hrs | 3hrs |
| Javascript - Create functions for the result item selected | H | 3hrs| 3hrs |3hrs |
| API/DOM - Append the ingredients/measurements of the chosen item| H | 3hrs| 3hrs | 3hrs |
| DOM - Add functonality to the cocktail of day button| H | 3hrs| 4hrs | 4hrs |
| Javascript - display the cocktail of the day instructions| H | 3hrs| 4hrs | 4hrs |
| CSS Styling - Home Page | H | 3hrs| 3hrs | 3hrs |
| CSS Styling - Search Result| H | 3hrs| 3hrs | 3hrs |
| CSS Styling - Drink Result | H | 3hrs| 3hrs | 3hrs |
| CSS Styling - Button Design | H | 3hrs| 3hrs | 3hrs|
| Post-MVP | H | 3hrs| 3hrs | 3hrs|
| Total | H | 45hrs| 42hrs | 42hrs | 

## Code Snippet

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
function reverse(string) {
	// here is the code to reverse a string of text
}
```

## Change Log
 Use this section to document what changes were made and the reasoning behind those changes.  
