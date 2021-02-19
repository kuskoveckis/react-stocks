import React, { useContext, useReducer, useEffect, useState } from "react";
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
  isLoading: false,
  render: false,
  portfolio: getLocalStoragePortfolio(),
  history: getLocalStorageHistory(),
  quoteSymbol: "",
  stock_quote_data: {},
  news: [],
  intradayData: [],
  stock_total: 0,
  portfolio_total: 0,
  cash: 15000,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const quote = (symbol) => {
    dispatch({ type: "LOADING" });
    dispatch({ type: "QUOTE_SYMBOL", payload: symbol });
  };

  const stockQuote = async () => {
    try {
      dispatch({ type: "RENDER" });
      dispatch({ type: "LOADING" });
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${state.quoteSymbol}/quote?token={}`);
      const data = await response.json();
      // if (data) {
      //   const newId = new Date().getTime().toString(0);
      //   const quoteData = {
      //     id: newId,
      //     symbol: data.symbol,
      //     name: data.companyName,
      //     price: data.latestPrice,
      //   };
      //   dispatch({ type: "STOCK_QUOTE", payload: quoteData });
      // } else {
      //   const newData = [];
      //   const updateQuoteSymbol = [];
      //   console.log("test test test");
      //   dispatch({ type: "STOCK_QUOTE_FAIL", payload: { newData, updateQuoteSymbol } });
      // }
      const reset = "";
      dispatch({ type: "STOCK_QUOTE", payload: [data, reset] });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FINISHED_LOADING" });
    }
  };

  const stockNews = async () => {
    try {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${state.quoteSymbol}/news/last/3?token={}`);
      const data = await response.json();
      dispatch({ type: "STOCK_NEWS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const stockIntradayPrice = async () => {
    try {
      const response = await fetch("https://cloud.iexapis.com/stable/stock/aapl/intraday-prices?token={}");
      const data = await response.json();
      dispatch({ type: "STOCK_INTRADAY", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (state.quoteSymbol) {
      stockQuote();
      stockNews();
    }
  }, [state.quoteSymbol]);

  return <AppContext.Provider value={{ ...state, quote }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
