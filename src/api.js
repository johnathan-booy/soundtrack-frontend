import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Api {
	// Store the token for interaction with the API
	static setToken(newToken) {
		Api.token = newToken;
	}

	static async request(endpoint, data = {}, method = "get") {
		console.debug("API Call:", endpoint, data, method);
		const url = `${BASE_URL}/${endpoint}`;
		const headers = { Authorization: `Bearer ${Api.token}` };
		const params = method === "get" ? data : {};

		try {
			return (await axios({ url, method, data, params, headers })).data;
		} catch (err) {
			console.error("API Error:", err.response);
			let message = err.response.data.error.message;
			throw Array.isArray(message) ? message : [message];
		}
	}

	/** Authorizaiton */

	/** Login a teacher */
	static async login({ email, password }) {
		const res = await this.request("auth/login", { email, password }, "post");
		return res;
	}

	/** Register a new teacher */
	static async register({ name, email, password, description = null }) {
		const res = await this.request(
			"auth/register",
			{ name, email, password, description },
			"post"
		);
		return res;
	}

	/** Teachers */

	/** Get information about a teacher by id */
	static async getTeacher(id) {
		const res = await this.request(`teachers/${id}`);
		return res.teacher;
	}

	/** Update a teacher's profile */
	static async updateTeacher({ id, name, email, description = null }) {
		const res = await this.request(
			`teachers/${id}`,
			{ name, email, description },
			"patch"
		);
		return res.teacher;
	}

	/** Students */

	/** Get all students that are assigned to a teacherId */
	static async getStudents({ teacherId, name = "" }) {
		const searchFilters = { teacherId };
		if (name !== "") searchFilters.name = name;
		const res = await this.request(`students`, searchFilters);
		return res.students;
	}
}

export default Api;
