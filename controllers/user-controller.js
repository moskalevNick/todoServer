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
                {maxAge: 30 * 24 * 60 * 60 * 1000, secure: false}
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
            console.log(userData);
            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, secure: true, httpOnly: false}
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
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect('https://perfecttodolist.netlify.app/');
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, 
                {maxAge: 30 * 24 * 60 * 60 * 1000, secure: false}
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
