import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrawingDetectionComponent } from './drawing-detection/drawing-detection.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SpeechDetectionComponent } from './speech-detection/speech-detection.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'drawing',
    component: DrawingDetectionComponent,
    canActivate: [AuthGuard]
},
{
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
},
{
    path: 'login',
    component: LoginComponent
},
{
    path: 'speech',
    component: SpeechDetectionComponent,
    canActivate: [AuthGuard]
},
{
    path: 'register',
    component: RegisterComponent
},
{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full',
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
