// BACKEND/middlewares/auth.middleware.js
const BaseError = require('../errors/base.error');
const tokenService = require('../service/token.service');

module.exports = function (req, res, next) {
	console.log('--- Auth Middleware Start ---'); // <-- Лог 1: Начало работы middleware
	try {
		const authorization = req.headers.authorization;
		console.log('Authorization Header:', authorization); // <-- Лог 2: Показываем заголовок

		if (!authorization) {
            console.log('Error: No Authorization header'); // <-- Лог ошибки
			return next(BaseError.UnauthorizedError());
		}

		const accessToken = authorization.split(' ')[1];
		console.log('Access Token:', accessToken); // <-- Лог 3: Показываем токен

		if (!accessToken) {
            console.log('Error: No Access Token found after split'); // <-- Лог ошибки
			return next(BaseError.UnauthorizedError());
		}

		// --- ИЗМЕНЕНИЕ: Проверяем токен и логируем результат ---
		const userData = tokenService.validateAccessToken(accessToken);
		console.log('User Data from token:', userData); // <-- Лог 4: Показываем результат валидации

		if (!userData) {
            console.log('Error: Invalid Access Token (validateAccessToken returned null)'); // <-- Лог ошибки
			return next(BaseError.UnauthorizedError());
		}
        // ------------------------------------------------------

		req.user = userData;
        console.log('--- Auth Middleware Success: User attached ---'); // <-- Лог 5: Успех
		next(); // Передаем управление дальше (в контроллер getMe)

	} catch (error) {
        console.error('--- Auth Middleware CATCH Error ---:', error); // <-- Лог 6: Ловим любые другие ошибки
		return next(BaseError.UnauthorizedError());
	}
}