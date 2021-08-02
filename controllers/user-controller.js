const userService = require('../service/user-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password, name} = req.body;
            const userData = await userService.registration(email, password, name);
            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true}
            )
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {name, password} = req.body;
            const userData = await userService.login(name, password);
            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true}
            ) 
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            console.log('ACTIVAAAAAAAAAAAAAAAAAAAAAAATE');
            const activationLink = req.params.link;
            console.log(activationLink);
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, 
                {maxAge: 30 * 24 * 60 * 60 * 1000, sameSite: 'none', secure: true}
            )
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async setCity(req, res, next) {
        try {
            const newCity = req.params.id
            const {name} = req.body
            const user = await userService.setCity(newCity, name);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}


module.exports = new UserController();
