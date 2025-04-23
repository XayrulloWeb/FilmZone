// BACKEND/controllers/auth.controller.js
const BaseError = require('../errors/base.error');
const authService = require('../service/auth.service'); // Убедись, что этот путь верный
const { validationResult } = require('express-validator');
const User = require('../models/user.model');
const UserDto = require('../dtos/user.dto'); // Убедись, что этот путь верный

class AuthController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// Убедись, что валидация включает username
				return next(BaseError.BadRequest('Error with validation', errors.array()));
			}
			// --- ПОЛУЧАЕМ USERNAME ИЗ ЗАПРОСА ---
			const { email, password, username } = req.body; // Добавили username
			// ------------------------------------

			// --- ПЕРЕДАЕМ USERNAME В СЕРВИС ---
			// Сервис authService.register теперь должен принимать username
			const data = await authService.register(email, password, username);
			// ---------------------------------

			res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
			// data.user из сервиса теперь должен содержать username (через DTO)
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async activation(req, res, next) {
		try {
			// Логика активации может потребовать user ID или activationLink
			// Пока оставляем как есть, но возможно, тут тоже нужны изменения
			// const activationLink = req.params.link; // Если активация по ссылке
			// await authService.activate(activationLink);
			const userId = req.params.id; // Если активация по ID (менее безопасно)
			await authService.activation(userId); // Убедись, что сервис использует правильный метод
			return res.redirect(process.env.CLIENT_URL || '/'); // Лучше иметь CLIENT_URL в .env
		} catch (error) {
			next(error);
		}
	}

	async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const data = await authService.login(email, password);
			res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
			// data.user из login также должен включать username (через DTO)
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			// Сервис logout удаляет токен из БД
			const token = await authService.logout(refreshToken);
			res.clearCookie('refreshToken');
			// Возвращаем простой ответ
			return res.status(200).json({ success: true, message: "Logged out successfully" });
		} catch (error) {
			next(error);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const data = await authService.refresh(refreshToken);
			res.cookie('refreshToken', data.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
			// data.user здесь тоже должен содержать username (через DTO)
			return res.json(data);
		} catch (error) {
			next(error);
		}
	}

	// Этот метод обычно не нужен для стандартной аутентификации,
	// и должен быть защищен (только для админов).
	async getUsers(req, res, next) {
		try {
			// Добавь проверку прав (например, через middleware)
			// if (req.user.role !== 'ADMIN') {
			//     return next(BaseError.Forbidden('Access denied'));
			// }
			const users = await authService.getUsers(); // Убедись, что сервис getUsers существует и возвращает нужные данные
			return res.json(users); // Возвращает список пользователей (возможно, тоже через DTO)
		} catch (error) {
			next(error);
		}
	}

	// Получение данных ТЕКУЩЕГО пользователя (кто отправил токен)
	async getMe(req, res, next) {
		try {
			// authMiddleware должен добавить payload токена в req.user
			if (!req.user || !req.user.id) {
                return next(BaseError.UnauthorizedError()); // Нет данных пользователя в запросе
            }
			const userId = req.user.id;
			// Запрашиваем ПОЛНЫЕ данные пользователя из сервиса или напрямую из модели
			// Лучше через сервис, если есть доп. логика
			const user = await User.findById(userId);
			if (!user) {
				// Хотя токен валиден, пользователя в БД нет (редкая ситуация)
				return next(BaseError.NotFound('User associated with this token not found'));
			}
			// Используем DTO, чтобы отдать только нужные поля (включая username)
			const userDto = new UserDto(user); // Убедись, что UserDto включает username
			return res.json(userDto);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthController();