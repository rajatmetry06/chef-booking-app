import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate()

	useEffect(() => {
		switch (sessionStorage.getItem('userAccess')) {
			case "Customer":
				navigate("/bookinghistory")
				break;
			case "Chef":
				navigate("/chefbookinghistory")
				break;
			default:
				sessionStorage.setItem('userAuth', false)
				navigate("/login")
				break;
		}
	}, [navigate]);

	return (
		<div>
			{/* Your homepage content goes here */}
		</div>
	);
};

export default HomePage;