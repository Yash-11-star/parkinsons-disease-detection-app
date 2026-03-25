import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { arrayUnion, getFirestore, doc, updateDoc, getDoc, setDoc, DocumentData } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.default.User | null>;
  private isAuthenticatedFlag: boolean = false;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {     
          this.user$ = afAuth.authState; 
          this.user$.subscribe(user => this.isAuthenticatedFlag = !!user);
    }
  
  register(email: string, password: string, age: number, gender: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        if (userCredential.user) {
          // Additional user data to be stored in Firestore
          const userData = {
            email: userCredential.user.email,
            age: age,
            gender: gender
          };
          this.firestore.collection('users').doc(userCredential.user.uid).set(userData);
          this.router.navigate(['/home']);
        } else {
          console.error('User not found in userCredential');
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("Logged in successfully",res)
        this.router.navigate(['/home']);
        console.log("After navigate home of login")
      })
      .catch(error => {
        console.error("Error while logging in. ",error);
        const errorcode = error.code;
        if (errorcode === 'auth/invalid-credential' || errorcode === 'auth/user-not-found' || errorcode === 'auth/invalid-email')
        {
          console.log("Invalid credentials. Please check your email and password.");
        }
        else
        {
          console.error("Auth error: ",error)
        }
      });
  }


  logout() {
    console.log("Logging out...");
    this.afAuth.signOut()
      .then(() => {
        console.log("User logged out is: ");
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.log("Unable to logout or user not found logged in",error)
      });
  }

  isAuthenticated(): boolean {
    // console.log(!!this.afAuth.currentUser)
    // return !!this.afAuth.currentUser;
    // return this.user$.pipe(map(user => !!user));
    return this.isAuthenticatedFlag;
  }

  getCurrentUser(): Observable<firebase.default.User | null> {
    return this.user$;
  }


  // storeImageUrlInFirestore(userId: string, imageUrl: string): void {
  //   const userImagesCollection = this.firestore.collection('userImages');
  //   userImagesCollection.doc(userId).set({
  //     imageUrl: imageUrl
  //   }).then(() => {
  //     console.log('Image URL stored in Firestore for user and image url is:', userId,imageUrl);
  //   }).catch(error => {
  //     console.error('Error storing image URL in Firestore:', error);
  //   });
  // }
  storeImageUrlInFirestore(userId: string, imageUrl: string): void {
    const userImagesCollection = this.firestore.collection('userImages');
    const userDoc = doc(getFirestore(), 'userImages', userId);

    updateDoc(userDoc, {
      imageUrls: arrayUnion(imageUrl)
    }).then(() => {
      console.log('Image URL stored in Firestore for user and image url is:', userId, imageUrl);
    }).catch(error => {
      console.error('Error storing image URL in Firestore:', error);
    });
  }

  // storeAudioUrlInFirestore(userId: string, audioUrl: string): void {
  //   const userAudioCollection = this.firestore.collection('userAudio');
  //   const userDoc = doc(getFirestore(), 'userAudio', userId);
  //   updateDoc(userDoc, {
  //     audioUrls: arrayUnion(audioUrl)
  //   }).then(() => {
  //     console.log('Audio URL stored in Firestore for user and Audio url is:', userId, audioUrl);
  //   }).catch(error => {
  //     console.error('Error storing audio URL in Firestore:', error);
  //   });
  // }


  storeAudioUrlInFirestore(userId: string, audioUrl: string): void {
    const userAudioCollection = this.firestore.collection('userAudio');
    const userDoc = doc(getFirestore(), 'userAudio', userId);
  
    // Check if the document exists before updating
    getDoc(userDoc)
      .then(docSnapshot => {
        if (docSnapshot.exists()) {
          updateDoc(userDoc, {
            audioUrls: arrayUnion(audioUrl)
          }).then(() => {
            console.log('Audio URL stored in Firestore for user and Audio url is:', userId, audioUrl);
          }).catch(error => {
            console.error('Error updating document in Firestore:', error);
          });
        } else {
          const userData: DocumentData = {
            audioUrls: [audioUrl] // Assuming 'audioUrls' is an array field
          };

          setDoc(userDoc, userData)
            .then(() => {
              console.log('New document created in Firestore for user:', userId);
              console.log('Audio URL stored in Firestore for user and Audio url is:', userId, audioUrl);
            })
            .catch((error: any) => {
              console.error('Error creating new document in Firestore:', error);
            });
        }
      })
      .catch(error => {
        console.error('Error checking document existence in Firestore:', error);
      });
  }
  
 
  
  

}
