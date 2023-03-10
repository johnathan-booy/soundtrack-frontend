import { useEffect, useState } from "react";
import Api from "../api";

/**
 * A custom hook that fetches and processes the skill levels data.
 *
 * @returns {Object} { skillLevels, getSkillLevelById }
 */
const useSkillLevels = () => {
	const [skillLevels, setSkillLevels] = useState();

	// A function that extracts the skill level category from a full skill level name.
	const getSkillLevelCategory = (name) => name.match(/^([A-Z][a-z]+)/)?.[0];

	// Fetch the skill levels data and process it when the component mounts.
	useEffect(() => {
		// Define the color codes for each skill level category.
		const skillLevelColors = {
			Beginner: "#AE84AA",
			Intermediate: "#ADD585",
			Advanced: "#E1CE7A",
		};

		const fetchSkillLevels = async () => {
			const data = await Api.getSkillLevels();
			const skillLevels = data.reduce((acc, { id, name }) => {
				const category = getSkillLevelCategory(name);
				if (category) {
					acc[id] = { name, color: skillLevelColors[category] };
				}
				return acc;
			}, {});
			setSkillLevels(skillLevels);
		};
		fetchSkillLevels();
	}, []);

	// A function that returns a single skill level object based on its ID.
	const getSkillLevelById = (id) => {
		const skillLevel = skillLevels?.[id];
		if (!skillLevel) {
			return { name: "", color: "grey" };
		}
		return skillLevel;
	};

	return { skillLevels, getSkillLevelById };
};

export default useSkillLevels;
