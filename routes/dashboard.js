const express = require('express');
const router = express.Router();
const Project = require('../models/project');
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
            console.log(`${new Date().toLocaleString() } user, named ${req.body.username} just created a project.`);
        }
    });
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

router.post('/overview/delete/project', passport.authenticate('jwt', { session:false }), (req, res, next) => {
    const ownerId = req.user._id;
    const user = req.user;
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
                    console.log(res);
                    return res.json({success: true, msg:'Project deleted.'});
                }
            });
        }
    });
});

module.exports = router;
