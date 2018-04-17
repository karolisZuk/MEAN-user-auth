const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const Tasks = require('../models/tasks');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const passport = require('passport')

router.post('/overview/create-new-project',passport.authenticate('jwt', { session:false }), (req, res, next) => {
    let newProject = new Project({
        projectName: req.body.projectName,
        description: req.body.description,
        owner:req.user._id,
        gitRepo:req.body.gitRepo
    });
Project.addProject(newProject, (err, project) => {
        if(err){
            res.json({success:false, msg:'Something went wrong while adding new project. Try again later.'});
        } else {
            res.json({success:true, msg:'Project was created. Stay productive!'});
            console.log(`${new Date().toLocaleString() } user, named ${req.user.username} just created a project.`);
        }
    });
});

router.post('/work/create-new-task',passport.authenticate('jwt', { session:false }), (req, res, next) => {
    let newTask = new Tasks({
        taskName:req.body.taskTitle,
        taskDescription:req.body.taskDescription,
        taskPriority:req.body.taskPriority,
        taskProjectCode:req.body.taskProjectCode,
        taskOwner:req.user._id
    });
    Tasks.addTask(newTask, (err, task) => {
        if(err) {
            console.log(err);
            return res.json({success:false, msg:'Failed to add a task.'});
        } else {
            console.log(`${new Date().toLocaleString() } user, named ${req.user.username} just added a task.`);
            return res.json({success:true, msg:'Task was added. Have fun!'});
        }
    })
});

router.get('/overview/get/all/projects', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    let ownerId = req.user._id;
    Project.getProjectByOwner(ownerId, (err, project) =>{
        if(err) return res.json({success: false, msg:'Error while fetching projects'});
        if(!project) return res.json({success: false, msg:'No projects found'});
        else{
            return res.json({success: true, projects:project});
        }
    });

});

router.post('/overview/work/get/all/tasks', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    let projectId = req.body.projectId;
    Tasks.getTaskByProjectId(projectId, (err, response) => {
        if(err) return res.json({success: false, msg:'Error while fetching tasks'});
        if(!response) return res.json({success: false, msg:'No tasks found'});
        else if (response){
            console.log(`${new Date().toLocaleString() } user, named ${req.user.username} just fetched all their tasks.`);
            return res.json({success: true, tasks:response});
        }

    });

});

router.post('/overview/delete/project', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    const ownerId = req.user._id;
    const projectId = req.body.projectId;

    Project.getProjectOwnerByProjectId(projectId, (err, response)=>{
        if(err) return res.json({success: false, msg:'Something went terribly wrong.:('});
        if(response == null) return res.json({success: false, msg:'Project does not exist'});
        else if (response){
            Project.deleteOne({'_id':response._id}, (err, response)=>{
                if (err){
                    console.log(err);
                    return res.json({success: false, msg:'Error, while deleting'});
                }
                if (response.ok){
                    return res.json({success: true, msg:'Project deleted.'});
                }
            });
        }
    });
});

router.post('/work/delete/task', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    const ownerId = req.user._id;
    const taskId = req.body.taskId;
        Tasks.getTaskOwnerByTaskId(taskId, (err, response) => {
            if(err){
                console.log(err);
                return res.json({success: false, msg:'Something went wrong. Try again later'});
            }
            if(!response){
                return res.json({success: false, msg:'You are not authorised to do this'});
            }
            else {
                if(response._id == taskId){
                    Tasks.deleteOne({'_id':taskId}, (err, response)=> {
                        if (err){
                            console.log(err);
                            return res.json({success: false, msg:'Error, while deleting task'});
                        }
                        if(response.ok){
                            console.log(`${new Date().toLocaleString() } user, named ${req.user.username} just deleted a task.`);
                            return res.json({success: true, msg:'Task deleted'});
                        }
                    })
                } else {
                    return res.json({success: false, msg:'You are anauthorised to do this.'});
                }
            }
        });
});

router.post('/work/add/task', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    const task = req.body;
    const taskProjectId = req.body.taskProjectCode;
    const taskOwner = req.body.taskOwner;
    const user = req.user;
    let taskProject = {};

    Project.getProjectByOwner(user._id, (err, response)=>{
        if(err){
            return res.json({success: false, msg:'Something went wrong :('});
        }
        if(response){
            response.map(project => {
                if(project._id == taskProjectId && project.owner == taskOwner){
                    taskProject = project;
                }
            });
        } else {
            return res.json({success: false, msg:'You are unauthorised to do this.'});
        }
        let newTask = new Tasks({
            owner:user._id,
            taskName: task.taskName,
	        taskDescription: task.taskDescription,
	        taskOwner:taskOwner,
	        taskProjectCode:task.taskProjectCode,
	        taskPriority:task.taskPriority,
	        taskStatus:task.taskStatus
        });

        Tasks.addTask(newTask, (err, task) =>{
            console.log(newTask);
            if (err) {
                console.log(err);
                return res.json({success:false, msg:'Something went wrong while adding new task. Try again later.'});
            } else {
                console.log(`${new Date().toLocaleString() } user, named ${user.username} just created a new task.`);
                return res.json({success:true, msg:'New task added. Get to work!'});
            }
        });
    });
});

module.exports = router;
