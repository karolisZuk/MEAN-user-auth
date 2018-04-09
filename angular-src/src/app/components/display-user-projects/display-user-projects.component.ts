import { Component, OnInit } from '@angular/core';
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

  deleteProject(){
    console.log('deleting');
  }

  ngOnInit() {
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
