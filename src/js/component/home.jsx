import React, { useState, useEffect } from "react";


const Home = () => {
	const [user, setUser] = useState("");
	const [task, setTask] = useState("");
	const [isUserCreated, setIsUserCreated] = useState('false');

	const baseApiUrl = "https://playground.4geeks.com/todo";


	function fetchUser() {
		fetch(`${baseApiUrl}/users/4lvaro8`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"label": "task",
				"is_done": false,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new error(response.statusText);
				}
				response.json();
				setIsUserCreated(true);
			})
			.then(data => setUser(data))
			.catch(error => console.error("Error fetching user:", error));
	};

	function fetchtask() {
		fetch(`${baseApiUrl}/todos/4lvaro8}`)
			.then(response => {
				if (!response.ok) {
					throw new error(response.statusText);
				}
				return response.json();
			})
			.then(data => setTask(data))
			.catch(error => console.error("Error fetching task:", error));
	};

	function addTask(user) {
		fetch(`${baseApiUrl}/todos/4lvaro8`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"label": "task",
				"is_done": false,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new error(response.statusText);
				}
				return response.json();
			})
			.then(data => setTask([...task, data]))
			.catch(error => console.error("Error adding task:", error))
	}

	function deleteTask(taskId) {
		fetch(`${baseApiUrl}/todo/todos/${taskId}`, {
			method: "DELETE"
		})
			.then(response => {
				if (!response.ok) {
					throw new error(response.statusText)
				}
				return setTask(task.filter(task => task.id !== taskId));
			})
			.catch(error => console.error("Error deleting task:", error))
	};


	return (
		<>
			<div className="todo-app">
				<div className="input-user">
					<input type="text" className="input" value={user} placeholder="Enter the username" onChange={(e) => setUser(e.target.value)} />
					<button className="button-user" onClick={fetchUser}>Send</button>
				</div>
			</div>

			{isUserCreated ?
				<div className="input-task">
					<input type="text" className="input" value={task} placeholder="Enter your new task" onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTask();
						}
					}}/>
					<button className="button-task" onClick={addTask}>Add task</button>
					<button className="button-fetch-task" onClick={fetchtask}>Get Tasks</button>
				</div>
				: ""
			}
		</>
	)
}

export default Home;