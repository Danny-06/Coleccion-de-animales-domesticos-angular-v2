import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';


// https://sweetalert.js.org/
import sweetAlert from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class LoginComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  email: string = 'user@gmail.com'
  password: string = 'password'

  constructor(
    private authService: AuthService,
    private router: Router,
    private element: ElementRef,
    private utils: UtilsService
  ) {}

  ngOnInit() {
    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')
  }

  async login() {
    const connectionSuccess = await this.authService.login(this.email, this.password)

    if (!connectionSuccess) return this.accountAlert()
    this.router.navigateByUrl('/main')
  }

  accountAlert() {
    return sweetAlert({
      title: `Conection failed, We couldn't create your account`,
      text: `The email and password are not valid or maybe you don't have connection to internet.`,
      icon:'error'
    })
  }

}
