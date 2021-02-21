const reducer = (state, action) => {
  if (action.type === "RENDER") {
    return { ...state, render: true };
  }
  if (action.type === "LOADING") {
    return { ...state, isLoading: true };
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
  // if (action.type === "STOCK_QUOTE_FAIL") {
  //   return { ...state, quote: action.payload[0], quoteSymbol: action.payload[1] };
  // }
  if (action.type === "STOCK_NEWS") {
    return { ...state, news: action.payload, isLoading: false };
  }
  if (action.type === "STOCK_INTRADAY") {
    return { ...state, intradayData: action.payload, isLoading: false };
  }
};

export default reducer;
