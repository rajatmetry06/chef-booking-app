import React, { useState } from 'react';
import { Row, Col, CardTitle, Card, CardHeader, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

import image from "../dashboard/image.jpg";
import imageChef1 from "../dashboard/chef1.jpg";
import imageChef2 from "../dashboard/chef2.jpg";
import imageChef3 from "../dashboard/chef3.jpg";
import imageChef4 from "../dashboard/chef4.jpg";

const Login = (args) => {
	const [modal, setModal] = useState(false);

	const toggle = () => setModal(!modal);
	return (
		<>
			<Navbar />
			<Modal isOpen={modal} toggle={toggle} {...args}>
				<ModalHeader toggle={toggle}>CHEF NAME</ModalHeader>
				<ModalBody>
					<p>Speciality:</p>
					<h5>Indian, Chinese</h5>
					<p>Occations:</p>
					<h5>Birthdays, Anniversary, House Parties</h5>
					<p>Address:</p>
					<h5>795 Folsom Ave, Suite 600 San Francisco, CADGE 94107</h5>
					<p>Ratings:</p>
					<h5>5 stars</h5>
					<p>Price:</p>
					<h5>15000/-</h5>
				</ModalBody>
				<ModalFooter>
					<Button color="success">
						REQUEST APPOINTMENT
					</Button>{' '}
					<Button color="secondary" onClick={toggle}>
						Cancel
					</Button>
				</ModalFooter>
			</Modal>
			<div className="content" style={{ backgroundImage: `url(${image})`, height: "180vh", paddingTop: "7.5vh" }}>
				<Row className='mx-2'>
					<Col lg="3" className="my-2">
						<Card className="my-2" style={{ minHeight: "20vh", alignItems: "center", textAlign: "center", padding: "1vh" }} onClick={toggle}>
							<img src={imageChef1} alt='chef1' style={{ maxHeight: "30vh", maxWidth: "30vh" }}></img>
							<CardHeader className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh", width: "100%" }}>
								CHEF NAME
							</CardHeader>
							<CardTitle>
								Indian, Chinese
							</CardTitle>
							<CardTitle>
								795 Folsom Ave, Suite 600 San Francisco, CADGE 94107
							</CardTitle>
						</Card>
					</Col>
					<Col lg="3" className="my-2">
						<Card className="my-2" style={{ minHeight: "20vh", alignItems: "center", textAlign: "center", padding: "1vh" }} onClick={toggle}>
							<img src={imageChef2} alt='chef1' style={{ maxHeight: "30vh", maxWidth: "30vh" }}></img>
							<CardHeader className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh", width: "100%" }}>
								CHEF NAME
							</CardHeader>
							<CardTitle>
								Indian, Chinese
							</CardTitle>
							<CardTitle>
								795 Folsom Ave, Suite 600 San Francisco, CADGE 94107
							</CardTitle>
						</Card>
					</Col>
					<Col lg="3" className="my-2">
						<Card className="my-2" style={{ minHeight: "20vh", alignItems: "center", textAlign: "center", padding: "1vh" }} onClick={toggle}>
							<img src={imageChef3} alt='chef1' style={{ maxHeight: "30vh", maxWidth: "30vh" }}></img>
							<CardHeader className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh", width: "100%" }}>
								CHEF NAME
							</CardHeader>
							<CardTitle>
								Indian, Chinese
							</CardTitle>
							<CardTitle>
								795 Folsom Ave, Suite 600 San Francisco, CADGE 94107
							</CardTitle>
						</Card>
					</Col>
					<Col lg="3" className="my-2">
						<Card className="my-2" style={{ minHeight: "20vh", alignItems: "center", textAlign: "center", padding: "1vh" }} onClick={toggle}>
							<img src={imageChef4} alt='chef1' style={{ maxHeight: "30vh", maxWidth: "30vh" }}></img>
							<CardHeader className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh", width: "100%" }}>
								CHEF NAME
							</CardHeader>
							<CardTitle>
								Indian, Chinese
							</CardTitle>
							<CardTitle>
								795 Folsom Ave, Suite 600 San Francisco, CADGE 94107
							</CardTitle>
						</Card>
					</Col>
					<Col lg="3" className="my-2">
						<Card className="my-2" style={{ minHeight: "20vh", alignItems: "center", textAlign: "center", padding: "1vh" }} onClick={toggle}>
							<img src={imageChef1} alt='chef1' style={{ maxHeight: "30vh", maxWidth: "30vh" }}></img>
							<CardHeader className="text-center card-layout" style={{ fontWeight: "bold", fontSize: "4vh", width: "100%" }}>
								CHEF NAME
							</CardHeader>
							<CardTitle>
								Indian, Chinese
							</CardTitle>
							<CardTitle>
								795 Folsom Ave, Suite 600 San Francisco, CADGE 94107
							</CardTitle>
						</Card>
					</Col>
				</Row>
			</div >
		</>
	);
}

export default Login;
