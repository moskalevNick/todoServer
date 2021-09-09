const ApiError = require('../exceptions/api-error');
const todoService = require('../service/todo-service');

class TodosController {
    async getTodos(req, res, next) {
    try {
        const todos = await todoService.getTodosByUserId( req.user.id )
        switch(req.query.type){
            case 'main':
                if(req.query.deadline === 'all'){
                    res.json(todos)
                } else {
                    const filteredTodos = todos.filter((el) => el.deadline === req.query.deadline )
                    res.json(filteredTodos)
                }
                break
            case 'important':
                const importantTodos = todos.filter((el) => el.important === true)
                if(req.query.deadline === 'all'){
                    res.json(importantTodos)
                } else {
                    const filteredImportantTodos = todos.filter((el) => el.deadline === req.query.deadline )
                    res.json(filteredImportantTodos)
                }
                break
            case 'checked':
                const checkedTodos = todos.filter((el) => el.checked === true)
                if(req.query.deadline === 'all'){
                    res.json(checkedTodos)
                } else {
                    const filteredCheckedTodos = todos.filter((el) => el.deadline === req.query.deadline )
                    res.json(filteredCheckedTodos)
                }
                break
            default:
                res.json(todos)
                break
        }
    } catch (e) {
        next(e);
    }
  }

    async createTodo(req, res, next) {
        try {
            if(!req.body.title){
                throw new ApiError.BadRequest
            }
            await todoService.createTodo({ title: req.body.title, date: req.body.date, userId: req.user.id });
            return res.json({});
        } catch (e) {
            next(e);
        }
    }

    async deleteTodo(req, res, next) {
        try {
            const todos = await todoService.getTodosByUserId( req.user.id )
            const currentTodo = todos.filter( todo => todo.id === req.params.id )[0]
            if(!currentTodo){
                return next(ApiError.BadRequest('некорректный id'))
            }
            await todoService.deleteTodoById( req.params.id );
            return res.json({});
        } catch (e) {
            next(e);
        }
    }

    async deleteCheckedTodos(req, res, next) {
        try {
            const todos = await todoService.getTodosByUserId( req.user.id )
            const checkedTodos = todos.filter( todo => todo.checked === true )
            for (const todo of checkedTodos) {
                await todoService.deleteTodoById( todo._id );
            }
            return res.json({});
        } catch (e) {
            next(e);
        }
    }

    async updateTodo(req, res, next) {
        try {
            const todos = await todoService.getTodosByUserId( req.user.id )
            const currentTodo = todos.filter( todo => todo._id.toString() === req.params.id )[0]
            if(!currentTodo){
                return next(ApiError.BadRequest('некорректный id'))
            }
            if(!req.body.type){
                return next(ApiError.BadRequest('не указано поле type'))
            }
            if(req.body.type !== 'important' && req.body.type !== 'checked'){
                return next(ApiError.BadRequest('некорректный тип'))
            } 
            await todoService.updateTodoById( { id: req.params.id, type: req.body.type } );
            return res.json({});
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TodosController();