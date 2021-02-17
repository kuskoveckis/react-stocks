import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const getLocalStoragePortfolio = () => {
  let portfolio = localStorage.getItem("stocks_portfolio");
  if (portfolio) {
    return (portfolio = JSON.parse(localStorage.getItem("stocks_portfolio")));
  } else {
    return [];
  }
};

const getLocalStorageHistory = () => {
  let portfolio_history = localStorage.getItem("portfolio_history");
  if (portfolio_history) {
    return (portfolio_history = JSON.parse(localStorage.getItem("portfolio_history")));
  } else {
    return [];
  }
};

const initialState = {
  alert: { show: false, severity: "", title: "", msg: "" },
  error: false,
  loading: true,
  portfolio: getLocalStoragePortfolio(),
  history: getLocalStorageHistory(),
  quote: [],
  buy: false,
  sell: false,
  stock_total: 0,
  portfolio_total: 0,
  initial_value: 15000,
};

// const fetchData = async () => {
//   const response = await fetch("https://cloud.iexapis.com/stable/stock/aapl/quote?token={}");
//   const data = await response.json();
//   console.log(data);
// };

// useEffect(() => {
//   fetchData();
// }, []);

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
