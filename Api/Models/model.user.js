const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			min: 3,
			max: 25,
			unique: true,
		},

		email: {
			type: String,
			unique: true,
		},

		password: {
			type: String,
			required: true,
			min: 4,
			max: 25,
		},

		bio: {
			type: String,
			max: 45,
		},

		phone: {
			type: Number,
			min: 10,
		},

		gender: {
			type: String,
			min: 4,
			max: 8,
		},

		dob: {
			date: {
				type: String,
			},
			age: {
				type: Number,
				max: 100,
			},
		},

		location: {
			hometown: {
				type: String,
				max: 25,
			},
			city: {
				type: String,
				max: 25,
			},
			state: {
				type: String,
				max: 25,
			},
			country: {
				type: String,
				max: 25,
			},
		},

		profilePic: {
			type: String,
			default: "",
		},

		defaultPic: {
			type: String,
			default: "",
		},

		followings: {
			type: Array,
			default: [],
		},

		followers: {
			type: Array,
			default: [],
		},

		notifications: {
			type: Array,
			default: [],
			timestamps: true,
		},

		isAdmin: {
			type: Boolean,
			default: false,
		},

		getTheme: {
			type: String,
			default: "",
		},

		token: {
			type: String,
		},
	},
	{ timestamps: true }
);

const model = mongoose.model("ratera-users", userSchema);

module.exports = model;
