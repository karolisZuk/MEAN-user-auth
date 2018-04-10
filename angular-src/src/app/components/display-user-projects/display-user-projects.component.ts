import { Component, OnInit, HostListener, HostBinding } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-display-user-projects',
  templateUrl: './display-user-projects.component.html',
  styleUrls: ['./display-user-projects.component.css']
})
export class DisplayUserProjectsComponent implements OnInit {
  projects: any;
  constructor(
    private projectService: ProjectService,
    private flashMessage: FlashMessagesService
  ) { }

  deleteProject(id){
    this.projectService.deleteProject(id).subscribe(res => {
      if(res.success){
      this.flashMessage.show(res.msg, {
        cssClass:'alert-success alert text-center',
        timeout: 5000
      });
      this.getAllProjects();}
    }); 
  }

  ngOnInit() {
    this.getAllProjects();
  }
//shit sucks, but it kind of works
  public update(){
    this.getAllProjects();
  }

  getAllProjects (){
    this.projectService.getAllUsersProjects().subscribe(projects => {
      this.projects = projects.projects;
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
