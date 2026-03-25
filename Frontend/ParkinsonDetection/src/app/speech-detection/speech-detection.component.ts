import { Component, ElementRef, ViewChild } from '@angular/core';
import { SpeechDetectionServiceService } from '../services/speech-detection-service.service';
import { AuthService } from '../services/auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-speech-detection',
  templateUrl: './speech-detection.component.html',
  styleUrl: './speech-detection.component.css'
})
export class SpeechDetectionComponent {
  selectedFile: File | null = null;
  audioDetection: any;
  audioUploadInProgress: boolean = false;
  showModels: boolean = false
  dataPoints1:any;
  chartOptions1: any;
  chartOptions2: any;
  dataPoints2: any;
  constructor( private service: SpeechDetectionServiceService, private authService: AuthService, private storage: AngularFireStorage, private elementRef: ElementRef )
  {}
  ngOnInit(): void { }

  chart: any;
  
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadAudio(): void {
    if (this.selectedFile) {
      this.audioUploadInProgress = true;
      console.log("Audio Upload PRogress:",this.audioUploadInProgress)
      this.service.uploadAudio(this.selectedFile).subscribe(
        response => {
          console.log("Response of uploadAudio",response);
          
          this.authService.getCurrentUser().subscribe(user => {
            if (user) {
              const userId = user.uid;
              const audioUrl = response[1];
              
              console.log("Audio URL and userid", audioUrl, userId);
              // Store audio URL in Firestore
              this.authService.storeAudioUrlInFirestore(userId, audioUrl);
            }
          });
          this.getSpeechDetection();
          this.audioUploadInProgress = false
          console.log("Response 2:",response[2])
          console.log("Audio Upload PRogress:",this.audioUploadInProgress)
        },
        error => {
          console.error(error);
        }
      );
    }
  }


  getSpeechDetection(): void {
    this.service.getSpeechDetection().subscribe(res => {
      this.audioDetection = res
      const dataPoints1 = Object.entries(this.audioDetection[1]).map(([label, value]) => ({
        label: `${label}: ${value === 'Healthy' ? 'Healthy' : 'Parkinson'}`,
        y: value === 'Parkinson' ? 1 : 0
      }));
      console.log(this.audioDetection[2])
      const keys = Object.keys(this.audioDetection[2]);
      const values = Object.values(this.audioDetection[2]).map(value => parseInt(String(value)));
      const dataPoints2 = keys.map((key, index) => ({
        label: key,
        y: values[index]
      }));
      console.log("Datapoints2 : ",dataPoints2)
      this.dataPoints1 = dataPoints1
      this.dataPoints2 = dataPoints2
      const chartOptions1 = {
        title:{
          text: 'Models Wise Predictions'
        },
        animationEnabled: true,
        axisY: {
          includeZero: true,
          suffix: "",
        },
        data: [{
          type: "pie",
          indexLabel: "{label} : {y}",
          dataPoints: this.dataPoints1
        }]
      }
      const chartOptions2 = {
        title:{
          text: 'Audio Parameters'
        },
        animationEnabled: true,
        theme: "light1",
        exportEnabled: true,
        axisY:{
          includeZero: true,
        },
        data: [{
            type: "line",
            dataPoints: dataPoints2
        }]
      };	
      this.chartOptions1 = chartOptions1
      this.chartOptions2 = chartOptions2
    });
  }
  getEntries(dict: any): { key: string, value: any }[] 
  {
    return Object.entries(dict).map(([key, value]) => ({ key, value }));
  }
  
}
