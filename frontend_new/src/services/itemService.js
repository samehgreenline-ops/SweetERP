import { apiGet, apiPost, apiPut, apiDelete } from "./api.js";

export { ITEM_TYPES, UNITS } from "../utils/constants.js";

export async function getItems() {
  return apiGet("/items");
}

export async function getItem(id) {
  return apiGet(`/items/${id}`);
}

export async function addItem(item) {
  return apiPost("/items", {
    name: item.name,
    code: item.code,
    item_type: item.itemType,
    base_unit: item.baseUnit,
    purchase_price: item.purchasePrice,
    sale_price: item.salePrice,
    active: item.active,
    track_inventory: item.trackInventory,
    stock_qty: item.stockQty,
    reorder_level: item.reorderLevel,
    notes: item.notes,
  });
}

export async function updateItem(item) {
  return apiPut(`/items/${item.id}`, {
    name: item.name,
    code: item.code,
    item_type: item.itemType,
    base_unit: item.baseUnit,
    purchase_price: item.purchasePrice,
    sale_price: item.salePrice,
    active: item.active,
    track_inventory: item.trackInventory,
    stock_qty: item.stockQty,
    reorder_level: item.reorderLevel,
    notes: item.notes,
  });
}

export async function deleteItem(id) {
  return apiDelete(`/items/${id}`);
}