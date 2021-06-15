if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	}
);

// UserSchema.statics  -->  instance methods

UserSchema.methods.generateAuthToken = async function (req, res) {
	const user = this;
	const token = jwt.sign(
		{ _id: user._id.toString() },
		process.env.JWT_SECRET_KEY
	);
	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
