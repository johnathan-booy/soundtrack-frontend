import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./UpdateFieldForm.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheck,
	faPencil,
	faTrash,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

function UpdateFieldForm({
	fields,
	fieldName,
	update,
	deleteField,
	showLabels = true,
}) {
	const [editMode, setEditMode] = useState(false);
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
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

	// Handle delete click
	const handleDelete = async () => {
		setShowDeleteDialog(true);
	};

	// Confirm delete
	const handleConfirmDelete = async () => {
		await deleteField();
	};

	// Cancel delete
	const handleCancelDelete = () => {
		setShowDeleteDialog(false);
	};

	return (
		<div className="update-field">
			{fieldName && <h3 className="name">{fieldName}</h3>}

			{editMode ? (
				showDeleteDialog ? (
					<div className="delete-dialog">
						<p>Are you sure you want to delete this?</p>
						<div className="buttons">
							<button onClick={handleConfirmDelete} className="yes">
								Yes
							</button>
							<button onClick={handleCancelDelete} className="no">
								No
							</button>
						</div>
					</div>
				) : (
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
							<div className="button-group">
								<button type="submit" className="save">
									<FontAwesomeIcon icon={faCheck} />
								</button>
								<button className="cancel" onClick={toggleEditMode}>
									<FontAwesomeIcon icon={faXmark} />
								</button>
								{deleteField && (
									<button className="delete" onClick={handleDelete}>
										<FontAwesomeIcon icon={faTrash} />
									</button>
								)}
							</div>
						</Form>
					</Formik>
				)
			) : (
				<>
					<div className="button-group">
						<button className="edit" onClick={toggleEditMode}>
							<FontAwesomeIcon icon={faPencil} />
						</button>
					</div>

					{fields.map((field) => (
						<React.Fragment key={field.name}>
							<h4 className="label">{field.label}</h4>
							<p className="value">{field.initialValue}</p>
						</React.Fragment>
					))}
				</>
			)}
		</div>
	);
}

export default UpdateFieldForm;
