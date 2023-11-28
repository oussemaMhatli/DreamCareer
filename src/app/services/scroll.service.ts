// src/app/services/scroll-animation.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private observer: IntersectionObserver;

  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add('animate');
            this.observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );
  }

  observeElements(scrollAnimElements: NodeListOf<Element>): void {
    for (let i = 0; i < scrollAnimElements.length; i++) {
      this.observer.observe(scrollAnimElements[i]);
    }
  }
}
