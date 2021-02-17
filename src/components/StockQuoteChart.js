import React from "react";
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid } from "recharts";
import { Typography } from "@material-ui/core";

// Generate Sales Data
function createDatax(time, amount) {
  return { time, amount };
}

const datax = [
  createDatax("00:00", 0),
  createDatax("03:00", 300),
  createDatax("06:00", 600),
  createDatax("09:00", 800),
  createDatax("10:00", 500),
  createDatax("12:00", 1500),
  createDatax("15:00", 1000),
  createDatax("18:00", 2800),
  createDatax("21:00", 2100),
  createDatax("24:00", undefined),
];

const StockQuoteChart = () => {
  return (
    <React.Fragment>
      <Typography variant="h5" align="center">
        Intraday Prices
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={datax}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke="#000000de" />
          <YAxis stroke="#000000de">
            <Label angle={270} position="left" style={{ textAnchor: "middle", fill: "blue" }}>
              Price per share ($)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#8884d8" dot={false} />
          <CartesianGrid stroke="#ccc" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default StockQuoteChart;
