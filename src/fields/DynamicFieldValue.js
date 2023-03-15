import React from "react";

/**
 * Renders the value of a single dynamic field.
 *
 * @param {Object} field - The dynamic field object containing the field's properties.
 * @param {boolean} showLabel - Whether or not to show the field's label.
 * @returns {JSX.Element} - The rendered dynamic field value.
 */
function DynamicFieldValue({ field, showLabel }) {
	return (
		<div className="field-value-group">
			{showLabel && <h4 className="label">{field.label}</h4>}
			{field.type !== "richtext" ? (
				<p className="value">{field.initialValue}</p>
			) : (
				<div
					className="value"
					dangerouslySetInnerHTML={{ __html: field.initialValue }}
				></div>
			)}
		</div>
	);
}

export default DynamicFieldValue;
