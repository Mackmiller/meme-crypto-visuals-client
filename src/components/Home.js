const Home = (props) => {

    //returns called array of individual meme coins
    // console.log(props.coins.coins)

    // return 1 individual meme coin name from array
    // console.log(props.coins.coins[0].name)

	return (
		<div>
            <h1>{props.coins.name} Tokens</h1>
            <ul>{ 
                props.coins.coins.map(coin=>{
                    //console.log("this is coin name", coin.name)
                    return <li>{coin.name}</li>
                })
            }</ul>
		</div>
	)
}

export default Home
