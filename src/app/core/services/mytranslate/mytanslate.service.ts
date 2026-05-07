import { isPlatformBrowser } from '@angular/common';
import { inject, Inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import { TranslateService} from "@ngx-translate/core";
@Injectable({
  providedIn: 'root'
})
export class MytanslateService {
private render2 = inject(RendererFactory2).createRenderer(document.body, null);
  constructor( private translate: TranslateService ,@Inject(PLATFORM_ID) private platformId: Object
   ,  ) {
   
    if(isPlatformBrowser(this.platformId)){
    this.translate.setDefaultLang('en');
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {  
    this.translate.use(savedLang);
   }
  }
  this.changeDirection()

}
changeDirection(): void {
  if (localStorage.getItem('lang') === 'ar') {
    this.render2.setAttribute(document.documentElement, 'dir', 'rtl');
    this.render2.setAttribute(document.documentElement, 'lang', 'ar');
  } else {
    this.render2.setAttribute(document.documentElement, 'dir', 'ltr');
    this.render2.setAttribute(document.documentElement, 'lang', 'en');
  }
  }
}
