import React from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import "./Form.scss";
import DynamicField from "../fields/DynamicField";

/**
 * A reusable form component built on Formik and Yup validation schema.
 * @param {Array} fields - Array of objects representing form fields with name, label, type, and validation schema.
 * @param {Function} handleSubmit - Callback function to be executed on form submission.
 * @param {string} submitName - Text to be displayed on the form submission button.
 * @param {ReactNode} submitIcon - Icon to be displayed on the form submission button.
 * @param {ReactNode} children - Child elements to be rendered inside the form.
 * @returns {JSX.Element} - A Formik form component.
 */
function DynamicForm({
	fields,
	handleSubmit,
	submitName,
	submitIcon,
	children,
}) {
	// Extracting initial values from fields array
	const initialValues = Object.fromEntries(
		fields.map((field) => [field.name, field.initialValue])
	);

	// Generating Yup validation schema from fields array
	const validationSchema = Yup.object(
		Object.fromEntries(fields.map((field) => [field.name, field.validation]))
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			validateOnChange={true}
			onSubmit={handleSubmit}
		>
			<Form className="form">
				{fields.map(({ name, label, type, options }) => (
					<DynamicField
						key={name}
						name={name}
						label={label}
						type={type}
						options={options}
					/>
				))}

				{children}

				<button className="form-button" type="submit">
					{submitIcon}
					<span>{submitName}</span>
				</button>
			</Form>
		</Formik>
	);
}

export default DynamicForm;
