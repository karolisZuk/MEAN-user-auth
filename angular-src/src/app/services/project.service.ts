import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable() 
export class ProjectService {
  authToken: any;
  user: any;

  constructor(private http: Http) { }

  registerProject(project){  
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json'); 
    headers.append('Authorization', this.authToken);
    return this.http.post('http://localhost:3000/dashboard/overview/create-new-project', project, {headers:headers})
    .map(res => res.json());
}

registerNewTask(task){
  let headers = new Headers();
  this.loadToken();
  headers.append('Content-type', 'application/json');
  headers.append('Authorization', this.authToken);
  return this.http.post('http://localhost:3000/dashboard/work/create-new-task', task, {headers:headers})
  .map(res => res.json());
}

  getAllUsersProjects(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.authToken);
      return this.http.get('http://localhost:3000/dashboard/overview/get/all/projects', { headers:headers })
        .map(res => res.json());
  }

  deleteProject(projectId){
    const query = {projectId:projectId};
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.authToken);
      return this.http.post('http://localhost:3000/dashboard/overview/delete/project', query, {headers:headers})
        .map(res => res.json());
  }

  deleteTask(taskId){
    const query = {taskId:taskId};
    let headers = new Headers();
    this.loadToken();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.authToken);
      return this.http.post('http://localhost:3000/dashboard/work/delete/task', query, {headers:headers})
        .map(res => res.json());
  }

  getAllProjectTasks(projectId){
     let headers = new Headers();
     this.loadToken();
     const query = {projectId:projectId};
     headers.append('Content-type', 'application/json');
     headers.append('Authorization', this.authToken);
     return this.http.post('http://localhost:3000/dashboard/overview/work/get/all/tasks', query, { headers:headers })
     .map(res => res.json());
  }

loadToken(){
  const token = localStorage.getItem('id_token');
  this.authToken = token;
}

  }


