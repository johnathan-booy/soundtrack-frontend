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
	static async login(email, password) {
		const res = await this.request("auth/login", { email, password }, "post");
		return res;
	}

	/** Teachers */
	static async getTeacher(id) {
		const res = await this.request(`teachers/${id}`);
		return res.teacher;
	}
}

// For now, hard-code a token
Api.token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2NzcyNzUzOTl9.aAjIfaspEq1j-t7i8jHUCcWb1F2i8B_Z8WMYzbyvOB0";

export default Api;
