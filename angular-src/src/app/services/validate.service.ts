import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class ValidateService {
errors: any;

  constructor(private http: Http) {
    this.errors = {};
   }

  validateLenght(stringVal, lenght){
    return stringVal.lenght >= lenght;
  }

  validateUsername(username){
    delete this.errors.username;
    const re = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    if(username.length < 3){
      this.errors.username = 'This must be atleast 4 characters long';
    }
    else if(!re.test(username)){
      this.errors.username = 'This must only contain characters and number. No other special characters are allowed';
    } else {
      this.usernameTaken(username).subscribe(response => {
        this.errors.username = response.msg;
      })
    }
    return this.errors;
  }

  validateName(name){
    delete this.errors.name;
    const re = /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
    if(!re.test(name)){
      this.errors.name = 'This must only contain legal latin characters and must be atleast 2 characters long';
    }
    return this.errors;
  }

  validateEmail(email){
    delete this.errors.email;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(email)) {
      this.errors.email = 'This must be a valid email address';
    } else {
    this.emailExists(email).subscribe(response => {
      this.errors.email = response.msg;      
      return this.errors;
    });}

    return this.errors;
  }

  emailExists(email){
    let headers = new Headers();
    const query = {email:email};
    headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/users/check/if/email/exists', query, {headers:headers})
        .map(res => res.json());  
  }

  usernameTaken(username){
    let headers = new Headers();
    const query = {username:username};
    headers.append('Content-type', 'application/json');
      return this.http.post('http://localhost:3000/users/check/if/username/exists', query, {headers:headers})
        .map(res => res.json()); 
  }

  validatePassword(password){
    delete this.errors.password;
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  }
}
