import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Row, Col, CardTitle, Card, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from "reactstrap";

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

import image from "../images/image.jpg";
import imageChef4 from "../images/chef4.jpg";

const dateFormat = () => {
	var date = new Date()
	var day = ('0' + date.getDate()).slice(-2)
	var month = ('0' + (date.getMonth() + 1)).slice(-2)
	var year = date.getFullYear()
	return year + "-" + month + "-" + day
}

const initialBookingData = {
	bookingDate: "",
	bookingPurpose: "",
	customerId: sessionStorage.getItem("userId"),
	chefId: ""
}

const Login = (args) => {
	const [modal, setModal] = useState(false);
	const [chefDetails, setChefDetails] = useState([])
	const [modalDetails, setModalDetails] = useState({})
	const [date, setDate] = useState(dateFormat())
	const [bookingData, setBookingData] = useState(initialBookingData);

	const handleBookingChange = (e) => {
		if (e.target === undefined) {
			initialBookingData[e.name] = e.value
		} else {
			initialBookingData[e.target.name] = e.target.value
		}
		setBookingData(initialBookingData)
	}

	const bookingClick = async () => {
		bookingData['bookingDate'] = bookingData['bookingDate'] === "" ? sessionStorage.getItem("dateSelected") : bookingData['bookingDate']
		bookingData['chefId'] = modalDetails.id
		if (bookingData.bookingDate !== "" && bookingData.bookingPurpose !== "") {
			const response = await fetch(process.env.REACT_APP_API_TOKEN)
			const fetchToken = await response.json()
			let configuration = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': 'mysupersecretkey ' + fetchToken.token
				},
				body: JSON.stringify(bookingData)
			}
			fetch(process.env.REACT_APP_API_CHEF_BOOKING, configuration)
				.then(res => res.json())
				.then(
					(data) => {
						alert("Booking Request send successfully")
						toggle()
					})
				.catch(err => {
					toggle()
				})
		} else {
			const emptyFields = []
			if (bookingData.bookingDate === "") {
				emptyFields.push("Booking Date")
			}
			if (bookingData.bookingPurpose === "") {
				emptyFields.push("Booking Purpose")
			}
			alert("Following Fields are empty\n" + emptyFields.join(", "))
		}
	}

	useEffect(() => {
		const functionCall = async () => {
			sessionStorage.setItem("dateSelected", date)
			const response = await fetch(process.env.REACT_APP_API_TOKEN)
			const fetchToken = await response.json()
			let configuration = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': 'mysupersecretkey ' + fetchToken.token
				},
				body: JSON.stringify({ date: date })
			}
			fetch(process.env.REACT_APP_API_CHEF_AVAILABILITY, configuration)
				.then(res => res.json())
				.then(
					(data) => {
						setChefDetails(data)
					}
				)
		}
		functionCall()
	}, [date])
	const toggle = () => setModal(!modal);
	const cardClick = (content) => {
		setModalDetails(content)
		toggle()
	}
	const handleChange = (e) => {
		let dateSelected = new Date(e.target.value) < new Date() ? dateFormat() : e.target.value
		setDate(dateSelected)
	}
	return (
		<>
			<Navbar />
			<Modal isOpen={modal} toggle={toggle} {...args}>
				<ModalHeader toggle={toggle}>{modalDetails.firstname === undefined ? modalDetails.firstname : modalDetails.firstname.toUpperCase()} {modalDetails.lastname === undefined ? modalDetails.lastname : modalDetails.lastname.toUpperCase()}</ModalHeader>
				<ModalBody>
					<p>Speciality:</p>
					<h5>{modalDetails.speciality}</h5>
					<p>Occations:</p>
					<h5>{modalDetails.occations}</h5>
					<p>Address:</p>
					<h5>{modalDetails.address}</h5>
					<p>Ratings:</p>
					<h5>{modalDetails.ratings}</h5>
					<p>Price:</p>
					<h5>{modalDetails.price}/-</h5>
				</ModalBody>
				<ModalFooter>
					<Input
						name={"bookingDate"}
						type="date"
						defaultValue={sessionStorage.getItem("dateSelected")}
						onChange={handleBookingChange}
						style={{ width: "55%" }}
					>
					</Input>
					<Select
						placeholder={"SELECT PURPOSE"}
						options={[
							{ name: 'bookingPurpose', value: 'House Party', label: 'House Party' },
							{ name: 'bookingPurpose', value: 'Reception', label: 'Reception' }
						]}
						maxMenuHeight={220}
						onChange={handleBookingChange}
						style={{ width: "20%" }}
					/>
					<Button color="success" onClick={() => { bookingClick() }}>
						REQUEST APPOINTMENT
					</Button>{' '}
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<div className="content" style={{ backgroundImage: `url(${image})`, height: "180vh", paddingTop: "7.5vh" }}>
				<Row className='mx-2'>
					<Col lg="12" className="my-2">
						<Input type='date' style={{ width: "14vw", float: "right" }} onChange={handleChange} defaultValue={dateFormat()}></Input>
					</Col>
					{chefDetails.map((item, i) => (
						<Col key={i} lg="3" className="my-2">
							<Card style={{ minHeight: "20vh", alignItems: "center", textAlign: "center", padding: "1vh" }} onClick={() => cardClick(item)}>
								<img src={imageChef4} alt='chef1' style={{ maxHeight: "30vh", maxWidth: "30vh" }}></img>
								<CardHeader className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "3vh", width: "100%" }}>
									{item.firstname === undefined ? item.firstname : item.firstname.toUpperCase()} {item.lastname === undefined ? item.lastname : item.lastname.toUpperCase()}
								</CardHeader>
								<CardTitle>
									{item.speciality === null ? "NA" : item.speciality}
								</CardTitle>
								<CardTitle>
									{item.address === null ? "NA" : item.address}
								</CardTitle>
							</Card>
						</Col>
					))}
				</Row>
			</div >
		</>
	);
}

export default Login;
