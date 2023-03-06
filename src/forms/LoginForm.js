import React, { useContext } from "react";
import GenericForm from "./GenericForm";
import TeacherContext from "../contexts/TeacherContext";
import { Link } from "react-router-dom";
import FormFields from "./FormFields";

function LoginForm() {
	const { login } = useContext(TeacherContext);

	const fields = FormFields.getFields([
		{ name: "email", value: "johnathan.booy@gmail.com" },
		{ name: "password", value: "password" },
	]);

	const onSubmit = async (values) => {
		const { email, password } = values;
		await login(email, password);
	};

	return (
		<section className="Form-wrapper">
			<header>
				<h1>Login</h1>
				<em>
					Don't have an account? <Link to="/register">Register here!</Link>
				</em>
			</header>
			<GenericForm fields={fields} onSubmit={onSubmit} />
		</section>
	);
}

export default LoginForm;
