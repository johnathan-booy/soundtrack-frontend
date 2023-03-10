import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./UpdateFieldForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons";

function UpdateFieldForm({ fields, fieldName, update, showLabels = true }) {
	const [editMode, setEditMode] = useState(false);
	const initialValues = Object.fromEntries(
		fields.map((field) => [field.name, field.initialValue])
	);

	const validationSchema = Yup.object(
		Object.fromEntries(fields.map((field) => [field.name, field.validation]))
	);

	const toggleEditMode = () => {
		setEditMode(!editMode);
	};

	const handleSubmit = (data) => {
		update(data);
		toggleEditMode();
	};

	return (
		<div className="update-field">
			{fieldName && <h3 className="name">{fieldName}</h3>}

			{editMode ? (
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
									{showLabels && (
										<label className="form-label" htmlFor={name}>
											{label}
										</label>
									)}

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
						<button type="submit" className="save">
							<FontAwesomeIcon icon={faCheck} />
						</button>
						<button className="cancel" onClick={toggleEditMode}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</Form>
				</Formik>
			) : (
				<>
					<button className="edit" onClick={toggleEditMode}>
						<FontAwesomeIcon icon={faPencil} />
					</button>
					{fields.map((field) => (
						<>
							<h4 className="label">{field.label}</h4>
							<p className="value">{field.initialValue}</p>
						</>
					))}
				</>
			)}
		</div>
	);
}

export default UpdateFieldForm;
