import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DrawingDetectionServiceService } from '../services/drawing-detection-service.service';
@Component({
  selector: 'app-drawing-detection',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './drawing-detection.component.html',
  styleUrl: './drawing-detection.component.css'
})
export class DrawingDetectionComponent {
  selectedImage: File | null = null;
  detectionResult: any = 0
  val : any
type: any;
  constructor( private service: DrawingDetectionServiceService )
  {
    
  }

  getVal( type: any )
  { 
    this.val = type
    console.log(type)
  }

  onFileSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  getSpiralDrawingDetection(): void
  {
    this.service.getSpiralDrawingDetection().subscribe(res => {
      console.log(res)
      this.detectionResult = res
    })
  }

  uploadSpiralImage(): void {
        if (this.selectedImage) {
          const formData = new FormData();
          formData.append('image', this.selectedImage);
          this.service.uploadSpiralImage(formData).subscribe(response => {
            console.log(response);
            // Handle the response as needed
          });
          this.getSpiralDrawingDetection();
        }
  }

  getWaveDrawingDetection(): void
  {
    this.service.getWaveDrawingDetection().subscribe(res => {
      console.log(res)
      this.detectionResult = res
    })
  }

  uploadWaveImage(): void {
        if (this.selectedImage) {
          const formData = new FormData();
          formData.append('image', this.selectedImage);
          this.service.uploadWaveImage(formData).subscribe(response => {
            console.log(response);
            // Handle the response as needed
          });
          this.getWaveDrawingDetection();
        }
  }

  

}
