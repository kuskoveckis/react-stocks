const reducer = (state, action) => {
  if (action.type === "RENDER") {
    return { ...state, render: true };
  }
  if (action.type === "LOADING") {
    return { ...state, isLoading: true };
  }
  if (action.type === "ALERT") {
    switch (action.payload) {
      case "buy":
        return { ...state, alert: { show: true, severity: "success", title: "Transaction complete", msg: "Your purchase added to your portfolio " } };
      case "sell":
        return { ...state, alert: { show: true, severity: "success", title: "Transaction complete", msg: "Stock sold " } };
      case "incorrect_symbol":
        return { ...state, alert: { show: true, severity: "error", title: "Incorrect symbol", msg: "Please try again with correct stock symbol" } };
      case "amount_error":
        return { ...state, alert: { show: true, severity: "error", title: "Incorrect amount", msg: "Please specify number of shares" } };
      case "cash":
        return { ...state, alert: { show: true, severity: "error", title: "Not enough cash!", msg: "Please specify number of shares" } };
      case "sell_error":
        return { ...state, alert: { show: true, severity: "error", title: "Incorrect amount", msg: "You don not own specified amount of shares!" } };
      case "reset":
        return { ...state, alert: { show: false, severity: "", title: "", msg: "" } };
      default:
        return { ...state, alert: { show: false, severity: "", title: "", msg: "" } };
    }
  }
  if (action.type === "QUOTE_SYMBOL") {
    return { ...state, quoteSymbol: action.payload, isLoading: false, render: false };
  }
  if (action.type === "STOCK_QUOTE") {
    return {
      ...state,
      stock_quote_data: action.payload[0],
      quoteSymbol: action.payload[1],
      isLoading: false,
    };
  }
  if (action.type === "STOCK_NEWS") {
    return { ...state, news: action.payload, isLoading: false };
  }
  if (action.type === "STOCK_INTRADAY") {
    return { ...state, intradayData: action.payload, isLoading: false };
  }
  if (action.type === "BUY_REQUEST") {
    return { ...state, buy: action.payload };
  }
  if (action.type === "SELL_REQUEST") {
    return { ...state, sell: action.payload };
  }
  if (action.type === "BUY_UPDATE_PORTFOLIO") {
    const test = state.portfolio.find((stock) => stock.symbol === action.payload[0].symbol);
    if (state.portfolio.length > 0) {
      const newPortfolio = state.portfolio.map((stock) => {
        if (stock.symbol.toLowerCase() === action.payload[0].symbol.toLowerCase()) {
          return { ...stock, shares: stock.shares + action.payload[0].shares, price: action.payload[0].price };
        }
        return stock;
      });
      if (test) {
        return {
          ...state,
          portfolio: [...newPortfolio],
          buy: {},
          cash: action.payload[1],
        };
      }
      return {
        ...state,
        portfolio: [...newPortfolio, action.payload[0]],
        buy: {},
        cash: action.payload[1],
      };
    }
    return {
      ...state,
      portfolio: [...state.portfolio, action.payload[0]],
      buy: {},
      cash: action.payload[1],
    };
  }
  if (action.type === "SELL_UPDATE_PORTFOLIO") {
    let sell_total = state.sell.amount * action.payload.latestPrice;
    let newCash = state.cash + sell_total;
    newCash = parseFloat(newCash.toFixed(2));

    const updatedPortfolio = [];
    state.portfolio.forEach((stock) => {
      if (stock.symbol.toLowerCase() === state.sell.symbol.toLowerCase()) {
        if (stock.shares > state.sell.amount) {
          updatedPortfolio.push({ ...stock, shares: stock.shares - state.sell.amount });
        }
      } else {
        updatedPortfolio.push(stock);
      }
    });
    return { ...state, portfolio: updatedPortfolio, cash: newCash, sell: {} };
  }
  if (action.type === "HISTORY") {
    return { ...state, history: [...state.history, action.payload] };
  }
  if (action.type === "FIN_NEWS") {
    return { ...state, financialNews: action.payload };
  }
};

export default reducer;
