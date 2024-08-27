import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements AfterViewInit {

  ngAfterViewInit() {
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
          if (target.classList.contains('left-content')) {
            target.classList.add('animate-left');
          } else if (target.classList.contains('right-content')) {
            target.classList.add('animate-right');
          } else if (target.classList.contains('dot')) {
            target.classList.add('animate-dot');
          }
        }
      });
    }, observerOptions);

    // Observe the elements
    document.querySelectorAll('.left-content, .right-content, .dot').forEach(element => {
      observer.observe(element);
    });
  }
}
