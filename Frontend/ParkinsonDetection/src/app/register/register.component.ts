import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
constructor(private authService: AuthService){}
email: any;
password: any;
age: number = 0;
gender:any;
registerUser(uid:any, pass:any, age: number, gender: any)
{
  this.email = uid
  this.password = pass
  this.age = age
  this.gender = gender
  this.authService.register(this.email, this.password, this.age, this.gender);
}

 

}
