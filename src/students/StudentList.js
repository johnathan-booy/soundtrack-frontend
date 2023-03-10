import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../api";
import SkillLevelContext from "../contexts/SkillLevelContext";
import TeacherContext from "../contexts/TeacherContext";
import StudentSearchForm from "../forms/StudentSearchForm";
import StudentCard from "./StudentCard";
import "./StudentList.scss";

function StudentList() {
	const [students, setStudents] = useState([]);
	const [name, setName] = useState("");
	const { currentTeacher } = useContext(TeacherContext);
	const getSkillLevelById = useContext(SkillLevelContext);

	useEffect(() => {
		const getStudents = async () => {
			const teacherId = currentTeacher.id;
			const students = await Api.getStudents({ teacherId, name });
			setStudents(students);
		};
		getStudents();
	}, [currentTeacher, name]);

	const searchByName = (text) => {
		setName(text ? text : null);
	};

	return (
		<div className="student-list">
			<Link className="add" to="/students/add">
				<FontAwesomeIcon icon={faPlus} />
				<span>Add a student</span>
			</Link>
			<StudentSearchForm searchByName={searchByName} />
			{students.map(({ id, name, email, skillLevelId }) => {
				const skillLevel = getSkillLevelById(skillLevelId);

				return (
					<StudentCard
						key={id}
						id={id}
						name={name}
						email={email}
						skillLevel={skillLevel}
					/>
				);
			})}
		</div>
	);
}

export default StudentList;
