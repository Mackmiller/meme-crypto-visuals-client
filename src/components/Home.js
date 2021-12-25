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
    
    let [ids, setIds] = useState([])
    let [coins, setCoins] = useState([])
	let url = "http://localhost:8000"

  // run api and store coin data
	useEffect(() => {
        axios.get(url)
            .then(response => {
                const coinData = response.data.data.coins
                // console.log('this is coin data', coinData);
                setCoins(coinData)
            })
            .catch(err => console.log(err))
	}, [])

    // once coindata state has been set, store coin ids and run api for logo images
    useEffect(() => {
        // coins id data
        const coinIds = coins.map((c, i)=>{
            let id = c.id
            return(
                {id}
            )
        })
        setIds(coinIds)
    }, [coins])


    // once id state has been set, get logo images
    useEffect(() => {
        console.log("this is id state 0", ids[0].id)
        // coins id data
        axios.get(`${url}/cryptocoin/${ids[0].id}`)
            .then(response => {
                console.log("this is the response",response.data.data)
            })
            .catch(err => console.log(err))
        
    }, [ids])

    // coins text data
    const allCoins = coins.map((c, i)=>{
        return (
            <li key={i} style={{listStyle: "none"}} className="coin-list-items">
                <div className="all-coins">
                    <div className="coin-info">
                        <h3><strong>{c.name}</strong></h3>
                        <div><strong>Price:</strong> $ {c.quote.USD.price}</div>
                        <div><strong>Circulating Supply:</strong> {(c.circulating_supply).toLocaleString("en-US")} {c.symbol}</div>
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
        const capacity = c.quote.USD.market_cap
        const volume = c.quote.USD.volume_24h;
        const updated = c.quote.USD.last_updated;
        return (
            {name, capacity, volume, updated, symbol}
        ) 
    })
    //console.log("this is market cap data", marketCap)

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
        <div style={{textAlign: "center"}}>
            <h1>TOP MEME TOKENS AND COINS</h1>
            <div className="visualization-display">
                <h3>Total Market Value (USD) of Circulating Supply and Volume Traded in Past 24hrs</h3>
                <ResponsiveContainer width="95%" height={400}>
                    <BarChart
                        width={1000}
                        height={350}
                        data={marketCap}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 150,
                            bottom: 5
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" style={{fontSize: "12px"}}/>
                        <YAxis type="number"
                                style={{fontSize: "12px"}}
                                domain={[1, "auto"]}
                                scale="log"
                                orientation="left"
                                tickFormatter={tick => {
                                    return `$${tick.toLocaleString()}`;
                                }}
                        />
                        <Tooltip labelFormatter={(name) => 'Name: '+name} formatter={(capacity) =>'$'+capacity.toLocaleString("en-US")} />
                        <Legend />
                        <Bar name="Market Capacity" dataKey="capacity" fill="#B48DD8" />
                        <Bar name="Volume Traded (24h)" dataKey="volume" fill="#694BA0" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="stats-display">
                {allCoins}
            </div>
        </div>
	)
}

export default Home
