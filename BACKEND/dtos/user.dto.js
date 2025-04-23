// BACKEND/dtos/user.dto.js
module.exports = class UserDto {
	email;
	id;
	isActivated;
	username; // <-- ДОБАВЛЕНО ПОЛЕ

	constructor(model) {
		this.email = model.email;
		this.id = model._id; // В mongoose ID находится в _id
		this.isActivated = model.isActivated;
		this.username = model.username; // <-- ПРИСВАИВАЕМ ЗНАЧЕНИЕ
	}
};