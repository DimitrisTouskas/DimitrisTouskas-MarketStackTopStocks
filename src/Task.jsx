import React, { useEffect, useState } from "react";

//export const symbols = Task();
export  function Task() {
  const URL ="https://api.marketstack.com/v1/tickers?access_key=01d6c2bcbee61513edbb9add41b3c1ae";
  const [symbols, setSymbols] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const extractedSymbols = data.data.map(item => item.symbol);
        setSymbols(extractedSymbols);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  //console.log(symbols, "symbols");

  return symbols;
}






//http://api.marketstack.com/v1/tickers?access_key=1cdd2b792d00ade04ea7f1d2864ff902

//http://api.marketstack.com/v1/eod/latest?access_key=1cdd2b792d00ade04ea7f1d2864ff902&symbols=AAPL