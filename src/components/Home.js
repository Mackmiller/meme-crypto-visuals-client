import React from 'react'
// import { useNavigate } from 'react-router-dom'
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

import apiUrl from '../apiConfig'

const axios = require('axios')

const buttonStyling = {
    color: "gold",
    backgroundColor: "black",
    fontWeight: "bold",
    padding: "10px",
    marginTop: "10px"
}
const Home = (props) => {
    
    // using the logo urls passed as props, map the logos into JSX list items
    // const allLinks = 
    //     props.logos.map((l, i)=>{
    //     // console.log(l.id)
    //         return (
    //             <div className="col">
    //                 <Card style={{minWidth: "400px"}}>
    //                     <li key={i} style={{listStyle: "none", display: "inline"}}>
    //                         <img src= {l.logo} alt="crypto logo"/>
    //                         <h4>{l.name}</h4>
    //                         <Card.Body>{l.description}</Card.Body>
    //                     </li>
    //                 </Card>
    //             </div>
    //         ) 
    //     })

    // add coin to favorites database on button click
    const postFavorite = (c) => {
        // console.log('Pressed favorite button')
        // console.log(props.user)
        return axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.user.token}`
            },
            url: apiUrl + '/favorites',
            data: {
                favorite: {
                    userId: props.user._id,
                    name: c.name,
                    price: c.quote.USD.price,
                    symbol: c.symbol
                },
		    },
        })
    }
 
    // 1: display text data for coins
    const allCoins = props.coins.map((c, i)=>{
        return (
            <li key={i} style={{listStyle: "none"}} className="coin-list-items">
                <div className="all-coins">
                    <div className="coin-info">
                        <h3 id="name"><strong>{c.name}</strong></h3>
                        <div id="price"><strong>Price:</strong> $ {c.quote.USD.price}</div>
                        <div id="symbol"><strong>Circulating Supply:</strong> {(c.circulating_supply).toLocaleString("en-US")} {c.symbol}</div>
                        <div id="coinButton">
                            <button className="button" onClick={() => postFavorite(c)} style={buttonStyling}>Track this Coin</button>
                        </div>
                    </div>
                </div>
            </li>
        ) 
    })

    // 2: establish coin state data needed for chart
    const marketCap = props.coins.map((c, i)=>{
        // establishing each key/value pair:
        const name = c.name
        const symbol = c.symbol
        const cap = c.quote.USD.market_cap
        const volume = c.quote.USD.volume_24h;
        const updated = c.quote.USD.last_updated;
        return (
            {name, cap, volume, updated, symbol}
        ) 
    })
    //console.log("this is market cap data", marketCap)

	return (
        <>
            {props.loading? (
                <div>Loading...</div>
            ) : (
                <div style={{textAlign: "center"}}>
                 
                    {/* <div className="row">
                        {props.logos? allLinks : console.log("no data")}
                    </div> */}
                    <div className="visualization-display">
                        <h3>Total Market Value (USD) of Circulating Supply and Volume Traded in Past 24hrs</h3>
                        <div className="subtitle">
                            <p>Meme coins and tokens are heavily community-driven, influenced by their current standing within social media channels and general online presence. Below, view the top tokens and coins within the Meme cryptocurrency category, including total market value and volume traded within the past 24 hours.</p>
                        </div>
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
                                <Bar name="Market Capitalization" dataKey="cap" fill="#B48DD8" />
                                <Bar name="Volume Traded (24h)" dataKey="volume" fill="#694BA0" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="stats-display">
                        {allCoins}
                    </div>
                </div>
            )}
        </>
	)
}

export default Home