const {Schema, model} = require('mongoose');

const TodoSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    title: { type: String, required: true },
    important: { type: Boolean, required: true },
    checked: { type: Boolean, required: true },
    date: { type: String, required: true},
    deadline: { type: String, required: true}
})

module.exports = model('Todo', TodoSchema);
