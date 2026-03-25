import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}
  ngOnInit()
  {
    this.authService.logout()
  }
  getUser(uid:any, pass:any)
  {
    this.email = uid
    this.password = pass
    console.log(this.email, this.password)
      this.authService.login(this.email, this.password)
    
    
  }

 
  
  
}
