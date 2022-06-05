const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModel");

//@desc   Get notes for a  ticket
//@route  GET /apa/tickets/:id/notes
//@access Private
const getNotes = asyncHandler(async (req, res) => {
	// Get user using id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.id);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const notes = await Note.find({ ticket: req.params.id });

	res.status(200).json(notes);
});

//@desc   Create a note for a  ticket
//@route  POST /apa/tickets/:id/notes
//@access Private
const addNote = asyncHandler(async (req, res) => {
	// Get user using id in JWT
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error("User not found");
	}

	const ticket = await Ticket.findById(req.params.id);

	if (ticket.user.toString() !== req.user.id) {
		res.status(401);
		throw new Error("User not authorized");
	}

	const note = await Note.create({
		text: req.body.text,
		isStaff: false,
		ticket: req.params.id,
		user: req.user.id,
	});

	res.status(200).json(note);
});

module.exports = {
	getNotes,
	addNote,
};
