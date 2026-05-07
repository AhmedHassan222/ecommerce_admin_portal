import { Component } from '@angular/core';

import {
  NgSelectComponent
} from '@ng-select/ng-select';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
interface Ilang{
  id: string;
  name: string;
  flag: string;
}
@Component({
  selector: 'app-header',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    NgSelectComponent
  ],

  templateUrl: './header.component.html'
})

export class HeaderComponent {

  currentLang = 'en';

  languages: Ilang[] = [
    {
      id: 'en',
      name: 'English',
      flag: 'https://flagcdn.com/w40/us.png'
    },
    {
      id: 'ar',
      name: 'العربية',
      flag: 'https://flagcdn.com/w40/eg.png'
    }
  ];

  constructor(private translate: TranslateService) {

    this.translate.setDefaultLang('en');

    this.translate.use('en');
  }

  changeLang(lang: Ilang) {

    this.currentLang = lang.id;

    this.translate.use(lang.id);

    document.documentElement.dir =
      lang.id === 'ar' ? 'rtl' : 'ltr';
  }
}