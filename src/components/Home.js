import React, { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    LineChart,
    Line,
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

    // custom tooltip
    // const CustomTooltip = ({ active, payload, label }) => {
    //     if (active && payload && payload.length) {
    //       return (
    //         <div className="custom-tooltip">
    //           <p className="label">{`${marketCap.name}`}</p>
    //           <p className="intro">{`Market Value : $ ${marketCap.capacity}`}</p>
    //           <p className="desc">Anything you want can be displayed here.</p>
    //         </div>
    //       );
    //     }
      
    //     return null;
    //   };

	return (
        <div>
            <div>
                <h1>Top Meme Tokens</h1>
                {allCoins}
            </div>
          
            <BarChart
                width={1000}
                height={350}
                data={marketCap}
                margin={{
                    top: 5,
                    right: 30,
                    left: 200,
                    bottom: 5
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" style={{fontSize: "10px"}}/>
                <YAxis type="number"
                            domain={[1, "auto"]}
                            scale="log"
                            orientation="left"
                            name="Market Capacity"/>
                <Tooltip labelFormatter={(name) => 'Name: '+name} formatter={(capacity) =>'(Total Market Value) $'+capacity} />
                <Legend />
                <Bar dataKey="capacity" fill="#8884d8" />
            </BarChart>
                {/* <LineChart
                    width={500}
                    height={300}
                    data={marketCap}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="symbol" />
                    <YAxis type="number"
                            domain={[1, "auto"]}
                            scale="log"
                            orientation="left"/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="capacity" stroke="#8884d8" activeDot={{ r: 8 }} />
                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                {/* </LineChart> */} 
      
           
        </div>
	)
}

export default Home
