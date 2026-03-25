import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { HttpClientModule } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DrawingDetectionServiceService {

  url = 'http://127.0.0.1:8000/api/';
  
  constructor(private _http: HttpClient) { }

  getSpiralDrawingDetection(): Observable<any>
  {
    return this._http.get(this.url+'spiral-drawing-detection')
  }

  uploadSpiralImage(formData: FormData): Observable<any> {
    return this._http.post(this.url + 'upload-spiral-image', formData);
  }


  getWaveDrawingDetection(): Observable<any>
  {
    return this._http.get(this.url+'wave-drawing-detection')
  }

  
  uploadWaveImage(formData: FormData): Observable<any> {
    return this._http.post(this.url + 'upload-wave-image', formData);
  }  

}
