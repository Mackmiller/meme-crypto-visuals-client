
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import '../src/index.css'

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import Favorites from './components/Favorites'
import CoinInfo from './components/CoinInfo'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import apiUrl from './apiConfig'
const axios = require('axios')

const App = () => {

	const [user, setUser] = useState(null)
	const [foundFavorites, setFoundFavorites] = useState({})
	const [msgAlerts, setMsgAlerts] = useState([])

	let [logos, setLogos] = useState([])
    let [ids, setIds] = useState([])
    let [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false);

    // -------- USE EFFECTS -----------

    // 1: run coinmarketcap api and store coin data
	useEffect(() => {
        setLoading(true)
		// OLD promise chain
        // axios.get(apiUrl)
        //     .then(response => {
        //         const coinData = response.data.data.coins
        //         setCoins(coinData)
        //         setLoading(false)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         setLoading(false);
        //     })

		// REFACTORED async/await with try/catch block
		const getCoinData = async () => {
			try {
				const resp = await axios.get(apiUrl)
				const data = await resp.data.data.coins
				setCoins(data)
				setLoading(false)
			} catch(error) {
				console.log(error)
				setLoading(false)
			}
		}
		// call async/await function
		getCoinData()
	}, [apiUrl])

    // 2: from the coins state set in step 1, take coin ids and save to another state, ids
    useEffect(() => {
        if (coins){
            const coinIds = coins.map((c, i)=>{
                let id = c.id
                return(
                    {id}
                )
            })
            setIds(coinIds)
        }
    },[coins])

    // 3: from the ids state set in step 2, use coinmarketcap api to get coin images
    // this is in a completely separate part of the coinmarketcap api from the info grabbed in step 1
    useEffect(() => {
        if(ids){
            ids.map((logoId, i)=>{
                // console.log("this is state ids", ids)
                return (
                    axios.get(`${apiUrl}/cryptocoin/${logoId.id}`)
                        .then(response => {
                            let logoLinks = response.data.data[logoId.id]
                            // console.log("logoLinks: ", [logoLinks])
                            setLogos(logos=>[...logos, logoLinks])
                        })
                        .catch(err => console.log(err))
                )
            })
        }
    },[ids, apiUrl])

	// useEffect that runs when user state changes
	// Gets user's favorites from database for favorite.js prop
	// run when there is a user logged in
	useEffect(()=>{
		getFavorites()
	}, [user])
	// this function is not included inside useEffect because it needs to be passed as a prop.
	const getFavorites = () => {
		if(user){
			axios.get(`${apiUrl}/favorites/user/${user._id}`)
				.then(res => res.json())
				.then(foundObject => {
					console.log("this is found object: ", foundObject)
					setFoundFavorites(foundObject)
				})
				.catch(err => console.log('THIS IS ERR',err))
		}
	}
  
	// console.log('user in app', user)
	// console.log('message alerts', msgAlerts)
	const clearUser = () => {
	//   console.log('clear user ran')
	  setUser(null)
	}
  
	const deleteAlert = (id) => {
		setMsgAlerts((prevState) => {
			return (prevState.filter((msg) => msg.id !== id) )
		})
	}

	const msgAlert = ({ heading, message, variant }) => {
		const id = uuid()
		setMsgAlerts(() => {
			return (
				[{ heading, message, variant, id }]
	)
		})
	}
  
	return (
		<Fragment>
			<Header user={user} />
			<Routes>
				<Route path='/' element={<Home msgAlert={msgAlert} user={user} coins={coins} logos={logos} ids={ids} loading={loading}/>} />
				<Route path='/favorites' element={<Favorites msgAlert={msgAlert} user={user} favorites={foundFavorites} getFavorites = {getFavorites}/>} />
				<Route path='/coin-info' element={<CoinInfo msgAlert={msgAlert} user={user} coins={coins} logos={logos} ids={ids} loading={loading}/>} />

				<Route
					path='/sign-up'
					element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
					path='/sign-in'
					element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
				/>
				<Route
				path='/sign-out'
				element={
					<RequireAuth user={user}>
					<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
					</RequireAuth>
				}
				/>
				<Route
				path='/change-password'
				element={
					<RequireAuth user={user}>
					<ChangePassword msgAlert={msgAlert} user={user} />
					</RequireAuth>}
				/>
			</Routes>
			{msgAlerts.map((msgAlert) => (
				<AutoDismissAlert
					key={msgAlert.id}
					heading={msgAlert.heading}
					variant={msgAlert.variant}
					message={msgAlert.message}
					id={msgAlert.id}
					deleteAlert={deleteAlert}
				/>
			))}
		</Fragment>
	)
  }
  
  export default App
