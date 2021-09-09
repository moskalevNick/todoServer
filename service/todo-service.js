const Todo = require('../models/todo-model')
const deadLineDate = require('../helpers/dateToDeadlineFormatter')

class TodosService {
    async getTodosByUserId( userId ) {
        const todos = await Todo.find({ userId })    
        return todos;
    }    

    async createTodo({ userId, title, date }) {
        const deadline = deadLineDate(date)
        const newTodo = new Todo({ title, userId, date, important: false, checked: false, deadline })
        await newTodo.save() 
    }    

    async deleteTodoById( id ) {
        await Todo.findByIdAndRemove(id)
    }  

    async updateTodoById( { id, type } ) {
        const todo = await Todo.findById(id)
        if (type === "checked") {
            await Todo.findByIdAndUpdate(id, {
                $set: { checked: !todo.checked },
            })
        }
        if (type === "important") {
            await Todo.findByIdAndUpdate(id, {
                $set: { important: !todo.important },
            })
        }
    }  
}

module.exports = new TodosService();
