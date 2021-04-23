import axios from "axios";

const baseDomain = "http://localhost:3000";
const baseURL = `${baseDomain}/api/v1`;

const token = localStorage.token;

export default axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
		"Authorization": `Bearer ${token}`
	}
})