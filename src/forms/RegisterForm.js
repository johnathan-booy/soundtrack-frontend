import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TeacherContext from "../contexts/TeacherContext";
import GenericForm from "./GenericForm";
import FormFields from "./FormFields";

function RegisterForm() {
	// Get the register function from the TeacherContext
	const { register } = useContext(TeacherContext);

	// Define the form fields with default values
	const fields = FormFields.getFields([
		{ name: "name", value: "Johnathan Booy" },
		{ name: "email", value: `${Math.random()}@gmail.com` },
		{ name: "password", value: "password" },
		{ name: "description", value: "This is a description" },
	]);

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
			<GenericForm
				fields={fields}
				handleSubmit={handleSubmit}
				submitName="Register"
			/>
		</section>
	);
}

export default RegisterForm;
