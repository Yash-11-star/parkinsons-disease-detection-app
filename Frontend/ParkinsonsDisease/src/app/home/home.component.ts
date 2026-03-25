import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
