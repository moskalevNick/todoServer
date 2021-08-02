const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const todosController = require('../controllers/todos-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    body('name').isLength({min: 2, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.post('/city/:id', userController.setCity);
router.get('/todos', authMiddleware, todosController.getTodos);
router.put('/todos', authMiddleware, todosController.createTodo);
router.delete('/todos/:id', authMiddleware, todosController.deleteTodo);
router.delete('/todos', authMiddleware, todosController.deleteCheckedTodos);
router.post('/todos/:id', authMiddleware, todosController.updateTodo);

module.exports = router
