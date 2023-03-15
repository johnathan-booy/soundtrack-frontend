import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import "./DynamicUpdateForm.scss";
import DynamicField from "../fields/DynamicField";
import DeleteDialog from "../common/DeleteDialog";
import FormButtons from "./FormButtons";
import DynamicFieldValue from "../fields/DynamicFieldValue";

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
					{editMode ? (
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							<Form className="form">
								{fields.map((field) => (
									<DynamicField
										key={field.name}
										{...field}
										showLabel={showLabels}
									/>
								))}
								<FormButtons
									editMode={editMode}
									toggleEditMode={toggleEditMode}
									onDeleteClick={handleDelete}
								/>
							</Form>
						</Formik>
					) : (
						<>
							<FormButtons
								editMode={editMode}
								toggleEditMode={toggleEditMode}
								onDeleteClick={handleDelete}
							/>

							{fields.map((field) => (
								<DynamicFieldValue field={field} showLabel={showLabels} />
							))}
						</>
					)}
				</div>
			)}
		</>
	);
}

export default DynamicUpdateForm;
