import axios from "axios";

const API_URL = "/api/tickets/";

// Create new ticket
const createTicket = async (ticketData, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.post(API_URL, ticketData, config);

	return response.data;
};

// Get user tickets
const getTickets = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL, config);

	return response.data;
};

// Get user ticket
const getTicket = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.get(API_URL + id, config);

	return response.data;
};

// Close ticket
const closeTicket = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const response = await axios.put(API_URL + id, { status: "closed" }, config);

	return response.data;
};

const ticketService = {
	createTicket,
	getTickets,
	getTicket,
	closeTicket,
};

export default ticketService;
