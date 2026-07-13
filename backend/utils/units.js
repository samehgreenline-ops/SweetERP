const WEIGHT_UNITS = ["KG", "GRAM"];

const TO_BASE = {
  KG: 1,
  GRAM: 0.001,
  LITER: 1,
  PIECE: 1,
};

export function convertQty(qty, fromUnit, toUnit) {
  const amount = Number(qty) || 0;

  if (!fromUnit || !toUnit || fromUnit === toUnit) {
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
  const found = labels.find((item) => item.value === unit);
  return found ? found.label : unit;
}
