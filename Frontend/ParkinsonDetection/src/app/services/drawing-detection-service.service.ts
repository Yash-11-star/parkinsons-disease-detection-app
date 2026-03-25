import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs'; 
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DrawingDetectionServiceService {


  url = 'http://127.0.0.1:8000/api/';
  
  constructor(private _http: HttpClient, private storage: AngularFireStorage) { }

  getSpiralDrawingDetection(): Observable<any>
  {
    return this._http.get(this.url+'spiral-drawing-detection')
  }

  uploadSpiralImage(formData: FormData): Observable<any> 
  {
    const req$ = this._http.post(this.url + 'upload-spiral-image', formData)
    const imgurl$ = this.uploadImageAndGetURL(formData);
    console.log("Img url in service:",imgurl$)
    return forkJoin([req$,imgurl$]);
  }


  getWaveDrawingDetection(): Observable<any>
  {
    return this._http.get(this.url+'wave-drawing-detection')
  }

  
  uploadWaveImage(formData: FormData): Observable<any> 
  {
    const req$ = this._http.post(this.url + 'upload-wave-image', formData)
    const imgurl$ = this.uploadImageAndGetURL(formData);
    console.log("Img url in service:",imgurl$)
    return forkJoin([req$,imgurl$]);
  }  




  uploadImageAndGetURL(formData: FormData): Observable<string> {
    const imageFile = formData.get('image') as File | null;
    const filePath = imageFile ? `images/${Date.now()}_${imageFile.name}` : 'default-path';
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, formData.get('image'));
  
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
