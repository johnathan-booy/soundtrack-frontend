import React, { useContext } from "react";
import TeacherContext from "../contexts/TeacherContext";
import GenericForm from "./GenericForm";
import FormFields from "./FormFields";

function UpdateProfileForm() {
	// Get the updateTeacher function from the TeacherContext
	const { updateTeacher, currentTeacher } = useContext(TeacherContext);

	// Define the form fields with default values
	const fields = FormFields.getFields([
		{ name: "name", value: currentTeacher.name },
		{ name: "email", value: currentTeacher.email },
		{ name: "description", value: currentTeacher.description },
	]);

	// Define the function to be called when the form is submitted
	const handleSubmit = async (values) => {
		const { name, email, description } = values;
		await updateTeacher({ name, email, description });
	};

	// Render the updateTeacher form
	return (
		<section className="form-wrapper">
			<header>
				<h1>Update Profile</h1>
			</header>
			<GenericForm
				fields={fields}
				handleSubmit={handleSubmit}
				submitName="Update"
			/>
		</section>
	);
}

export default UpdateProfileForm;
