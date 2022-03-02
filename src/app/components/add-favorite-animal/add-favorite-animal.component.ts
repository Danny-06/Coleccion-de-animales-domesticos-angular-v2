import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';
import { AppComponent } from './../../app.component';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from '../../services/animal.service';
import { Component, Input, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-add-favorite-animal',
  templateUrl: './add-favorite-animal.component.html',
  styleUrls: ['./add-favorite-animal.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AddFavoriteAnimalComponent implements OnInit {

  defaultCSSPath = AppComponent.defaultCSSPath
  root = this.element.nativeElement
  host = this.root.shadowRoot


  // Drowpdown filter
  filterOptions: {name: string}[] = [
    {name: 'all'},
    {name: 'cat'},
    {name: 'dog'},
    {name: 'parrot'}
  ]

  @Input()
  filterSelected: {name: string} = this.filterOptions[0]

  // All animals available
  allAnimals: Animal[] = []

  // Current Animals in the UI
  animals: Animal[] = []

  favoriteAnimals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  constructor(
    private animalService: AnimalService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private element: ElementRef,
    private utils: UtilsService
  ) {}

  async ngOnInit() {

    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')

    this.animalService.getAnimals()
    .subscribe(animals => this.animalService.handleNextAnimals(animals, this))

    this.userService.getFavoriteAnimals()
    .subscribe(favoriteAnimals => this.favoriteAnimals = favoriteAnimals)
  }

  filterAnimals() {
    this.animals = this.animalService.filterAnimals(this.allAnimals, [], this.filterSelected.name)
  }

  toggleFavoriteAnimal(id: string) {
    if (this.isFavoriteAnimal(id)) this.userService.removeFavoriteAnimal(id)
    else                           this.userService.addFavoriteAnimal(id)
  }

  isFavoriteAnimal(id: string): boolean {
    const animal: Animal = this.favoriteAnimals.filter(animal => animal.id === id)[0]

    return animal != null
  }

}
