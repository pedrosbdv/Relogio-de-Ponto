import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  readonly isOpen = signal(true);

  toggle() {
    this.isOpen.update(v => !v);
  }

  close(): void {
    this.isOpen.set(false);
  }

}
