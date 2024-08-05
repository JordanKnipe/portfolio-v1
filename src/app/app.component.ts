import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, HeaderComponent, SidebarComponent, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-portfolio';
  isSidebarCollapsed = true;
  @ViewChild('lightContainer', { static: true }) lightContainer: ElementRef | undefined;
  @ViewChild('lightEffect') lightEffect!: ElementRef;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
    console.log(this.isSidebarCollapsed ? 'Sidebar is collapsed' : 'Sidebar is expanded');
  }

  @HostListener('mousemove', ['$event'])
  updateLightPosition(event: MouseEvent): void {
    const x = event.clientX - this.lightEffect.nativeElement.offsetWidth / 2;
    const y = event.clientY - this.lightEffect.nativeElement.offsetHeight / 2;
    this.renderer.setStyle(this.lightEffect.nativeElement, 'transform', `translate(${x}px, ${y}px)`);
  }
  
  
  
}
