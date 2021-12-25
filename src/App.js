
import { Route, Routes } from 'react-router-dom'
import '../src/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
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
