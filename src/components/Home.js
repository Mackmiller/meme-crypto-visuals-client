const Home = (props) => {

    //returns called array of individual meme coins
    // console.log(props.coins.coins)

    // return 1 individual meme coin name from array
    // console.log(props.coins.coins[0].name)

    // return the name of each coin using map
    const names = props.coins.coins.map(coin=>{
        // console.log("this is coin name and circulating supply", coin.name, coin.total_supply)
        return <li>{coin.name}, $ {coin.total_supply}</li>
    })

	return (
		<div>
			<h1>Hello</h1>
            <h1>{props.coins.name} Tokens</h1>
            <ul>{names}</ul>
		</div>
	)
}

export default Home
