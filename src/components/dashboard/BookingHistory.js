import React, { useState, useEffect } from 'react';
import { Row, Col, Table, Button } from "reactstrap";

import "../../App.css"
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from './Navbar';

import image from "../images/image.jpg";

const Login = () => {
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
				body: JSON.stringify({ customerId: sessionStorage.getItem("userId") })
			}
			fetch(process.env.REACT_APP_API_CUSTOMER_BOOKING_HISTORY, configuration)
				.then(res => res.json())
				.then(
					(data) => {
						setChefDetails(data)
					}
				)
		}
		functionCall()
	}, [])
	return (
		<>
			<Navbar />
			<div className="content" style={{ backgroundImage: `url(${image})`, height: "180vh", paddingTop: "7.5vh" }}>
				<Row className='mx-5'>
					<Col lg="12" className="my-2">
						<Table className="table text-light my-2 mx-2" responsive style={{ backgroundImage: 'linear-gradient(to right, #343a40, #6c757d)', textAlign: "center" }}>
							<thead className="text-center">
								<tr>
									<th>CHEF</th>
									<th>DATE</th>
									<th>PURPOSE</th>
									<th>STATUS</th>
								</tr>
							</thead>
							<tbody>
								{chefDetails.map((item, i) => (
									<tr key={i} style={{ fontWeight: "bold" }}>
										<td>{item.firstname} {item.lastname}</td>
										<td>{item.date.split("-").reverse().join("-")}</td>
										<td>{item.purpose}</td>
										<td>
											<Button className={item.status === 'PENDING' ? 'btn btn-sm btn-info' : item.status === 'REJECT' ? 'btn btn-sm btn-danger' : 'btn btn-sm btn-success'} disabled={true}>{item.status === 'PENDING' ? 'PENDING' : item.status + "ED"}</Button>
										</td>
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

export default Login;
