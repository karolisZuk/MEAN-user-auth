import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.css']
})
export class CreateNewProjectComponent implements OnInit {
  projectName: String;
  description: String;
  owner: any;
  gitRepo: String;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onNewProjectSubmit(){
    const project = {
      projectName: this.projectName,
      description: this.description,
      gitRepo: this.gitRepo
    }
    
    this.projectService.registerProject(project).subscribe(data => {
      if(data.success){
         this.flashMessage.show(data.msg, {cssClass:'alert alert-success text-center', timeout: 5000});
         this.router.navigate(['dashboard/overview']);
      } else {
       this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout: 5000});
       this.router.navigate(['dashboard/overview']);
      }
    });
 
   }

}
