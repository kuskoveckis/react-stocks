const reducer = (state, action) => {
  if (action.type === "QUOTE_SYMBOL") {
    return { ...state, quoteSymbol: action.payload };
  }
  if (action.type === "STOCK_QUOTE") {
    return { ...state, quote: action.payload };
  }
  // if (action.type === "STOCK_QUOTE_FAIL") {
  //   return { ...state, quote: action.payload[0], quoteSymbol: action.payload[1] };
  // }
  if (action.type === "STOCK_NEWS") {
    return { ...state };
  }
  if (action.type === "STOCK_INTRADAY") {
    return { ...state };
  }
};

export default reducer;
