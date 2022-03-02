import { AnimalService } from '../../services/animal.service';
import { User } from '../../classes/user';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Animal } from 'src/app/classes/animal';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserDetailsComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  user: User = {} as User

  animals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  favoriteAnimalsIds: string[] = []

  constructor(
    private authService: AuthService,
    public userService: UserService,
    private animalService: AnimalService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utils: UtilsService,
    private element: ElementRef
  ) {
    this.animalService.getAnimals()
    .subscribe(animals => this.animals = animals)

    this.userService.getFavoriteAnimals()
    .subscribe(favoriteAnimals => this.favoriteAnimalsIds = favoriteAnimals.map(animal => animal.id))
  }

  async ngOnInit() {
    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')

    this.user = await this.userService.getUser()
    console.log(this.user)
  }

  getUserAnimalCount() {
    const favoriteAnimals = this.animals.filter(animal => this.favoriteAnimalsIds.includes(animal.id))

    const cats    = favoriteAnimals.filter(a => a.type === 'cat').length
    const dogs    = favoriteAnimals.filter(a => a.type === 'dog').length
    const parrots = favoriteAnimals.filter(a => a.type === 'parrot').length
    
    return {cats, dogs, parrots}
  }

  goToAddFavoriteAnimal() {
    this.router.navigateByUrl(`/add-favorite-animal`)
  }


  goToEditUser() {
    this.router.navigateByUrl('edit-user')
  }

}
