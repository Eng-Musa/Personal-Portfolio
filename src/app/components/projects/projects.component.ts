import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements AfterViewInit {

  private hasLoggedError = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          root: null, 
          rootMargin: '0px',
          threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            const target = entry.target as HTMLElement;

            if (entry.isIntersecting) {
              // Add the appropriate animation class based on the element's class
              if (target.classList.contains('content-left')) {
                target.classList.add('animate-left');
              } else if (target.classList.contains('content-right')) {
                target.classList.add('animate-right');
              }
            } else {
              // Remove animation classes when the element exits the viewport
              target.classList.remove('animate-left', 'animate-right');
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
