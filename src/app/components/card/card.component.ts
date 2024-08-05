import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, CardComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() imageUrl!: string;
  @Input() title!: string;
  @Input() description!: string;
  @Input() projectUrl!: string;
  @Input() sourceUrl!: string;

  @Output() onClick = new EventEmitter<void>();

  cardClicked() {
    this.onClick.emit();
  }
constructor(private router:Router){

}

}

