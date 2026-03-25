import { Component} from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ParkinsonDetection';
  hideChatbot: boolean = false;
  constructor(private authService: AuthService)
  {}
  logout()
  {
    if(this.authService.isAuthenticated())
    {
      this.authService.logout();
    }
    else
    {
      console.log('User not logged in.')
    }
  }

  response: string | undefined;
  selectedQuestion: string | undefined;
  selectedAnswer: string | undefined;

  askQuestion(questionNumber: number) {
    this.selectedQuestion = '';
    this.selectedAnswer = '';

    switch (questionNumber) {
      case 1:
        this.selectedQuestion = "What is Parkinson's Disease?";
        this.selectedAnswer = "Parkinson’s disease is a progressive disorder that is caused by degeneration of nerve cells in the part of the brain called the substantia nigra, which controls movement. These nerve cells die or become impaired, losing the ability to produce an important chemical called dopamine.";
        break;
      case 2:
        this.selectedQuestion = "How can Parkinson's Disease be detected?";
        this.selectedAnswer = "By analyzing hand-made drawings and audio, as hand tremors and vocal problems are observed in Parkinson's patients.";
        break;
      case 3:
        this.selectedQuestion = "What are the symptoms of Parkinson's Disease?";
        this.selectedAnswer = "a) Tremor in hands, arms, legs, jaw, or head\nb) Muscle stiffness, where muscle remains contracted for a long time\nc) Slowness of movement\nd) Impaired balance and coordination, sometimes leading to falls";
        break;
      default:
        break;
    }
  }

  resetSelection() {
    this.selectedQuestion = undefined;
    this.selectedAnswer = undefined;
  }

}
