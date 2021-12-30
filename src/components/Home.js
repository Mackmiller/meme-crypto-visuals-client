import React, { useState, useEffect } from 'react'
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

    // const navigate = useNavigate();
    
    let [logos, setLogos] = useState([])
    let [ids, setIds] = useState([])
    let [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false);
	let url = "http://localhost:8000"

    // 1
    // run api and store coin data
	useEffect(() => {
        setLoading(true)
        axios.get(url)
            .then(response => {
                const coinData = response.data.data.coins
                setCoins(coinData)
                setLoading(false)
            })
            // .then(newResult=> getIds(newResult))
            // .then(finalResult=>getLogos(finalResult))
            .catch(err => {
                console.log(err)
                setLoading(false);
            })
	}, [url])

    // 2
    useEffect(() => {
        if (coins){
            // coins id data
            const coinIds = coins.map((c, i)=>{
                let id = c.id
                return(
                    {id}
                )
            })
            setIds(coinIds)
            // console.log('this is ids', ids)
        }
    },[coins])

    // 3
    useEffect(() => {
        if(ids){
        // console.log("this is state ids: ", ids)
            ids.map((logoId, i)=>{
                console.log("this is state ids", ids)
                return (
                    axios.get(`${url}/cryptocoin/${logoId.id}`)
                        .then(response => {
                            // let logoLinks = response.data.data[logoId.id].logo
                            let logoLinks = response.data.data[logoId.id]
                            console.log("logoLinks: ", [logoLinks])
                            setLogos(logos=>[...logos, logoLinks])
                            // setLogos(logoLinks)
                            // console.log("here is coin logos state", logos)
                        })
                        .catch(err => console.log(err))
                )
            })
        }
    },[ids, url])
    
    //4
    //map the logos
    const allLinks = 
        logos.map((l, i)=>{
        // console.log(l.id)
            return (
                <li key={i} style={{listStyle: "none", display: "inline"}}>
                    <img src= {l.logo} alt="crypto logo"/>
                </li>
            ) 
        })
    
    // // request to database
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
    // const postFavorite = (c) => {
    //     console.log('Pressed favorite button')
    //     console.log(props.user)
    //     let preJSONBody = {
    //         userId: props.user._id,
    //         name: c.name,
    //         price: c.quote.USD.price,
    //         symbol: c.symbol
    //     }
    //     const requestOptions = {
    //         method: 'POST',
    //         body: JSON.stringify(preJSONBody),
    //         headers: {
    //         'Content-Type': 'application/json',
    //         'Authorization': `Bearer ${props.user.token}`
    //         },
    //     }
    //     // fetch(`http://localhost:8000/favorites/user/${props.user._id}`, requestOptions)
    //     fetch(`http://localhost:8000/favorites`, requestOptions)
    //         .then(postedFavorite=> {
    //             console.log("posted to favorites", postedFavorite)
    //             navigate('/')
    //         })
    //         .catch(err => console.error(err))
    //     }
 
    // coins text data
    const allCoins = coins.map((c, i)=>{
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

    // marketcap data for visual
    const marketCap = coins.map((c, i)=>{
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
            {loading? (
                <div>Loading...</div>
            ) : (
                <div style={{textAlign: "center"}}>
                    {/* <h1 style={{fontSize:"60px"}}>TOP MEME TOKENS AND COINS</h1> */}
                    <div className="subtitle">
                        <h3><strong>An entire category of cryptocurrency is inspired by memes, and it's worth billions of US dollars.</strong></h3>
                        <p>Meme coins and tokens are heavily community-driven, influenced by their current standing within social media channels and general online presence. Below, view the top tokens and coins within the Meme cryptocurrency category, including total market value and volume traded within the past 24 hours.</p>
                     </div>
                    <div className="logo-display">
                        {logos? allLinks : console.log("no data")}
                    </div>
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