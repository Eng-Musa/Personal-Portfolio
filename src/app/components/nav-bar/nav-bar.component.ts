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
export class NavBarComponent implements AfterViewInit {
  hamburger: HTMLElement | null = null;
  navMenu: HTMLElement | null = null;

  ngAfterViewInit() {
    this.hamburger = document.querySelector(".hamburger");
    this.navMenu = document.querySelector(".nav-menu");

    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", () => {
        this.hamburger?.classList.toggle("active");
        this.navMenu?.classList.toggle("active");
      });

      document.querySelectorAll(".nav-link").forEach(link => {
        (link as HTMLElement).addEventListener("click", () => {
          this.hamburger?.classList.remove("active");
          this.navMenu?.classList.remove("active");
        });
      });
    }
  }
}
