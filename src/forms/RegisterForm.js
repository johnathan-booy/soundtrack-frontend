import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TeacherContext from "../contexts/TeacherContext";
import DynamicForm from "./DynamicForm";
import formValidators from "./formValidators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

/**
 * A form component for registering a new student
 * @returns {JSX.Element} - A React component.
 */
function RegisterForm() {
	// Get the register function from the TeacherContext
	const { register } = useContext(TeacherContext);

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
			name: "password",
			label: "Password",
			type: "password",
			initialValue: "password",
			validation: formValidators.password,
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
		const { name, email, password, description } = values;
		await register({ name, email, password, description });
	};

	// Render the register form
	return (
		<section className="form-wrapper">
			<header>
				<h1>Register</h1>
				<em>
					Already have an account? <Link to="/login">Log in here!</Link>
				</em>
			</header>
			<DynamicForm
				fields={fields}
				handleSubmit={handleSubmit}
				submitName="Register"
				submitIcon={<FontAwesomeIcon icon={faUserPlus} />}
			/>
		</section>
	);
}

export default RegisterForm;
