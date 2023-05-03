import React, { useState, useEffect } from 'react';
import { Row, Col, CardBody, Card, CardHeader, Table, Button } from "reactstrap";

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

import Calendar from './Calender';

import image from "../images/image.jpg";
import imageChef1 from "../images/chef1.jpg";

const ChefProfile = () => {
	const [profileFirstName, setProfileFirstName] = useState("");
	const [profileLastName, setProfileLastName] = useState("");
	const [profileAddress, setProfileAddress] = useState("");
	const [profileContact, setProfileContact] = useState("")
	const [profileSpeciality, setProfileSpeciality] = useState("")
	const [profileOccations, setProfileOccations] = useState("")
	const [profilePrice, setProfilePrice] = useState("")
	const [chefDetails, setChefDetails] = useState([])

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
				body: JSON.stringify({ chefId: sessionStorage.getItem("userId") })
			}
			fetch(process.env.REACT_APP_API_CHEF_AVAILABLE_SLOT_LIST, configuration)
				.then(res => res.json())
				.then(
					(data) => {
						setChefDetails(data)
					}
				)
		}
		functionCall()
	}, [])

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
						setProfileSpeciality(data[0].speciality)
						setProfileOccations(data[0].occations)
						setProfilePrice(data[0].price)
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
	const handleSpecialityChange = (e) => {
		setProfileSpeciality(e.target.value)
	}
	const handleOccationsChange = (e) => {
		setProfileOccations(e.target.value)
	}
	const handlePriceChange = (e) => {
		setProfilePrice(e.target.value)
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
								<input placeholder='ENTER SPECIALITY' type="text" name="speciality" value={profileSpeciality} style={{ width: "80vw", textAlign: "center" }} onChange={handleSpecialityChange} onBlur={handleSave} autoFocus />
								<input placeholder='ENTER OCCATIONS' type="text" name="occations" value={profileOccations} style={{ width: "80vw", textAlign: "center" }} onChange={handleOccationsChange} onBlur={handleSave} autoFocus />
								<input placeholder='ENTER PRICE PER DAY' type="text" name="price" value={profilePrice} style={{ width: "80vw", textAlign: "center" }} onChange={handlePriceChange} onBlur={handleSave} autoFocus />
							</CardBody>
						</Card>
					</Col>
					<Col lg="6">
						<Card className="my-2" style={{ alignItems: "center", textAlign: "center" }}>
							<p className='my-2'>SELECT AVAILABLE TIME SLOTS</p>
							<Calendar />
						</Card>
					</Col>
					<Col lg="6">
						<Table className="table text-light my-2 mx-2" responsive style={{ backgroundImage: 'linear-gradient(to right, #343a40, #6c757d)', textAlign: "center" }}>
							<thead className="text-center">
								<tr>
									<th>SR. NO</th>
									<th>START DATE</th>
									<th>END DATE</th>
								</tr>
							</thead>
							<tbody>
								{chefDetails.map((item, i) => (
									<tr key={i} style={{ fontWeight: "bold" }}>
										<td>{i + 1}</td>
										<td>{item.start}</td>
										<td>{item.end}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</Col>
				</Row>
			</div >
		</>
	);
}

export default ChefProfile;
