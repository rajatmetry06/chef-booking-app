import React from 'react';
import { Row, Col, CardTitle, Form, Card, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Logo from '../dashboard/Logo.png'

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import image from "./image.jpg";

const Login = () => {
	const navigate = useNavigate()
	const registerClick = () => {
		navigate("/register");
	}
	const loginClick = () => {
		navigate("/");
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
													name={"username"}
													type="text"
													autoFocus
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
												>
												</Input>
											</FormGroup>
										</Col>
										<Col md="12" style={{ textAlign: "center", color: "blue" }}>
											<p style={{ cursor: "pointer" }}>Forgot Password?</p>
										</Col>
										<Col md="12" className='my-1'>
											<Button color="dark" type="submit" onClick={() => loginClick()}>LOG IN</Button>
										</Col>
										<Col md="12" className='my-1'>
											<Button color="dark" type="submit" onClick={() => registerClick()}>CREATE ACCOUNT</Button>
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
