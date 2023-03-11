// Import statements
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Api from "../api";
import SkillLevelContext from "../contexts/SkillLevelContext";
import FormFields from "../forms/FormFields";
import UpdateFieldForm from "../forms/UpdateFieldForm";
import "./StudentDetails.scss";

// Function component
function StudentDetails() {
	// State variables
	const { studentId } = useParams();
	const [student, setStudent] = useState(null);
	const [skillLevel, setSkillLevel] = useState();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// Context variables
	const { getSkillLevelById } = useContext(SkillLevelContext);

	// History instance
	const history = useHistory();

	// Fields
	const aboutField =
		student &&
		FormFields.getFields([{ name: "description", value: student.description }]);
	const emailField =
		student && FormFields.getFields([{ name: "email", value: student.email }]);

	// Side effect to get student by id
	useEffect(() => {
		const getStudent = async () => {
			const student = await Api.getStudent(studentId);
			setStudent(student);
		};
		getStudent();
	}, [studentId]);

	// Side effect to get skill level by id
	useEffect(() => {
		const getSkillLevel = async () => {
			const skillLevel = getSkillLevelById(student.skillLevelId);
			setSkillLevel(skillLevel);
		};
		if (student) {
			getSkillLevel();
		}
	}, [student, getSkillLevelById]);

	// Update student data
	const update = async (data) => {
		const updatedStudent = await Api.updateStudent({
			id: studentId,
			...data,
		});
		setStudent(updatedStudent);
	};

	// Handle delete click
	const handleDelete = async () => {
		setShowDeleteDialog(true);
	};

	// Confirm delete
	const handleConfirmDelete = async () => {
		await Api.deleteStudent(studentId);
		history.push("/students");
	};

	// Cancel delete
	const handleCancelDelete = () => {
		setShowDeleteDialog(false);
	};

	// Render JSX
	return student ? (
		<section className="student-details">
			<header>
				<h1 className="name">{student.name}</h1>
				{skillLevel && skillLevel.name !== "" && (
					<div className="skill" style={{ backgroundColor: skillLevel.color }}>
						{skillLevel.name}
					</div>
				)}
			</header>
			<UpdateFieldForm key="about" fields={aboutField} update={update} />
			<UpdateFieldForm key="email" fields={emailField} update={update} />

			{showDeleteDialog ? (
				<div className="delete-dialog">
					<p>Are you sure you want to delete this student?</p>
					<div className="buttons">
						<button onClick={handleConfirmDelete} className="yes">
							Yes
						</button>
						<button onClick={handleCancelDelete} className="no">
							No
						</button>
					</div>
				</div>
			) : (
				<button className="delete-button" onClick={handleDelete}>
					<FontAwesomeIcon icon={faTrash} />
					<span>Delete</span>
				</button>
			)}
		</section>
	) : (
		<p>Loading...</p>
	);
}

// Export the component
export default StudentDetails;
