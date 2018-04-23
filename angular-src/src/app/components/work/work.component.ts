import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import * as _ from 'lodash';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {
  private projects: any;
  private selectedProject: any;
  private tasks:any;
  private pendingTasks:any;
  private inProgressTasks: any;
  private finishedTasks:any;

  taskTitle: String;
  taskDescription: String;
  taskPriority: Number;

  constructor(
    private projectService: ProjectService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getAllProjects();
    if(this.projectService.selectedProject){
      this.getAllTasks(this.projectService.selectedProject._id);
    }
  }


  dropToFinished(data: any){
    let previousStatus = data.taskStatus;
    this.projectService.changeTaskStatus(data, 'finished').subscribe(response => {
        if(response.success){
          this.getAllTasks(this.projectService.selectedProject._id);
        } else {
      this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
     }
    });
  }

  dropToPending(data: any){
    let previousStatus = data.taskStatus;
    this.projectService.changeTaskStatus(data, 'Pending').subscribe(response => {
      if(response.success){
        this.getAllTasks(this.projectService.selectedProject._id);
      } else {
    this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
   }
    });
  }


  dropToProgress(data: any){
    let previousStatus = data.taskStatus;
    this.projectService.changeTaskStatus(data, 'inProgress').subscribe(response => {
      if(response.success){
        this.getAllTasks(this.projectService.selectedProject._id);
      } else {
    this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
   }
    });
  }

  selectProject(project){
    this.projectService.selectedProject = project;
    this.getAllTasks(this.projectService.selectedProject._id);
  }

  getAllTasks(projectId){
    this.projectService.getAllProjectTasks(projectId).subscribe(data => {
      this.tasks = data.tasks;
      this.pendingTasks = this.filterTasksByStatus(this.tasks,'Pending');
      this.pendingTasks = this.filterTasksByPriority(this.pendingTasks);

      this.inProgressTasks = this.filterTasksByStatus(this.tasks,'inProgress');
      this.inProgressTasks = this.filterTasksByPriority(this.inProgressTasks);

      this.finishedTasks = this.filterTasksByStatus(this.tasks,'finished');
      this.finishedTasks = this.filterTasksByPriority(this.finishedTasks);
      return true;
    });
  }

  onNewTaskSubmit(){
    const task = {
      taskTitle: this.taskTitle,
      taskDescription: this.taskDescription,
      taskPriority: this.taskPriority,
      taskProjectCode:this.projectService.selectedProject._id
    }
    this.projectService.registerNewTask(task).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass:'alert alert-success text-center', timeout: 3000});
        this.resetTaskSubmitFields();
        this.getAllTasks(this.projectService.selectedProject._id);
     } else {
      this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
     }
   });
  }

  resetTaskSubmitFields(){
    this.taskTitle='';
    this.taskDescription = '';
    this.taskPriority = 0;
  }

  deleteTask(taskCode){
    this.projectService.deleteTask(taskCode).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass:'alert alert-success text-center', timeout: 3000});
        this.getAllTasks(this.projectService.selectedProject._id);
     } else {
      this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
      this.getAllTasks(this.projectService.selectedProject._id);
     }
    });
  }

  filterTasksByStatus(tasks, status){
    let arr=[];
    for(let i=0; i<tasks.length; i++){
      if(tasks[i].taskStatus === status)
      {
        arr.push(tasks[i]);
      }
    }
    return arr;
  }

  filterTasksByPriority(tasks){
    let sorted = _.sortBy(tasks, 'taskPriority');
    return sorted;
  }

  getAllProjects (){ 
    this.projectService.getAllUsersProjects().subscribe(data => {
      this.projects = data.projects;
      return true;
    },
  err => {
    this.flashMessage.show(err, {
      cssClass:'alert-danger alert text-center',
      timeout: 5000
    });
    return false;
  });
  }

}
