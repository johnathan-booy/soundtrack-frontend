import React, { useContext } from "react";
import TeacherContext from "../contexts/TeacherContext";
import GenericForm from "./GenericForm";
import formValidators from "./formValidators";
import SkillLevelContext from "../contexts/SkillLevelContext";

function AddStudentForm() {
	// Get the register function from the TeacherContext
	const { addStudent } = useContext(TeacherContext);
	const { skillLevels } = useContext(SkillLevelContext);

	const skillLevelOptions = [
		{ value: null, name: "Unsure" }, // add this option
		...Object.entries(skillLevels).map(([id, level]) => ({
			value: id,
			name: level.name,
		})),
	];

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
		console.log("handleSubmit values", values);
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
			<GenericForm
				fields={fields}
				handleSubmit={handleSubmit}
				submitName="Add Student"
			/>
		</section>
	);
}

export default AddStudentForm;
