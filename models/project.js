const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const ProjectSchema = mongoose.Schema({
    projectName: {
        type: String,
        required:true
    },
    description: {
        type:String
    }, 
    owner:{
        type:String,
        required:true
    },
    gitRepo:{
        type:String
    }
});

const Project = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.getProjectOwnerByProjectId = (id, callback) => {
    Project.findById(id, 'owner', callback);
}

module.exports.getProjectByOwner = (id, callback) => {
   const query = {owner:id};
   Project.find(query, callback);
}

module.exports.addProject = (newProject, callback) => {
    newProject.save(callback);
    };