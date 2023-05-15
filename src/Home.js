import React, { useState, useEffect } from "react";
import { TaskDisplay } from "./components/TaskDisplay";
import { Link, useOutletContext } from "react-router-dom";
import { nanoid } from "nanoid";
import "./scss/app.css";

export const Home = () => {
	const [tableData] = useOutletContext();
	const [trelloData, setTrelloData] = useState([]);

	useEffect(() => {
		let blocked = false;
		tableData.forEach(pair => {
			// Fetch trello data at the board with each listID
			console.log(pair.name, pair.id);
			fetch("https://asia-southeast1-trello-tabliss-integrati-dd041.cloudfunctions.net/pull_data", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({"id": pair.id})
			})
				.then(response => response.text())
				.then(text => {
					const data = JSON.parse(text);
					let tasks = [];
					for (const key in data) { // Add tasks
						let task = data[key];
						tasks.push(task.name);
					}
					if (!blocked) {
						console.log(tasks);
						let data = {id: pair.id, name: pair.name, content: tasks};
						setTrelloData(previous => [...previous, data]);
					}
				})
				.catch(error => {
					console.log("Error: ", error);
				});
		});
		return () => {
			blocked = true;
		};
	}, [tableData]);

	// 	id: nanoid(),
	// 	name: "List 1",
	// 	content: ["Task 1", "Task 2"]
	// },
	// {
	// 	id: nanoid(),
	// 	name: "List 2",
	// 	content: ["Task 1", "Task 2", "Task 3"]
	// },
	// {
	// 	id: nanoid(),
	// 	name: "List 3",
	// 	content: []
	// }]);
	return (
		<div className="App">
			<div className="main-section">
				<h2>Your Trello Tasks</h2>
				<TaskDisplay data={trelloData}></TaskDisplay>
				<Link id="settings-button" to="settings"><button>Settings</button></Link>
			</div>
		</div>
	);
}