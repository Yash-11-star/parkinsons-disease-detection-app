import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
constructor (private authService: AuthService, private snackBar: MatSnackBar)
{}
ngOnInit()
{
  this.openSnackBar('Logged in successfully', 'Close');
}

openSnackBar(message: string, action: string): void {
  this.snackBar.open(message, action, {
    duration: 5000,
  });
}


}
