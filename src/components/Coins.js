

const Coins = (props) => {

    //returns called array of individual meme coins
    // if (props.coins) {
    //      let newArray = props.coins.coins
    //      // return the name of each coin using map
    //     newArray.map(coin=>{
    //          console.log("this is coin name and circulating supply", coin.name, coin.circulating_supply, coin.symbol)
    //         //  return <li>{coin.name}, {coin.circulating_supply} {coin.symbol}</li>
    //      })
    // }

    // return 1 individual meme coin name from array
    // console.log(props.coins.coins[0].name)


    // // playing around with market cap object
    // const test = props.coinsProp.coins.map(test=>{
    //     console.log(test.quote.USD.market_cap)
    // })



	return (
		<div>
			<h1>{props.title}</h1>
		</div>
	)
}

export default Coins
