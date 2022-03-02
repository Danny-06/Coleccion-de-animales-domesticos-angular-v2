import { AppComponent } from './../../app.component';
import { AnimalService } from '../../services/animal.service';
import { Animal } from 'src/app/classes/animal';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AnimalComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  animal: Animal = new Animal()
  animals: Animal[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private animalService: AnimalService,
    private element: ElementRef,
    private utils: UtilsService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.utils.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (!id) return console.log(`ID is ${id}`)

    this.animal = await this.animalService.getAnimal(id)
    if (!this.animal.shortDescription) this.animal.shortDescription = 'Short Description no available' 
    if (!this.animal.description) this.animal.description = 'Description no available'
  }

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }

}
