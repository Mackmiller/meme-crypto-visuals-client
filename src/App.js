
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'

//require('dotenv').config()
const App = () => {

	return (
		
			<Routes>
				<Route
					path='/'
					element={
							<Home />
					}
				/>
			</Routes>
		
	)
}

export default App
