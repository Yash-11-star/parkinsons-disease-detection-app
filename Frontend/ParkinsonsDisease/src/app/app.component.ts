import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { DrawingDetectionComponent } from "./drawing-detection/drawing-detection.component";
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { SpeechDetectionComponent } from './speech-detection/speech-detection.component';
import { LoginComponent } from './login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, DrawingDetectionComponent, RouterLink, HomeComponent, HttpClientModule, SpeechDetectionComponent,LoginComponent]
})
export class AppComponent {
  title = 'ParkinsonsDisease';
}
