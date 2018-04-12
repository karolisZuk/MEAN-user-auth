import { Component, OnInit, Output, EventEmitter, Input, HostListener } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DisplayUserProjectsComponent } from '../display-user-projects/display-user-projects.component';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.css'],
  providers: [DisplayUserProjectsComponent]
})
export class CreateNewProjectComponent implements OnInit {
  @Output() addNewProject = new EventEmitter();

  projectName: String;
  description: String;
  owner: any;
  website: String;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private displayProjectsComponent: DisplayUserProjectsComponent
  ) { 
  }

  ngOnInit() {
  }

  onNewProjectSubmit(){
    const project = {
      projectName: this.projectName,
      description: this.description,
      website: this.website
    }
    
    this.projectService.registerProject(project).subscribe(data => {
      if(data.success){
         this.flashMessage.show(data.msg, {cssClass:'alert alert-success text-center', timeout: 3000});
      } else {
       this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 3000});
       this.router.navigate(['dashboard/overview']);
      }
    });
    this.addNewProject.emit(null);
   }
}
