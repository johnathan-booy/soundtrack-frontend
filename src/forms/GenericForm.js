import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import "./Form.scss";

function GenericForm({ fields, onSubmit }) {
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
			onSubmit={onSubmit}
		>
			<Form className="form">
				{fields.map((field) => {
					const { name, label, type } = field;
					return (
						<div className="form-group" key={name}>
							<label className="form-label" htmlFor={name}>
								{label}
							</label>
							<Field className="form-input" type={type} name={name} />
							<div className="form-error">
								<ErrorMessage name={name} />
							</div>
						</div>
					);
				})}
				<button className="App-button success" type="submit">
					Submit
				</button>
			</Form>
		</Formik>
	);
}

export default GenericForm;
