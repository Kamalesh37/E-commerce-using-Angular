import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setDarkTheme();
    } else {
      this.setLightTheme();
    }
  }

  toggleTheme() {
    if (this.isDarkTheme.value) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  }

  setDarkTheme() {
    this.isDarkTheme.next(true);
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }

  setLightTheme() {
    this.isDarkTheme.next(false);
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
}
