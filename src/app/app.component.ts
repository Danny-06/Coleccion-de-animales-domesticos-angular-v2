import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AppComponent implements OnInit {
  title = 'Angular-Empty-Project';

  static defaultCSSPath = 'assets/css/custom-default.css'

  root = this.element.nativeElement
  host = this.root.shadowRoot

  constructor(
    private router: Router,
    private element: ElementRef,
    private utils: UtilsService,
    public authService: AuthService
  ) {}

  goToHome() {
    this.router.navigateByUrl('/main')
  }

  goToProfile() {
    this.router.navigateByUrl('/user-details')
  }

  logout() {
    this.authService.logout()
    this.router.navigateByUrl('login')
  }

  isPath(path: string) {
    return this.router.url === path
  }

  async ngOnInit() {
    // Add class 'logged' to component if the page does not match '/login', '/register' and '/recover-password'
    this.router.events.subscribe((event: any) => {
      if (!('navigationTrigger' in event)) return

      if (event.url !== '/login' && event.url !== '/register' && event.url !== '/recover-password') {
        this.root.classList.add('logged')
      } else {
        this.root.classList.remove('logged')
      }
    })

    // Remove 'router-outlet' from the app-root
    this.host?.querySelector('router-outlet')?.remove()

    // Load Default stylesheet
    const {defaultCSSPath} = AppComponent
    
    const doc: any = document
    this.utils.loadAndAttachCSSModuleToHost(doc, defaultCSSPath)
    this.utils.loadAndAttachCSSModuleToHost(this.host, defaultCSSPath)

    // Import PrimeNg stylesheet inside component
    this.utils.loadAndAttachCSSModuleToHost(this.host, '/styles.css')
  }
  
}
