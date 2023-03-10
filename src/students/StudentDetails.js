import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../api";
import SkillLevelContext from "../contexts/SkillLevelContext";
import FormFields from "../forms/FormFields";
import UpdateFieldForm from "../forms/UpdateFieldForm";
import "./StudentDetails.scss";

function StudentDetails() {
	const { studentId } = useParams();
	const [student, setStudent] = useState(null);
	const [skillLevel, setSkillLevel] = useState();
	const getSkillLevelById = useContext(SkillLevelContext);

	const aboutField =
		student &&
		FormFields.getFields([{ name: "description", value: student.description }]);
	const emailField =
		student && FormFields.getFields([{ name: "email", value: student.email }]);

	useEffect(() => {
		const getStudent = async () => {
			const student = await Api.getStudent(studentId);
			setStudent(student);
		};
		getStudent();
	}, [studentId]);

	useEffect(() => {
		const getSkillLevel = async () => {
			const skillLevel = getSkillLevelById(student.skillLevelId);
			setSkillLevel(skillLevel);
		};
		if (student) {
			getSkillLevel();
		}
	}, [student]);

	const update = async (data) => {
		const updatedStudent = await Api.updateStudent({
			id: studentId,
			...data,
		});
		setStudent(updatedStudent);
	};

	return student ? (
		<section className="student-details">
			<header>
				<h1 className="name">{student.name}</h1>
				{skillLevel && (
					<div className="skill" style={{ backgroundColor: skillLevel.color }}>
						{skillLevel.name}
					</div>
				)}
			</header>
			<UpdateFieldForm key="about" fields={aboutField} update={update} />
			<UpdateFieldForm key="email" fields={emailField} update={update} />
		</section>
	) : (
		<p>Loading...</p>
	);
}

export default StudentDetails;
