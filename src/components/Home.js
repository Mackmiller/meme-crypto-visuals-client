import React, { useState, useEffect } from 'react'
const axios = require('axios')
const Home = () => {
    
    let [coins, setCoins] = useState([])
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

    // coins visuals data
    const coinVisuals = coins.map((c, i)=>{
        // array test:
        // let newArray = []
        // newArray.push([c.quote.USD.market_cap])

        // object creating for each key/value pair:
        const cap = c.quote.USD.market_cap;
        const updated = c.quote.USD.last_updated;
        const capAndUpdated = {updated, cap};
        console.log(capAndUpdated)



        // console.log(newArray)
        return (
            <li key={i} style={{listStyle: "none"}}>
                <div className="coinVisuals">
                    <div className="coinData">
                        <h1>{c.name}</h1>
                        <div>Last Updated: {c.quote.USD.last_updated}</div>
                        <div>Market Cap: $ {c.quote.USD.market_cap}</div>
                        <div>24 Hour Volume $ {c.quote.USD.volume_24h}</div>
                    </div>
                </div>
            </li>
        ) 
    })

	return (
		<div>
			<h1>Top Meme Tokens</h1>
            {allCoins}
            {/* {coinVisuals} */}
		</div>
	)
}

export default Home
