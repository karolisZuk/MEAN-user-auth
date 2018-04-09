import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router:Router){

    }

    canActivate(){
        if(this.authService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

//ng build to build to public directory, then localhost:3000 should serve the build app
// for pushing to heroku https://www.youtube.com/watch?v=cBfcbb07Tqk