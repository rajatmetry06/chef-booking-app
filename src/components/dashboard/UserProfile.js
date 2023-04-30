import React, { useState } from 'react';
import { Row, Col, CardBody, Card, CardHeader } from "reactstrap";

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

import image from "../dashboard/image.jpg";
import imageChef1 from "../dashboard/chef1.jpg";

function EditableLabel(props) {
	const [isEditing, setIsEditing] = useState(false);
	const [text, setText] = useState(props.text);

	const handleLabelClick = () => {
		setIsEditing(true);
	};

	const handleInputChange = (event) => {
		setText(event.target.value);
	};

	const handleInputBlur = () => {
		setIsEditing(false);
		props.onSave(text);
	};

	return (
		<div>
			{isEditing ? (
				<input type="text" value={text} style={{ width: "85vw", textAlign: "center" }} onChange={handleInputChange} onBlur={handleInputBlur} autoFocus />
			) : (
				<label onClick={handleLabelClick} style={{ cursor: "pointer" }}>{text}</label>
			)}
		</div>
	);
}

const Login = () => {
	const [profileName, setProfileName] = useState("RAJAT METRY");
	const [profileAddress, setProfileAddress] = useState("795 Folsom Ave, Suite 600 San Francisco, CADGE 94107");

	const handleNameSave = (newText) => {
		setProfileName(newText);
		console.log(newText)
	};

	const handleAddressSave = (newText) => {
		setProfileAddress(newText);
		console.log(newText)
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
								<EditableLabel text={profileName} onSave={handleNameSave} />
							</CardHeader>
							<CardBody>
								<EditableLabel text={profileAddress} onSave={handleAddressSave} />
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div >
		</>
	);
}

export default Login;
