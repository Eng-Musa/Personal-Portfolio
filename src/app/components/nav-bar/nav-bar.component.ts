import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
    if (this.menuActive) {
      document.body.classList.add('menu-active');
    } else {
      document.body.classList.remove('menu-active');
    }
  }

  closeMenu() {
    this.menuActive = false;
    document.body.classList.remove('menu-active');
  }
}
