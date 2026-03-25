import { Component } from '@angular/core';
import { DrawingDetectionServiceService } from '../services/drawing-detection-service.service';
import { AuthService } from '../services/auth.service';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-drawing-detection',
  templateUrl: './drawing-detection.component.html',
  styleUrl: './drawing-detection.component.css'
})
export class DrawingDetectionComponent {
  selectedImage: File | null = null;
  detectionResult: any = 0
  val = 'wave'
  type: any;
  uploadInProgress: boolean = false; // Flag to control spinner visibility

  constructor( private service: DrawingDetectionServiceService, private authService: AuthService )
  {}

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

  // uploadSpiralImage(): void {
  //       if (this.selectedImage) {
  //         const formData = new FormData();
  //         formData.append('image', this.selectedImage);
  //         this.service.uploadSpiralImage(formData).subscribe(response => {
  //           console.log(response);
  //           // Handle the response as needed
  //         });
  //         this.getSpiralDrawingDetection();
  //       }
  // }
  uploadSpiralImage(): void {
    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage);
      this.uploadInProgress = true;
      this.service.uploadSpiralImage(formData).subscribe(response => {
        console.log("response of uploadspiralimage: ",response);

        // Store the image URL in Firestore with the user ID
        this.authService.getCurrentUser().subscribe(user => {
          if (user) {
            const userId = user.uid;
            const imageUrl = response[1];
            console.log("Image url: ",imageUrl)  // Assuming the response is the image URL
            // Store imageUrl in Firestore with the userId
            this.authService.storeImageUrlInFirestore(userId, imageUrl);
          }
        });

        // Update detection result or do any other necessary actions
        this.getSpiralDrawingDetection();
        this.uploadInProgress = false;
      });
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
      this.uploadInProgress = true;
      this.service.uploadWaveImage(formData).subscribe(response => {
        console.log("response of uploadwaveimage: ",response);

        // Store the image URL in Firestore with the user ID
        this.authService.getCurrentUser().subscribe(user => {
          if (user) {
            const userId = user.uid;
            const imageUrl = response[1];  // Assuming the response is the image URL
            console.log(imageUrl)
            // Store imageUrl in Firestore with the userId
            this.authService.storeImageUrlInFirestore(userId, imageUrl);
          }
        });

        // Update detection result or do any other necessary actions
        this.getWaveDrawingDetection();
        this.uploadInProgress = false;
      });
    }
  }



}
