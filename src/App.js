import React, { useState, useEffect, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'

//require('dotenv').config()
const App = () => {

	let [coins, setCoins] = useState([])

	let url = "http://localhost:8000"

  // run api call once
	useEffect(() => {
		getCoins()
	}, [])

	const getCoins = () => {
		fetch(url, {
			method: 'GET'
			// credentials: 'omit',
			// redirect: 'follow'
		})
			.then(response => response.json())
			.then((coinData) => {
				coinData = Object.values(coinData)
        // coinData is in array element 1, not 0.
        // 0 has info about your api call
				console.log('this is coin data', coinData[1]);
        setCoins(coinData[1])
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
