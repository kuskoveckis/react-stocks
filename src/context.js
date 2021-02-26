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

const getLocalStorageCash = () => {
  let cash = localStorage.getItem("portfolio_cash");
  if (cash) {
    return (cash = JSON.parse(localStorage.getItem("portfolio_cash")));
  } else {
    return 50000;
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
  logo: "",
  buy: {},
  sell: {},
  cash: getLocalStorageCash(),
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const quote = (symbol) => {
    dispatch({ type: "LOADING" });
    dispatch({ type: "QUOTE_SYMBOL", payload: symbol });
  };

  const buy = (symbol, amount) => {
    // dispatch({ type: "LOADING" });
    amount = parseInt(amount);
    const buy_request = {
      symbol,
      amount,
    };
    dispatch({ type: "BUY_REQUEST", payload: buy_request });
  };

  const stockBuy = async () => {
    try {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${state.buy.symbol}/quote?token={}`);
      const data = await response.json();
      const logo_response = await fetch(`https://cloud.iexapis.com/stable/stock/${state.buy.symbol}/logo?token={} `);
      const logo = await logo_response.json();
      const date = new Date();
      let newId = date.getTime().toString();
      const portfolioItem = {
        id: newId,
        date: date,
        symbol: data.symbol,
        name: data.companyName,
        price: data.latestPrice,
        shares: state.buy.amount,
        logo: logo.url,
        action: "buy",
      };
      const stockTotal = data.latestPrice * state.buy.amount;
      let newCash = state.cash - stockTotal;
      newCash = parseFloat(newCash.toFixed(2));
      dispatch({ type: "HISTORY", payload: portfolioItem });
      dispatch({ type: "BUY_UPDATE_PORTFOLIO", payload: [portfolioItem, newCash] });
    } catch (error) {
      console.log(error);
    }
  };

  const sell = (symbol, amount) => {
    // dispatch({ type: "LOADING" });
    amount = parseInt(amount);
    const sell_request = {
      symbol,
      amount,
    };
    dispatch({ type: "SELL_REQUEST", payload: sell_request });
  };

  const stockSell = async () => {
    try {
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${state.sell.symbol}/quote?token={}`);
      const data = await response.json();
      const date = new Date();
      let newId = date.getTime().toString();
      const portfolioItem = {
        id: newId,
        date: date,
        symbol: data.symbol,
        name: data.companyName,
        price: data.latestPrice,
        shares: state.sell.amount,
        action: "sell",
      };
      dispatch({ type: "HISTORY", payload: portfolioItem });
      dispatch({ type: "SELL_UPDATE_PORTFOLIO", payload: data });
    } catch (error) {
      console.log(error);
    }
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
      dispatch({ type: "RENDER" });
      dispatch({ type: "LOADING" });
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${state.quoteSymbol}/news/last/3?token={}`);
      const data = await response.json();
      dispatch({ type: "STOCK_NEWS", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FINISHED_LOADING" });
    }
  };

  const stockIntradayPrice = async () => {
    try {
      dispatch({ type: "RENDER" });
      dispatch({ type: "LOADING" });
      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${state.quoteSymbol}/chart/30d?token={}`);
      const data = await response.json();
      console.log(data);
      dispatch({ type: "STOCK_INTRADAY", payload: data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "FINISHED_LOADING" });
    }
  };

  useEffect(() => {
    if (state.quoteSymbol) {
      // stockQuote();
      // stockIntradayPrice();
      // stockNews();
      console.log("Stock quote fired");
    }
  }, [state.quoteSymbol]);

  useEffect(() => {
    if (Object.keys(state.buy).length > 0) {
      stockBuy();
    }
  }, [state.buy]);

  useEffect(() => {
    if (Object.keys(state.sell).length > 0) {
      stockSell();
    }
  }, [state.sell]);

  useEffect(() => {
    localStorage.setItem("stocks_portfolio", JSON.stringify(state.portfolio));
  }, [state.portfolio]);

  useEffect(() => {
    localStorage.setItem("portfolio_history", JSON.stringify(state.history));
  }, [state.history]);

  useEffect(() => {
    localStorage.setItem("portfolio_cash", JSON.stringify(state.cash));
  }, [state.cash]);

  return <AppContext.Provider value={{ ...state, quote, buy, sell }}>{children}</AppContext.Provider>;
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
