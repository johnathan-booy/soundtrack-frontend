import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Form.scss";

function GenericForm({ fields, handleSubmit, submitName }) {
	const initialValues = Object.fromEntries(
		fields.map((field) => [field.name, field.initialValue])
	);

	const validationSchema = Yup.object(
		Object.fromEntries(fields.map((field) => [field.name, field.validation]))
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			<Form className="form">
				{fields.map((field) => {
					const { name, label, type } = field;
					return (
						<div className="form-group" key={name}>
							<label className="form-label" htmlFor={name}>
								{label}
							</label>
							<Field
								className={`form-input${
									type === "textarea" ? " form-textarea" : ""
								}`}
								name={name}
								as={type === "textarea" ? "textarea" : "input"}
								type={type}
							/>
							<div className="form-error">
								<ErrorMessage name={name} />
							</div>
						</div>
					);
				})}

				<button className="form-button" type="submit">
					{submitName}
				</button>
			</Form>
		</Formik>
	);
}

export default GenericForm;
