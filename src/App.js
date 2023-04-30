import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/dashboard/Chefs';
import UserProfile from './components/dashboard/UserProfile';
import ChefHistory from './components/dashboard/ChefHistory';
import Login from './components/login/LogIn';
import Register from './components/login/Register';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<>
			<BrowserRouter>
				<div style={{
					backgroundImage: "linear-gradient(to right, white, lightgray)",
					fontFamily: "sans-serif",
					minHeight: "100vh", maxHeight: "100vh"
				}}>
					<div>
						<Routes>	
							<Route path="/" element={<Dashboard />} />
							<Route path="/profile" element={<UserProfile />} />
							<Route path="/chefhistory" element={<ChefHistory />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter >
		</>
	);
}

export default App;
