import {
  Typography,
  Paper,
} from "@mui/material";


function convertQty(qty, fromUnit, toUnit) {

  const amount = Number(qty) || 0;


  const units = {
    "كيلو": 1,
    "KG": 1,

    "جرام": 0.001,
    "GRAM": 0.001,

    "جم": 0.001,

    "لتر": 1,
    "LITER": 1,

    "مل": 0.001,

    "قطعة": 1,
    "PIECE": 1,
  };


  if (!units[fromUnit] || !units[toUnit]) {
    return amount;
  }


  return (
    amount * units[fromUnit]
  ) / units[toUnit];

}



function RecipeSummary({
  items,
  outputQty,
}) {


  const totalCost = items.reduce(
    (sum, item) => {


      const qtyInBase = convertQty(
        item.qty,
        item.unit,
        "KG"
      );


      return sum +
        (
          Number(qtyInBase) *
          Number(item.cost || 0)
        );


    },
    0
  );



  const unitCost =
    Number(outputQty) > 0
      ? totalCost / Number(outputQty)
      : 0;



  return (

    <Paper
      sx={{
        padding: 3,
        marginTop: 3,
        direction: "rtl",
      }}
    >

      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        ملخص التكلفة
      </Typography>


      <Typography>
        إجمالي تكلفة الوصفة:
        {" "}
        {totalCost.toFixed(2)}
        {" "}
        جنيه
      </Typography>


      <Typography>
        تكلفة وحدة الإنتاج:
        {" "}
        {unitCost.toFixed(2)}
        {" "}
        جنيه
      </Typography>


    </Paper>

  );

}


export default RecipeSummary;