import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() projectUrl!: string;
  @Input() sourceUrl!: string;

constructor(private router:Router){

}

}

