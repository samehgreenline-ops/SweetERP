const KEY = "sweeterp_items";


export function getItems() {
  const data = localStorage.getItem(KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}


export function saveItems(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}


export function addItem(item) {
  const items = getItems();

  const newItem = {
    id: Date.now(),
    active: true,
    trackInventory: true,
    ...item,
  };

  items.push(newItem);

  saveItems(items);

  return newItem;
}


export function updateItem(updatedItem) {

  const items = getItems();

  const newItems = items.map(item =>
    item.id === updatedItem.id
      ? updatedItem
      : item
  );

  saveItems(newItems);

  return updatedItem;
}


export function deleteItem(id) {

  const items = getItems();

  const newItems = items.filter(
    item => item.id !== id
  );

  saveItems(newItems);
}


export const ITEM_TYPES = [
  {
    value: "RAW_MATERIAL",
    label: "خامة"
  },
  {
    value: "FINISHED_PRODUCT",
    label: "منتج نهائي"
  },
  {
    value: "SEMI_FINISHED",
    label: "نصف مصنع"
  },
  {
    value: "PACKAGING",
    label: "عبوة"
  },
  {
    value: "SERVICE",
    label: "خدمة"
  }
];


export const UNITS = [
  {
    value: "KG",
    label: "كيلوجرام"
  },
  {
    value: "GRAM",
    label: "جرام"
  },
  {
    value: "LITER",
    label: "لتر"
  },
  {
    value: "PIECE",
    label: "قطعة"
  }
];