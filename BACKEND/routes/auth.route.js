// BACKEND/routes/auth.route.js
const express = require('express');
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware'); // Убедись, что он есть и работает

const router = express.Router();

router.post(
	'/register',
	// Правила валидации:
	body('email', 'Invalid email').isEmail(),
	body('password', 'Password must be between 3 and 30 characters').isLength({ min: 3, max: 30 }),
	// --- ДОБАВЛЕНО ПРАВИЛО ВАЛИДАЦИИ USERNAME ---
	body('username', 'Username is required').notEmpty(), // Проверяем, что не пустое
	body('username', 'Username must be between 3 and 20 characters').isLength({ min: 3, max: 20 }), // Задаем длину
	body('username', 'Username can only contain letters, numbers, and underscores').matches(/^[a-zA-Z0-9_]+$/), // Разрешаем буквы, цифры, _
	// ------------------------------------------
	authController.register // Передаем управление контроллеру
);

// Маршрут активации (если используется ID)
router.get('/activation/:id', authController.activation);

// Маршрут логина (валидация обычно не нужна здесь, т.к. проверяется в сервисе)
router.post('/login', authController.login);

// Маршрут выхода
router.post('/logout', authController.logout); // Не требует authMiddleware

// Маршрут обновления токена
router.get('/refresh', authController.refresh); // Не требует authMiddleware

// Маршрут получения данных текущего пользователя
// authMiddleware должен проверить токен и добавить req.user
router.get('/me', authMiddleware, authController.getMe);

// Маршрут получения всех пользователей (защитить!)
// authMiddleware здесь должен проверять не только токен, но и роль (например, 'ADMIN')
router.get('/users', authMiddleware, authController.getUsers); // Должен быть защищен middleware

module.exports = router;