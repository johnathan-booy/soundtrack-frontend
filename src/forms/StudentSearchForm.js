import React, { useState } from "react";
import "./Form.scss";
import "./StudentSearchForm.scss";

/**
 * A form component for searching students by name.
 * @param {Function} searchByName - Callback function to be executed on name search.
 * @returns {JSX.Element} - A React component.
 */
function StudentSearchForm({ searchByName }) {
	const [name, setName] = useState("");

	// Handle input changes and execute search function
	const handleChange = (event) => {
		const searchName = event.target.value;
		setName(searchName);
		searchByName(searchName);
	};

	// Prevent form submission
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	// Render the search form
	return (
		<form className="student-search-form" onSubmit={handleSubmit}>
			<div className="form-group">
				<input
					className="input"
					name="name"
					type="text"
					value={name}
					placeholder="Search by name"
					onChange={handleChange}
				/>
			</div>
		</form>
	);
}

export default StudentSearchForm;
