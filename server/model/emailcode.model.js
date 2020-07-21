/*
This mongoose model is used to store user's email verification code and its time info
*/
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const EmailCodeSchema = new Schema({
	code: String,
	email: {
		type: String,
		index: true
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: Date
});

export default mongoose.model('Email', EmailCodeSchema);

