import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Animal } from 'src/app/classes/animal';
import { User } from 'src/app/classes/user';
import { AuthService } from './auth.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private utils: UtilsService,
    private storage: AngularFireStorage
  ) {}

  defaultUserImage = 'assets/user-icon.png'
  loadingImage = 'assets/animals/loading.gif'

  authUser = this.authService.getCurrentUser()

  usersPath = 'users'

  favoriteAnimalsPath = `${this.usersPath}/${this.authUser?.uid}/favorite-animals`

  dataOptions = {idField: 'id'}

  // Upload file to Firebase and return Promise of the url of the uploaded file
  uploadFile(file, path: string, name: string): Promise<string> {
    const filePath = `${path}/${name}`
    const storageRef = this.storage.ref(filePath)
    const task = storageRef.put(file)

    return new Promise((resolve, reject) => {

      task.snapshotChanges().subscribe({
        complete: () => storageRef.getDownloadURL().subscribe({next: resolve, error: reject})
      })

    })
  }

  getUser(): Promise<User> {
    const docRef = doc(this.firestore, `${this.usersPath}/${this.authUser.uid}`)
    const observableData = docData(docRef, this.dataOptions)

    return this.utils.observableToPromise(observableData)
  }

  addUser(user: User) {
    // const collectionRef = collection(this.firestore, this.usersPath)
    // return addDoc(collectionRef, user)

    // Set Custom id to match Document ID to field ID
    const docRef = doc(this.firestore, `${this.usersPath}/${user.id}`)
    return setDoc(docRef, user)
  }

  updateUser(user: User) {
    const {id} = user
    const docRef = doc(this.firestore, `${this.usersPath}/${id}`)
    return setDoc(docRef, user)
  }

  // Returns an observable of animals but with just id
  getFavoriteAnimals(): Observable<Animal[]> {
    const collectionRef = collection(this.firestore, `${this.favoriteAnimalsPath}`)
    return collectionData(collectionRef, this.dataOptions) as Observable<Animal[]>
  }

  addFavoriteAnimal(id: string) {
    const docRef = doc(this.firestore, `${this.favoriteAnimalsPath}/${id}`)
    return setDoc(docRef, {})
  }

  removeFavoriteAnimal(id: string) {
    const docRef = doc(this.firestore, `${this.favoriteAnimalsPath}/${id}`)
    return deleteDoc(docRef)
  }

}
