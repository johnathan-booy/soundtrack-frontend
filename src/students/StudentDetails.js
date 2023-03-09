import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../api";
import "./StudentDetails.scss";

function StudentDetails() {
	const { studentId } = useParams();
	const [student, setStudent] = useState(null);
	const [originalStudent, setOriginalStudent] = useState(null);
	const [editableFields, setEditableFields] = useState({
		description: false,
		email: false,
	});
	useEffect(() => {
		const getStudent = async () => {
			const student = await Api.getStudent(studentId);
			setStudent(student);
			setOriginalStudent(student);
		};
		getStudent();
	}, [studentId]);

	const handleChange = (fieldName, event) => {
		setStudent((prevStudent) => ({
			...prevStudent,
			[fieldName]: event.target.value,
		}));
	};

	const handleEditClick = (fieldName) => {
		setEditableFields((prevEditableFields) => ({
			...prevEditableFields,
			[fieldName]: true,
		}));
	};

	const handleSaveClick = async (fieldName) => {
		const updatedStudent = await Api.updateStudent({
			id: studentId,
			[fieldName]: student[fieldName],
		});
		console.log(updatedStudent);
		setStudent(updatedStudent);
		setEditableFields((prevEditableFields) => ({
			...prevEditableFields,
			[fieldName]: false,
		}));
	};

	const handleCancelClick = (fieldName) => {
		setStudent(originalStudent);
		setEditableFields((prevEditableFields) => ({
			...prevEditableFields,
			[fieldName]: false,
		}));
	};

	return student ? (
		<section className="student-details">
			<header>
				<h1>{student.name}</h1>
			</header>
			<div className="description">
				<h3>About</h3>
				{editableFields.description ? (
					<>
						<textarea
							value={student.description}
							onChange={(event) => handleChange("description", event)}
						/>
						<button onClick={() => handleSaveClick("description")}>Save</button>
						<button onClick={() => handleCancelClick("description")}>
							Cancel
						</button>
					</>
				) : (
					<p onClick={() => handleEditClick("description")}>
						{student.description}
					</p>
				)}
			</div>
			<div className="contact">
				<h3>Contact Information</h3>
				{editableFields.email ? (
					<>
						<input
							type="email"
							value={student.email}
							onChange={(event) => handleChange("email", event)}
						/>
						<button onClick={() => handleSaveClick("email")}>Save</button>
						<button onClick={() => handleCancelClick("email")}>Cancel</button>
					</>
				) : (
					<p onClick={() => handleEditClick("email")}>{student.email}</p>
				)}
			</div>
		</section>
	) : (
		<p>Loading...</p>
	);
}

export default StudentDetails;
