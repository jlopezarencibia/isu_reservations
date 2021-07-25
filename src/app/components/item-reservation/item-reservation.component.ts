import {Component, Input, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-item-reservation',
  templateUrl: './item-reservation.component.html',
  styleUrls: ['./item-reservation.component.css']
})
export class ItemReservationComponent implements OnInit {

  icFav = faHeart;

  @Input() name!: String;
  @Input() date!: String;
  @Input() ranking!: number;
  @Input() favorite!: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

}
