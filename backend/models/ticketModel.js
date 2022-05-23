const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "User",
		},
		product: {
			type: String,
			required: [true, "Please select  product"],
			enum: ["iPhone", "MacBook Pro", "iMac", "iPad"],
		},
		description: {
			type: String,
			required: [true, "Please describe your issue"],
		},
		status: {
			type: String,
			enum: ["new", "open", "closed"],
			default: "new",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
