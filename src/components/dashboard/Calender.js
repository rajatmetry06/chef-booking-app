import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
	const [value, onChange] = useState([]);
	useEffect(() => {
		const functionCall = async () => {
			if (value.length > 1) {
				const formattedDates = value.map(date => date.toISOString().slice(0, 10));
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
						chefId: sessionStorage.getItem("userId"),
						start: formattedDates[0],
						end: formattedDates[1]
					})
				}
				fetch(process.env.REACT_APP_API_CHEF_AVAILABLE_SLOT, configuration)
					.then(res => res.json())
					.then(
						(data) => {
							if (data.affectedRows === undefined) {
								alert(data)
							} else {
								window.location.reload()
							}
						}
					)
					.catch(
						(error) => {
							console.log(error)
						}
					)
			}
		}
		functionCall()
	}, [value])
	return (
		<div>
			<Calendar onChange={onChange} value={value} selectRange={true} className='my-3' />
		</div>
	);
}

export default CalendarComponent;