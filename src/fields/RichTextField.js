import React from "react";
import { useField } from "formik";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

// The toolbar options for the rich text editor
const toolbarOptions = [
	[{ header: [1, 2, 3, false] }], // Header dropdown options
	["bold", "italic", "underline"], // Toggled buttons
	[{ list: "ordered" }, { list: "bullet" }], // List dropdown options
	[{ color: [] }, { background: [] }], // Dropdown with defaults from theme
];

/**
 * A component that renders a rich text editor form field.
 *
 * @param {string} label - The label for the form field.
 * @param {object} props - Other props to be passed to the ReactQuill component.
 * @param {boolean} showLabel
 * @returns {React.Component} A React component that renders a rich text editor form field.
 */
function RichTextField({ label, showLabel = true, ...props }) {
	const [field, meta, helpers] = useField(props.field);

	/**
	 * Handles changes to the value of the rich text editor.
	 *
	 * @param {string} value - The new value of the rich text editor.
	 */
	const handleChange = (value) => {
		// Sanitize the value using DOMPurify to prevent XSS attacks
		const sanitizedValue = DOMPurify.sanitize(value);
		// Set the field value using Formik's setValue method
		helpers.setValue(sanitizedValue);
	};

	return (
		<div className="form-group">
			{showLabel && (
				<label htmlFor={props.id || props.name} className="label">
					{label}
				</label>
			)}
			<ReactQuill
				modules={{ toolbar: toolbarOptions, clipboard: { matchVisual: false } }}
				value={field.value}
				onChange={handleChange}
				{...props}
			/>
			{/* Display an error message if the field has been touched and has an error */}
			{meta.touched && meta.error && <div className="error">{meta.error}</div>}
		</div>
	);
}

export default RichTextField;
