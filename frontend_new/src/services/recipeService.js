import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";

export async function getRecipes() {
  return apiGet("/recipes");
}

export async function getRecipe(id) {
  return apiGet(`/recipes/${id}`);
}

export async function addRecipe(recipe) {
  return apiPost("/recipes", {
    productId: recipe.productId,
    outputQty: recipe.outputQty,
    outputUnit: recipe.outputUnit,
    notes: recipe.notes,
    items: recipe.items.map((item) => ({
      materialId: item.materialId,
      qty: item.qty,
      unit: item.unit,
    })),
  });
}

export async function updateRecipe(recipe) {
  return apiPut(`/recipes/${recipe.id}`, {
    productId: recipe.productId,
    outputQty: recipe.outputQty,
    outputUnit: recipe.outputUnit,
    notes: recipe.notes,
    items: recipe.items.map((item) => ({
      materialId: item.materialId,
      qty: item.qty,
      unit: item.unit,
    })),
  });
}

export async function deleteRecipe(id) {
  return apiDelete(`/recipes/${id}`);
}
