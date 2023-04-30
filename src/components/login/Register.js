import React from 'react';
import { Row, Col, CardTitle, Form, Card, FormGroup, Input, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Select from 'react-select';

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import image from "./image.jpg";

const Login = () => {
	const navigate = useNavigate()
	const loginClick = () => {
		navigate("/");
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
														{ value: 'Customer', label: 'CUSTOMER' },
														{ value: 'Chef', label: 'CHEF' }
													]}
													maxMenuHeight={220}
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
										<Col md="12">
											<FormGroup>
												<Input
													placeholder='CONFIRM PASSWORD'
													name={"confirmpassword"}
													type="password"
												>
												</Input>
											</FormGroup>
										</Col>
										<Col md="12" className='my-1'>
											<Button color="dark" type="submit" onClick={() => loginClick()}>REGISTER</Button>
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
