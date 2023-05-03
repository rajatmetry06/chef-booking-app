import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './components/dashboard/Chefs';
import ChefBookings from './components/dashboard/ChefBookings';
import CustomerProfile from './components/dashboard/CustomerProfile';
import ChefProfile from './components/dashboard/ChefProfile';
import BookingHistory from './components/dashboard/BookingHistory';
import ChefBookingHistory from './components/dashboard/ChefBookingHistory';
import Login from './components/login/LogIn';
import Register from './components/login/Register';
import LoginCheck from './components/dashboard/LoginCheck'

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
							<Route path="/" element={<LoginCheck />} />
							<Route path="/customerprofile" element={<Dashboard />} />
							<Route path="/chef" element={<ChefBookings />} />
							<Route path="/profile" element={<CustomerProfile />} />
							<Route path="/chefprofile" element={<ChefProfile />} />
							<Route path="/bookinghistory" element={<BookingHistory />} />
							<Route path="/chefbookinghistory" element={<ChefBookingHistory />} />
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
