import React from "react";
import { Field, useField } from "formik";
import { v4 as uuid } from "uuid";

/**
 * A form field component for a text area that uses Formik's `useField` hook
 * to manage form state.
 *
 * @param {string} label - The label for the form field.
 * @param {string} name - The name of the form field.
 * @param {boolean} showLabel
 * @returns A React component that renders a text area form field.
 */
function TextAreaField({ label, name, showLabel = true }) {
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
			<Field {...field} id={id} as="textarea" className="input textarea" />
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</div>
	);
}

export default TextAreaField;
