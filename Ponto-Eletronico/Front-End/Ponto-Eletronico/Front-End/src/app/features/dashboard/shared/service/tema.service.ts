import { Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class TemaService {

  readonly isDark = signal(localStorage.getItem('theme') === 'dark');
  toggle(): void {
    this.isDark.update(value => !value);
    localStorage.setItem('theme',this.isDark() ? 'dark' : 'light');
  }

}
