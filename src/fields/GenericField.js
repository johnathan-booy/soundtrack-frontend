import React from "react";
import { Field, useField } from "formik";
import { v4 as uuid } from "uuid";

/**
 * A generic form field component that uses Formik's `useField` hook
 * to manage form state.
 *
 * @param {string} label - The label for the form field.
 * @param {string} name - The name of the form field.
 * @param {string} type - The type of the form field (e.g. "text", "password", etc.).
 * @param {boolean} showLabel
 *
 * @returns A React component that renders a form field.
 */
function GenericField({ label, name, type = "text", showLabel = true }) {
	// Call the `useField` hook to get the form field's value, metadata,
	// and helper functions.
	const [field, meta] = useField(name);

	// Generate a unique ID for the form field.
	const id = uuid();

	// Render the form field component.
	return (
		<div className="form-group">
			{showLabel && (
				<label htmlFor={id} className="label">
					{label}
				</label>
			)}
			<Field {...field} id={id} type={type} className="input" />
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</div>
	);
}

export default GenericField;
