import { Component } from '@angular/core';
import { SpeechDetectionServiceService } from '../services/speech-detection-service.service';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-speech-detection',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './speech-detection.component.html',
  styleUrl: './speech-detection.component.css'
})
export class SpeechDetectionComponent {
  selectedFile: File | null = null;
  constructor( private service: SpeechDetectionServiceService )
  {

  }
  ngOnInit():void {
    this.getSpeechDetection();
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // uploadAudio(): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('audio', this.selectedFile);
  //     this.service.uploadAudio(formData).subscribe(response => {
  //       console.log(response);
  //       // Handle the response as needed
  //     });
  //   }
  // }
  // uploadAudio(): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('audio', this.selectedFile);
  
  //     this.service.uploadAudio(formData).subscribe(
  //       response => {
  //         console.log(response);
  //         // Handle the response as needed
  //       },
  //       error => {
  //         console.error(error);
  //       }
  //     );
  //   }
  // }
  uploadAudio(): void {
    if (this.selectedFile) {
      this.service.uploadAudio(this.selectedFile).subscribe(
        response => {
          console.log(response);
          // Handle the response as needed
        },
        error => {
          console.error(error);
        }
      );
    }
  }

  getSpeechDetection(): void{
    this.service.getSpeechDetection().subscribe(res => {
      console.log(res);
    })
  }
}
