import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;
  repeatPassword:String;
  errors: any = {
  };

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  validateName(val){
    this.errors = this.validateService.validateName(val);
  }

  validateUsername(val){
    this.errors = this.validateService.validateUsername(val);
  }

  validateEmail(val){
    this.errors = this.validateService.validateEmail(val);
  }

  validatePassword(val){
    if(!this.validateService.validatePassword(val)){
      this.errors.password = 'The password should be atleast 8 symbols long and contain one number';
    } else {
      this.errors.password = '';
    }
  }

  validateRepeatPassword(password, repeatPassword) {
    if(password === repeatPassword){
      this.errors.repeatPassword = '';
    }else {
      this.errors.repeatPassword = 'Repeat password does not match'
    }
  }

  onRegisterSubmit(){ 
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
  
    this.authService.registerUser(user).subscribe( data => {
      if(data.success){
        this.flashMessage.show(data.msg, {cssClass:'alert alert-success text-center', timeout:3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show(data.msg, {cssClass:'alert alert-danger text-center', timeout:3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
