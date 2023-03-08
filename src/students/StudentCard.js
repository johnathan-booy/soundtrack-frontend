import React from "react";
import { Link } from "react-router-dom";
import "./StudentCard.scss";

function StudentCard({ id, name, email, skillLevel }) {
	return (
		<Link to={`/students/${id}`} className="student-card">
			<div className="name">{name}</div>
			<div className="email">{email}</div>
			<div className="skill">{skillLevel}</div>
		</Link>
	);
}

export default StudentCard;
