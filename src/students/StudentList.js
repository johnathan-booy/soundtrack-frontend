import React, { useContext, useEffect, useState } from "react";
import Api from "../api";
import TeacherContext from "../contexts/TeacherContext";
import StudentSearchForm from "../forms/StudentSearchForm";
import StudentCard from "./StudentCard";
import "./StudentList.scss";

function StudentList() {
	const [students, setStudents] = useState([]);
	const [areStudentsLoaded, setAreStudentsLoaded] = useState(false);
	const [name, setName] = useState("");
	const { currentTeacher } = useContext(TeacherContext);

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
			<StudentSearchForm searchByName={searchByName} />

			{students.map(({ id, name, email, skillLevel }) => (
				<StudentCard
					key={id}
					id={id}
					name={name}
					email={email}
					skillLevel={skillLevel}
				/>
			))}
		</div>
	);
}

export default StudentList;
