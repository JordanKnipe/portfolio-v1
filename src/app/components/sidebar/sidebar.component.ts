import { NgClass } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})


export class SidebarComponent implements OnInit, OnDestroy{
  @Input() collapsed:boolean = true;
  @Output() collapsedChange = new EventEmitter<boolean>();

  toggleSidebar() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
    console.log(this.collapsed);
  }

  handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('nav') && !this.collapsed) {
      this.collapsed = true;
      this.collapsedChange.emit(this.collapsed);
      console.log('Sidebar collapsed due to outside click');
    }
  };

  @HostListener('click', ['$event'])
  onSidebarClick(event: MouseEvent) {
    event.stopPropagation();
  }

  ngOnInit() {
    document.addEventListener('click', this.handleClickOutside);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  }
}
