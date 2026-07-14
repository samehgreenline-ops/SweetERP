const WEIGHT_UNITS = [
  "KG",
  "GRAM",
  "كيلو",
  "كجم",
  "جرام",
  "جم"
];


const TO_BASE = {

  KG: 1,
  GRAM: 0.001,

  "كيلو": 1,
  "كجم": 1,
  "جرام": 0.001,
  "جم": 0.001,

  LITER: 1,
  PIECE: 1,
  "لتر": 1,
  "مل": 0.001,

};


export function convertQty(qty, fromUnit, toUnit) {

  const amount = Number(qty) || 0;


  if (!fromUnit || !toUnit) {
    return amount;
  }


  if (fromUnit === toUnit) {
    return amount;
  }


  const fromIsWeight = WEIGHT_UNITS.includes(fromUnit);
  const toIsWeight = WEIGHT_UNITS.includes(toUnit);


  if (fromIsWeight && toIsWeight) {

    const base = amount * TO_BASE[fromUnit];

    return base / TO_BASE[toUnit];

  }


  return amount;

}



export function getUnitLabel(unit, labels) {

  const found = labels.find(
    (item) => item.value === unit
  );

  return found ? found.label : unit;

}