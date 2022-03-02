import { Animal } from '../classes/animal';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import { deleteDoc } from 'firebase/firestore';
import { AuthService } from './auth.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';



@Injectable({
  providedIn: 'root'
})

export class AnimalService {

  defaultAnimalImage = 'assets/animals/image-not-found.png'
  loadingImage = 'assets/animals/loading.gif'

  animalsPath = 'animals'

  dataOptions = {idField: 'id'}

  collectionRef = collection(this.firestore, this.animalsPath)

  constructor(
    private firestore: Firestore,
    private authService: AuthService,
    private utils: UtilsService,
    private storage: AngularFireStorage
  ) {}

  // Upload file to Firebase and return url of the uploaded file
  uploadFile(file: any, path: string, name: string): Promise<string> {
    const filePath = `${path}/${name}`
    const storageRef = this.storage.ref(filePath)
    const task = storageRef.put(file)

    return new Promise((resolve, reject) => {

      task.snapshotChanges().subscribe({
        complete: () => storageRef.getDownloadURL().subscribe({next: resolve, error: reject})
      })

    })
  }

  getAnimals(): Observable<Animal[]> {
    return collectionData(this.collectionRef, this.dataOptions) as Observable<Animal[]>
  }

  getAnimal(id: string): Promise<Animal> {
    const docRef = doc(this.firestore, `${this.animalsPath}/${id}`)
    const observableData = docData(docRef, this.dataOptions)

    return this.utils.observableToPromise(observableData)
  }

  addAnimal(animal: Animal) {
    return addDoc(this.collectionRef, animal)
  }

  deleteAnimal(id: string) {
    const docRef = doc(this.firestore, `${this.animalsPath}/${id}`)
    return deleteDoc(docRef);
  }

  updateAnimal(animal: Animal) {
    const {id} = animal
    const docRef = doc(this.firestore, `${this.animalsPath}/${id}`)
    return setDoc(docRef, animal)
  }



  filterAnimals(animals: Animal[], favoriteAnimals: Animal[], type: string): Animal[] {
    if (type === 'all') return animals

    if (type === 'favorite') return favoriteAnimals

    return animals.filter(animal => animal.type === type)
  }

  // Handle animals Observable on the component
  handleNextAnimals(animals: Animal[], ctx: any) {
    ctx.allAnimals = animals
    ctx.filterAnimals()

    ctx.animals.forEach((animal: Animal) => {
      if (!animal.shortDescription) animal.shortDescription = 'Short Description no available' 
      if (!animal.description) animal.description = 'Description no available'
    })
  }

}
