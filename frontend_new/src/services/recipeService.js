const KEY = "sweeterp_recipes";


export function getRecipes() {

  const data = localStorage.getItem(KEY);

  return data
    ? JSON.parse(data)
    : [];

}



export function saveRecipes(recipes) {

  localStorage.setItem(
    KEY,
    JSON.stringify(recipes)
  );

}



export function addRecipe(recipe) {

  const recipes = getRecipes();


  const newRecipe = {

    id: Date.now(),

    ...recipe,

  };


  saveRecipes([
    ...recipes,
    newRecipe,
  ]);


  return newRecipe;

}