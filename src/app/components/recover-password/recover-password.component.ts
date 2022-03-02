import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import sweetAlert from 'sweetalert';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class RecoverPasswordComponent implements OnInit {

  root = this.element.nativeElement
  host = this.root.shadowRoot

  email: string

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

  recoverPassword() {
    return this.authService.resetPassword(this.email)
    .then(async () => {
      await this.alertResetPassword()
      this.router.navigateByUrl('/login')
    })
    .catch(() => this.alertError())
  }

  alertResetPassword() {
    return sweetAlert({
      title: 'Recovered password',
      text: `You've been sent an email with a link to recover your password`,
      icon: 'success'
    })
  }

  alertError() {
    return sweetAlert({
      title: 'Process has failed',
      text: `We couldn't send you an email to recover your password.
             Try again later.`,
      icon: 'error'
    })
  }

}
