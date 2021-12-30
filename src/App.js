
import React, { useState, Fragment, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import '../src/index.css'

import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import Home from './components/Home'
import Favorites from './components/Favorites'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'

const App = () => {

	const [user, setUser] = useState(null)
	const [foundFavorites, setFoundFavorites] = useState({})
	const [msgAlerts, setMsgAlerts] = useState([])

	// useEffect that runs when user state changes
	// Only runs getFavorites
	useEffect(()=>{
		const getFavorites = () => {
			if(user){
				fetch(`http://localhost:8000/favorites/user/${user._id}`)
				.then(res => res.json())
				.then(foundObject => {
					console.log("this is found object: ", foundObject)
					setFoundFavorites(foundObject)
				})
				.catch(err => console.log('THIS IS ERR',err))
			}
		}
		getFavorites()
	}, [user])
  
	console.log('user in app', user)
	console.log('message alerts', msgAlerts)
	const clearUser = () => {
	  console.log('clear user ran')
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

	  	// Function that when called get the users favorites based on user's Id
	// This function sets the found data from the call to our foundProfile state
	// Passed to components to ensure user state in App.js stats up to date


  
		  return (
			  <Fragment>
				  <Header user={user} />
				  <Routes>
					  <Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					  <Route path='/favorites' element={<Favorites msgAlert={msgAlert} user={user} favorites={foundFavorites}/>} />
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
