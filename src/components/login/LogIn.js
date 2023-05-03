import React, { useState } from 'react';
import { Row, Col, CardTitle, Form, Card, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Logo from '../images/Logo.png'

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import image from "../images/image.jpg";

const initialFormData = {
	email: "",
	password: ""
}

const Login = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (e) => {
		initialFormData[e.target.name] = e.target.value
		setFormData(initialFormData)
	}

	const registerClick = () => {
		navigate("/register");
	}
	const loginClick = async () => {
		if (formData.email !== "" && formData.password !== "") {
			const response = await fetch(process.env.REACT_APP_API_TOKEN)
			const fetchToken = await response.json()
			let configuration = {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'authorization': 'mysupersecretkey ' + fetchToken.token
				},
				body: JSON.stringify(formData)
			}
			fetch(process.env.REACT_APP_API_USER_LOGIN, configuration)
				.then(res => res.json())
				.then(
					(data) => {
						switch (data[0].access) {
							case "Customer":
								sessionStorage.setItem('userAuth', true)
								sessionStorage.setItem('userAccess', "Customer")
								sessionStorage.setItem('userId', data[0].id)
								sessionStorage.setItem('userFirstName', data[0].firstname)
								sessionStorage.setItem('userLastName', data[0].lastname)
								sessionStorage.setItem('userEmail', formData.email)
								sessionStorage.setItem('userPassword', formData.password)
								navigate("/customerprofile")
								break;
							case "Chef":
								sessionStorage.setItem('userAuth', true)
								sessionStorage.setItem('userAccess', "Chef")
								sessionStorage.setItem('userId', data[0].id)
								sessionStorage.setItem('userFirstName', data[0].firstname)
								sessionStorage.setItem('userLastName', data[0].lastname)
								sessionStorage.setItem('userEmail', formData.email)
								sessionStorage.setItem('userPassword', formData.password)
								navigate("/chef")
								break;
							default:
								sessionStorage.setItem('userAuth', false)
								alert("Authantication Failed")
								navigate("/login")
								break;
						}
					})
				.catch(err => {
					navigate("/login")
				})
		} else {
			const emptyFields = []
			if (formData.email === "") {
				emptyFields.push("Email")
			}
			if (formData.password === "") {
				emptyFields.push("Password")
			}
			alert("Following Fields are empty\n" + emptyFields.join(", "))
		}
	}
	return (
		<>
			<div className="content" style={{ backgroundImage: `url(${image})`, height: "190vh" }}>
				<Row className='mx-5' style={{ alignItems: "center", textAlign: "center", padding: "1vh" }} >
					<Col lg="6" style={{ paddingTop: "15vh" }}>
						<img src={Logo} alt="Logo" style={{ backgroundColor: 'white', height: '30vh', width: '30vh' }} />
						<h2 style={{ fontWeight: "bold", fontSize: "10vh", color: "white" }}>"Get ready to create culinary magic!"</h2>
					</Col>
					<Col lg="6" style={{ paddingTop: "10vh" }}>
						<Row>
							<Card className="my-2">
								<Col lg="12" className="my-2">
									<CardTitle className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh" }}>
										Login to Continue..
									</CardTitle>
								</Col>
								<Form>
									<Row className='mx-1 my-2'>
										<Col md="12">
											<FormGroup>
												<Input
													placeholder='ENTER USERNAME'
													name={"email"}
													type="text"
													autoFocus
													onChange={handleChange}
												>
												</Input>
											</FormGroup>
										</Col>
										<Col md="12">
											<FormGroup>
												<Input
													placeholder='ENTER PASSWORD'
													name={"password"}
													type="password"
													onChange={handleChange}
												>
												</Input>
											</FormGroup>
										</Col>
										<Col md="12" style={{ textAlign: "center", color: "blue" }}>
											<p style={{ cursor: "pointer" }}>Forgot Password?</p>
										</Col>
										<Col md="12" className='my-1'>
											<Button color="dark" onClick={() => loginClick()}>LOG IN</Button>
										</Col>
										<Col md="12" className='my-1'>
											<Button color="dark" onClick={() => registerClick()}>CREATE ACCOUNT</Button>
										</Col>
									</Row>
								</Form>
							</Card>
						</Row>
					</Col>
				</Row>
			</div>
		</>
	);
}

export default Login;
