import React, { useEffect, useState } from "react";


export  function Task() {
  const URL ="https://api.marketstack.com/v1/tickers?access_key=01d6c2bcbee61513edbb9add41b3c1ae";
  const [symbols, setSymbols] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Error');
        }
        const data = await response.json();
        const extractedSymbols = data.data.map(item => item.symbol);
        setSymbols(extractedSymbols);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);

  console.log(symbols, "symbols");

  return symbols;
}
