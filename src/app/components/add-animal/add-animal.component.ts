import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AddAnimalComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  animal: Animal = {...new Animal()}

  constructor(
    private utils: UtilsService,
    private element: ElementRef,
    public animalService: AnimalService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.utils.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)
  }

  async handleInputFile(event) {
    const [file] = event.currentFiles
    this.animal.image = this.animalService.loadingImage

    const fileUrl = await this.animalService.uploadFile(file, 'animals', `${this.animal.name}-${Date.now()}`)
                          .catch(error => {
                            console.error(error)
                            this.alertError('Unexpected error, try again later')

                            this.animal.image = this.animalService.defaultAnimalImage

                            return ''
                          })

    this.animal.image = fileUrl
  }

  addAnimal() {
    const {name, image} = this.animal
    if (!name) return this.alertError(`Animal name can't be empty`)
    if (!image) return this.alertError(`Animal image can't be empty`)

    this.animalService.addAnimal(this.animal)
    .then(() => this.router.navigateByUrl('/main'))
    .catch(error => {
      console.error(error)
      this.alertError(`Sorry, an unexpected error ocurred, we coudn't create your animal`)
    })
  }


  alertError(message) {
    return sweetAlert({
      title: 'Error',
      text: message,
      icon: 'error'
    })
  }

}
