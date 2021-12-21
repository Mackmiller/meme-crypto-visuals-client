
const Home = (props) => {

    //returns called array of individual meme coins
    console.log(props.coins)
    const allCoins = props.coins.map((c, i)=>{
        console.log(c.quote.USD.market_cap)
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
    
    

    // const tests = props.coins.coins
    
    // tests.map(test=>{
    //     console.log(test.quote.USD.market_cap)
    // })


	return (
		<div>
			<h1>Top Meme Tokens</h1>
            {allCoins}
		</div>
	)
}

export default Home
