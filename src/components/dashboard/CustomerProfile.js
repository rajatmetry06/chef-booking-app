import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody, Card, CardHeader } from "reactstrap";

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

import image from "../images/image.jpg";
import imageChef1 from "../images/chef1.jpg";

const Login = () => {
	const [profileFirstName, setProfileFirstName] = useState("");
	const [profileLastName, setProfileLastName] = useState("");
	const [profileAddress, setProfileAddress] = useState("");
	const [profileContact, setProfileContact] = useState("")

	useEffect(() => {
		const functionCall = async () => {
			const response = await fetch(process.env.REACT_APP_API_TOKEN)
			const fetchToken = await response.json()
			let configuration = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': 'mysupersecretkey ' + fetchToken.token
				},
				body: JSON.stringify({ id: sessionStorage.getItem("userId") })
			}
			fetch(process.env.REACT_APP_API_USER_DETAILS, configuration)
				.then(res => res.json())
				.then(
					(data) => {
						setProfileFirstName(data[0].firstname.toUpperCase())
						setProfileLastName(data[0].lastname.toUpperCase())
						setProfileAddress(data[0].address)
						setProfileContact(data[0].contact)
					}
				)
				.catch(
					(error) => {
						console.log(error)
					}
				)
		}
		functionCall()
	}, [])

	const handleFirstNameChange = (e) => {
		setProfileFirstName(e.target.value)
	};
	const handleLastNameChange = (e) => {
		setProfileLastName(e.target.value)
	};
	const handleAddressChange = (e) => {
		setProfileAddress(e.target.value)
	};
	const handleContactChange = (e) => {
		setProfileContact(e.target.value)
	}
	const handleSave = async (e) => {
		if (e.target.value !== "") {
			const response = await fetch(process.env.REACT_APP_API_TOKEN)
			const fetchToken = await response.json()
			let configuration = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': 'mysupersecretkey ' + fetchToken.token
				},
				body: JSON.stringify({
					id: sessionStorage.getItem("userId"),
					fieldname: e.target.name,
					fieldvalue: e.target.value
				})
			}
			fetch(process.env.REACT_APP_API_CHEF_PROFILE_UPDATE, configuration)
				.then(res => res.json())
				.then(
					(data) => {
						console.log(data)
					}
				)
		}
	};
	return (
		<>
			<Navbar />
			<div className="content" style={{ backgroundImage: `url(${image})`, height: "180vh", paddingTop: "7.5vh" }}>
				<Row className='mx-5'>
					<Col lg="12" className="my-2">
						<Card className="my-2" style={{ minHeight: "20vh", alignItems: "center", textAlign: "center", padding: "1vh" }}>
							<img src={imageChef1} alt='chef1' style={{ maxHeight: "30vh", maxWidth: "30vh" }}></img>
							<CardHeader className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh", width: "100%" }}>
								<input disabled type="text" name="name" value={profileFirstName} style={{ width: "40vw", textAlign: "center" }} onChange={handleFirstNameChange} onBlur={handleSave} autoFocus />
								<input disabled type="text" name="name" value={profileLastName} style={{ width: "40vw", textAlign: "center" }} onChange={handleLastNameChange} onBlur={handleSave} autoFocus />
							</CardHeader>
							<CardBody>
								<input placeholder='ENTER ADDRESS' type="text" name="address" value={profileAddress} style={{ width: "80vw", textAlign: "center" }} onChange={handleAddressChange} onBlur={handleSave} autoFocus />
								<input placeholder='ENTER CONTACT NUMBER' type="text" name="contact" value={profileContact} style={{ width: "80vw", textAlign: "center" }} onChange={handleContactChange} onBlur={handleSave} autoFocus />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div >
		</>
	);
}

export default Login;
