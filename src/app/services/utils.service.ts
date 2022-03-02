import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class UtilsService {

  constructor(private http: HttpClient) {}

  async fetch(path: string, responseType: any = 'blob'): Promise<string | Blob | ArrayBuffer | object> {
    return this.observableToPromise(this.http.get(path, {responseType}))
  }

  observableToPromise(observable: Observable<any>, multipleValues: boolean = false): Promise<any> {

    return new Promise((resolve, reject): any => {

      if (!multipleValues) return observable.subscribe({next: resolve, error: reject})


      const values: any[] = []

      const observer: Observer<any> = {
        next:     data    => values.push(data),
        error:    message => reject(message),
        complete: ()      => resolve(values)
      }

      observable.subscribe(observer)
    })

  }

  // This function allows to target the scroller of the page to style it with JS
  async getIonContentShadowRoot() {
    const routerOutlet = await this.elementExists('ion-router-outlet')

    await this.delay(500)
    const ionPage = await this.elementExists('.ion-page:not([aria-hidden], .ion-page-hidden), .ion-page.ion-page-hidden[aria-hidden] ~ .ion-page.can-go-back:not([aria-hidden])', routerOutlet)

    if (!ionPage.shadowRoot) return ionPage?.querySelector('ion-content')?.shadowRoot

    const ionContent = await this.elementExists('ion-content', ionPage.shadowRoot)
    return ionContent.shadowRoot
  }

  elementExists(selector: string, doc: Document | DocumentFragment | HTMLElement = document): Promise<HTMLDivElement> {
    function checkElement(selector: string, resolve: Function) {
      const element = doc.querySelector(selector)
      if (element) return resolve(element)

      requestAnimationFrame(() => checkElement(selector, resolve))
    }

    return new Promise(resolve => {
      checkElement(selector, resolve)
    })
  }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
  }


  elementExistsAll(selector: string, childrenNumber: number, doc: Document | DocumentFragment | HTMLElement = document) {
    if (typeof childrenNumber !== 'number' || childrenNumber <= 0) throw new TypeError('parameter 2 must be a positive number different from 0')
  
    function checkElements(selector: string, resolve: Function) {
      const nodeList = doc.querySelectorAll(selector)
      if (nodeList && nodeList.length === childrenNumber) return resolve(nodeList)
  
      requestAnimationFrame(() => checkElements(selector, resolve))
    }
  
    return new Promise(resolve => {
      checkElements(selector, resolve)
    })
  }


  // Load CSS Modules
  async loadAndAttachCSSModuleToHost(host: any, cssPath: string) {
    const cssModule = await this.getCSSModule(cssPath)
    this.attatchCSSModuleToHost(host, cssModule)
  }

  attatchCSSModuleToHost(host: any, cssModule: any) {
    if (!host) return
    host.adoptedStyleSheets = [...host.adoptedStyleSheets, cssModule]
  }

  getCSSModule(path: string) {
    const stylesheet: any = new CSSStyleSheet()

    this.fetch(path, 'text')
    .then(text => stylesheet.replace(text))

    return stylesheet
  }

  textToCSSModule(cssText: string) {
    const stylesheet: any = new CSSStyleSheet()
    stylesheet.replace(cssText)

    return stylesheet
  }

}
