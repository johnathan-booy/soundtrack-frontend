import * as Yup from "yup";

const formValidators = {
	name: Yup.string()
		.min(2, "Name must be at least 2 characters long")
		.max(50, "Name must be at most 50 characters long")
		.required("Name is required"),

	email: Yup.string()
		.email("Invalid email address")
		.required("Email is required"),

	password: Yup.string()
		.min(8, "Password must be at least 8 characters long")
		.required("Password is required"),

	description: Yup.string(),
};

export default formValidators;
