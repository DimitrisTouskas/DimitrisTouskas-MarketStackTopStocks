import React, { useEffect, useState } from "react";
import "./Prices.css"
//import Task from "./Task";
import { Task } from './Task';;
//import "./Prices.css"



export default function StockPrices() {
  const symbols = Task();
  const symbolsSubset = symbols.slice(0, 3);
  const URL = `https://api.marketstack.com/v1/intraday/latest?access_key=01d6c2bcbee61513edbb9add41b3c1ae&symbols=${symbolsSubset.join(",")}`;
  
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    async function fetchDatas() {
      try {
        const response = await fetch(URL);
        if (!response.ok) {
          throw new Error('Error');
        }
        const data = await response.json();
        const closeValues = data.data.map(eod => eod.close);
        const highValues = data.data.map(eod => eod.high);
        const lowValues = data.data.map(eod => eod.low);
        const symbolValues = data.data.map(eod => eod.symbol);
        setPrices({
          close: closeValues,
          high: highValues,
          low: lowValues,
          symbol: symbolValues
        })
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchDatas();
  }, [URL]);
  

  let sortedPrices = {};
  if (prices.close && prices.close.length > 0) {
    const indices = prices.close.map((_, i) => i);
    indices.sort((a, b) => prices.close[b] - prices.close[a]);

    sortedPrices = {
      close: indices.map(i => prices.close[i]),
      high: indices.map(i => prices.high[i]),
      low: indices.map(i => prices.low[i]),
      symbol: indices.map(i => prices.symbol[i])
    };
  }
  console.log(sortedPrices, "prices");

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Close</th>
            <th>High</th>
            <th>Low</th>
          </tr>
        </thead>
        <tbody>
          {sortedPrices.close && sortedPrices.close.length > 0 && symbolsSubset.map((symbol, index) => (
            <tr key={index}>
              <td>{sortedPrices.symbol[index]}</td>
              <td>${sortedPrices.close[index]}</td>
              <td>${sortedPrices.high[index]}</td>
              <td>${sortedPrices.low[index]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
