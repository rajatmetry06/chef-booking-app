import React, { useState } from 'react';
import { Row, Col, CardTitle, Form, Card, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import image from "../images/image.jpg";

const initialFormData = {
	access: "",
	firstname: "",
	lastname: "",
	email: "",
	password: "",
	confirmpassword: ""
}

const Login = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (e) => {
		if (e.target === undefined) {
			initialFormData[e.name] = e.value
		} else {
			initialFormData[e.target.name] = e.target.value
		}
		setFormData(initialFormData)
	}

	const registrationClick = async () => {
		if (formData.access !== "" && formData.firstname !== "" && formData.lastname !== "" && formData.email !== "" && formData.password !== "" && formData.confirmpassword !== "") {
			if (formData.password === formData.confirmpassword) {
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
				fetch(process.env.REACT_APP_API_USER_REGISTRATION, configuration)
					.then(res => res.json())
					.then(
						(data) => {
							if (data.affectedRows === undefined) {
								alert(data)
								navigate("/login")
							} else {
								navigate("/login")
							}
						})
					.catch(err => {
						navigate("/register")
					})
			} else {
				alert("Password doesn't match")
			}
		} else {
			const emptyFields = []
			if (formData.access === "") {
				emptyFields.push("Access")
			}
			if (formData.firstname === "") {
				emptyFields.push("First Name")
			}
			if (formData.lastname === "") {
				emptyFields.push("last Name")
			}
			if (formData.email === "") {
				emptyFields.push("Email")
			}
			if (formData.password === "") {
				emptyFields.push("Password")
			}
			if (formData.confirmpassword === "") {
				emptyFields.push("Confirm Password")
			}
			alert("Following Fields are empty\n" + emptyFields.join(", "))
		}
	}

	const loginClick = () => {
		navigate("/login")
	}
	return (
		<>
			<div className="content" style={{ backgroundImage: `url(${image})`, height: "240vh" }}>
				<Row className='mx-5'>
					<Col lg="6" style={{ paddingTop: "20vh" }}>
						<h2 style={{ fontWeight: "bold", fontSize: "10vh", textAlign: "center", color: "white" }}>"Ready to spice things up?<br></br>Register now!"</h2>
					</Col>
					<Col lg="6" style={{ paddingTop: "15vh" }}>
						<Row>
							<Card className="my-2">
								<Col lg="12" className="my-2">
									<CardTitle className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh" }}>
										Register to be part of the community
									</CardTitle>
								</Col>
								<Form>
									<Row className='mx-1 my-2' style={{ textAlign: "center" }}>
										<Col md="12">
											<FormGroup>
												<Select
													placeholder={"SELECT ACCESS TYPE"}
													options={[
														{ name: 'access', value: 'Customer', label: 'CUSTOMER' },
														{ name: 'access', value: 'Chef', label: 'CHEF' }
													]}
													maxMenuHeight={220}
													onChange={handleChange}
												/>
											</FormGroup>
										</Col>
										<Col md="6">
											<FormGroup>
												<Input
													placeholder='ENTER FIRST NAME'
													name={"firstname"}
													type="text"
													autoFocus
													onChange={handleChange}
												>
												</Input>
											</FormGroup>
										</Col>
										<Col md="6">
											<FormGroup>
												<Input
													placeholder='ENTER LAST NAME'
													name={"lastname"}
													type="text"
													onChange={handleChange}
												>
												</Input>
											</FormGroup>
										</Col>
										<Col md="12">
											<FormGroup>
												<Input
													placeholder='ENTER EMAIL ID'
													name={"email"}
													type="email"
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
										<Col md="12">
											<FormGroup>
												<Input
													placeholder='CONFIRM PASSWORD'
													name={"confirmpassword"}
													type="password"
													onChange={handleChange}
												>
												</Input>
											</FormGroup>
										</Col>
										<Col md="12" className='my-1'>
											<Button color="dark" onClick={() => registrationClick()}>REGISTER</Button>
										</Col>
										<Col md="12" className='my-1'>
											<Button color="dark" type="submit" onClick={() => loginClick()}>LOG IN</Button>
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
