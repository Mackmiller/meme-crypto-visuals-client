import React, { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
  } from "recharts";
const axios = require('axios')
const Home = () => {
    
    let [market, setMarket] = useState([])
    let [coins, setCoins] = useState([])
	let url = "http://localhost:8000"

  // run api call once
	useEffect(() => {
        axios.get(url)
            .then(response => {
                const coinData = response.data.data.coins
                // console.log('this is coin data', coinData);
                setCoins(coinData)
            })
            .catch(err => console.log(err))
	}, [])

    // coins text data
    const allCoins = coins.map((c, i)=>{
        return (
            <li key={i} style={{listStyle: "none"}}>
                <div className="allCoins">
                    <div className="coinInfo">
                        <h1>{c.name}</h1>
                        <div>Price: $ {c.quote.USD.price}</div>
                        <div>Circulating Supply: {c.circulating_supply} {c.symbol}</div>
                    </div>
                </div>
            </li>
        ) 
    })

    // marketcap data for visual
    const marketCap = coins.map((c, i)=>{
        // establishing each key/value pair:
        const name = c.name
        const symbol = c.symbol
        const capacity = c.quote.USD.market_cap;
        const updated = c.quote.USD.last_updated;
        return (
            {name, capacity, updated, symbol}
        ) 
    })
    console.log("this is market cap data", marketCap)

      // 24h volume data for visual
      const dailyVolume = coins.map((c, i)=>{
        // establishing each key/value pair:
        const name = c.name
        const symbol = c.symbol
        const volume = c.quote.USD.volume_24h;
        const updated = c.quote.USD.last_updated;
        return (
            {name, symbol, volume, updated}
        ) 
    })
    // console.log("this is 24h volume data", dailyVolume)

	return (
        <div>
            <div>
                <h1>Top Meme Tokens</h1>
                {allCoins}
            </div>
            {/* <ResponsiveContainer> */}
                <BarChart
                    width={1000}
                    height={500}
                    data={marketCap}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 200,
                        bottom: 5
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="symbol" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="capacity" fill="#8884d8" />
                </BarChart>
            {/* </ResponsiveContainer> */}
        </div>
	)
}

export default Home
