import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeechDetectionServiceService {
  url = 'http://127.0.0.1:8000/api/';
  constructor(private _http: HttpClient) { }
  getSpeechDetection(): Observable<any>
  {
    return this._http.get(this.url+'speech-detection')
  }

  uploadAudio(audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', audio);
    return this._http.post(this.url + 'upload-audio', formData);
  }
}
