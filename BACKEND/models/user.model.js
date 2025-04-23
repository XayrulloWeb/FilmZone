// BACKEND/models/user.model.js
const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },

		username: { type: String, required: true, unique: true, trim: true }, // Добавлено: уникальное, обязательное, убираем пробелы
		password: { type: String, required: true },
		isActivated: { type: Boolean, default: false },
		// Тут могут быть другие поля, если они нужны (e.g., activationLink)
	},
	{ timestamps: true }
);

module.exports = model('User', UserSchema);