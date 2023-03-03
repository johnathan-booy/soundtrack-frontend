import * as Yup from "yup";

class FormFields {
	/**
	 * Returns a filtered list of field objects based on the given `fieldData` parameter, sorted according to the order of the objects in `fieldData`.
	 *
	 * @param {Array.<{name: string, value: any}>} fieldData - An array of objects with field names as `name` and initial values as `value`.
	 * @returns {Array.<Object>} - A filtered list of field objects with initial values from `fieldData`, sorted according to the order of the objects in `fieldData`.
	 */
	static getFields(fieldData) {
		const fieldValueMap = {};
		fieldData.forEach((field) => {
			fieldValueMap[field.name] = field.value;
		});

		const filteredFields = this.fields
			.filter((field) => fieldValueMap.hasOwnProperty(field.name))
			.map((field) => ({
				...field,
				initialValue: fieldValueMap[field.name],
			}));

		const orderedFields = fieldData.map((field) =>
			filteredFields.find((f) => f.name === field.name)
		);

		return orderedFields;
	}

	/**
	 * An array of field objects that describe the fields used in a form with Formik and Yup validation.
	 *
	 * @typedef {Array.<Object>} FormFields
	 * @property {string} name - The name of the field
	 * @property {string} label - The label for the field
	 * @property {string} type - The HTML input type for the field
	 * @property {Object} validation - The Yup validation schema for the field
	 */
	static fields = [
		{
			name: "email",
			label: "Email",
			type: "email",
			initialValue: "",
			validation: Yup.string()
				.email("Invalid email address")
				.required("Email is required"),
		},
		{
			name: "password",
			label: "Password",
			type: "password",
			initialValue: "",
			validation: Yup.string()
				.min(8, "Password must be at least 8 characters long")
				.required("Password is required"),
		},
		{
			name: "name",
			label: "Name",
			type: "text",
			initialValue: "",
			validation: Yup.string()
				.min(2, "Name must be at least 2 characters long")
				.max(50, "Name must be at most 50 characters long")
				.required("Name is required"),
		},
	];
}

export default FormFields;
