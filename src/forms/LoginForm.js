import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TeacherContext from "../contexts/TeacherContext";
import GenericForm from "./GenericForm";
import FormFields from "./FormFields";

function LoginForm() {
	// Get the login function from the TeacherContext
	const { login } = useContext(TeacherContext);

	// Define the form fields with default values
	const fields = FormFields.getFields([
		{ name: "email", value: "johnathan.booy@gmail.com" },
		{ name: "password", value: "password" },
	]);

	// Define the function to be called when the form is submitted
	const handleSubmit = async (values) => {
		const { email, password } = values;
		await login({ email, password });
	};

	// Render the login form
	return (
		<section className="form-wrapper">
			<header>
				<h1>Log in</h1>
				<em>
					Don't have an account? <Link to="/register">Register here!</Link>
				</em>
			</header>
			<GenericForm
				fields={fields}
				handleSubmit={handleSubmit}
				submitName="Log in"
			/>
		</section>
	);
}

export default LoginForm;
