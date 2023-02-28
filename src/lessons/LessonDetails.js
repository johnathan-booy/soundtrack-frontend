import React from "react";
import { useParams } from "react-router-dom";

function LessonDetails() {
	const { lessonId } = useParams();
	return <h1>Lesson Details for {lessonId}</h1>;
}

export default LessonDetails;
