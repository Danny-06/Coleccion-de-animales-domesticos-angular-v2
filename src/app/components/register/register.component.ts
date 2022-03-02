import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import sweetAlert from 'sweetalert';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class RegisterComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  name: string
  description: string
  email: string
  password: string

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private element: ElementRef,
    private utils: UtilsService
  ) { }

  ngOnInit() {
    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')
  }

  async register() {
    if (this.name === '') return this.emptyNameError()

    this.authService.register(this.email, this.password)
    .then(() => {
      const {uid} = this.authService.getCurrentUser()
      const user = {id: uid, name: this.name, details: this.description} as User
      this.userService.addUser(user)

      this.router.navigateByUrl('/main')
    })
    .catch(() => this.accountAlert())
  }

  emptyNameError() {
    return sweetAlert({
      title: `Empty Name`,
      text: `We couldn't create your account. A name must be provided.`
    })
  }

  accountAlert() {
    return sweetAlert({
      title: 'Conection failed',
      text: `We couldn't create your account. The email and password are not valid.`
    })
  }

}
