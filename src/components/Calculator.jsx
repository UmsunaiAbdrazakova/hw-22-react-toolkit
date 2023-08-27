import React, { useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import { create, all } from "mathjs";

const math = create(all);

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonClick = (value) => {
    setInput(input + value);
  };

  const handleCalculate = () => {
    try {
      const calculatedResult = math.evaluate(input);
      setResult(calculatedResult.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setInput("");
    setResult("");
  };

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "4",
    "5",
    "6",
    "*",
    "1",
    "2",
    "3",
    "-",
    "0",
    ".",
    "+",
  ];

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <TextField
          value={input}
          variant="outlined"
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={1}>
          {buttons.map((value) => (
            <Grid key={value} item xs={3}>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => handleButtonClick(value)}
              >
                {value}
              </Button>
            </Grid>
          ))}
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth onClick={handleCalculate}>
              =
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" fullWidth onClick={handleClear}>
              C
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
        <TextField
          value={result}
          variant="outlined"
          fullWidth
          InputProps={{ readOnly: true }}
        />
      </Grid>
    </Grid>
  );
};

export default Calculator;
