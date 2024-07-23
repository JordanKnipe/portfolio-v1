import { Component, ChangeDetectorRef, ViewChildren, QueryList, ElementRef, AfterViewChecked, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { debounceTime, fromEvent, throttleTime } from 'rxjs';
import { CardComponent } from '../../components/card/card.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgClass, CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewChecked, AfterViewInit {
  currentSection = 'about';

  @ViewChild('scrollableElement', { static: true }) scrollableElement: ElementRef | undefined;
  @ViewChildren('section') sections: QueryList<ElementRef> | undefined;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngAfterViewInit() {
    if (this.scrollableElement) {
      // Observable for scroll events
      const scrollObservable = fromEvent(this.scrollableElement.nativeElement, 'scroll');
  
      // Subscription to handle scroll while scrolling
      scrollObservable.pipe(
        throttleTime(100) // Handle scroll updates every 100ms
      ).subscribe(() => {
        this.onScrollableElementScroll();
      });
  
      // Subscription to handle scroll stopping
      scrollObservable.pipe(
        debounceTime(300) // Trigger when no scroll events have occurred for 300ms
      ).subscribe(() => {
        this.onScrollStopped();
      });

      if (this.scrollableElement) {
        fromEvent(this.scrollableElement.nativeElement, 'scroll').pipe(
          debounceTime(200)  // Waits for 500ms of no scroll events before emitting
        ).subscribe(() => {
          console.log('Scrolling has stopped, now triggering change detection.');
          this.onScrollStopped();
        });
      } else {
        console.error("Scrollable element not available.");
      }
    } else {
      console.error("Scrollable element not available.");
    }
  }

  
  onScrollStopped() {
    console.log('Scrolling has stopped.');
    this.onScrollableElementScroll();
    this.cdr.detectChanges();
    // Perform any actions you need when scrolling stops
  }
  
  onScrollableElementScroll() {
    let newSection = '';
    const scrollPosition = this.scrollableElement?.nativeElement.scrollTop + 200; // Adjust based on element's scroll position
  
    this.sections?.forEach((section) => {
      const sectionTop = section.nativeElement.offsetTop;
      const sectionHeight = section.nativeElement.offsetHeight;
  
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        newSection = section.nativeElement.id;
        console.log(`New active section: ${newSection}`);
        return; // Exit the loop once the active section is found
      }
    });
  
    if (this.currentSection !== newSection && newSection !== '') {
      console.log(`Updating current section from ${this.currentSection} to ${newSection}`);
      this.currentSection = newSection;
      this.cdr.detectChanges(); // Trigger change detection only if there's a change
    }
  }
  


  ngAfterViewChecked() {
    // Optional: Handle any additional checks or updates after view checks
  }

  scrollTo(sectionId: string) {
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}
