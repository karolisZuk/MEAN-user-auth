const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const TaskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required:true
    },
    taskDescription: {
        type:String
    }, 
    taskOwner:{
        type:String,
        required:true
    },
    taskProjectCode:{
        type:String,
        required:true
    },
    createdAt:{
       type:Date,
       required:true,
       default: Date.now
    },
    timeSpentOnTask:{
        type: Number,
        default:0
    },
    taskPriority: {
        type: Number,
        default:0,
        required:true
    },
    taskStatus:{
        type: String,
        default: 'Pending',
        required: true
    }
});

const Task = module.exports = mongoose.model('Task', TaskSchema);

module.exports.getTaskOwnerByTasktId = (id, callback) => {
    Task.findById(id, 'owner', callback);
};

module.exports.getTaskByOwner = (id, callback) => {
   const query = {taskOwner:id};
   Task.find(query, callback);
};

module.exports.getTaskByProjectId = (id, callback) => {
    const query = {taskProjectCode:id};
    Task.find(query, callback);
};

module.exports.addTask = (newTask, callback) => {
    newTask.save(callback);
 };

 module.exports.getTaskOwnerByTaskId = (id, callback) => {
    Task.findById(id, 'taskOwner', callback);
 }

 module.exports.changeTaskStatus = (request, callback) => {
    Task.findOneAndUpdate({ _id:request._id},{taskStatus:request.newStatus}, callback);
 }

module.exports.deleteAllTasksAsosiatedWithProject = (projectId, callback) => {
    Task.deleteMany({taskProjectCode: projectId}, callback);
}