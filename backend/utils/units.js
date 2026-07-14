const UNIT_GROUPS = {

  WEIGHT: {
    "KG": 1,
    "GRAM": 0.001,
    "كيلو": 1,
    "كجم": 1,
    "جرام": 0.001,
    "جم": 0.001,
  },


  VOLUME: {
    "LITER": 1,
    "لتر": 1,
    "ML": 0.001,
    "مل": 0.001,
  },


  PIECE: {
    "PIECE": 1,
    "قطعة": 1,
  }

};



function getUnitValue(unit) {

  for (const group of Object.values(UNIT_GROUPS)) {

    if (group[unit] !== undefined) {

      return {
        group,
        value: group[unit],
      };

    }

  }


  return null;

}



export function convertQty(qty, fromUnit, toUnit) {


  const amount = Number(qty) || 0;


  if (!fromUnit || !toUnit) {

    return amount;

  }



  if (fromUnit === toUnit) {

    return amount;

  }



  const from = getUnitValue(fromUnit);

  const to = getUnitValue(toUnit);



  if (!from || !to) {

    return amount;

  }



  // منع تحويل الوزن إلى الحجم أو العكس

  if (from.group !== to.group) {

    return amount;

  }



  const base = amount * from.value;


  return base / to.value;


}



export function getUnitLabel(unit, labels) {

  const found = labels.find(
    item => item.value === unit
  );


  return found ? found.label : unit;

}