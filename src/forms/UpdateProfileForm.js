import React, { useContext } from "react";
import TeacherContext from "../contexts/TeacherContext";
import DynamicForm from "./DynamicForm";
import formValidators from "./formValidators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

/**
 * A form component for updating teacher profile information.
 *
 * @returns {JSX.Element} The update profile form.
 */
function UpdateProfileForm() {
	// Retrieve the updateTeacher function and currentTeacher object from the TeacherContext.
	const { updateTeacher, currentTeacher } = useContext(TeacherContext);

	// Define the form fields and their initial values and validation functions.
	const fields = [
		{
			name: "name",
			label: "Name",
			type: "text",
			initialValue: currentTeacher.name,
			validation: formValidators.name,
		},
		{
			name: "email",
			label: "Email",
			type: "email",
			initialValue: currentTeacher.email,
			validation: formValidators.email,
		},
		{
			name: "description",
			label: "Description",
			type: "textarea",
			initialValue: currentTeacher.description,
			validation: formValidators.description,
		},
	];

	/**
	 * A function to be called when the form is submitted.
	 * Calls the updateTeacher function with the updated teacher information.
	 *
	 * @param {object} values - The updated form values.
	 */
	const handleSubmit = async (values) => {
		const { name, email, description } = values;
		await updateTeacher({ name, email, description });
	};

	// Render the update profile form.
	return (
		<section className="form-wrapper">
			<header>
				<h1>Update Profile</h1>
			</header>
			<DynamicForm
				fields={fields}
				handleSubmit={handleSubmit}
				submitName="Update"
				submitIcon={<FontAwesomeIcon icon={faEdit} />}
			/>
		</section>
	);
}

export default UpdateProfileForm;
