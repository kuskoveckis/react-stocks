import React from "react";
import { AreaChart, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Tooltip, Area } from "recharts";
import { Typography } from "@material-ui/core";
import { useGlobalContext } from "../context";

// Generate Sales Data

function createData(time, price) {
  return { time, price };
}

const StockQuoteChart = () => {
  const { intradayData } = useGlobalContext();
  const newData = intradayData.map((item) => {
    return createData(item.date, item.close);
  });
  console.log(newData);
  return (
    <React.Fragment>
      <Typography variant="h5" align="center">
        Price chart
      </Typography>
      <ResponsiveContainer>
        <AreaChart
          data={newData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle", fill: "black" }}>
              Price per share ($)
            </Label>
          </YAxis>
          <CartesianGrid stroke="#ccc" />
          <Tooltip />
          <Area type="monotone" dataKey="price" stroke="#82ca9d" fillOpacity={0.6} fill="#82ca9d" />
        </AreaChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
};

export default StockQuoteChart;
