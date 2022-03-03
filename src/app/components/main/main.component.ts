import { Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { Animal } from './../../classes/animal';
import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class MainComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

   // Drowpdown filter
   filterOptions = ['all', 'cat', 'dog', 'parrot', 'favorite']

  @Input()
  filterSelected: string = this.filterOptions[0]

  // All animals available
  allAnimals: Animal[] = []

  // Current Animals in the UI
  animals: Animal[] = []

  // Favorite Animal of user
  favoriteAnimals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  constructor(
    public animalService: AnimalService,
    private router: Router,
    private userService: UserService,
    private utils: UtilsService,
    private element: ElementRef
  ) {}

  async ngOnInit() {
    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')

    this.animalService.getAnimals()
    .subscribe(animals => this.animalService.handleNextAnimals(animals, this))

    this.userService.getFavoriteAnimals()
    .subscribe(favoriteAnimalsId => {
      const animalsIds: string[] = favoriteAnimalsId.map(animal => animal.id)
      this.favoriteAnimals = this.animals.filter(animal => animalsIds.includes(animal.id))
    })
  }

  filterAnimals() {
    this.animals = this.animalService.filterAnimals(this.allAnimals, this.favoriteAnimals, this.filterSelected)
  }

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }

}
