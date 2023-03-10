import React, { useContext } from "react";
import TeacherContext from "../contexts/TeacherContext";
import GenericForm from "./GenericForm";
import formValidators from "./formValidators";

function UpdateProfileForm() {
	const { updateTeacher } = useContext(TeacherContext);

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
			initialValue: "johndoe@example.com",
			validation: formValidators.email,
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
