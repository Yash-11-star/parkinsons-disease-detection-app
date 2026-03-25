import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, finalize, forkJoin } from 'rxjs'; 
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class SpeechDetectionServiceService {
  url = 'http://127.0.0.1:8000/api/';
  constructor(private _http: HttpClient, private storage: AngularFireStorage) { }
  getSpeechDetection(): Observable<any>
  {
    return this._http.get(this.url+'speech-detection')
  }

  // uploadAudio(audio: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('audio', audio);
  //   return this._http.post(this.url + 'upload-audio', formData);
  // }

  uploadAudio(audio: File): Observable<any> {
    const formData = new FormData();
    formData.append('audio', audio);
    const req$ = this._http.post(this.url + 'upload-audio', formData);
    const audioUrl$ = this.uploadAudioAndGetURL(formData);
    return forkJoin([req$, audioUrl$]);
  }


  uploadAudioAndGetURL(formData: FormData): Observable<string> {
    const audioFile = formData.get('audio') as File | null;
    const filePath = audioFile ? `audio/${Date.now()}_${audioFile.name}` : 'default-path';
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, formData.get('audio'));

    return new Observable<string>(observer => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
            observer.next(downloadURL);  // Emit the download URL
            observer.complete();  // Complete the observable
          });
        })
      ).subscribe();  // Subscribe to trigger the observable
    });
  }

}
