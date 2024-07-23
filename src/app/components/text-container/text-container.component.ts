import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-container',
  standalone: true,
  imports: [],
  templateUrl: './text-container.component.html',
  styleUrl: './text-container.component.scss'
})
export class TextContainerComponent {
  @Input() title: string = '';
  @Input() content: string = '';
}
