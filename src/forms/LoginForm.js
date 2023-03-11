import React, { useContext } from "react";
import { Link } from "react-router-dom";
import TeacherContext from "../contexts/TeacherContext";
import GenericForm from "./GenericForm";
import formValidators from "./formValidators";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
	// Get the login function from the TeacherContext
	const { login } = useContext(TeacherContext);

	// Define the form fields with default values
	const fields = [
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
	];

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
				submitIcon={<FontAwesomeIcon icon={faSignIn} />}
			/>
		</section>
	);
}

export default LoginForm;
