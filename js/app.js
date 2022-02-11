const mealDetailsSection = document.getElementById('meal-details');
const mealsSection = document.getElementById('meals-section');

document.getElementById('search-bar').addEventListener('keypress', (e) => {
    if (e.code === 'Enter') {
        document.getElementById('search-btn').click();
    }
})

document.getElementById('search-btn').addEventListener('click', function () {
    mealDetailsSection.innerHTML = '';
    const mealToSearch = document.getElementById('search-bar').value;
    loadMealData(mealToSearch);    
});

const loadMealData = mealToSearch => {
    fetch(`https://www.themealdb.com//api/json/v1/1/search.php?s=${mealToSearch}`)
    .then(res => res.json())
    .then(data => displayMeals(data))
    .catch(error => showError());
}

const displayMeals = meals => {

    const mealList = meals.meals;
    mealsSection.innerHTML = '';

    mealList.forEach(meal => {

        const mealCard = document.createElement('div');

        const mealInfo = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
        </div>
        `;

        mealCard.innerHTML = mealInfo;
        mealCard.className = "card col-md-3 col-sm-5 col-10";
        mealCard.setAttribute('onclick', `loadRecipe('${meal.idMeal}')`);
        mealsSection.appendChild(mealCard);

    });

}

const loadRecipe = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(res => res.json())
    .then(data => displayRecipe(data))
}

const displayRecipe = meal => {
    mealDetailsSection.innerHTML = '';

    const ingredientList = createIngredientList(meal.meals[0]);

    const mealCard = document.createElement('div');

    const recipeInfo = `
        <img src="${meal.meals[0].strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h2 class="card-title fw-bold">${meal.meals[0].strMeal}</h2>
            <h4 class="my-5">Ingredients</h4>
            ${ingredientList}
        </div>
    `;

    mealCard.innerHTML = recipeInfo;
    mealCard.classList = "card border-0 mb-5";

    mealDetailsSection.appendChild(mealCard);

    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

const createIngredientList = meal => {

    let ingredientList = ``;
    console.log(meal);

    for (let i = 1; i < 21 ; i++) {
        if (eval('meal.strMeasure' + i) != "" && eval('meal.strMeasure' + i) != " ") {
            const measure = eval('meal.strMeasure' + i);
            const ingredient = eval('meal.strIngredient' + i);
            ingredientList += `<p><i class="fa-solid fa-circle-check"></i> ${measure} ${ingredient}</p>`;
        }
        else{
            break;
        }
    }

    return ingredientList;

}

const showError = () => {

    const errorMessage = document.createElement('h1');
    errorMessage.innerText = 'No recipe found. Please search for another recipe.';
    errorMessage.classList = "text-danger text-center";
    mealsSection.appendChild (errorMessage);

}