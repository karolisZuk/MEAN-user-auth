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

  constructor(
    private projectService: ProjectService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.getAllProjects();
  }

  selectProject(project){
    this.selectedProject = project;
    console.log(this.selectedProject);
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
