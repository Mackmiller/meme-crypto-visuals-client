import React, { useState, useEffect, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
const axios = require('axios')
//require('dotenv').config()
const App = () => {

	let [coins, setCoins] = useState()

	let url = "http://localhost:8000"

  // run api call once
	useEffect(() => {
		getCoins()
	}, [])

	const getCoins = () => {
		axios.get(url)
			.then(response => {
				const coinData = response.data.data.coins
        // coinData is in array element 1, not 0.
        // 0 has info about your api call
				console.log('this is coin data', coinData);
        setCoins(coinData)
			})
			.catch(err => console.log(err))
	}

	return (
		<Fragment>
			<Routes>
				<Route
					path='/'
					element={
							<Home coins={coins}/>
					}
				/>
			</Routes>
		</Fragment>
	)
}

export default App
