import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { CreateNewProjectComponent } from './components/create-new-project/create-new-project.component';
import { OverviewComponent } from './components/overview/overview.component';
import { ProjectService } from './services/project.service';
import { DisplayUserProjectsComponent } from './components/display-user-projects/display-user-projects.component';
import { WorkComponent } from './components/work/work.component';
import { DraggableDirective } from './directives/draggable.directive';
import { DropTargetDirective } from './directives/drop-target.directive';
import { DragService } from './services/drag.service';
import { WorkService } from './services/work.service';

const appRoutes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'login',component: LoginComponent},
  {path: 'dashboard',component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'profile',component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/overview',component: OverviewComponent, canActivate:[AuthGuard]},
  {path: 'dashboard/work',component: WorkComponent, canActivate:[AuthGuard]}

]

@NgModule({
  //modules
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SideMenuComponent,
    CreateNewProjectComponent,
    OverviewComponent,
    DisplayUserProjectsComponent,
    WorkComponent,
    DraggableDirective,
    DropTargetDirective
    ],
  //providers
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  //services
  providers: [ValidateService, AuthService, AuthGuard, ProjectService, DragService, WorkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
