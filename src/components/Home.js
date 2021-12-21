import React, { useState, useEffect } from 'react'
const axios = require('axios')
const Home = () => {
    
    let [coins, setCoins] = useState()
	let url = "http://localhost:8000"

  // run api call once
	useEffect(() => {
        axios.get(url)
            .then(response => {
                const coinData = response.data.data.coins
                console.log('this is coin data', coinData);
                setCoins(coinData)
            })
            .catch(err => console.log(err))
	}, [url])

    const allCoins = 
        coins.map((c, i)=>{
        // e.preventDefault()
        return (
            <li key={i} style={{listStyle: "none"}}>
                <div className="allCoins">
                    <div className="coinInfo">
                        <h1>{c.name}</h1>
                        <div>Market Cap: $ {c.quote.USD.market_cap}</div>
                        <div>Price: $ {c.quote.USD.price}</div>
                        <div>Circulating Supply: {c.circulating_supply} {c.symbol}</div>
                    </div>
                </div>
            </li>
        ) 
    })

	return (
		<div>
			<h1>Top Meme Tokens</h1>
            {allCoins}
		</div>
	)
}

export default Home
