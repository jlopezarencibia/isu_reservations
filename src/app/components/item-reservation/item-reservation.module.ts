import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemReservationComponent } from './item-reservation.component';
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
    declarations: [
        ItemReservationComponent
    ],
    exports: [
        ItemReservationComponent
    ],
  imports: [
    CommonModule,
    NgbRatingModule,
    FontAwesomeModule
  ]
})
export class ItemReservationModule { }
