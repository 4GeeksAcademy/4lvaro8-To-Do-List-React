import React, { useState, useEffect } from "react";


const Home = () => {
	const [user, setUser] = useState("");
	const [task, setTask] = useState("");
	const [isUserCreated, setIsUserCreated] = useState('false');

	const baseApiUrl = "https://playground.4geeks.com/todo";

	useEffect(() => {
		fetchUser("4lvaro8")
	}, []);


	const fetchUser = async (user) => {
		try {
			const response = await fetch(`${baseApiUrl}/users/${user}`);
			if (response.ok) {
				const userData = await response.json();
				return userData;
			} else {
				throw new Error("Failed to fetch user data");
			}
		} catch (error) {
			console.log("Error fetching user data:", error);
			return null;
		}
	};


	const createUser = () => {
		fetch('https://playground.4geeks.com/todo/users/4lvaro8', {
			method: "POST",
			headers: {
				"accept": "application/json",
			},
		})
		.then(response => {
			if (!response.ok) {
				if (response.status === 400) {
					alert("User already exists, fetching todos...");
					setIsUserCreated(true);
				} else {
					throw new Error(
						response.statusText + "! Something went wrong"
					);
				}
			}
			return response.json();
			setIsUserCreated(true);
		  })
		  .then(newUser => setUser([...user, newUser]))
		  .catch(error => console.log('Error adding user:', error));
	}



	const addTask = (user) => {
		fetch(`${baseApiUrl}/todos/${user}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"label": "task",
				is_done: false,
			}),
		})
			.then(response => {
				if (!response.ok) {
					throw new error(response.statusText);
				}
				return response.json();
			})
			.then(data => { console.log(data) })
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

	const handleSubmit = (e) => {
		e.preventDefault();
		postData();
	}

	return (
		<>
			<div className="todo-app">
				<div className="input-user">
					<input type="text" className="input" value={user} placeholder="Enter the username" onChange={(e) => setUser(e.target.value)} />
					<button className="button-user" onClick={createUser}>Create</button>
				</div>
			</div>

			{isUserCreated &&
				<div className="input-task">
					<input type="text" className="input" value={task} placeholder="Enter your new task" onChange={(e) => setTask(e.target.value)} onKeyDown={(e) => {
						if (e.key === "Enter") {
							addTask();
						}
					}} />
					<button className="button-task" onClick={addTask}>Add task</button>
					<button className="button-fetch-task" >Get Tasks</button>
				</div>
			}
		</>
	)
}

export default Home;