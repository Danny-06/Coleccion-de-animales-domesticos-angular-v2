import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';
// import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User as AuthUser, UserCredential, getAuth, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  usersPath = `animals`

  dataOptions = {idField: 'id'}

  constructor(private auth: Auth) {}

  async login(email: string, password: string): Promise<boolean> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password)
                                 .catch(console.error)

    if (typeof userCredential === 'undefined') return false

    return true
  }

  getCurrentUser(): AuthUser {
    return getAuth().currentUser
  }

  logout() {
    signOut(this.auth)
  }

  register(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, email, password)
  }

  resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(this.auth, email)
  }

}
