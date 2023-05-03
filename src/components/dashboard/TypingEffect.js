import { useState, useEffect } from "react";

function App() {
	const [text, setText] = useState("");

	useEffect(() => {
		const message = "Hii , RAJAT METRY";
		let i = 0;
		const intervalId = setInterval(async () => {
			setText((prevText) => prevText + message.charAt(i));
			i++;
			if (i === message.length) clearInterval(intervalId);
		}, 100);
		return () => clearInterval(intervalId);
	}, []);

	return <div>{text}</div>;
}

export default App;
