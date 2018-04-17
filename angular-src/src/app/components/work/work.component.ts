import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  }

  selectProject(project){
    this.selectedProject = project;
    this.getAllTasks(this.selectedProject._id);
  }

  getAllTasks(projectId){
    this.projectService.getAllProjectTasks(projectId).subscribe(data => {
      this.tasks=[];
      this.tasks = data.tasks;
      this.pendingTasks = this.filterTasksByStatus(this.tasks,'Pending');
      this.inProgressTasks = this.filterTasksByStatus(this.tasks,'inProgress');
      this.finishedTasks = this.filterTasksByStatus(this.tasks,'finished');
      return true;
    });
  }

  onNewTaskSubmit(){
    const task = {
      taskTitle: this.taskTitle,
      taskDescription: this.taskDescription,
      taskPriority: this.taskPriority,
      taskProjectCode:this.selectedProject._id
    }
    this.projectService.registerNewTask(task).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass:'alert alert-success text-center', timeout: 3000});
        this.getAllTasks(this.selectedProject._id);
     } else {
      this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
     }
   });
  }

  deleteTask(taskCode){
    this.projectService.deleteTask(taskCode).subscribe(data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass:'alert alert-success text-center', timeout: 3000});
        this.getAllTasks(this.selectedProject._id);
     } else {
      this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
      this.getAllTasks(this.selectedProject._id);
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
