import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit{

  private hasLoggedError = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          root: null, // Use the viewport as the root
          rootMargin: '0px',
          threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;

              // Add the appropriate animation class based on the element's class
              if (target.classList.contains('content-left')) {
                target.classList.add('animate-left');
              } else if (target.classList.contains('content-right')) {
                target.classList.add('animate-right');
              } 
            }
          });
        }, observerOptions);

        // Observe the elements
        document.querySelectorAll('.content-left, .content-right').forEach(element => {
          observer.observe(element);
        });
      } else {
        console.error('Intersection Observer API is not supported in this browser.');
      }
    } else {
      if (!this.hasLoggedError) {
        console.error('This code is not running in a browser environment.');
        this.hasLoggedError = true;
      }
    }
  }

}
