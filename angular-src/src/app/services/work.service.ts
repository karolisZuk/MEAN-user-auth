import { Injectable } from '@angular/core';

@Injectable()
export class WorkService {
  isWorking: boolean;
  startTime: Date;
  endTime: Date;
 public workingTask: any;

  constructor() {
    this.isWorking = false;
   }

   startWork(task){
    this.workingTask = task;
    this.isWorking = true;
    this.startTime = new Date();
   }

   endWork(){
     this.isWorking = false;
     this.endTime = new Date();
     this.workingTask = {};
   }

   storeWork(){
    console.log(this.startTime);
    console.log(this.endTime);
    console.log(this.workingTask);
   }

   getWorkingTask(){
     return this.workingTask;
   }

}
