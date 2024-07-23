import { Component } from '@angular/core';
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

  onSidebarToggle(collapsed: boolean) {
    this.isSidebarCollapsed = collapsed;
    console.log(this.isSidebarCollapsed ? 'Sidebar is collapsed' : 'Sidebar is expanded');
  }
}
