import React from "react";
import { useParams } from "react-router-dom";

function StudentDetails() {
	const { studentId } = useParams();
	return <h1>Student Details for {studentId}</h1>;
}

export default StudentDetails;
