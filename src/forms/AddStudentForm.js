import React, { useContext } from "react";
import TeacherContext from "../contexts/TeacherContext";
import DynamicForm from "./DynamicForm";
import formValidators from "./formValidators";
import SkillLevelContext from "../contexts/SkillLevelContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

/**
 * A form component for adding a new student.
 * @returns {JSX.Element} - A React component.
 */
function AddStudentForm() {
	// Get the register function from the TeacherContext
	const { addStudent } = useContext(TeacherContext);

	// Get the skill levels from the SkillLevelContext and map them to an array of objects with value and name properties
	const { skillLevels } = useContext(SkillLevelContext);
	const skillLevelOptions = [
		{ value: null, name: "Unsure" }, // Add a default option
		...Object.entries(skillLevels).map(([id, level]) => ({
			value: id,
			name: level.name,
		})),
	];

	// Define the form fields with initial values and validation schema
	const fields = [
		{
			name: "name",
			label: "Name",
			type: "text",
			initialValue: "Johnathan Booy",
			validation: formValidators.name,
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			initialValue: `${Math.random()}@example.com`,
			validation: formValidators.email,
		},
		{
			name: "skillLevelId",
			label: "Skill Level",
			type: "select",
			options: skillLevelOptions,
			initialValue: undefined,
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			initialValue: "This is a description.",
			validation: formValidators.description,
		},
	];

	// Define the function to be called when the form is submitted
	const handleSubmit = async (values) => {
		let { name, email, description, skillLevelId } = values;
		skillLevelId = parseInt(skillLevelId);
		await addStudent({ name, email, description, skillLevelId });
	};

	// Render the register form
	return (
		<section className="form-wrapper">
			<header>
				<h1>Add Student</h1>
			</header>
			<DynamicForm
				fields={fields}
				handleSubmit={handleSubmit}
				submitName="Add"
				submitIcon={<FontAwesomeIcon icon={faPlus} />}
			/>
		</section>
	);
}

export default AddStudentForm;
