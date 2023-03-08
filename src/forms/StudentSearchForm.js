import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./Form.scss";

function StudentSearchForm({ searchByName }) {
	const [name, setName] = useState(null);

	const handleChange = (event) => {
		setName(event.target.value);
		searchByName(event.target.value);
	};

	return (
		<div className="form-wrapper">
			<form className="form">
				<div className="form-group">
					<input
						className="form-input"
						name="name"
						type="text"
						value={name}
						placeholder="Search by name"
						onChange={handleChange}
					/>
				</div>
			</form>
		</div>
	);
}

export default StudentSearchForm;
