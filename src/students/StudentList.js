import React, { useContext, useEffect, useState } from "react";
import Api from "../api";
import TeacherContext from "../contexts/TeacherContext";
import StudentSearchForm from "../forms/StudentSearchForm";

function StudentList() {
	const [students, setStudents] = useState([]);
	const [areStudentsLoaded, setAreStudentsLoaded] = useState(false);
	const [name, setName] = useState(null);
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

			{students.map((student) => (
				<div className="student-card">
					<h3>{student.name}</h3>
					<p>
						<i>{student.skillLevel}</i>
					</p>
					<p>{student.description}</p>
				</div>
			))}
		</div>
	);
}

export default StudentList;
