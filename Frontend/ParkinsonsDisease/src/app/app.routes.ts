import { Routes } from '@angular/router';
import { DrawingDetectionComponent } from './drawing-detection/drawing-detection.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SpeechDetectionComponent } from './speech-detection/speech-detection.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: 'drawing',
        component: DrawingDetectionComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'speech',
        component: SpeechDetectionComponent
    },
];
