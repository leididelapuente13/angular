import { Injectable, signal } from '@angular/core';

type avaliableLocale = 'en' | 'fr' | 'es';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  currentLocale = signal<avaliableLocale>('es');

  get getCurrentLocale(): avaliableLocale {
    return this.currentLocale();
  }

  changeLocale(locale: avaliableLocale) {
    this.currentLocale.set(locale);
  }

}
