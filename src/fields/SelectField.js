import React from "react";
import { Field, useField } from "formik";
import { v4 as uuid } from "uuid";

/**
 * A select field component that uses Formik's `useField` hook
 * to manage form state.
 *
 * @param {string} label - The label for the select field.
 * @param {Array} options - An array of options for the select field `[{name, value}]`
 * @param {string} name - The name of the select field.
 * @param {boolean} showLabel
 * @returns A React component that renders a select field.
 */
function SelectField({ label, options, name, showLabel = true }) {
	// Call the `useField` hook to get the select field's value, metadata,
	// and helper functions.
	const [field, meta] = useField(name);

	// Generate a unique ID for the select field.
	const id = uuid();

	// Render the select field component.
	return (
		<div className="form-group">
			{showLabel && (
				<label htmlFor={id} className="label">
					{label}
				</label>
			)}
			<Field {...field} as="select" id={id} className="input">
				{options.map(({ value, name }) => (
					<option key={value} value={value}>
						{name}
					</option>
				))}
			</Field>
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</div>
	);
}

export default SelectField;
