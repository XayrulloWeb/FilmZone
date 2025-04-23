// BACKEND/service/auth.service.js
const UserDto = require('../dtos/user.dto');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service');
const mailService = require('./mail.service'); // Убедись, что mailService настроен и работает
const BaseError = require('../errors/base.error');

class AuthService {
	// --- ИЗМЕНЕНО: Добавлен параметр username ---
	async register(email, password, username) {
		// Проверяем существование email
		const existEmail = await userModel.findOne({ email });
		if (existEmail) {
			throw BaseError.BadRequest(`User with email ${email} already registered`);
		}

		// --- ДОБАВЛЕНО: Проверка существования username ---
		const existUsername = await userModel.findOne({ username });
		if (existUsername) {
			throw BaseError.BadRequest(`Username ${username} is already taken`);
		}
		// ---------------------------------------------

		const hashPassword = await bcrypt.hash(password, 10);

		// --- ДОБАВЛЕНО: Сохраняем username при создании пользователя ---
		const user = await userModel.create({ email, password: hashPassword, username });
		// -----------------------------------------------------------

		// DTO теперь должен включать username (мы обновим DTO дальше)
		const userDto = new UserDto(user);

		// Отправка письма активации (если используется)
		// Убедись, что ссылка активации генерируется правильно, если она нужна
		// Пример ссылки активации (если используется):
		// const activationLink = `${process.env.API_URL}/api/auth/activation/${user._id}`; // Или другой уникальный идентификатор/токен
		// await mailService.sendMail(email, activationLink);

		const tokens = tokenService.generateToken({ ...userDto }); // Генерируем токены с данными DTO
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		// Возвращаем DTO пользователя и токены
		return { user: userDto, ...tokens };
	}

	async activation(userId) {
		// Находим пользователя по ID (менее безопасно, чем по уникальной ссылке)
		const user = await userModel.findById(userId);
		if (!user) {
			throw BaseError.BadRequest('Activation user not found'); // Изменено сообщение
		}
		if (user.isActivated) {
			// Можно добавить обработку, если пользователь уже активирован
			console.log(`User ${user.email} is already activated.`);
			// throw BaseError.BadRequest('Account already activated');
			return; // Просто выходим, если уже активирован
		}
		user.isActivated = true;
		await user.save();
		console.log(`User ${user.email} activated successfully.`);
	}

	async login(email, password) {
		const user = await userModel.findOne({ email });
		if (!user) {
			// Не говорим "User not defined", а даем общую ошибку
			throw BaseError.BadRequest('Invalid email or password');
		}

		const isPassword = await bcrypt.compare(password, user.password);
		if (!isPassword) {
			throw BaseError.BadRequest('Invalid email or password');
		}

        // Проверка активации (опционально, можно разрешить вход неактивированным)
        // if (!user.isActivated) {
        //     throw BaseError.BadRequest('Account is not activated. Please check your email.');
        // }

		// DTO будет включать username после обновления
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { user: userDto, ...tokens };
	}

	async logout(refreshToken) {
		if (!refreshToken) {
			// Если токена нет в куках, просто выходим
			console.log("Logout attempt without refresh token cookie.");
			return { success: true }; // Или бросаем ошибку, если это не ожидается
		}
		// Удаляем токен из БД
		const result = await tokenService.removeToken(refreshToken);
		// result может содержать информацию об удалении, например { deletedCount: 1 }
		console.log("Token removal result:", result);
		return { success: true }; // Возвращаем успех
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw BaseError.UnauthorizedError('Refresh token not provided');
		}

		const userPayload = tokenService.validateRefreshToken(refreshToken);
		const tokenDb = await tokenService.findToken(refreshToken);

		// Если токен невалиден или его нет в БД
		if (!userPayload || !tokenDb) {
			throw BaseError.UnauthorizedError('Invalid or expired refresh token');
		}

		// Находим пользователя по ID из токена
		const user = await userModel.findById(userPayload.id);
		if (!user) {
			// Редкая ситуация: токен есть, пользователя нет
			throw BaseError.UnauthorizedError('User not found for this token');
		}

		// DTO будет включать username
		const userDto = new UserDto(user);
		const tokens = tokenService.generateToken({ ...userDto });
		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return { user: userDto, ...tokens };
	}

	// Получение списка пользователей (обычно для админа)
	async getUsers() {
		// Возвращаем только нужные поля через DTO для безопасности
		const users = await userModel.find();
		// Преобразуем каждого пользователя в DTO
		return users.map(user => new UserDto(user));
	}
}

module.exports = new AuthService();