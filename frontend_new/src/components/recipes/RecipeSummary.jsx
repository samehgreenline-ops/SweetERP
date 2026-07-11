import {
  Box,
  Typography,
  Paper,
} from "@mui/material";


function RecipeSummary({
  items,
  outputQty,
}) {


  const totalCost = items.reduce(
    (sum, item) =>
      sum + (Number(item.qty) * Number(item.cost)),
    0
  );


  const unitCost =
    outputQty > 0
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