import React from "react";
import { Field } from "formik";
import GenericField from "./GenericField";
import RichTextField from "./RichTextField";
import SelectField from "./SelectField";
import TextAreaField from "./TextAreaField";

/**
 * A component that dynamically renders a form field based on the given type.
 *
 * @param {string} name - The name of the form field.
 * @param {string} label - The label for the form field.
 * @param {string} [type="text"] - The type of the form field. Valid types are "text", "textarea", "richtext", and "select".
 * @param {array} [options] - The options for the form field (for "select" type). `[{name, value}]`
 * @param {boolean} showLabel
 *
 * @example
 * const options = [
 *   { name: "Option 1", value: "option1" },
 *   { name: "Option 2", value: "option2" },
 *   { name: "Option 3", value: "option3" },
 * ];
 *
 * <DynamicField name="select" label="Select" type="select" options={options}/>
 *
 * @returns {React.Component} A React component that renders a form field.
 */
function DynamicField({
	name,
	label,
	type = "text",
	options,
	showLabel = true,
}) {
	const fieldProps = { label, name, showLabel };

	if (type === "textarea") {
		return <TextAreaField {...fieldProps} />;
	} else if (type === "richtext") {
		return <Field {...fieldProps} component={RichTextField} />;
	} else if (type === "select") {
		return <SelectField {...fieldProps} options={options} />;
	} else {
		return <GenericField {...fieldProps} type={type} />;
	}
}

export default DynamicField;
