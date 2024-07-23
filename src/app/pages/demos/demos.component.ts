import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-demos',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './demos.component.html',
  styleUrl: './demos.component.scss'
})
export class DemosComponent {

}
