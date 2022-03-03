import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../classes/user';
import { AppComponent } from './../../app.component';
import { UserService } from '../../services/user.service';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { AuthService } from 'src/app/services/auth.service';
import sweetAlert from 'sweetalert';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EditUserComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  user: User = {} as User

  constructor(
    private utils: UtilsService,
    private element: ElementRef,
    public userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')

    // Load default stylesheet
    const {defaultCSSPath} = AppComponent
    this.utils.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

    this.user = await this.userService.getUser()

  }

  async handleInputFile(event) {
    const [file] = event.currentFiles
    this.user.image = this.userService.loadingImage

    const fileUrl = await this.userService.uploadFile(file, 'users', `${this.user.name}-${Date.now()}`)
                          .catch(error => {
                            console.error(error)
                            this.alertError('Unexpected error, try again later')

                            this.user.image = this.userService.defaultUserImage

                            return ''
                          })

    this.user.image = fileUrl
  }

  async updateUser() {
    if (this.user.name === '') return this.alertError(`Name can't be emty`)

    await this.userService.updateUser(this.user)

    this.router.navigateByUrl('user-details')
  }

  alertError(message) {
    return sweetAlert({
      title: 'Error',
      text: message,
      icon: 'error',
      buttons: ['Ok']
    })
  }

}
