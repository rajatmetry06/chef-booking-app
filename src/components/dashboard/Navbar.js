import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import logo from './Logo.png'
import { AiOutlineMenu } from "react-icons/ai";

import TypingEffect from './TypingEffect';

function DispNavbar() {
	const navigate = useNavigate()
	const [isOpen, setIsopen] = useState(false);

	const ToggleSidebar = () => {
		isOpen === true ? setIsopen(false) : setIsopen(true);
	}
	const dashboardClick = () => {
		setIsopen(false)
		navigate("/")
	}
	const profileClick = () => {
		setIsopen(false)
		navigate("/profile")
	}
	const historyClick = () => {
		setIsopen(false)
		navigate("/chefhistory")
	}
	const signoutClick = () => {
		setIsopen(false)
		// sessionStorage.setItem('authantication', false)
		navigate("/login")
	}
	return (
		<>
			<Navbar bg="shade1" variant="shade1" sticky="top" expand="lg" style={{ backgroundImage: 'linear-gradient(to right, #343a40, #8B0000)', position: "fixed", width: "100%" }}>
				<Navbar.Brand>
					<img src={logo} alt="Logo" style={{ backgroundColor: 'white', height: '6vh', marginRight: '1.5vh', marginLeft: '1.5vh', cursor: "pointer" }} onClick={() => dashboardClick()} />
				</Navbar.Brand>
				<div onClick={ToggleSidebar} style={{ cursor: "pointer" }}>
					<AiOutlineMenu size={45}
						style={{
							color: "white",
							padding: "1.5vh"
						}}
					/>
				</div>
				<Navbar.Collapse className="justify-content-end">
					<Navbar.Text style={{ color: 'rgb(231, 246, 242)', fontWeight: 'bold', fontSize: '2.5vh', marginRight: '1.5vh', marginLeft: '1.5vh', fontFamily: "Trebuchet MS" }}>
						<TypingEffect />
					</Navbar.Text>
				</Navbar.Collapse>
			</Navbar>

			<div className="container-fluid mt-3">
				<div className={`sidebar ${isOpen === true ? 'active' : ''}`}>
					<div className="sd-body" style={{ paddingTop: "12vh" }}>
						<ul>
							<li><button className="sd-link" style={{ border: "none", cursor: 'pointer' }} onClick={() => dashboardClick()}>DASHBOARD</button></li>
							<li><button className="sd-link" style={{ border: "none", cursor: 'pointer' }} onClick={() => profileClick()}>PROFILE</button></li>
							<li><button className="sd-link" style={{ border: "none", cursor: 'pointer' }} onClick={() => historyClick()}>HISTORY</button></li>
							<li><button className="sd-link bg-secondary text-light" style={{ border: "none", cursor: 'pointer' }} onClick={() => signoutClick()}>SIGN OUT</button></li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}
export default DispNavbar;