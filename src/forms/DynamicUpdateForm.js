import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import "./DynamicUpdateForm.scss";
import DynamicField from "../fields/DynamicField";
import DeleteDialog from "../common/DeleteDialog";
import FormButtons from "./FormButtons";
import DynamicFieldValue from "../fields/DynamicFieldValue";
import { v4 as uuid } from "uuid";

function DynamicUpdateForm({
	fields,
	formName,
	update,
	deleteResource,
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

	// Handle submit, clicked outside of form
	const formikRef = useRef();

	const handleSubmit = (values, { setSubmitting }) => {
		setSubmitting(false);
		update(values);
		toggleEditMode();
	};

	const onSubmitClick = () => {
		formikRef.current.submitForm();
	};

	// Handle delete click
	const handleDelete = async () => {
		setShowDeleteDialog(true);
	};

	// Confirm delete
	const handleConfirmDelete = async () => {
		await deleteResource();
	};

	// Cancel delete
	const handleCancelDelete = () => {
		setShowDeleteDialog(false);
	};

	return (
		<>
			{showDeleteDialog ? (
				<DeleteDialog
					onCancel={handleCancelDelete}
					onConfirm={handleConfirmDelete}
				/>
			) : (
				<div className="dynamic-update-form">
					{formName && <h3 className="name">{formName}</h3>}
					<FormButtons
						editMode={editMode}
						toggleEditMode={toggleEditMode}
						onDeleteClick={deleteResource ? handleDelete : null}
						onSubmitClick={onSubmitClick}
					/>
					{editMode ? (
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
							innerRef={formikRef}
						>
							<Form className="form">
								{fields.map((field) => (
									<DynamicField
										key={uuid()}
										{...field}
										showLabel={showLabels}
									/>
								))}
							</Form>
						</Formik>
					) : (
						<>
							{fields.map((field) => (
								<DynamicFieldValue
									field={field}
									showLabel={showLabels}
									key={uuid()}
								/>
							))}
						</>
					)}
				</div>
			)}
		</>
	);
}

export default DynamicUpdateForm;
