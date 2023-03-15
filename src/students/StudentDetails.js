// Import statements
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Api from "../api";
import SkillLevelContext from "../contexts/SkillLevelContext";
import TeacherContext from "../contexts/TeacherContext";
import formValidators from "../forms/formValidators";
import DynamicUpdateForm from "../forms/DynamicUpdateForm";
import { formatDate } from "../helpers/formatDate";
import "./StudentDetails.scss";
import DeleteDialog from "../common/DeleteDialog";

// Function component
function StudentDetails() {
	// State variables
	const { studentId } = useParams();
	const [student, setStudent] = useState(null);
	const [lessons, setLessons] = useState(null);
	const [skillLevel, setSkillLevel] = useState();
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);

	// Context variables
	const { getSkillLevelById } = useContext(SkillLevelContext);
	const { currentTeacher } = useContext(TeacherContext);

	// History instance
	const history = useHistory();

	// Fields
	const descriptionField = [
		{
			name: "description",
			label: "Description",
			type: "textarea",
			initialValue: student ? student.description : "",
			validation: formValidators.description,
		},
	];
	const emailField = [
		{
			name: "email",
			label: "Email",
			type: "text",
			initialValue: student ? student.email : "",
			validation: formValidators.email,
		},
	];

	// Get student by id
	useEffect(() => {
		const getStudent = async () => {
			const student = await Api.getStudent(studentId);
			setStudent(student);
		};
		getStudent();
	}, [studentId]);

	// Get lessons by student by id
	useEffect(() => {
		const getLessons = async () => {
			const lessons = await Api.getStudentLessons(studentId);
			setLessons(lessons);
		};
		getLessons();
	}, [studentId]);

	// Get skill level by id
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
	const updateStudent = async (data) => {
		const updatedStudent = await Api.updateStudent({
			id: studentId,
			...data,
		});
		setStudent(updatedStudent);
	};

	// Add a lesson
	const handleAddLesson = async () => {
		const lesson = await Api.addLesson({
			studentId,
			teacherId: currentTeacher.id,
			notes: "",
		});
		setLessons([lesson, ...lessons]);
	};

	// Update a lesson
	const updateLesson = async (data) => {
		const updatedLesson = await Api.updateLesson(data);
		setLessons(
			lessons.map((lesson) => {
				if (lesson.id === updatedLesson.id) {
					return updatedLesson;
				}
				return lesson;
			})
		);
	};

	const deleteLesson = async (id) => {
		await Api.deleteLesson(id);
		setLessons(lessons.filter((lesson) => lesson.id !== id));
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
			<DynamicUpdateForm
				key="description"
				fields={descriptionField}
				update={updateStudent}
			/>
			<DynamicUpdateForm
				key="email"
				fields={emailField}
				update={updateStudent}
			/>

			<div className="lessons">
				<h2 className="lesson">Lessons</h2>
				<button className="add-lesson" onClick={handleAddLesson}>
					<FontAwesomeIcon icon={faPlus} />
					<span>Add a lesson</span>
				</button>
				{lessons &&
					lessons.map((lesson) => {
						const { date, notes, id } = lesson;
						const fields = [
							{
								name: "notes",
								label: formatDate(date),
								type: "richtext",
								initialValue: notes,
								validation: formValidators.description,
							},
						];
						return (
							<DynamicUpdateForm
								key={id}
								fields={fields}
								update={(data) => updateLesson({ id, ...data })}
								deleteResource={() => deleteLesson(id)}
							/>
						);
					})}
			</div>

			{showDeleteDialog ? (
				<DeleteDialog
					onCancel={handleCancelDelete}
					onConfirm={handleConfirmDelete}
				/>
			) : (
				<button className="delete-button" onClick={handleDelete}>
					<FontAwesomeIcon icon={faTrash} />
					<span>Delete Student</span>
				</button>
			)}
		</section>
	) : (
		<p>Loading...</p>
	);
}

// Export the component
export default StudentDetails;
